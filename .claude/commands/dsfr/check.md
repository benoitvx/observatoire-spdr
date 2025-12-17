# /dsfr:check - Vérifier la Conformité DSFR

Analyse le code pour vérifier la conformité aux règles DSFR et RGAA.

## Usage

```
/dsfr:check [chemin] [--strict] [--fix]
```

## Vérifications Effectuées

### 0. Configuration CSS - ⚠️ CRITIQUE

**Règle** : Les fichiers CSS DSFR DOIVENT être liés dans `index.html`

```html
<!-- Dans <head> de index.html -->
<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
```

**Recherche** :
```bash
# Vérifier présence des CSS DSFR dans index.html
grep -E "dsfr\.min\.css|dsfr/dsfr" index.html
```

**Symptôme si manquant** : Le site s'affiche sans aucun style (HTML brut, pas de couleurs, pas de mise en page).

**Solution** : Voir section "Configuration index.html" dans CLAUDE.md

---

### 1. Imports Composants ✅

**Règle** : Tous les composants UI doivent venir de `@codegouvfr/react-dsfr`

```tsx
// ✅ CORRECT
import { Button } from "@codegouvfr/react-dsfr/Button";

// ❌ INCORRECT
import Button from "./components/Button"; // Composant custom
import { Button } from "@mui/material"; // Librairie externe
```

**Recherche** :
```bash
# Détecter les imports UI suspects
grep -r "import.*Button\|Card\|Alert\|Input" --include="*.tsx" | grep -v "@codegouvfr/react-dsfr"
```

### 2. Classes CSS ✅

**Règle** : Utiliser uniquement les classes `fr-*` via `fr.cx()`

```tsx
// ✅ CORRECT
<div className={fr.cx("fr-container", "fr-mt-4w")}>

// ❌ INCORRECT
<div className="container mt-4"> // Classes Bootstrap/Tailwind
<div className="custom-wrapper"> // Classes custom
<div style={{ marginTop: 16 }}> // Styles inline
```

**Recherche** :
```bash
# Détecter les classes non-DSFR
grep -r "className=" --include="*.tsx" | grep -v "fr.cx\|fr-"
```

### 3. Icônes ✅

**Règle** : Utiliser uniquement les icônes DSFR (Remix Icon via `iconId`)

```tsx
// ✅ CORRECT
<Button iconId="fr-icon-arrow-right-line">

// ❌ INCORRECT
import { FaArrowRight } from "react-icons/fa";
import ArrowIcon from "@mui/icons-material/Arrow";
```

**Recherche** :
```bash
# Détecter les imports d'icônes externes
grep -r "react-icons\|@mui/icons\|@heroicons" --include="*.tsx"
```

### 4. Accessibilité RGAA ✅

**Vérifications** :
- [ ] Tous les `<img>` ont un attribut `alt`
- [ ] Les formulaires ont des `<label>` associés
- [ ] Les boutons ont un texte ou `title`/`aria-label`
- [ ] Les liens ont un texte descriptif
- [ ] `lang` défini sur `<html>`
- [ ] Structure de titres cohérente (h1, h2, h3...)

**Recherche** :
```bash
# Images sans alt
grep -r "<img" --include="*.tsx" | grep -v "alt="

# Boutons sans texte accessible
grep -r "<button" --include="*.tsx" | grep -v "aria-label\|title"
```

### 5. Structure HTML ✅

**Règle** : Respecter la structure DSFR

```tsx
// ✅ Structure correcte
<main id="content">
  <div className={fr.cx("fr-container")}>
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-12")}>

// ❌ Structure incorrecte
<div className="main">
  <div className="container">
```

### 6. Dark Mode ✅

**Règle** : Ne pas hardcoder les couleurs

```tsx
// ✅ CORRECT
// Les composants DSFR gèrent automatiquement le dark mode

// ❌ INCORRECT
<div style={{ backgroundColor: "#000091" }}> // Couleur hardcodée
<div style={{ color: "white" }}> // Ne suit pas le thème
```

## Rapport de Sortie

```
=== Rapport Conformité DSFR ===

📁 Fichiers analysés : 15
✅ Conformes : 12
⚠️ Avertissements : 2
❌ Erreurs : 1

--- Erreurs ---
❌ src/components/CustomButton.tsx:5
   Composant Button doit être importé de @codegouvfr/react-dsfr/Button

--- Avertissements ---
⚠️ src/pages/HomePage.tsx:23
   Classe CSS "custom-hero" non-DSFR détectée

⚠️ src/components/Card.tsx:12
   Image sans attribut alt

--- Recommandations ---
• Remplacer CustomButton par le Button DSFR officiel
• Utiliser fr.cx() pour les classes CSS
• Ajouter alt="" ou description aux images

Score DSFR : 85/100
Score RGAA estimé : AA (conforme)
```

## Mode Strict

Avec `--strict`, vérifications supplémentaires :
- Pas de CSS custom du tout (même justifié)
- Tous les composants doivent avoir des types TypeScript
- Tous les textes doivent être en français
- Contraste vérifié sur les couleurs custom

## Mode Fix

Avec `--fix`, corrections automatiques :
- Remplacement des imports par équivalents DSFR
- Conversion des classes vers `fr.cx()`
- Ajout des `alt=""` manquants sur les images décoratives

## Arguments

| Argument | Description |
|----------|-------------|
| `chemin` | Fichier ou dossier à analyser (défaut: src/) |
| `--strict` | Vérifications strictes |
| `--fix` | Appliquer les corrections automatiques |

$ARGUMENTS
