# Plan d'implémentation : Animations Thématiques & Performances (Three.js)

Ce document décrit la stratégie pour intégrer les 4 nouvelles animations demandées tout en garantissant des performances optimales sur mobile et desktop.

## User Review Required

> [!IMPORTANT]
> **Cartographie du Hero (Sénégal/Afrique)** : Sans fichier externe SVG ou modèle 3D importé (.gltf), générer une carte réaliste en code pur est complexe. Je propose de générer un **réseau filaire géométrique abstraite (Wireframe Network)** avec des points nodaux (Dakar, Thiès, Ziguinchor, Saint-Louis) connectés par des lignes lumineuses. Cela maintient des performances très élevées tout en respectant l'esthétique "civic-tech". Êtes-vous d'accord avec cette approche ?

> [!WARNING]
> **Gestion Mobile (<768px)** : Conformément à votre demande, les scènes 3D (Hero et About) seront désactivées sur mobile pour préserver la batterie. L'effet Hero se transformera en éléments CSS (particules CSS), et le Laptop de la section "À Propos" ne sera pas instancié.

## Proposed Changes

### `main.js` (Logique Globale et 3D)

[MODIFY] `main.js`
- **Système d'IntersectionObserver** : Mise en place d'un observateur global qui détectera la visibilité des sections `#hero` et `#about`.
- **Boucle de rendu optimisée** : Au lieu d'avoir un `requestAnimationFrame` qui tourne en permanence, le rendu de chaque scène ne s'exécutera que si la section correspondante est visible dans le viewport (`isHeroVisible`, `isAboutVisible`).
- **Scène 3D Hero (Refonte)** : Suppression de l'icosaèdre. Création d'un groupe Three.js contenant des points (villes clés) et des lignes (connexions) avec un effet de pulsation lumineuse sur les sommets.
- **Scène 3D À Propos (Nouvelle)** : Création d'une fonction d'initialisation pour un laptop stylisé composé de primitives `THREE.BoxGeometry`, avec animation de flottement.
- **Effet Terminal** : Ajout d'une fonction `initTypewriterEffect()` qui boucle sur des phrases définies avec un curseur clignotant.

### `index.html` (Structure DOM)

[MODIFY] `index.html`
- **Hero** : Pas de grand changement, le canvas `canvas3d` est déjà là.
- **À Propos** : Ajout d'un `<div class="about-3d-container" aria-hidden="true"><canvas id="canvas-about"></canvas></div>`.
- **Compétences** : Ajout du conteneur `<div class="skills-bg-icons" aria-hidden="true">...</div>` contenant 5 SVGs stylisés (React, Django, Flutter, Postgres, Git).
- **Contact** : Ajout d'un bloc terminal `<div class="terminal-widget">...</div>` pour dynamiser la section.

### `style.css` (Styles des nouveaux éléments)

[MODIFY] `style.css`
- **Skills Background** : Styles pour les icônes flottantes (`position: absolute`, animations `@keyframes float`, opacité réduite).
- **Terminal Widget** : Reproduction de l'esthétique d'une fenêtre de terminal macOS (3 points ronds colorés), typographie monospace, couleurs syntaxiques (`.cmd`, `.path`, `.success`).
- **Responsive** : Ajout des règles `@media (max-width: 768px)` pour masquer/remplacer le canvas 3D par des alternatives CSS.

## Verification Plan

### Manual Verification
1. Scroller sur la page et vérifier avec les outils de développement (Performance tab) que la charge CPU/GPU chute lorsque le Hero et la section À Propos sont hors du viewport.
2. Vérifier visuellement le laptop 3D et le réseau du Hero.
3. Redimensionner la fenêtre à moins de 768px pour confirmer la désactivation de la 3D.
4. Confirmer que le texte du Terminal s'efface et se réécrit correctement.
