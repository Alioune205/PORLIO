import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from core.models import Project, Poster, SkillCategory, Skill, Profile

print("[*] Nettoyage des anciennes donnees...")
Project.objects.all().delete()
Poster.objects.all().delete()
SkillCategory.objects.all().delete()
Profile.objects.all().delete()

print("[*] Creation du Profil...")
Profile.objects.create(
    hero_title="Construire l'avenir tech du",
    hero_name="Pape Alioune Sene",
    hero_subtitle="Développeur Full-Stack & Designer UX/UI",
    hero_description="Je conçois des applications web et mobiles robustes avec une architecture moderne, orientées impact et expérience utilisateur.",
    about_text="Etudiant en BTS Informatique passionné par le développement d'applications qui ont un véritable sens. Mon approche au sein de PAS Digital Studio fusionne développement robuste et design fonctionnel centrés sur l'utilisateur.\n\nMon ambition ? Participer activement à la souveraineté technologique et au développement socio-économique du Sénégal en créant des solutions innovantes, des registres civils intelligents aux applications e-santé.",
    cv_url="assets/cv-pape-sene.pdf"
)
print("   [OK] Profil cree.")

print("[*] Creation des Competences...")
skills_data = [
    {"name": "Backend", "order": 1, "skills": ["Django REST Framework", "PostgreSQL", "Odoo"]},
    {"name": "Frontend", "order": 2, "skills": ["React", "Angular", "JavaScript", "HTML/CSS"]},
    {"name": "Mobile", "order": 3, "skills": ["Flutter"]},
    {"name": "IA & Data", "order": 4, "skills": ["Groq (Llama 3.3)", "Machine Learning", "Power BI"]},
    {"name": "Outils", "order": 5, "skills": ["Git/GitHub", "Figma", "n8n", "WordPress"]},
    {"name": "Design & Multimedia", "order": 6, "skills": ["Photoshop", "Montage video"]},
]
for cat_data in skills_data:
    cat = SkillCategory.objects.create(name=cat_data["name"], order=cat_data["order"])
    for i, sn in enumerate(cat_data["skills"]):
        Skill.objects.create(category=cat, name=sn, order=i)
    print("   [OK] Categorie '{}' avec {} skills.".format(cat_data["name"], len(cat_data["skills"])))

print("[*] Creation des Projets...")
projects_data = [
    {
        "title": "CFP Abene - Site institutionnel",
        "description": "Conception et developpement (en binome) du site web du Centre de Formation Professionnelle d'Abene : 10 filieres de formation, actualites, formulaire d'inscription, partenaires internationaux, integration cartographique. Projet mene pour un client reel avec cahier des charges complet.",
        "image_url": "assets/project1.png",
        "tags": "WordPress, Elementor, Client reel",
        "client_project": True,
        "order": 1,
    },
    {
        "title": "Teranga Civil / SUNU CIVIL",
        "description": "Plateforme GovTech de registre civil developpee pour les communes senegalaises. Centralisation, securite et accessibilite des donnees civiles pour les agents et les citoyens. Architecture full-stack avec gestion des roles et authentification avancee.",
        "image_url": "assets/project2.png",
        "tags": "GovTech, Django, React",
        "client_project": False,
        "order": 2,
    },
    {
        "title": "DiabetoConseil",
        "description": "Application mobile innovante de conseil sante axee sur le diabete, avec integration d'un assistant intelligent base sur Groq IA (Llama 3.3). Suivi glycemique, conseils personnalises, prise de rendez-vous medical. Interface concue pour etre accessible aux patients senegalais.",
        "image_url": "assets/project3.png",
        "tags": "Mobile Health, Flutter, IA",
        "client_project": False,
        "order": 3,
    },
    {
        "title": "WaxalePay",
        "description": "Portail citoyen interactif pour le suivi transparent des transferts sociaux de l'Etat senegalais (PNBSF, CMU), incluant un Chatbot IA pour accompagner les beneficiaires. Interface intuitive permettant aux citoyens de verifier leur eligibilite et suivre leurs droits.",
        "image_url": "assets/project4.png",
        "tags": "Civic Tech, UI/UX, Chatbot IA",
        "client_project": False,
        "order": 4,
    },
]
for p in projects_data:
    Project.objects.create(**p)
    print("   [OK] Projet '{}' cree.".format(p["title"]))

print("[*] Creation des Posters...")
posters_data = [
    {"title": "Zahra Henna", "image_url": "assets/flyer1.jpg", "order": 1},
    {"title": "MHD Business Apple", "image_url": "assets/flyer2.jpg", "order": 2},
    {"title": "Cafe Touba", "image_url": "assets/flyer3.jpg", "order": 3},
    {"title": "Grand Ziar 2026", "image_url": "assets/flyer4.png", "order": 4},
]
for poster in posters_data:
    Poster.objects.create(**poster)
    print("   [OK] Poster '{}' cree.".format(poster["title"]))

print("")
print("="*40)
print("BASE DE DONNEES PEUPLEE AVEC SUCCES !")
print("="*40)
print("  Profils    : {}".format(Profile.objects.count()))
print("  Categories : {}".format(SkillCategory.objects.count()))
print("  Skills     : {}".format(Skill.objects.count()))
print("  Projets    : {}".format(Project.objects.count()))
print("  Posters    : {}".format(Poster.objects.count()))
print("="*40)
