// Récupère la liste des pages depuis GitHub
exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Gestion des requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // Format: "username/repo"
    
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Variables d\'environnement manquantes' })
      };
    }

    // Récupération du fichier pages-config.json depuis GitHub
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/data/pages-config.json`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Netlify-Function'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Le contenu est encodé en base64
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const pagesConfig = JSON.parse(content);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        pages: pagesConfig.pages,
        sha: data.sha // Nécessaire pour les futures modifications
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
