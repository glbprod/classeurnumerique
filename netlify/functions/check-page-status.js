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
    const { githubPath } = JSON.parse(event.body);
    
    // ✅ Nettoyer le chemin pour correspondre aux URLs Netlify
    let cleanPath = githubPath
      .replace(/\.html$/, '')           // Retire .html à la fin
      .replace('/Pages/', '/pages/');   // Pages → pages (minuscule)
    
    const baseUrl = 'https://latechnologieaucollege.netlify.app';
    const fullUrl = `${baseUrl}/${cleanPath}`;
    
    console.log(`Vérification de : ${fullUrl}`);
    
    try {
      const response = await fetch(fullUrl, {
        method: 'HEAD',
        redirect: 'manual',
        signal: AbortSignal.timeout(5000)
      });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          url: fullUrl,
          status: response.status,
          isOk: response.status === 200,
          isRedirect: [301, 302, 307, 308].includes(response.status),
          isError: response.status >= 400
        })
      };
    } catch (fetchError) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          url: fullUrl,
          status: 0,
          isOk: false,
          isError: true,
          message: 'Inaccessible'
        })
      };
    }
    
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
