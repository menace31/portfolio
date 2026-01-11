# Portfolio — Template

Ce dépôt contient un template simple de portfolio statique (HTML/CSS/JS) prêt à être personnalisé et publié sur GitHub Pages.

## Personnalisation
- Ouvrez `index.html` et remplacez "Votre Nom", la tagline et l'email.
- Modifiez `projects.json` pour lister vos projets (titre, description, repo, demo, tags).
- Mettez vos images et autres ressources dans un dossier `assets/` et référencez-les depuis `index.html` ou `projects.json`.

## Prévisualisation locale
Vous pouvez prévisualiser le site localement avec un serveur simple (Python 3) :

```bash
# depuis le dossier du projet
python3 -m http.server 8000
# puis ouvrez http://localhost:8000 dans votre navigateur
```

## Déployer sur GitHub Pages (rapide)
1. Créez un dépôt sur GitHub (ex: `portfolio`).
2. Initialisez git et poussez :

```bash
git init
git add .
git commit -m "Initial commit: template portfolio"
git branch -M main
git remote add origin https://github.com/<votre-utilisateur>/portfolio.git
git push -u origin main
```

3. Dans les settings du dépôt GitHub → Pages, choisissez la branche `main` et le dossier `/ (root)`.
4. Après quelques minutes, votre site sera disponible à `https://<votre-utilisateur>.github.io/portfolio/`.

## Suggestions d'améliorations
- Ajouter une page par projet (MDX ou pages statiques).
- Intégrer un formulaire de contact (Formspree ou Netlify Forms) ou une solution backend.
- Ajouter des animations, optimiser images et performance, et configuré CI pour tests et builds.

## Localisation / multi-langues

Le template supporte maintenant la localisation via des fichiers séparés :

- `translations.json` : contient les clés de l'interface pour chaque langue (fr/en par défaut).
- `projects.fr.json` et `projects.en.json` : listes de projets localisées. Le sélecteur de langue en-tête permet de basculer et le choix est mémorisé dans `localStorage`.

Pour ajouter une langue :
1. Ajoutez une nouvelle entrée dans `translations.json` (par ex. `es` pour espagnol).
2. Créez `projects.xx.json` contenant les titres et descriptions localisés.
3. Ajoutez une option `<option value="xx">...</option>` dans le sélecteur `#lang-select` dans `index.html`.

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