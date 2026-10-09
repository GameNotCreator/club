# Club Ingénieur LGF

Site vitrine du Club Ingénieur de LGF : projets, réalisations et activités du club.

**[Voir le site](https://clubinge-lgf.vercel.app)**

## Contenu

Le site présente les projets par année, notamment Gustave Motors et A-BOT, ainsi qu'une section pour suivre le club.

## Technologies

HTML, CSS/Sass et JavaScript. Les pages sont statiques ; ce dépôt ne contient pas de serveur applicatif ni de configuration npm.

## Lancer en local

Cloner le dépôt et ouvrir `index.html` dans un navigateur. Pour le servir en HTTP avec Python installé :

```bash
python -m http.server 8000
```

Ouvrir [localhost:8000](http://localhost:8000).

## Structure

| Chemin | Contenu |
| --- | --- |
| `index.html` | Sections et textes du site |
| `assets/css/` | Styles |
| `assets/js/` | Interactions |
| `assets/img/` | Images des projets |

Pour mettre à jour une année ou un projet, modifier `index.html` et ajouter les images correspondantes dans `assets/img/`.
