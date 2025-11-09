# Formulaire - Fiche Activité Énergies et Objets Techniques

## 📋 Description

Ce formulaire HTML interactif a été créé à partir du contenu du PDF "fiche-activité-objets-techniques-energies.pdf".

Il reprend la structure et le style du formulaire exemple (sujet-trottinette.html) avec :
- **Protection par mot de passe** : ENERGIE2025
- **Connexion à Firebase** pour sauvegarder les réponses
- **Interface moderne et responsive**
- **Validation des données avant envoi**

## 📚 Contenu du formulaire

Le formulaire est divisé en 4 parties principales :

### 1. Entrée-Sortie
- Tableau avec 4 objets techniques (Bicyclette, Lampe de poche, Ventilateur, Bouilloire électrique)
- Questions sur : fonction d'usage, énergie d'entrée, énergie de sortie

### 2. Conversion et stockage
- Comparaison Corps humain / Voiture à essence
- Questions sur les énergies et les fonctions (se déplacer, se guider, stocker, distribuer, convertir, transmettre)

### 3. Stockage d'énergie
- Association de 4 images avec les méthodes de stockage (A, B, C, D)
  - A : Stockage d'eau
  - B : Batterie chimique
  - C : Réserve de graisses
  - D : Stockage de gaz combustible

### 4. La chaîne d'énergie
- Phrases à compléter sur les concepts d'énergie d'entrée/sortie
- Explication de la transformation et du stockage d'énergie

## 🔧 Fonctionnalités

### Protection
- **Mot de passe** : ENERGIE2025 (modifiable dans le code ligne 297)
- 3 tentatives maximum
- Blocage en cas d'échec

### Sauvegarde
- **Collection Firebase** : `fiche_activite_energies`
- Envoi automatique avec timestamp
- Confirmation visuelle après envoi
- Réinitialisation automatique après 3 secondes

### Sécurité
- Confirmation avant fermeture de page (si formulaire modifié)
- Validation des champs obligatoires (Nom et Classe)
- Gestion des erreurs d'envoi

## 🎨 Style et ergonomie

- Design moderne avec couleurs cohérentes
- Responsive (s'adapte aux mobiles et tablettes)
- Mise en évidence des sections importantes
- Boutons d'action clairs et accessibles
- Feedback visuel lors de l'envoi

## 🔄 Modifications possibles

Pour personnaliser le formulaire :

1. **Mot de passe** : Ligne 297
   ```javascript
   const MOT_DE_PASSE = 'ENERGIE2025';
   ```

2. **Collection Firebase** : Ligne 364
   ```javascript
   const docRef = await db.collection('fiche_activite_energies').add(responses);
   ```

3. **Durée d'affichage du message de succès** : Ligne 372
   ```javascript
   setTimeout(() => { ... }, 3000); // 3000 = 3 secondes
   ```

## 📊 Structure des données sauvegardées

Les réponses sont enregistrées avec :
- Identification : nom_eleve, classe
- Timestamp : date_soumission, timestamp
- Toutes les réponses des 4 parties

## ✅ Utilisation

1. Ouvrir le fichier HTML dans un navigateur
2. Entrer le mot de passe : **ENERGIE2025**
3. Remplir les champs (Nom et Classe obligatoires)
4. Compléter les tableaux et questions
5. Cliquer sur "📤 Envoyer mes réponses"
6. Confirmation visuelle de la sauvegarde

## 🔗 Liens utiles

- Formulaire : `fiche-activite-energies.html`
- Firebase Console : https://console.firebase.google.com/project/form-results-b285b
- Collection : `fiche_activite_energies`

---

**Note** : Les images mentionnées dans la partie "Stockage d'énergie" sont représentées par des placeholders. Pour les ajouter, il faut soit :
- Héberger les images en ligne et ajouter les liens `<img src="...">`
- Les encoder en base64 dans le HTML
- Utiliser des icônes ou des emojis pour représenter visuellement les concepts
