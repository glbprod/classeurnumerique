# Séquence 3ème : Systèmes de Protection Automatisés

## Informations générales

**Niveau :** 3ème  
**Durée :** 8-10 séances (12-15h)  
**Discipline :** Technologie  
**Séquences précédentes :** LLM et Intelligence Artificielle / Cybersécurité

---

## Problématique de séquence

**Comment concevoir et programmer un système automatisé capable de détecter, analyser et réagir à une intrusion ou une situation dangereuse ?**

---

## Liens avec les séquences précédentes

- **Cybersécurité** : passage de la protection numérique (données, réseaux) à la protection physique (locaux, personnes)
- **LLM** : logique de décision automatisée, arbre de décision, apprentissage de comportements
- **Continuité conceptuelle** : détection d'anomalies, réponse automatisée, authentification multi-facteurs

---

## Compétences du socle et du programme

### Compétences travaillées

**CT 2.4** - Identifier le(s) matériau(x), les flux d'énergie et d'information sur un objet et décrire les transformations qui s'opèrent

**CT 4.1** - Décrire, en utilisant les outils et langages de descriptions adaptés, le fonctionnement, la structure et le comportement des objets

**CT 5.3** - Exprimer sa pensée à l'aide d'outils de description adaptés : croquis, schémas, graphes, diagrammes, tableaux

**CT 5.6** - Analyser le comportement attendu d'un système réel et décomposer le problème posé en sous-problèmes afin de structurer un programme de commande

**CT 5.7** - Écrire, mettre au point et exécuter un programme

### Domaines du socle

- **Domaine 1** : Les langages pour penser et communiquer
- **Domaine 2** : Les méthodes et outils pour apprendre
- **Domaine 4** : Les systèmes naturels et techniques

---

## Objectifs d'apprentissage

### Savoirs

- Chaîne d'information et chaîne d'énergie dans un système automatisé
- Capteurs et actionneurs : types, fonctions, caractéristiques
- Algorithmes conditionnels et boucles
- Notion de seuil de détection et calibrage
- Principes de l'authentification (code, RFID, biométrie)
- Architecture matérielle d'un système embarqué (microcontrôleur)

### Savoir-faire

- Identifier les composants d'un système de protection
- Programmer des conditions multiples et imbriquées
- Calibrer des capteurs selon un besoin
- Concevoir un algorithme de décision
- Réaliser un schéma fonctionnel
- Tester et déboguer un programme
- Documenter son travail technique

### Savoir-être

- Travailler en équipe sur un projet technique
- Adopter une démarche itérative (essai-erreur-amélioration)
- Développer son esprit critique sur les enjeux de la surveillance

---

## Plan de séquence détaillé

### Séance 1 : Situation problème et analyse de systèmes existants (1h30)

**Activité déclenchante** : Vidéo ou démonstration d'un système d'alarme domestique

**Contenu** :
- Analyse collective : quels sont les composants ? Comment ça fonctionne ?
- Comparaison de différents systèmes : alarme incendie, anti-intrusion, contrôle d'accès
- Introduction du projet : concevoir un système de protection pour la salle de technologie

**Production** : Carte mentale collaborative des systèmes de protection

---

### Séance 2 : Chaîne d'information et d'énergie (1h30)

**Objectif** : Identifier et modéliser les fonctions d'un système automatisé

**Contenu** :
- Rappel : chaîne d'information / chaîne d'énergie
- Application aux systèmes de protection
- Décomposition fonctionnelle : ACQUÉRIR → TRAITER → COMMUNIQUER / ALIMENTER → DISTRIBUER → CONVERTIR

**Production** : Schéma fonctionnel annoté d'un système d'alarme simple

---

### Séance 3-4 : Les capteurs de détection (2 × 1h30)

**Objectif** : Comprendre le fonctionnement des capteurs et leur programmation

**Matériel** : Arduino/micro:bit + capteurs (PIR, ultrason, contact magnétique, température)

**Contenu** :
- Découverte des différents types de capteurs
- Notion de signal analogique / numérique
- Programmation de la lecture de capteurs
- Calibrage et seuils de déclenchement

**Production** : Programme de test pour chaque type de capteur avec affichage des valeurs

---

### Séance 5 : Les actionneurs et signaux d'alerte (1h30)

**Objectif** : Commander des actionneurs pour signaler une intrusion

**Matériel** : Buzzer, LED, servomoteur, module relais

**Contenu** :
- Types d'actionneurs et leurs usages
- Signaux visuels et sonores
- Programmation de séquences d'alerte
- Introduction aux variables et aux boucles

**Production** : Programme créant une sirène avec LED clignotantes

---

### Séance 6 : Algorithmes de décision (1h30)

**Objectif** : Créer des conditions complexes pour gérer différents scénarios

**Contenu** :
- Structures conditionnelles (SI...ALORS...SINON)
- Conditions multiples (ET, OU)
- Arbre de décision et organigramme
- Gestion de différents niveaux d'alerte

**Production** : Organigramme puis programme avec plusieurs niveaux d'alerte selon les capteurs activés

---

### Séance 7 : Authentification et contrôle d'accès (1h30)

**Objectif** : Intégrer un système d'authentification pour désactiver l'alarme

**Contenu** :
- Rappel cybersécurité : authentification forte
- Implémentation d'un code PIN
- Introduction au lecteur RFID (optionnel)
- États du système : armé / désarmé / alerte

**Production** : Programme complet avec authentification par code

---

### Séance 8 : Projet - Conception du système (1h30)

**Objectif** : Concevoir en équipe un système adapté à un cahier des charges

**Organisation** : Groupes de 3-4 élèves

**Contenu** :
- Présentation de 3 scénarios (salle informatique, local matériel, garage à vélos)
- Cahier des charges à respecter
- Phase de conception : schémas, choix des composants, algorithme

**Production** : Dossier de conception (schémas + organigramme + liste matériel)

---

### Séance 9 : Projet - Réalisation et tests (1h30)

**Objectif** : Programmer et tester le système conçu

**Contenu** :
- Programmation du système
- Tests progressifs
- Débogage et amélioration
- Documentation du code

**Production** : Système fonctionnel + carnet de tests

---

### Séance 10 : Présentation et débat (1h30)

**Objectif** : Présenter les réalisations et réfléchir aux enjeux éthiques

**Contenu** :
- Présentation des projets (5 min par groupe)
- Démonstration en conditions réelles
- Débat : surveillance et libertés individuelles, faux positifs, vie privée

**Production** : Grille d'évaluation par les pairs + réflexion écrite individuelle

---

## Évaluation

### Évaluation formative (tout au long de la séquence)
- Observation de la participation et de l'engagement
- Vérification des programmes intermédiaires
- Qualité des schémas et organigrammes

### Évaluation sommative (fin de séquence)
- **Projet de groupe** (60%) : système fonctionnel + dossier technique
- **Compétences de programmation** (30%) : qualité du code, logique, commentaires
- **Présentation orale** (10%) : clarté, vocabulaire technique

---

## Matériel nécessaire

### Par îlot (3-4 élèves)
- 1 carte Arduino Uno ou micro:bit
- 1 capteur PIR (mouvement)
- 1 capteur à ultrason
- 1 capteur de contact magnétique
- 1 buzzer
- 2-3 LED de différentes couleurs
- 1 clavier matriciel 4×4 (optionnel)
- Breadboard, câbles, résistances
- Ordinateur avec logiciel de programmation (Arduino IDE / MakeCode)

### Collectif
- Vidéoprojecteur
- Systèmes d'alarme réels ou maquettes pour démonstration

---

## Différenciation pédagogique

### Pour les élèves en difficulté
- Programmes squelettes à compléter
- Schémas simplifiés pré-remplis
- Tutorat par les pairs
- Objectifs minimum définis

### Pour les élèves avancés
- Ajout de capteurs supplémentaires
- Envoi de notification (SMS/mail simulé)
- Historique des déclenchements (stockage SD)
- Interface de monitoring LCD

---

## Prolongements possibles

- **EPI Physique-Chimie** : étude des signaux électriques, fréquences sonores
- **EPI Mathématiques** : statistiques sur les faux positifs, optimisation d'algorithmes
- **Parcours Avenir** : métiers de la sécurité électronique, installateur alarme
- **EMC** : débat sur surveillance et liberté

---

## Ressources

### Sites et tutoriels
- Arduino.cc - Tutoriels officiels
- Techno-logique.fr - Ressources pédagogiques
- Eduscol - Programmes et ressources Technologie cycle 4

### Vidéos
- "C'est pas sorcier : Les systèmes d'alarme"
- Chaînes YouTube de vulgarisation électronique

### Logiciels
- Arduino IDE (gratuit)
- TinkerCAD Circuits (simulation en ligne)
- Draw.io (schémas)

---

## Réflexion didactique

Cette séquence permet de :
1. **Concrétiser** les apprentissages en cybersécurité par une application physique
2. **Développer** les compétences en programmation de manière progressive
3. **Questionner** les élèves sur les enjeux éthiques de la surveillance
4. **Favoriser** l'autonomie et la démarche de projet

Le lien avec la séquence précédente sur la cybersécurité est explicite : on passe de la protection des données à la protection des espaces, tout en conservant les mêmes logiques (détection d'anomalie, authentification, réponse graduée).