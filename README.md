# Club Ingénieur LGF

**English overview:** Bilingual website for the LGF Engineering Club in La Marsa, presenting Gustave Motors, A-BOT and Bubble Sea. The current site uses HTML, CSS and JavaScript; the project history, sources and maintenance instructions follow in French.

Le site du Club Ingénieur du Lycée Gustave Flaubert, à La Marsa. Trois années de projets : **Gustave Motors** (2022–2023), **A-BOT** (2023–2024) et **Bubble Sea** (2024–2025).

**[Voir le site](https://gamenotcreator.github.io/engineering-club-website/)** · **[English](https://gamenotcreator.github.io/engineering-club-website/?lang=en)** · **[Instagram](https://www.instagram.com/club.ingelgf/)**

## Parcourir le site

- Présentation des trois projets par onglets, avec leurs récits et détails techniques.
- Histoire du club, encadrants et certificat de mérite.
- Galerie filtrable, avec visionneuse, légendes et navigation au clavier.
- Articles de fond sur Gustave Motors et A-BOT.
- Interface française et anglaise, thèmes clair et sombre, navigation adaptée au mobile.

La langue et le thème sont mémorisés localement dans le navigateur. `?lang=fr` ou `?lang=en` impose la langue du lien ouvert. Les textes anglais sont appliqués par JavaScript ; le document HTML de référence reste en français.

Le défilement est celui du navigateur. Les onglets répondent aux flèches gauche/droite et aux touches Début/Fin. La visionneuse se ferme avec Échap et permet de parcourir les photos visibles avec les flèches. L’animation de Bubble Sea peut être mise en pause et respecte le réglage de réduction des mouvements. Ce dessin évoque l’énergie des vagues ; ce n’est pas une simulation du prototype.

## Lancer en local

Le site utilise du HTML, du CSS et du JavaScript sans framework ni dépendance à installer. Aucun `npm install` ni compilation n’est nécessaire.

Depuis la racine du dépôt, avec Python installé :

```sh
python -m http.server 8000
```

Ouvrir [localhost:8000](http://localhost:8000/) ou [la version anglaise](http://localhost:8000/?lang=en). Sans JavaScript, le contenu français, les trois projets, les liens et les images restent consultables.

## Structure

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Contenu français, sections, projets, galerie et métadonnées |
| `assets/css/site.css` | Style actuel, thèmes et adaptations aux écrans |
| `assets/js/site.js` | Langue, thème, menu, onglets et visionneuse |
| `assets/js/translations.js` | Dictionnaires français et anglais |
| `assets/media/` | Images WebP utilisées par la refonte |
| `assets/media/manifest.json` | Provenance, dimensions et textes alternatifs des images |
| `docs/CONTENT.md` | Sources et limites des informations publiées |
| `docs/ASSETS.md` | Inventaire des images et conseils d’ajout |
| `PRODUCT.md` | Contexte et contraintes du projet |
| `DESIGN.md` | Système visuel et valeurs de référence |
| `.impeccable/design.json` | Complément structuré du système visuel |
| `scripts/check-site.mjs` | Vérification des références, identifiants, traductions et trois projets |

Les anciens fichiers dans `assets/img/`, les styles Sass et les scripts historiques sont conservés comme archives. `index.html` charge uniquement `site.css`, `translations.js` et `site.js`.

## Modifier les textes

Modifier le texte français de `index.html`, puis les entrées correspondantes de `window.LGF_TRANSLATIONS.fr` et `window.LGF_TRANSLATIONS.en` dans `assets/js/translations.js`. Les attributs relient le HTML aux dictionnaires :

- `data-i18n` pour un texte visible ;
- `data-i18n-alt` pour le texte alternatif d’une image ;
- `data-i18n-aria` pour le nom accessible d’un contrôle.

Conserver les mêmes clés dans les deux langues. Les noms de projets restent Gustave Motors, A-BOT et Bubble Sea. Les deux articles LinkedIn restent signalés comme des articles en français dans la version anglaise.

## Ajouter des photos

1. Ajouter un fichier WebP au nom descriptif dans `assets/media/`. Conserver le cadre original et éviter d’agrandir une petite source. Une version de 640 pixels de large suffit généralement pour les vignettes ; garder une version plus grande pour la visionneuse.
2. Copier un lien `.gallery-item` de `index.html`. Remplacer le `href` par la grande image, le `src` par la vignette, et renseigner ses vraies dimensions `width` et `height`.
3. Affecter `data-gallery-category="gustave"`, `"abot"` ou `"club"`. Plusieurs catégories peuvent être séparées par des espaces. Pour les futures photos de Bubble Sea, ajouter un bouton de filtre `data-filter="bubble"`, puis utiliser `data-gallery-category="bubble"`.
4. Garder `data-lightbox`. Créer une clé de légende dans `data-caption-key` et `data-i18n`, et une clé de description dans `data-i18n-alt`. Ajouter ces deux nouvelles clés aux dictionnaires français et anglais, ainsi que le texte français de secours dans le HTML.
5. Ajouter la provenance et les dimensions à `assets/media/manifest.json`. Adapter aussi le nombre de photos de secours dans `#gallery-status` ; JavaScript recalcule ce nombre lors de chaque filtre.

Les commandes de la visionneuse et les filtres découvrent les photos à partir de ces attributs : aucun tableau supplémentaire à maintenir dans JavaScript. `gallery-wide` permet à une photo horizontale d’occuper deux colonnes.

## Publication et vérifications

Le site est publié sur [GitHub Pages](https://gamenotcreator.github.io/engineering-club-website/), directement depuis la branche `main` et le dossier `/(root)`. Chaque push sur `main` déclenche automatiquement la mise à jour du site. Le fichier `.nojekyll` permet de servir les fichiers statiques sans traitement Jekyll ; aucune commande de build n’est nécessaire.

Le déploiement GitHub Pages ne remplace pas les contrôles fonctionnels : aucune suite de tests CI n’est configurée dans le dépôt. Avant de publier une modification, vérifier les deux langues, les deux thèmes, la navigation mobile, les trois projets, les filtres et la visionneuse. Tester aussi le clavier, le réglage de réduction des mouvements et le chargement de chaque nouvelle image.

Avec Node.js installé, lancer le contrôle structurel depuis la racine du dépôt :

```sh
node scripts/check-site.mjs
```

Ce contrôle vérifie les références, les identifiants, la couverture des traductions et les trois projets. Il complète la vérification visuelle et les essais d’interaction dans le navigateur.
