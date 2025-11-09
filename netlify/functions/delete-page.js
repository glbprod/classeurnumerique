// Supprime plusieurs pages en une seule fois du fichier pages-config.json
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Variables manquantes' })
      };
    }

    // Récupération des IDs à supprimer
    const { ids } = JSON.parse(event.body);

    if (!Array.isArray(ids) || ids.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Liste d\'IDs requise' })
      };
    }

    // 1. Récupération du fichier actuel
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/data/pages-config.json`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Netlify-Function'
        }
      }
    );

    if (!getResponse.ok) {
      throw new Error(`Erreur GitHub GET: ${getResponse.status}`);
    }

    const fileData = await getResponse.json();
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const pagesConfig = JSON.parse(currentContent);

    // 2. Filtrer pour supprimer toutes les pages dont l'ID est dans la liste
    const beforeCount = pagesConfig.pages.length;
    const deletedPages = pagesConfig.pages.filter(p => ids.includes(p.id));
    pagesConfig.pages = pagesConfig.pages.filter(p => !ids.includes(p.id));
    const deletedCount = beforeCount - pagesConfig.pages.length;

    if (deletedCount === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'Aucune page trouvée avec ces IDs' 
        })
      };
    }

    // 3. Mise à jour sur GitHub
    const newContent = Buffer.from(JSON.stringify(pagesConfig, null, 2)).toString('base64');
    
    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/data/pages-config.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Netlify-Function',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `🧹 Nettoyage automatique: suppression de ${deletedCount} page(s) morte(s)`,
          content: newContent,
          sha: fileData.sha
        })
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Erreur GitHub PUT: ${updateResponse.status} - ${JSON.stringify(errorData)}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        deleted: deletedCount,
        remaining: pagesConfig.pages.length,
        deletedPages: deletedPages.map(p => p.title)
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: error.message 
      })
    };
  }
};
