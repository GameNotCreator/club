---
name: Club Ingénieur LGF
description: Une vitrine documentaire sobre, inspirée des interfaces Apple et macOS.
colors:
  primary: "#34683f"
  primary-hover: "#255330"
  background: "#f7f8f5"
  surface: "#ffffff"
  soft: "#eceee9"
  text: "#20271f"
  muted: "#626a60"
  line: "#dce0d8"
  dark-background: "#151a16"
  dark-surface: "#202721"
  dark-soft: "#2b342c"
  dark-text: "#f2f5ee"
  dark-muted: "#adb7a9"
  dark-primary: "#b2d4a4"
  dark-primary-hover: "#d0e7c5"
  dark-line: "#374238"
  club-background: "#233a2b"
  club-text: "#f4f7ef"
  button-primary: "#294d32"
  invitation-background: "#e6eddc"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(3.3rem, 6.3vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.3rem, 4vw, 3.65rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  surface: "16px"
  compact: "12px"
  tab-mobile: "9px"
  pill: "100px"
spacing:
  section: "clamp(4.5rem, 9vw, 8rem)"
  compact: "12px"
  medium: "24px"
  large: "40px"
components:
  button-primary:
    backgroundColor: "{colors.button-primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "50%"
    width: "44px"
    height: "44px"
  tab-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
  filter-selected:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "10px 17px"
  project-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.surface}"
---

# Design System: Club Ingénieur LGF

## Overview

**Creative North Star: "L’atelier, avec la clarté de macOS"**

La direction demandée associe la retenue des interfaces Apple à une histoire concrète de fabrication collective. Les photographies du club constituent le contenu visuel principal. Une typographie système, des espaces généreux et des contrôles familiers laissent voir les personnes et les prototypes.

Le thème clair utilise un blanc légèrement chaud et un vert forêt. Le thème sombre conserve cette parenté végétale. Le verre est limité à la barre de navigation qui passe au-dessus du contenu ; il n’est pas une décoration répétée. Les mouvements donnent une réponse immédiate aux actions et restent interruptibles par l’utilisateur.

**Key Characteristics:**

- Photographies documentaires authentiques.
- Typographie système et hiérarchie par la taille et la graisse.
- Surfaces calmes, vert forêt et contraste explicite.
- Défilement natif, navigation au clavier et versions française et anglaise.
- Mouvement optionnel et respect des préférences d’accessibilité.

## Colors

La palette associe des neutres légèrement verts à un accent forêt. Les valeurs exactes sont dans le frontmatter et proviennent de `assets/css/site.css`.

### Primary

**Vert forêt** porte les liens, les titres accentués et les états actifs. Sa variante plus sombre renforce les survols en thème clair. Le thème sombre emploie un **vert feuille clair** afin de conserver le contraste.

### Neutral

**Papier chaud** est le fond général ; **blanc de surface** reçoit les dossiers de projets. **Gris sauge** sépare les contrôles groupés. Le texte principal reste profond, et le texte secondaire suffisamment distinct du fond. Les séparateurs servent à organiser les chronologies et les listes.

Le bloc consacré au club utilise son propre **vert collectif** avec du texte clair. L’invitation Instagram utilise un fond plus clair, apparenté à la palette. Ces zones gardent leurs valeurs prévues, sans appliquer mécaniquement les couleurs du thème général.

**The Accent Rule.** Employer le vert pour guider une action ou une hiérarchie, en laissant les photographies porter la richesse chromatique.

## Typography

**Display Font:** police système Apple, puis BlinkMacSystemFont, Segoe UI et sans-serif.

**Body Font:** même famille système. Aucune police distante n’est requise.

**Character:** le choix du système est intentionnel et vient de la référence Apple/macOS. Les titres resserrés contrastent avec un corps aéré. L’accentuation française est conservée ; les textes anglais ont leur propre longueur et doivent être vérifiés aux mêmes largeurs.

### Hierarchy

- **Display:** grande accroche fluide, graisse semi-grasse, maximum défini par le token display. Sur mobile, la taille et l’interlettrage sont adaptés pour conserver la composition.
- **Headline:** titres de sections fluides, équilibre des lignes avec `text-wrap: balance`.
- **Title:** noms de projets et titres secondaires ; la graisse reste cohérente avec les titres de section.
- **Body:** base de 16 pixels, textes de contenu généralement entre 13 et 15 pixels selon le contexte. Largeur de paragraphe plafonnée à 68 caractères ; interligne porté jusqu’à 1,8 pour les descriptifs.
- **Label:** dates, catégories et légendes compactes. Les dates utilisent des chiffres tabulaires. Les petites légendes de la version actuelle ont un minimum de 11 pixels.

**The Readability Rule.** Vérifier le contenu réel dans les deux langues ; ne pas résoudre un débordement en réduisant indéfiniment la taille du texte.

## Layout

Le conteneur principal atteint 1280 pixels et réserve 112 pixels de marge totale sur grand écran. Il passe à 72, 48 puis 40 pixels de marge totale aux seuils de 1190, 850 et 650 pixels. Le rythme vertical des grandes sections utilise le token `section`.

Les dossiers de projets passent de deux colonnes à une colonne sur mobile. La galerie passe de quatre à trois puis deux colonnes ; une image horizontale peut occuper deux colonnes. Les récits du journal restent des lignes éditoriales composées d’une image, d’un texte et d’un lien.

Le header est sticky, avec une hauteur de 88 pixels sur grand écran, 74 à taille intermédiaire et 70 sur mobile. La navigation mobile est un menu explicite. Les ancres tiennent compte du header grâce à `scroll-padding-top`.

Le défilement reste natif. Aucun gestionnaire de molette ne remplace le comportement du navigateur. L’impression affiche les trois dossiers de projets, même lorsqu’un seul onglet est actif à l’écran.

## Elevation & Depth

La profondeur vient principalement des changements de ton et des photographies. Les ombres sont réservées à des objets réellement superposés : contrôle actif, badge sur photo, menu mobile, visionneuse. Les ombres ont un décalage et un flou doux.

### Shadow Vocabulary

- **Contrôle sélectionné** (`0 3px 10px #15291a0c`) : l’onglet actif se détache légèrement du fond du groupe.
- **Menu mobile** (`0 18px 25px #00000015`) : le panneau se situe devant la page.
- **Visionneuse** (`0 25px 100px #0006`) : la photographie ouverte forme un niveau de lecture protégé.

Le header utilise un flou de 20 pixels sur une surface presque opaque. La visionneuse possède un fond assombri et un flou de 6 pixels. Le réglage de réduction de la transparence supprime ces flous.

## Shapes

Les grandes surfaces ont des angles de 16 pixels ; les éléments compacts et les surfaces mobiles utilisent principalement 12 pixels. Les commandes de navigation et de filtrage ont une forme de pilule. Les boutons d’icône sont circulaires.

Les icônes sont des SVG au trait cohérent, avec extrémités arrondies. Les images conservent leur proportion dans les fichiers ; leur recadrage de présentation est géré par `object-fit` et doit être vérifié pour garder les personnes visibles. Les petites images d’archive ne sont pas artificiellement agrandies dans les sources.

## Components

### Buttons

Les commandes sont discrètes et répondent à la pression par une réduction légère (`scale(.96)`). Le lien Instagram principal utilise un fond vert profond et du texte blanc. Les boutons d’icône ont un fond transparent au repos et un fond doux au survol. Le focus clavier utilise un contour de 3 pixels, décalé de 5 pixels.

### Project tabs

Le groupe d’onglets repose sur une surface douce et distingue l’onglet sélectionné par une surface claire. `aria-selected`, un `tabindex` itinérant et les flèches du clavier suivent le même état. Les détails secondaires utilisent des éléments natifs `details` et `summary`.

### Gallery filters and viewer

Les filtres utilisent `aria-pressed` et un contraste inversé pour l’état actif. La grille reste composée de liens réels vers les images. La visionneuse est un `dialog` natif ; la fermeture rend le focus au lien d’origine. Les touches gauche/droite parcourent les résultats du filtre courant.

### Navigation

La navigation principale emploie des libellés courts. La section active utilise `aria-current`. Le menu mobile expose son état avec `aria-expanded`, se ferme sur sélection ou avec Échap, et conserve l’accès aux réglages de langue et de thème.

### Bubble Sea motion

Des lignes vectorielles représentent le mouvement des vagues. Le déplacement horizontal dure 8 secondes et le point central suit un cycle de 4 secondes. Le contrôle de pause et la préférence `prefers-reduced-motion` permettent une présentation statique. Le dessin reste explicitement illustratif.

### Accessibility and preference states

La sélection de texte, le focus et les barres de défilement utilisent la palette. Le thème sombre modifie les tokens sémantiques. Les préférences de contraste élevé renforcent le texte secondaire et les contours. Le contenu reste visible sans JavaScript ; les fonctions enrichies sont ensuite activées.

## Do's and Don'ts

### Do:

- **Do** conserver les photographies réelles et leur provenance.
- **Do** vérifier chaque nouveau texte en français et en anglais, sur mobile et grand écran.
- **Do** garder les contrôles accessibles au clavier et les liens utilisables sans JavaScript.
- **Do** employer les tokens sémantiques pour que les deux thèmes restent cohérents.
- **Do** conserver une commande de pause pour tout mouvement continu.

### Don't:

- **Don't** remplacer le défilement naturel par une navigation imposée à la molette.
- **Don't** inventer une photographie, un résultat technique ou une preuve pour remplir une zone visuelle.
- **Don't** multiplier les surfaces vitrées ; leur rôle est de séparer une couche fonctionnelle.
- **Don't** masquer une fonction essentielle uniquement pour faire tenir une version mobile.
- **Don't** charger une police ou une bibliothèque distante sans besoin concret.
