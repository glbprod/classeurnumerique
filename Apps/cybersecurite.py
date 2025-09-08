#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serious Game Cybersécurité - Collège
Jeu interactif pour sensibiliser aux bonnes pratiques cyber
"""

import random
import time

class CyberSecurityGame:
    def __init__(self):
        self.score = 0
        self.nom_joueur = ""
        self.niveau = 1
        
    def afficher_titre(self):
        print("=" * 60)
        print("🛡️  CYBER-DETECTIVE : Mission Sécurité  🛡️")
        print("=" * 60)
        print("Bienvenue dans votre mission de cybersécurité !")
        print("Vous devez aider à protéger le collège contre les cyberattaques.\n")
        
    def saisir_nom(self):
        self.nom_joueur = input("Entrez votre nom d'agent : ").strip()
        print(f"\nBienvenue Agent {self.nom_joueur} ! 🕵️")
        print("Votre mission : déjouer 5 cybermenaces...\n")
        time.sleep(2)
    
    def scenario_phishing(self):
        print("🎣 SCÉNARIO 1 : Détection de phishing")
        print("-" * 40)
        print("Vous recevez cet email :")
        print("""
        📧 DE: banque@secure-bank-officiel.com
        OBJET: ⚠️ URGENT - Votre compte sera suspendu !
        
        Cher client,
        Votre compte bancaire sera bloqué dans 24h !
        Cliquez vite sur ce lien pour le sauvegarder :
        http://bank-security-update.ru/login
        
        Cordialement,
        L'équipe sécurité
        """)
        
        print("\nQue faites-vous ?")
        print("A) Je clique immédiatement sur le lien")
        print("B) Je vérifie l'adresse email et je contacte ma banque")
        print("C) Je transmets l'email à mes amis")
        
        reponse = input("\nVotre choix (A/B/C) : ").upper().strip()
        
        if reponse == "B":
            print("✅ EXCELLENT ! Vous avez identifié le phishing !")
            print("🔍 Indices détectés : URL suspecte (.ru), urgence artificielle, adresse douteuse")
            self.score += 20
        else:
            print("❌ Piégé ! C'était un email de phishing.")
            print("🔍 Les vrais indices : URL suspecte, pression temporelle, orthographe")
            self.score += 5
        
        time.sleep(3)
    
    def scenario_mot_de_passe(self):
        print("\n🔐 SCÉNARIO 2 : Création de mot de passe")
        print("-" * 40)
        print("Un élève vous demande d'évaluer ses mots de passe :")
        
        mots_de_passe = [
            ("lucas2009", "❌ Trop simple : prénom + année"),
            ("Chat123!", "⚠️ Moyen : mot courant + chiffres"),
            ("J'adore3Sports&Musique!", "✅ Excellent : phrase + variété"),
            ("123456789", "❌ Très dangereux : suite de chiffres")
        ]
        
        for i, (mdp, evaluation) in enumerate(mots_de_passe, 1):
            print(f"{i}. {mdp}")
        
        print("\nQuel est le MEILLEUR mot de passe ?")
        choix = input("Votre choix (1/2/3/4) : ").strip()
        
        if choix == "3":
            print("✅ PARFAIT ! Le mot de passe 3 est le plus sécurisé.")
            print("🔑 Il contient : phrase personnelle, chiffres, symboles, 8+ caractères")
            self.score += 20
        else:
            print("❌ Pas optimal ! Le mot de passe 3 était le meilleur choix.")
            print("🔑 Règles : 8+ caractères, majuscules, minuscules, chiffres, symboles")
            self.score += 5
            
        # Affichage des évaluations
        print("\n📊 Évaluations détaillées :")
        for i, (mdp, evaluation) in enumerate(mots_de_passe, 1):
            print(f"{i}. {mdp} → {evaluation}")
        
        time.sleep(4)
    
    def scenario_reseaux_sociaux(self):
        print("\n📱 SCÉNARIO 3 : Paramètres de confidentialité")
        print("-" * 40)
        print("Sarah configure son profil sur un nouveau réseau social.")
        print("Quels paramètres conseillez-vous ?")
        
        questions = [
            ("Géolocalisation des photos ?", ["Activée pour tous", "Désactivée", "Amis seulement"], 1),
            ("Profil visible par ?", ["Tout le monde", "Amis seulement", "Amis d'amis"], 1),
            ("Partager son numéro ?", ["Oui, dans le profil", "Non, jamais", "Avec quelques amis"], 1)
        ]
        
        bonnes_reponses = 0
        for question, options, bonne_reponse in questions:
            print(f"\n❓ {question}")
            for i, option in enumerate(options):
                print(f"{i+1}. {option}")
            
            choix = int(input("Votre choix : ")) - 1
            if choix == bonne_reponse:
                print("✅ Bonne réponse !")
                bonnes_reponses += 1
            else:
                print(f"❌ Mieux vaut : {options[bonne_reponse]}")
        
        if bonnes_reponses == 3:
            print("\n🏆 PARFAIT ! Sarah sera bien protégée !")
            self.score += 20
        elif bonnes_reponses >= 2:
            print(f"\n👍 Bien ! {bonnes_reponses}/3 bonnes réponses.")
            self.score += 15
        else:
            print(f"\n⚠️ À améliorer ! {bonnes_reponses}/3 bonnes réponses.")
            self.score += 5
        
        time.sleep(3)
    
    def scenario_wifi_public(self):
        print("\n📶 SCÉNARIO 4 : WiFi public")
        print("-" * 40)
        print("Vous êtes dans un café avec un WiFi gratuit 'WiFi_Gratuit_Cafe'")
        print("Que pouvez-vous faire EN SÉCURITÉ ?")
        
        print("A) Consulter mes réseaux sociaux")
        print("B) Faire des achats en ligne")
        print("C) Vérifier mon compte bancaire")
        print("D) Regarder des vidéos")
        
        reponse = input("\nChoix sûrs (A/B/C/D) - plusieurs réponses possibles : ").upper().strip()
        
        reponses_sures = ['A', 'D']
        reponses_dangereuses = ['B', 'C']
        
        score_scenario = 0
        if any(r in reponse for r in reponses_sures) and not any(r in reponse for r in reponses_dangereuses):
            print("✅ TRÈS BIEN ! Vous évitez les activités sensibles.")
            score_scenario = 20
        elif any(r in reponse for r in reponses_dangereuses):
            print("❌ ATTENTION ! Évitez les transactions sensibles sur WiFi public.")
            score_scenario = 5
        else:
            print("⚠️ Partiellement correct.")
            score_scenario = 10
            
        print("\n🛡️ Règle : Sur WiFi public, évitez les données sensibles (banque, achats)")
        self.score += score_scenario
        time.sleep(3)
    
    def scenario_telechargement(self):
        print("\n💾 SCÉNARIO 5 : Téléchargement suspect")
        print("-" * 40)
        print("Un popup apparaît : 'Votre ordinateur est infecté ! Téléchargez ce super antivirus gratuit !'")
        print("Le lien : http://antivirus-gratuit-efficace.download-now.tk")
        
        print("\nQuelle est votre réaction ?")
        print("A) Je télécharge immédiatement")
        print("B) Je ferme le popup et j'ignore")
        print("C) Je clique pour voir ce que c'est")
        print("D) Je partage le lien à mes amis")
        
        reponse = input("\nVotre choix (A/B/C/D) : ").upper().strip()
        
        if reponse == "B":
            print("✅ PARFAIT ! Vous avez évité un piège classique !")
            print("🚨 Signaux d'alerte : popup agressif, extension .tk suspecte, promesses trop belles")
            self.score += 20
        else:
            print("❌ Piégé ! C'était probablement un malware.")
            print("🚨 Règle : Ne jamais télécharger depuis des popups ou sites douteux")
            self.score += 5
        
        time.sleep(3)
    
    def calculer_niveau(self):
        if self.score >= 90:
            return "🥇 EXPERT CYBER", "Félicitations ! Vous êtes un vrai cyber-détective !"
        elif self.score >= 70:
            return "🥈 AGENT CONFIRMÉ", "Très bien ! Quelques révisions et vous serez expert."
        elif self.score >= 50:
            return "🥉 APPRENTI AGENT", "Bon début ! Continuez à vous former."
        else:
            return "📚 STAGIAIRE", "Il faut encore étudier les bases de la cybersécurité."
    
    def afficher_resultats(self):
        print("\n" + "=" * 60)
        print("🏁 MISSION TERMINÉE ! 🏁")
        print("=" * 60)
        
        niveau, message = self.calculer_niveau()
        
        print(f"Agent {self.nom_joueur}")
        print(f"Score final : {self.score}/100 points")
        print(f"Niveau atteint : {niveau}")
        print(f"Message : {message}")
        
        print("\n📚 RÉCAPITULATIF DES LEÇONS :")
        print("🎣 Phishing : Vérifiez toujours l'expéditeur et les liens")
        print("🔐 Mots de passe : 8+ caractères variés et uniques")
        print("📱 Réseaux sociaux : Paramètres privés et infos limitées")
        print("📶 WiFi public : Pas de données sensibles")
        print("💾 Téléchargements : Sources officielles uniquement")
        
        print("\n🎯 Continuez à vous former en cybersécurité !")
    
    def jouer(self):
        self.afficher_titre()
        self.saisir_nom()
        
        # Lancement des 5 scénarios
        print("🚀 Début de la mission...\n")
        
        self.scenario_phishing()
        self.scenario_mot_de_passe()
        self.scenario_reseaux_sociaux()
        self.scenario_wifi_public()
        self.scenario_telechargement()
        
        self.afficher_resultats()

def main():
    print("Chargement du jeu...")
    time.sleep(1)
    
    jeu = CyberSecurityGame()
    jeu.jouer()
    
    print("\n🔄 Voulez-vous rejouer ? (o/n)")
    if input().lower().startswith('o'):
        main()
    else:
        print("👋 Merci d'avoir joué ! Restez vigilants en ligne !")

if __name__ == "__main__":
    main()
