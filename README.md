# Portfolio Maxime Devillet

Portfolio personnel bilingue (FR/EN) développé avec HTML, CSS et JavaScript vanilla. Optimisé pour GitHub Pages avec support complet de l'internationalisation et architecture modulaire.

## ✨ Fonctionnalités

- **🌍 Support bilingue** — Interface complète en français et anglais avec persistance du choix
- **📱 Design responsive** — Interface moderne compatible mobile/desktop
- **🎯 Navigation par catégories** — Carrousels séparés pour projets d'étude et projets personnels
- **📄 Pages projet détaillées** — Documentation technique complète pour chaque projet
- **🖼️ Gestion d'assets** — Images optimisées et rapports PDF intégrés
- **⚡ Performance optimisée** — Site statique, chargement rapide, compatible GitHub Pages

## 🏗️ Structure du projet

```
Portfolio/
├── index.html              # Page d'accueil principale
├── styles.css              # Styles principaux
├── script.js               # Logique JavaScript (carrousels, i18n)
├── project-page.js         # Script pour pages de projets
├── translations.json       # Fichier de traductions FR/EN
├── projects.json           # Données des projets (structure de référence)
├── projects.fr.json        # Projets en français
├── projects.en.json        # Projets en anglais
├── images/                 # Images des projets et assets
├── projects/               # Pages HTML individuelles des projets
│   ├── entreprise-x.html
│   ├── todo-react.html
│   ├── opensource-project.html
│   ├── image-processing.html
│   ├── cgan.html
│   ├── skijo.html
│   ├── kapsule-temporelle.html
│   ├── game-jam.html
│   └── english-teacher-3.html
└── report/                 # Rapports PDF des projets
```

## 🚀 Développement local

```bash
# Cloner le repository
git clone <url-du-repo>
cd Portfolio

# Lancer le serveur de développement
python3 -m http.server 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

## 📋 Projets inclus

### Projets d'étude (5)
1. **Projet Cloud Computing LINFO2145** — Architecture microservices sur Azure
2. **Mémoire - Carbon Calculator** — Calculateur d'empreinte carbone avec IA
3. **Projet Open Source LINFO2171** — Contribution majeure open source
4. **Projet de Traitement d'Images** — Algorithmes de filtrage et segmentation
5. **Réseaux Adverses Génératifs Conditionnels** — Implémentation CGAN

### Projets personnels (4)
1. **Skijo** — Implémentation Python du jeu Skyjo avec interface Tkinter
2. **KAPsule Temporelle** — Application de cryptographie visuelle avec IA
3. **Game Jam 2023** — Prototype de jeu de plateforme narratif (2ème place)
4. **English Teacher 3** — Générateur automatique de decks Anki avec NLP

## 🌐 Déploiement GitHub Pages

Le site est déjà configuré pour GitHub Pages :

1. **Pousser sur GitHub** :
```bash
git remote add origin https://github.com/votre-username/portfolio.git
git push -u origin main
```

2. **Activer GitHub Pages** :
   - Aller dans Settings → Pages
   - Source : Deploy from a branch
   - Branch : `main` / `/ (root)`

3. **Accéder au site** :
   - URL : `https://votre-username.github.io/portfolio/`

## 🔧 Personnalisation

### Ajouter un nouveau projet

1. **Mettre à jour les données** :
```bash
# Ajouter entrée dans projects.json, projects.fr.json, projects.en.json
# Ajouter traductions dans translations.json
```

2. **Créer la page** :
```bash
# Créer projects/nouveau-projet.html
# Suivre la structure des pages existantes
```

3. **Ajouter l'image** :
```bash
# Placer l'image dans images/
# Référencer dans les fichiers JSON
```

### Modifier les traductions

Éditer `translations.json` pour ajouter/modifier les textes dans les deux langues.

### Changer le style

Modifier `styles.css` — Les variables CSS facilitent la personnalisation des couleurs et typographies.

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Build** : Aucun (site statique)
- **Hosting** : GitHub Pages
- **Localisation** : JSON + localStorage
- **Performance** : Images optimisées, code minifié

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ GitHub Pages compatible
- ✅ Chargement rapide (site statique)

## 🤝 Contribution

Pour suggestions ou améliorations :
1. Fork du repository
2. Créer une branche feature
3. Commit des modifications
4. Pull request avec description détaillée

## 📄 Licence

MIT License - voir fichier `LICENSE` pour les détails.

---

**Développé par Maxime Devillet** | Master en Sciences informatiques spécialisé en IA

## Photo de profil

Le template attend une image de profil à `images/profil.jpg` (utilisez ce chemin ou changez `index.html`). Voici des conseils pour corriger/optimiser la photo :

- Pour recadrer et redimensionner en carré 512x512 et compresser avec ImageMagick :

```bash
# installer ImageMagick si nécessaire (Linux)
sudo apt install imagemagick

# recadrer et redimensionner (centre) puis enregistrer
convert input.jpg -resize 512x512^ -gravity center -extent 512x512 -quality 85 images/profil.jpg
```

- Pour générer une version WebP (plus légère) :

```bash
cwebp -q 80 images/profil.jpg -o images/profil.webp
```

- Remplacez le fichier `images/profil.jpg` par votre image optimisée et rechargez la page.
- Si vous souhaitez un fond transparent, fournissez un PNG ou WebP avec alpha et adaptez le CSS (supprimer border si nécessaire).

Bonne préparation d'entretien ! Personnalisez, testez et apportez des preuves chiffrées pour chaque projet (impact, stack, rôle).