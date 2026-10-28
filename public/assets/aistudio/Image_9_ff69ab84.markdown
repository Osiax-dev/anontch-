---
name: Ruban Rose Bénin
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#574145'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#8b7075'
  outline-variant: '#debfc4'
  surface-tint: '#af2658'
  primary: '#ac2356'
  on-primary: '#ffffff'
  primary-container: '#cd3e6e'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb1c2'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#b40b56'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7306f'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#ffb1c2'
  on-primary-fixed: '#3f0019'
  on-primary-fixed-variant: '#8f0341'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ffb1c3'
  on-tertiary-fixed: '#3f0019'
  on-tertiary-fixed-variant: '#8f0042'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

Ce système de design incarne une mission de santé publique vitale : la sensibilisation, l'apprentissage des gestes d'auto-examen mammaire et l'orientation clinique au Bénin. L'univers visuel conjugue bienveillance, dignité culturelle et clarté médicale rigoureuse. 

Le style s'appuie sur un **minimalisme organique et chaleureux**, adapté aux conditions mobiles réelles (écrans d'entrée de gamme, lisibilité en plein soleil, navigation à une main). Il évite l'anxiété clinique par des surfaces douces et accueillantes, tout en maintenant un sérieux institutionnel via des contrastes stricts conformes aux normes WCAG AA. Les métaphores visuelles évoquent la protection, l'intimité respectée et l'émancipation par l'autonomie sanitaire.

## Colors

La palette chromatique est organisée autour de trois axes fondamentaux :

- **Rose Poudré & Ruban (#E85382, #FCE7F3, #BE185D)** : Le rose poudré (#E85382) porte l'identité du dépistage précoce et de la santé féminine sans mièvrerie. Le rose profond (#BE185D) sert aux actions d'urgence, boutons primaires à haut contraste et alertes cliniques clés, tandis que le voile rosé (#FCE7F3, #FFF1F2) enveloppe les conteneurs et fonds d'apprentissage.
- **Vert d'Eau Rafraîchissant (#0D9488, #CCFBF1)** : Couleur d'équilibre thérapeutique et d'espoir clinique. Utilisé pour valider les étapes d'auto-palpation, marquer les centres de santé géolocalisés et confirmer les actions réussies.
- **Neutres & Lisibilité (#1E293B, #334155, #64748B, #F8FAFC, #FFFFFF)** : Le slate profond (#1E293B) assure un ratio de contraste supérieur à 7:1 sur les fonds clairs (#FFFFFF et #F8FAFC) pour garantir l'accessibilité aux utilisatrices malvoyantes ou en environnement lumineux extérieur.

## Typography

Le système utilise exclusivement **Plus Jakarta Sans** pour son équilibre parfait entre modernité géométrique, clarté pédagogique et rondeurs accueillantes. Les ouvertures amples et la grande hauteur de x garantissent une lisibilité optimale des consignes médicales d'autopalpation même sur des terminaux mobiles modestes. 

Les hiérarchies textuelles privilégient les graisses 600 et 700 pour les repères directionnels et alertes sanitaires, assurant une reconnaissance immédiate au premier coup d'œil.

## Layout & Spacing

L'architecture est entièrement pensée **mobile-first** pour cette PWA :

- **Grille & Structure** : Colonne unique sur mobile (largeur max contenue à 440px pour l'ergonomie au pouce) centrée sur tablette et grand écran (largeur max du conteneur d'application à 640px). 
- **Rythme Vertical** : Incréments stricts sur une base de 4px / 8px. Les sections de guidage visuel (illustrations de palpation) adoptent un espacement généreux (`space-lg` à `space-xl`) pour éviter la surcharge cognitive.
- **Zones Sécurisées** : Prise en compte impérative des safe areas matérielles (`env(safe-area-inset-bottom)`) pour ne pas chevaucher la barre de navigation fixe inférieure.

## Elevation & Depth

La hiérarchie repose sur une superposition de couches douces et d'ombres diffuses, éliminant toute dureté visuelle :

- **Surfaces Étagées** : Le fond principal `#F8FAFC` ou `#FFF1F2` accueille des cartes en blanc pur (`#FFFFFF`) pour détacher naturellement les blocs d'information.
- **Ombres Subtiles "Rose & Brume"** : L'ombre standard utilise une projection basse et très diffusée, teintée d'une touche de rose neutre : `0px 4px 20px -2px rgba(232, 83, 130, 0.08), 0px 2px 6px -1px rgba(30, 41, 59, 0.04)`.
- **Barre Fixe Inférieure** : Élévation inversée protectrice (`0px -4px 16px rgba(30, 41, 59, 0.05)`) avec un léger flou d'arrière-plan (*backdrop-filter: blur(12px)*) sur fond blanc translucide (95% d'opacité) pour marquer la persistance de l'outil.

## Shapes

La géométrie du système adopte une rondeur prononcée (`rounded-2xl` soit 16px à 20px selon les conteneurs), évoquant l'aspect tactile, corporel et rassurant de la démarche. 

Les boutons interactifs d'action principale et les puces d'état adoptent un format pilule (*full rounded*) pour maximiser le confort de clic et inviter au toucher sans appréhension.

## Components

- **Boutons** :
  - *Primaire* : Fond `#BE185D` ou `#E85382`, texte blanc, hauteur minimale de 48px pour l'accessibilité tactile, forme pilule avec ombrage doux.
  - *Secondaire Clinique* : Fond vert d'eau `#CCFBF1`, texte `#0D9488`, idéal pour les rappels de rendez-vous ou validations.
  - *Neutre* : Fond blanc `#FFFFFF`, contour fin `#E2E8F0`, texte `#1E293B`.
- **Barre de Navigation Inférieure Fixe** :
  - 4 destinations clés : Accueil, Guide Palpation, Centres Bénin, Mon Calendrier.
  - Hauteur 64px + safe area, icônes simples accompagnées de leur label texte explicite pour répondre aux critères WCAG.
- **Cartes Guide d'Autopalpation** :
  - Fond `#FFFFFF` avec liseré intérieur `#FCE7F3`, coins `rounded-2xl`, intégrant un numéro d'étape contrasté dans un cercle vert d'eau `#0D9488` et une illustration anatomique claire et bienveillante.
- **Badges d'Accessibilité & Statut** :
  - Hauteur 24px, rembourrage horizontal 10px, typographie `label-sm`.
  - Format bicolore à contraste élevé : Fond `#FCE7F3` avec texte `#BE185D` (Sensibilisation), ou Fond `#CCFBF1` avec texte `#065F46` (Validé/Normal).
- **Formulaires & Sélecteurs** :
  - Hauteur de champ 48px, fond `#F8FAFC`, bordure neutre `#CBD5E1` devenant `#E85382` au focus avec halo translucide. Étiquettes flottantes ou supérieures toujours visibles.
- **Alerte Bienveillante / Écoute** :
  - Bandeau dédié au soutien psychologique et numéros d'urgence sanitaire au Bénin, avec icône d'appel direct intégrée et fond doux `#FFF1F2`.