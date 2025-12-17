# /dsfr:help - Aide Commandes DSFR

Affiche l'aide et la documentation des commandes DSFR disponibles.

## Commandes Disponibles

| Commande | Description | Usage |
|----------|-------------|-------|
| `/dsfr:component` | Créer un composant DSFR React | `/dsfr:component Button` |
| `/dsfr:page` | Créer une page avec layout DSFR | `/dsfr:page Contact --with-breadcrumb` |
| `/dsfr:form` | Créer un formulaire accessible | `/dsfr:form Contact --fields "nom,email"` |
| `/dsfr:check` | Vérifier la conformité DSFR | `/dsfr:check src/ --strict` |
| `/dsfr:help` | Afficher cette aide | `/dsfr:help` |

## Exemples Rapides

### Créer un composant
```
/dsfr:component ServiceCard --type card
```

### Créer une page protégée
```
/dsfr:page Dashboard --with-breadcrumb --protected
```

### Créer un formulaire de contact
```
/dsfr:form ContactForm --fields "nom,email,sujet,message" --with-validation
```

### Vérifier la conformité
```
/dsfr:check src/components/ --strict
```

## Ressources DSFR

### Documentation Officielle
| Ressource | URL |
|-----------|-----|
| react-dsfr | https://react-dsfr.codegouv.studio/ |
| Composants (Storybook) | https://components.react-dsfr.codegouv.studio/ |
| DSFR vanilla | https://www.systeme-de-design.gouv.fr/ |
| GitHub | https://github.com/codegouvfr/react-dsfr |

### Context7 pour Documentation
```
Library ID: /codegouvfr/react-dsfr
Topics utiles: components, setup, accessibility, forms, dark-mode
```

### Exemple Context7
Pour obtenir la doc d'un composant spécifique :
```
Utiliser Context7 avec:
- Library ID: /codegouvfr/react-dsfr
- Topic: [nom du composant]
```

## Composants les Plus Utilisés

### Layout
- `Header` - En-tête avec navigation
- `Footer` - Pied de page légal
- `Breadcrumb` - Fil d'Ariane

### Actions
- `Button` - Boutons (primary, secondary, tertiary)
- `ButtonsGroup` - Groupe de boutons

### Formulaires
- `Input` - Champs texte
- `Select` - Listes déroulantes
- `Checkbox` - Cases à cocher
- `RadioButtons` - Boutons radio

### Feedback
- `Alert` - Messages info/erreur/succès
- `Notice` - Notifications
- `Badge` - Badges/étiquettes

### Navigation
- `Tabs` - Onglets
- `Accordion` - Sections dépliables
- `Pagination` - Pagination

### Contenu
- `Card` - Cartes
- `Tile` - Tuiles cliquables
- `Table` - Tableaux
- `Modal` - Fenêtres modales

## Règles Essentielles

### ✅ À Faire
- Importer depuis `@codegouvfr/react-dsfr/[Component]`
- Utiliser `fr.cx()` pour les classes CSS
- Tester l'accessibilité clavier
- Respecter le responsive mobile-first
- **Lier les CSS DSFR dans `index.html`** (voir troubleshooting)

### ❌ À Éviter
- Créer des composants custom quand DSFR existe
- Utiliser des classes CSS hors `fr-*`
- Importer des icônes externes
- Hardcoder des couleurs

## Troubleshooting Rapide

### ❌ Le site s'affiche sans style (HTML brut)

**Cause** : CSS DSFR non liés dans `index.html`

**Solution** : Ajouter dans `<head>` de `index.html` :
```html
<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
```

### ❌ Les icônes ne s'affichent pas

**Cause** : CSS icônes manquant ou mauvais identifiant

**Solutions** :
1. Ajouter `<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />`
2. Vérifier le format : `fr-icon-[nom]-line` ou `fr-icon-[nom]-fill`

### ❌ Assets DSFR introuvables

**Solution** : Exécuter `npx react-dsfr copy-static-assets`

## Aide Supplémentaire

Pour plus d'informations sur une commande spécifique :
```
/dsfr:component --help
/dsfr:page --help
/dsfr:form --help
/dsfr:check --help
```

Pour consulter le fichier d'instructions complet :
```
Lire le fichier CLAUDE.md à la racine du projet
```
