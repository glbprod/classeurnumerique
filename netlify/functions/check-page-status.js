// 📁 Ton fichier serveur (server.js, app.js, ou netlify/functions/...)

// ✅ NOUVELLE FONCTION 1 : Vérifier le statut d'une page
app.post('/api/check-page-status', async (req, res) => {
  const { githubPath } = req.body;
  
  // Construire l'URL complète
  const fullUrl = `https://ton-site.netlify.app/${githubPath}`;
  
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

// ✅ NOUVELLE FONCTION 2 : Supprimer plusieurs pages en une fois
app.post('/api/delete-pages-batch', async (req, res) => {
  const { ids } = req.body; // Liste d'IDs à supprimer
  
  // Lire pages.json
  const pages = JSON.parse(fs.readFileSync('pages.json'));
  
  // Filtrer pour garder seulement les pages qui ne sont PAS dans la liste
  const updatedPages = pages.filter(page => !ids.includes(page.id));
  
  // Sauvegarder
  fs.writeFileSync('pages.json', JSON.stringify(updatedPages));
  
  res.json({ 
    success: true, 
    deleted: ids.length 
  });
});
