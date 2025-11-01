const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { ids } = JSON.parse(event.body);
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'IDs invalides'
        })
      };
    }
    
    // Chemin vers pages.json
    const pagesPath = path.join(process.cwd(), 'pages.json');
    
    // Lire les pages
    let pages = [];
    if (fs.existsSync(pagesPath)) {
      pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
    }
    
    // Filtrer pour supprimer les pages avec les IDs donnés
    const beforeCount = pages.length;
    pages = pages.filter(page => !ids.includes(page.id));
    const deletedCount = beforeCount - pages.length;
    
    // Sauvegarder
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        deleted: deletedCount,
        remaining: pages.length
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
