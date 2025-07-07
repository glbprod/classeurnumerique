// assets/js/navigation.js - Système de navigation pour toutes les pages

class TechnoNavigation {
    constructor() {
        this.baseUrl = 'https://latechnologieaucollege.netlify.app';
        this.currentPath = window.location.pathname;
        this.init();
    }

    init() {
        this.createNavigation();
        this.createBreadcrumb();
        this.addNavigationEvents();
    }

    // Navigation principale
    createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'techno-nav';
        nav.innerHTML = `
            <div class="nav-container">
                <div class="nav-brand">
                    <a href="${this.baseUrl}/" class="brand-link">
                        🔧 Technologie Collège
                    </a>
                </div>
                
                <div class="nav-menu" id="nav-menu">
                    <div class="nav-section">
                        <h4>📚 Programme</h4>
                        <a href="${this.baseUrl}/" class="nav-link">Vue d'ensemble</a>
                        <a href="${this.baseUrl}/pages/themes/" class="nav-link">Les 3 Thèmes</a>
                        <a href="${this.baseUrl}/pages/niveaux/" class="nav-link">Niveaux 5ème-3ème</a>
                    </div>
                    
                    <div class="nav-section">
                        <h4>🎯 Séquences</h4>
                        <a href="${this.baseUrl}/pages/sequences/" class="nav-link">Toutes les séquences</a>
                        <a href="${this.baseUrl}/pages/sequences/sequence-1-reseaux-sociaux.html" class="nav-link">Réseaux Sociaux & IA</a>
                        <a href="${this.baseUrl}/pages/sequences/sequence-2-bonnes-pratiques.html" class="nav-link">Bonnes Pratiques</a>
                        <a href="${this.baseUrl}/pages/sequences/sequence-3-impression-3d.html" class="nav-link">Impression 3D</a>
                        <a href="${this.baseUrl}/pages/sequences/sequence-4-reparabilite.html" class="nav-link">Réparabilité</a>
                    </div>
                    
                    <div class="nav-section">
                        <h4>📖 Ressources</h4>
                        <a href="${this.baseUrl}/pages/ressources/pour-eleves.html" class="nav-link">Pour les élèves</a>
                        <a href="${this.baseUrl}/pages/ressources/pour-enseignants.html" class="nav-link">Pour les enseignants</a>
                        <a href="${this.baseUrl}/pages/ressources/pour-parents.html" class="nav-link">Pour les parents</a>
                    </div>
                    
                    <div class="nav-section">
                        <h4>🛠️ Outils</h4>
                        <a href="${this.baseUrl}/pages/outils/evaluation.html" class="nav-link">Évaluation</a>
                        <a href="${this.baseUrl}/pages/outils/progressions.html" class="nav-link">Progressions</a>
                        <a href="${this.baseUrl}/pages/outils/activites.html" class="nav-link">Activités</a>
                    </div>
                </div>
                
                <button class="nav-toggle" id="nav-toggle">
                    <span></span><span></span><span></span>
                </button>
            </div>
        `;

        // Insérer la navigation en haut de la page
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Marquer le lien actuel
        this.highlightCurrentPage();
    }

    // Fil d'Ariane
    createBreadcrumb() {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'breadcrumb';
        
        const pathSegments = this.currentPath.split('/').filter(segment => segment);
        let currentPath = '';
        
        let breadcrumbHTML = `<a href="${this.baseUrl}/" class="breadcrumb-link">🏠 Accueil</a>`;
        
        pathSegments.forEach((segment, index) => {
            currentPath += '/' + segment;
            
            if (index === pathSegments.length - 1 && segment.includes('.html')) {
                // Dernier élément (page actuelle)
                const pageName = this.getPageName(segment);
                breadcrumbHTML += ` <span class="breadcrumb-separator">→</span> <span class="breadcrumb-current">${pageName}</span>`;
            } else {
                // Dossier intermédiaire
                const folderName = this.getFolderName(segment);
                breadcrumbHTML += ` <span class="breadcrumb-separator">→</span> <a href="${this.baseUrl}${currentPath}/" class="breadcrumb-link">${folderName}</a>`;
            }
        });
        
        breadcrumb.innerHTML = breadcrumbHTML;
        
        // Insérer après la navigation
        const nav = document.querySelector('.techno-nav');
        nav.insertAdjacentElement('afterend', breadcrumb);
    }

    // Événements de navigation
    addNavigationEvents() {
        // Toggle menu mobile
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.techno-nav')) {
                navMenu?.classList.remove('active');
                navToggle?.classList.remove('active');
            }
        });
    }

    // Utilitaires
    highlightCurrentPage() {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.pathname === this.currentPath) {
                link.classList.add('active');
            }
        });
    }

    getPageName(filename) {
        const names = {
            'index.html': 'Accueil',
            'sequence-1-reseaux-sociaux.html': 'Réseaux Sociaux & IA',
            'sequence-2-bonnes-pratiques.html': 'Bonnes Pratiques',
            'sequence-3-impression-3d.html': 'Impression 3D',
            'sequence-4-reparabilite.html': 'Réparabilité',
            'theme-1-usages.html': 'Usages et Interactions',
            'theme-2-fonctionnement.html': 'Fonctionnement',
            'theme-3-creation.html': 'Création et Innovation',
            'cinquieme.html': '5ème - Découverte',
            'quatrieme.html': '4ème - Approfondissement',
            'troisieme.html': '3ème - Expertise',
            'pour-eleves.html': 'Ressources Élèves',
            'pour-enseignants.html': 'Ressources Enseignants',
            'pour-parents.html': 'Ressources Parents',
            'evaluation.html': 'Outils d\'Évaluation',
            'progressions.html': 'Aide aux Progressions',
            'activites.html': 'Banque d\'Activités'
        };
        return names[filename] || filename.replace('.html', '').replace(/-/g, ' ');
    }

    getFolderName(folder) {
        const names = {
            'pages': 'Pages',
            'sequences': 'Séquences',
            'themes': 'Thèmes',
            'niveaux': 'Niveaux',
            'ressources': 'Ressources',
            'outils': 'Outils'
        };
        return names[folder] || folder.charAt(0).toUpperCase() + folder.slice(1);
    }
}

// CSS pour la navigation
const navStyles = `
<style>
.techno-nav {
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
}

.nav-brand .brand-link {
    color: white;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    gap: 30px;
    align-items: center;
}

.nav-section {
    position: relative;
}

.nav-section h4 {
    color: white;
    margin: 0 0 5px 0;
    font-size: 0.9em;
    opacity: 0.8;
    white-space: nowrap;
}

.nav-link {
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: block;
    font-size: 0.9em;
    white-space: nowrap;
}

.nav-link:hover, .nav-link.active {
    background: rgba(255,255,255,0.2);
    color: white;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.nav-toggle span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.breadcrumb {
    background: rgba(102, 126, 234, 0.1);
    padding: 10px 20px;
    font-size: 0.9em;
    max-width: 1200px;
    margin: 0 auto;
}

.breadcrumb-link {
    color: #667eea;
    text-decoration: none;
}

.breadcrumb-link:hover {
    text-decoration: underline;
}

.breadcrumb-separator {
    margin: 0 8px;
    color: #999;
}

.breadcrumb-current {
    color: #333;
    font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 60px;
        left: -100%;
        width: 80%;
        height: calc(100vh - 60px);
        background: linear-gradient(135deg, #667eea, #764ba2);
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        transition: left 0.3s ease;
        overflow-y: auto;
        gap: 20px;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-toggle {
        display: flex;
    }
    
    .nav-section {
        width: 100%;
    }
    
    .nav-link {
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        width: 100%;
    }
}
</style>
`;

// Injection du CSS
document.head.insertAdjacentHTML('beforeend', navStyles);

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    new TechnoNavigation();
});

// Export pour utilisation manuelle si besoin
window.TechnoNavigation = TechnoNavigation;
