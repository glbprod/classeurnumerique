// Ajoute une nouvelle page au fichier pages-config.json
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Uniquement en POST
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

    // Récupération des données envoyées
    const { title, githubPath, description } = JSON.parse(event.body);

    if (!title || !githubPath) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Titre et chemin GitHub requis' })
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

    // 2. Création de la nouvelle page
    const newPage = {
      id: `page-${Date.now()}`,
      title: title,
      githubPath: githubPath,
      description: description || '',
      addedDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    // 3. Ajout de la page
    pagesConfig.pages.push(newPage);

    // 4. Mise à jour sur GitHub
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
          message: `Ajout de la page: ${title}`,
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
        page: newPage,
        message: 'Page ajoutée avec succès'
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
