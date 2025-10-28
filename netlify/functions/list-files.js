// Liste les fichiers d'un dossier GitHub (récursif)
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
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

    // Récupérer le chemin depuis les paramètres (par défaut : racine)
    const path = event.queryStringParameters?.path || '';

    // Récupération du contenu du dossier
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
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

    const items = await response.json();

    // Filtrer et formater les résultats
    const files = items
      .filter(item => item.type === 'file' && item.name.endsWith('.html'))
      .map(item => ({
        name: item.name,
        path: item.path,
        size: item.size
      }));

    const folders = items
      .filter(item => item.type === 'dir')
      .map(item => ({
        name: item.name,
        path: item.path
      }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        currentPath: path,
        folders: folders,
        files: files
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
