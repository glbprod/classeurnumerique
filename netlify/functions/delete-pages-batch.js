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
