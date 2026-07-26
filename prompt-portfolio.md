# Prompt — Portfolio Développeur Full-Stack (Pape Alioune)

> À coller tel quel dans un outil IA de génération de code (Claude, v0, Lovable, Bolt...) ou à donner à un développeur.

---

## 🎯 Contexte du projet

Créer un **portfolio web professionnel, moderne et animé**, en s'inspirant du style visuel et des animations du site institutionnel **New Deal Technologique** (newdealtechnologique.sn) : esthétique tech/civic-tech sénégalaise, sobre, dynamique au scroll, avec des transitions fluides.

Le portfolio doit présenter **Pape Alioune**, étudiant en formation BTS (2 ans) à l'ISEPD (Institut Supérieur d'Enseignement Professionnel de Diamnadio), filière **Analyse de Performance Digitale (APD)**, développeur full-stack basé au Sénégal, spécialisé dans les solutions civic-tech pour les services publics sénégalais.

---

## 🛠️ Stack technique imposée

- **React** (Vite) + **Tailwind CSS**
- **Framer Motion** pour toutes les animations (scroll reveal, transitions de page, hover)
- **Lucide React** pour les icônes
- Design **responsive mobile-first**
- Un seul fichier par composant, code propre et commenté
- Palette de couleurs : dégradés sombres avec accents vifs (bleu électrique / vert / or), rappelant l'identité visuelle tech-institutionnelle sénégalaise (tu peux aussi t'inspirer du vert/or/navy déjà utilisé sur mon projet Téranga Civil)

---

## 🎬 Animations attendues (inspiration New Deal Technologique)

1. **Hero section** :
   - Fond avec dégradé animé ou particules/formes géométriques en mouvement lent (parallax léger au scroll ou au mouvement de souris)
   - Titre et sous-titre en fade-in + slide-up séquencé (stagger)
   - Bouton CTA avec effet hover magnétique ou glow

2. **Navigation sticky** :
   - Barre de navigation fixe qui devient semi-transparente avec effet blur (`backdrop-blur`) au scroll
   - Soulignement animé au survol des liens

3. **Scroll reveal** :
   - Chaque section (À propos, Compétences, Projets, Expérience, Contact) apparaît en fade-in + slide-up quand elle entre dans le viewport (utiliser `whileInView` de Framer Motion)

4. **Compteurs animés** :
   - Statistiques clés (nombre de projets, technologies maîtrisées, années d'expérience) qui s'incrémentent visuellement quand la section devient visible

5. **Cartes projets interactives** :
   - Effet hover avec légère élévation (translateY + shadow), zoom léger sur l'image/icône, overlay avec description qui apparaît en fondu

6. **Bandeau technologies (marquee)** :
   - Défilement horizontal infini et fluide des logos/technologies maîtrisées (React, Django, Flutter, PostgreSQL, etc.)

7. **Transitions entre sections** :
   - Smooth scroll natif (`scroll-behavior: smooth`)
   - Séparateurs de section avec formes SVG (vagues, diagonales) façon site institutionnel

8. **Micro-interactions** :
   - Curseur personnalisé optionnel (point qui suit la souris avec effet de traînée léger) — à activer seulement sur desktop
   - Boutons avec effet ripple ou scale au clic

---

## 📄 Structure des sections

### 1. Hero
- Nom : **Pape Alioune**
- Titre : *Développeur Full-Stack | Étudiant en Analyse de Performance Digitale (APD) — ISEPD*
- Accroche courte : ex. *« Je conçois des solutions numériques pour moderniser les services publics sénégalais. »*
- CTA : « Voir mes projets » + « Me contacter »

### 2. À propos
- Étudiant en formation BTS (2 ans) à l'ISEPD (Diamnadio), filière Analyse de Performance Digitale
- Développeur full-stack : Django REST Framework, React, Flutter, PostgreSQL
- Compétences complémentaires : UI/UX, data science, cloud (Azure)
- Passionné par la civic-tech et les solutions numériques pour les services publics sénégalais

### 3. Compétences (avec icônes + barres ou badges animés)
- **Backend** : Django, Django REST Framework, PostgreSQL, PostGIS
- **Frontend** : React, Tailwind CSS, Recharts
- **Mobile** : Flutter
- **Cloud & Infra** : Microsoft Azure
- **Autres** : Machine Learning (scikit-learn), UX/UI Design, WebSockets, PWA offline (Service Worker, Dexie.js/IndexedDB)

### 4. Projets phares (cartes avec description + stack + éventuel lien/capture)

1. **Téranga Civil** (alias Sunu Territoire) — Registre d'état civil numérique du Sénégal
   - Plateforme de gestion de l'état civil : génération de certificats officiels (naissance, mariage) avec QR code et hash d'intégrité SHA-256, architecture PWA offline-first (Service Worker, synchronisation en arrière-plan), tableau de bord Super Admin avec cartographie (Leaflet/OpenStreetMap) et statistiques (Recharts)
   - Stack : Django, React, PostgreSQL, Dexie.js/IndexedDB

2. **Jappo Dundu** — Plateforme de coordination des urgences médicales pour le Ministère de la Santé (MSAS)
   - Gestion en temps réel des stocks de sang, lits d'hôpitaux et dispatch d'ambulances, avec module de prédiction par Machine Learning
   - Stack : Django REST Framework, React, PostgreSQL/PostGIS, WebSockets, ML

3. **Application santé mobile avec agent conversationnel IA**
   - Application mobile destinée aux utilisateurs ouest-africains, avec assistant IA (texte + vocal) pour l'accompagnement d'une condition de santé chronique
   - Stack : Flutter, IA conversationnelle

4. **WaxalëPay** — Plateforme de gestion des transferts sociaux sénégalais
   - Authentification JWT, modèle utilisateur basé sur le NIN, tableau de bord React avec routage par rôle
   - Stack : Django, React, JWT (simplejwt)

5. **MUTSAEMSS** — Système de gestion de mutuelle
   - Charte de marque complète + système de gestion d'adhésion (candidature → paiement → validation admin), intégration Wave/Orange Money
   - Stack : Django

6. **Projet de fin d'études — Générateur d'images par IA**
   - Application web fonctionnelle de génération d'images à partir de prompts textuels (Hugging Face FLUX.1-schnell)
   - Stack : React, API Hugging Face

### 5. Expérience académique complémentaire
- Coursework Cloud Computing & Azure (concept maps, org structures, régions souveraines)
- Rapport de recherche en Deep Learning (reconnaissance faciale — FaceNet, DeepFace, ArcFace)
- Projet Machine Learning de prédiction de maladie cardiaque (Logistic Regression, Random Forest, KNN) avec application Django complète

### 6. Contact
- Formulaire de contact animé (focus states, validation en douceur)
- Liens : email, GitHub, LinkedIn (à personnaliser)
- Localisation : Sénégal

---

## ✅ Exigences finales

- Code **production-ready**, sans placeholder à moitié fait
- Toutes les animations doivent être fluides (60fps), pas de saccades
- Accessible (contrastes suffisants, navigation clavier possible)
- Un seul fichier livré prêt à l'emploi (ou structure de composants claire si demandé)
- Prévoir une variante mobile où le curseur personnalisé et les effets parallax lourds sont désactivés
