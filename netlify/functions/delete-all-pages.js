// Supprime TOUTES les pages du fichier pages-config.json
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

    // Vérification de la confirmation
    const { confirm } = JSON.parse(event.body);
    
    if (confirm !== true) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Confirmation requise' })
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

    // Compter avant suppression
    const deletedCount = pagesConfig.pages.length;

    // 2. Vider le tableau de pages
    pagesConfig.pages = [];

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
          message: `⚠️ RÉINITIALISATION : Suppression de TOUTES les pages (${deletedCount})`,
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
        message: 'Toutes les pages ont été supprimées'
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
