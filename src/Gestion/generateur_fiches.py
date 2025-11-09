#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Générateur automatique de fiches d'activité
Lit un fichier CSV et génère des fiches d'activité HTML complètes
"""

import csv
import os
from datetime import datetime

def generer_fiche_html(data, numero_fiche=1):
    """
    Génère une fiche d'activité HTML à partir des données CSV
    
    Args:
        data (dict): Dictionnaire contenant les données de la fiche
        numero_fiche (int): Numéro de la fiche générée
    
    Returns:
        str: Code HTML de la fiche d'activité
    """
    
    html_template = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche d'Activité - {data['objetSysteme']}</title>
    
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }}

        .container {{
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }}

        .header {{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3498db;
        }}

        .header-left {{
            flex: 1;
        }}

        .header-right {{
            text-align: center;
        }}

        .college-title {{
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }}

        .logo-placeholder {{
            width: 150px;
            height: 150px;
            background-color: #ecf0f1;
            border: 2px solid #3498db;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
        }}

        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2em;
        }}

        .info-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }}

        .info-item {{
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }}

        .info-label {{
            font-weight: bold;
            color: #7f8c8d;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }}

        .info-value {{
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
        }}

        .field {{
            margin-bottom: 25px;
        }}

        .field-label {{
            font-weight: bold;
            color: #34495e;
            margin-bottom: 10px;
            font-size: 15px;
            display: block;
        }}

        .field-content {{
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #95a5a6;
            line-height: 1.8;
        }}

        .section {{
            background-color: #ecf0f1;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 25px;
            border-left: 5px solid #3498db;
        }}

        .section-title {{
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .section-content {{
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            line-height: 1.8;
            white-space: pre-wrap;
        }}

        .conclusion {{
            border-left-color: #27ae60;
        }}

        .conclusion .section-title {{
            color: #27ae60;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }}

        th, td {{
            border: 2px solid #34495e;
            padding: 12px;
            text-align: left;
        }}

        th {{
            background-color: #34495e;
            color: white;
        }}

        .footer {{
            text-align: center;
            margin-top: 30px;
            color: #7f8c8d;
            font-size: 12px;
            padding-top: 20px;
            border-top: 2px solid #ecf0f1;
        }}

        .generated-badge {{
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 11px;
            margin-top: 10px;
        }}

        strong {{
            color: #2c3e50;
        }}

        ul, ol {{
            margin-left: 25px;
            margin-top: 10px;
        }}

        li {{
            margin-bottom: 8px;
        }}

        @media print {{
            body {{
                background: white;
                padding: 0;
            }}
            
            .container {{
                box-shadow: none;
                max-width: 100%;
                padding: 20mm;
            }}
        }}

        @page {{
            size: A4;
            margin: 20mm;
        }}
    </style>
</head>
<body>
    <div class="container">
        <!-- En-tête -->
        <div class="header">
            <div class="header-left">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Classe</div>
                        <div class="info-value">{data['classe']}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Séquence n°</div>
                        <div class="info-value">{data['sequence']}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Séance n°</div>
                        <div class="info-value">{data['seance']}</div>
                    </div>
                </div>
            </div>
            
            <div class="header-right">
                <div class="college-title">Collège Moulin à Vent</div>
                <div class="logo-placeholder">🏫</div>
            </div>
        </div>

        <h1>Fiche d'Activité</h1>

        <!-- Objet Système Technique -->
        <div class="field">
            <span class="field-label">📦 Objet Système Technique</span>
            <div class="field-content">
                <strong>{data['objetSysteme']}</strong>
            </div>
        </div>

        <!-- Problématique -->
        <div class="field">
            <span class="field-label">❓ Problématique</span>
            <div class="field-content">
                {data['problematique']}
            </div>
        </div>

        <!-- Travail demandé -->
        <div class="field">
            <span class="field-label">📋 Travail demandé - Résumé des activités</span>
            <div class="field-content">
                {data['travailDemande']}
            </div>
        </div>

        <!-- Activité 1 -->
        <div class="section">
            <div class="section-title">
                📝 Activité 1
            </div>
            <div class="section-content">
{data['activite1']}
            </div>
        </div>

        <!-- Activité 2 -->
        <div class="section">
            <div class="section-title">
                🔍 Activité 2
            </div>
            <div class="section-content">
{data['activite2']}
            </div>
        </div>

        <!-- Conclusion / Réalisation -->
        <div class="section conclusion">
            <div class="section-title">
                ✅ Conclusion ou Réalisation
            </div>
            <div class="section-content">
{data['conclusion']}
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div>Collège Moulin à vent – Technologie au collège</div>
            <div class="generated-badge">
                🤖 Fiche générée automatiquement le {datetime.now().strftime('%d/%m/%Y à %H:%M')}
            </div>
        </div>
    </div>
</body>
</html>"""
    
    return html_template


def lire_csv_et_generer_fiches(fichier_csv, dossier_sortie='fiches_generees'):
    """
    Lit le fichier CSV et génère une fiche HTML pour chaque ligne
    
    Args:
        fichier_csv (str): Chemin vers le fichier CSV
        dossier_sortie (str): Dossier où sauvegarder les fiches générées
    """
    
    # Créer le dossier de sortie s'il n'existe pas
    if not os.path.exists(dossier_sortie):
        os.makedirs(dossier_sortie)
    
    # Lire le CSV
    with open(fichier_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        fiches_generees = []
        
        for i, row in enumerate(reader, 1):
            print(f"📝 Génération de la fiche {i}...")
            print(f"   Classe: {row['classe']}")
            print(f"   Objet: {row['objetSysteme']}")
            
            # Générer le HTML
            html_content = generer_fiche_html(row, i)
            
            # Créer le nom de fichier
            nom_fichier = f"fiche-activite-seq{row['sequence']}-seance{row['seance']}-{row['classe']}.html"
            nom_fichier = nom_fichier.replace(' ', '-').replace('è', 'e')
            chemin_complet = os.path.join(dossier_sortie, nom_fichier)
            
            # Sauvegarder le fichier
            with open(chemin_complet, 'w', encoding='utf-8') as output:
                output.write(html_content)
            
            fiches_generees.append({
                'numero': i,
                'fichier': nom_fichier,
                'classe': row['classe'],
                'objet': row['objetSysteme']
            })
            
            print(f"   ✅ Sauvegardée : {nom_fichier}\n")
    
    return fiches_generees


def generer_index_html(fiches_generees, dossier_sortie='fiches_generees'):
    """
    Génère une page index.html listant toutes les fiches générées
    
    Args:
        fiches_generees (list): Liste des fiches générées
        dossier_sortie (str): Dossier de sortie
    """
    
    fiches_html = ""
    for fiche in fiches_generees:
        fiches_html += f"""
        <div class="fiche-card">
            <div class="fiche-numero">Fiche #{fiche['numero']}</div>
            <h3>{fiche['objet']}</h3>
            <p><strong>Classe :</strong> {fiche['classe']}</p>
            <a href="{fiche['fichier']}" class="btn-view">📄 Voir la fiche</a>
        </div>
        """
    
    index_html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index des Fiches d'Activité Générées</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }}
        
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 40px;
        }}
        
        .stats {{
            background: #ecf0f1;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }}
        
        .stats-number {{
            font-size: 48px;
            font-weight: bold;
            color: #3498db;
        }}
        
        .fiches-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }}
        
        .fiche-card {{
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border-left: 5px solid #3498db;
            transition: transform 0.3s, box-shadow 0.3s;
        }}
        
        .fiche-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }}
        
        .fiche-numero {{
            background: #3498db;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            display: inline-block;
            margin-bottom: 10px;
        }}
        
        .fiche-card h3 {{
            color: #2c3e50;
            margin: 10px 0;
        }}
        
        .fiche-card p {{
            color: #7f8c8d;
            margin: 10px 0;
        }}
        
        .btn-view {{
            display: inline-block;
            background: #27ae60;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
            transition: background 0.3s;
        }}
        
        .btn-view:hover {{
            background: #229954;
        }}
        
        .footer {{
            text-align: center;
            margin-top: 40px;
            color: #7f8c8d;
            font-size: 12px;
        }}
        
        .badge {{
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 11px;
            margin-top: 10px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Fiches d'Activité Générées Automatiquement</h1>
        
        <div class="stats">
            <div class="stats-number">{len(fiches_generees)}</div>
            <div>fiche{'s' if len(fiches_generees) > 1 else ''} générée{'s' if len(fiches_generees) > 1 else ''}</div>
            <div class="badge">Générées le {datetime.now().strftime('%d/%m/%Y à %H:%M')}</div>
        </div>
        
        <div class="fiches-grid">
            {fiches_html}
        </div>
        
        <div class="footer">
            <p>Collège Moulin à vent – Technologie au collège</p>
            <p>Générateur automatique de fiches d'activité</p>
        </div>
    </div>
</body>
</html>"""
    
    chemin_index = os.path.join(dossier_sortie, 'index.html')
    with open(chemin_index, 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print(f"📑 Index généré : {chemin_index}")


def main():
    """Fonction principale"""
    print("🚀 Générateur de Fiches d'Activité")
    print("=" * 50)
    
    fichier_csv = 'fiches-activites-exemple.csv'
    
    if not os.path.exists(fichier_csv):
        print(f"❌ Erreur : Le fichier {fichier_csv} n'existe pas !")
        print(f"   Assurez-vous que le fichier CSV est dans le même dossier.")
        return
    
    print(f"📂 Lecture du fichier : {fichier_csv}\n")
    
    # Générer les fiches
    fiches = lire_csv_et_generer_fiches(fichier_csv)
    
    # Générer l'index
    generer_index_html(fiches)
    
    print("\n" + "=" * 50)
    print(f"✅ {len(fiches)} fiche(s) générée(s) avec succès !")
    print(f"📁 Dossier : fiches_generees/")
    print(f"🌐 Ouvrez 'fiches_generees/index.html' pour voir toutes les fiches")


if __name__ == "__main__":
    main()
