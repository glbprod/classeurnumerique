// 📁 Ton fichier serveur (server.js, app.js, ou netlify/functions/...)

// ✅ NOUVELLE FONCTION 1 : Vérifier le statut d'une page
app.post('/api/check-page-status', async (req, res) => {
  const { githubPath } = req.body;
  
  // Construire l'URL complète
  const fullUrl = 'https://latechnologieaucollege.netlify.app/${githubPath}`;
  
  try {
    // Faire une requête HTTP pour tester le lien
    const response = await fetch(fullUrl, { 
      method: 'HEAD' // Ne télécharge pas la page, juste vérifie
    });
    
    // Retourner le statut
    res.json({
      success: true,
      status: response.status,
      isOk: response.status === 200,
      isError: response.status >= 400
    });
  } catch (error) {
    res.json({
      success: false,
      isError: true
    });
  }
});
