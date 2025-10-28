// Toggle le statut favori d'une page
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

    // Récupération de l'ID de la page
    const { id } = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID de la page requis' })
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

    // 2. Trouver la page et toggle le favori
    const page = pagesConfig.pages.find(p => p.id === id);
    
    if (!page) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Page non trouvée' })
      };
    }

    // Toggle du statut favori
    page.favorite = !page.favorite;

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
          message: `Toggle favori: ${page.title}`,
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
        page: page,
        isFavorite: page.favorite,
        message: page.favorite ? 'Page ajoutée aux favoris' : 'Page retirée des favoris'
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
