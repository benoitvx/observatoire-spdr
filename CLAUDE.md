# Instructions Claude Code - DSFR React

Ce fichier configure Claude Code pour développer des applications React avec le DSFR (Système de Design de l'État).

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18+ | Framework UI |
| TypeScript | 5+ | Typage statique |
| Vite | 5+ | Build tool |
| @codegouvfr/react-dsfr | 1.29+ | Composants DSFR React |
| react-router-dom | 6+ | Routing |

## Règles Obligatoires

### Imports - CRITIQUE

```tsx
// ✅ CORRECT - Toujours importer depuis @codegouvfr/react-dsfr
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

// ❌ INTERDIT - Ne jamais recréer de composants existants
// Ne pas créer un <CustomButton> si Button existe
// Ne pas créer un <CustomAlert> si Alert existe
```

**Règle d'or** : Vérifier dans la doc react-dsfr AVANT de créer un composant custom.

### Classes CSS - Utilitaires fr.cx() et cx()

```tsx
import { fr } from "@codegouvfr/react-dsfr/fr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

// Composition de classes DSFR
<div className={fr.cx("fr-container", "fr-mt-6w", "fr-mb-4w")}>

// Mixer classes DSFR et custom (rare, justifier)
<div className={cx(fr.cx("fr-card", "fr-card--shadow"), "my-custom-class")}>

// Grid responsive
<div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
  <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
```

**Règles CSS** :
- Utiliser UNIQUEMENT les classes `fr-*` du DSFR
- Composition via `fr.cx()` pour les classes DSFR
- `cx()` uniquement pour mixer DSFR + custom (cas exceptionnels)
- PAS de CSS custom sauf justification écrite

### Accessibilité RGAA

- **Niveau AA minimum** obligatoire
- Navigation clavier sur tous les éléments interactifs
- Les composants react-dsfr gèrent les ARIA automatiquement
- Ne pas modifier les couleurs (contrastes calculés)
- Tester avec lecteur d'écran

### Icônes

```tsx
// ✅ CORRECT - Utiliser les icônes DSFR (Remix Icon)
<Button iconId="fr-icon-arrow-right-line" iconPosition="right">
  Continuer
</Button>

// ❌ INTERDIT - Pas d'icônes externes
// import { FaArrowRight } from "react-icons/fa"; // NON
// import ArrowIcon from "@mui/icons-material/Arrow"; // NON
```

### Responsive

- **Mobile-first** : Concevoir pour mobile d'abord
- Breakpoints DSFR : `sm` (576px), `md` (768px), `lg` (992px), `xl` (1248px)
- Classes : `fr-col-*`, `fr-col-sm-*`, `fr-col-md-*`, `fr-col-lg-*`, `fr-col-xl-*`

## Composants Principaux

| Composant | Import | Usage |
|-----------|--------|-------|
| Header | `@codegouvfr/react-dsfr/Header` | En-tête site avec navigation |
| Footer | `@codegouvfr/react-dsfr/Footer` | Pied de page légal |
| Button | `@codegouvfr/react-dsfr/Button` | Actions (primary, secondary, tertiary) |
| Input | `@codegouvfr/react-dsfr/Input` | Champs texte |
| Select | `@codegouvfr/react-dsfr/Select` | Listes déroulantes |
| Checkbox | `@codegouvfr/react-dsfr/Checkbox` | Cases à cocher |
| RadioButtons | `@codegouvfr/react-dsfr/RadioButtons` | Boutons radio |
| Alert | `@codegouvfr/react-dsfr/Alert` | Messages info/erreur/succès |
| Card | `@codegouvfr/react-dsfr/Card` | Cartes de contenu |
| Tile | `@codegouvfr/react-dsfr/Tile` | Tuiles cliquables |
| Tabs | `@codegouvfr/react-dsfr/Tabs` | Navigation par onglets |
| Accordion | `@codegouvfr/react-dsfr/Accordion` | Sections dépliables |
| Breadcrumb | `@codegouvfr/react-dsfr/Breadcrumb` | Fil d'Ariane |
| Modal | `@codegouvfr/react-dsfr/Modal` | Fenêtres modales |
| Table | `@codegouvfr/react-dsfr/Table` | Tableaux de données |
| Badge | `@codegouvfr/react-dsfr/Badge` | Badges/étiquettes |
| Tag | `@codegouvfr/react-dsfr/Tag` | Tags cliquables |
| Stepper | `@codegouvfr/react-dsfr/Stepper` | Étapes de processus |
| CallOut | `@codegouvfr/react-dsfr/CallOut` | Mise en avant |
| Quote | `@codegouvfr/react-dsfr/Quote` | Citations |
| Notice | `@codegouvfr/react-dsfr/Notice` | Avis/notifications |
| Pagination | `@codegouvfr/react-dsfr/Pagination` | Pagination listes |
| ToggleSwitch | `@codegouvfr/react-dsfr/ToggleSwitch` | Interrupteurs |
| ButtonsGroup | `@codegouvfr/react-dsfr/ButtonsGroup` | Groupe de boutons |

## Patterns Avancés

### Header avec Navigation

```tsx
import { Header } from "@codegouvfr/react-dsfr/Header";

<Header
  brandTop={<>RÉPUBLIQUE<br/>FRANÇAISE</>}
  homeLinkProps={{ href: "/", title: "Accueil" }}
  serviceTitle="Nom du Service"
  serviceTagline="Description courte"
  quickAccessItems={[
    { iconId: "fr-icon-account-line", text: "Se connecter", linkProps: { href: "/login" } }
  ]}
  navigation={[
    { text: "Accueil", linkProps: { href: "/" }, isActive: true },
    { text: "Services", menuLinks: [
      { text: "Service 1", linkProps: { href: "/services/1" } },
      { text: "Service 2", linkProps: { href: "/services/2" } }
    ]}
  ]}
/>
```

### Button - Variantes

```tsx
import { Button } from "@codegouvfr/react-dsfr/Button";

// Primary (défaut)
<Button onClick={handleClick}>Action principale</Button>

// Secondary
<Button priority="secondary">Action secondaire</Button>

// Tertiary
<Button priority="tertiary">Action tertiaire</Button>

// Avec icône
<Button iconId="fr-icon-arrow-right-line" iconPosition="right">
  Continuer
</Button>

// Comme lien
<Button linkProps={{ href: "/page" }}>Lien stylé en bouton</Button>

// Icône seule
<Button title="Supprimer" iconId="fr-icon-delete-line" priority="secondary" />
```

### Modal avec createModal

```tsx
"use client";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";

const confirmModal = createModal({
  id: "confirm-modal",
  isOpenedByDefault: false
});

export function MyComponent() {
  return (
    <>
      {/* Bouton d'ouverture */}
      <Button nativeButtonProps={confirmModal.buttonProps}>
        Ouvrir la modale
      </Button>

      {/* Modale */}
      <confirmModal.Component
        title="Confirmation"
        buttons={[
          { children: "Annuler", doClosesModal: true, priority: "secondary" },
          { children: "Confirmer", doClosesModal: true }
        ]}
      >
        <p>Êtes-vous sûr de vouloir continuer ?</p>
      </confirmModal.Component>
    </>
  );
}
```

### Formulaire Accessible

```tsx
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

<form>
  <Input
    label="Nom complet"
    hintText="Prénom et nom de famille"
    nativeInputProps={{ required: true, name: "name" }}
  />

  <Input
    label="Adresse email"
    nativeInputProps={{ type: "email", required: true, name: "email" }}
    state="error"
    stateRelatedMessage="Veuillez saisir une adresse email valide"
  />

  <Select
    label="Sujet"
    nativeSelectProps={{ required: true, name: "subject" }}
  >
    <option value="">Sélectionnez un sujet</option>
    <option value="info">Demande d'information</option>
    <option value="support">Support technique</option>
  </Select>

  <Checkbox
    options={[{
      label: "J'accepte les conditions d'utilisation",
      nativeInputProps: { required: true, name: "consent" }
    }]}
  />

  <ButtonsGroup
    buttons={[
      { children: "Envoyer", type: "submit" },
      { children: "Annuler", priority: "secondary", type: "reset" }
    ]}
  />
</form>
```

### Gestion Consentement RGPD

```tsx
"use client";
import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const {
  ConsentBannerAndConsentManagement,
  FooterConsentManagementItem,
  FooterPersonalDataPolicyItem,
  useConsent
} = createConsentManagement({
  finalityDescription: () => ({
    analytics: {
      title: "Mesure d'audience",
      description: "Nous utilisons des cookies pour mesurer l'audience du site."
    }
  }),
  personalDataPolicyLinkProps: { href: "/politique-confidentialite" }
});

// Dans le layout principal
<ConsentBannerAndConsentManagement />

// Dans le Footer
<Footer bottomItems={[
  <FooterPersonalDataPolicyItem />,
  <FooterConsentManagementItem />
]} />
```

## Setup Projet

### Installation

```bash
# Créer projet Vite
npm create vite@latest demo-app -- --template react-ts
cd demo-app

# Installer dépendances
npm install @codegouvfr/react-dsfr react-router-dom

# OBLIGATOIRE : Copier assets DSFR dans public/
npx react-dsfr copy-static-assets

# OPTIONNEL : Optimiser bundle icônes
npx react-dsfr update-icons
```

### Configuration index.html - ⚠️ CRITIQUE

**ATTENTION** : Le CSS DSFR n'est PAS injecté automatiquement. Vous DEVEZ ajouter les liens CSS manuellement dans `index.html`, sinon le site s'affichera sans aucun style !

```html
<!doctype html>
<html lang="fr" data-fr-scheme="system">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/dsfr/favicon/favicon.svg" />
    <link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/dsfr/favicon/manifest.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000091" />
    <title>Mon Application DSFR</title>

    <!-- ⚠️ OBLIGATOIRE : CSS DSFR - Sans ces lignes, aucun style ne sera appliqué ! -->
    <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
    <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Points clés** :
- `data-fr-scheme="system"` : Active le mode sombre automatique selon les préférences système
- `/dsfr/dsfr.min.css` : Styles principaux DSFR (typographie, composants, grille)
- `/dsfr/utility/icons/icons.min.css` : Icônes Remix Icon utilisées par DSFR

### Configuration main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

startReactDsfr({
  defaultColorScheme: "system", // "light" | "dark" | "system"
  Link: ({ href, ...props }) => <a href={href} {...props} />
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## Ressources

| Ressource | URL | Usage |
|-----------|-----|-------|
| Documentation react-dsfr | https://react-dsfr.codegouv.studio/ | Référence principale |
| Composants (Storybook) | https://components.react-dsfr.codegouv.studio/ | Exemples interactifs |
| DSFR officiel | https://www.systeme-de-design.gouv.fr/ | Spécifications design |
| GitHub react-dsfr | https://github.com/codegouvfr/react-dsfr | Code source |
| Context7 ID | `/codegouvfr/react-dsfr` | Pour requêtes Context7 |

## Commandes Personnalisées

Ce projet inclut des commandes slash pour accélérer le développement :

| Commande | Description |
|----------|-------------|
| `/dsfr:component` | Créer un composant DSFR React |
| `/dsfr:page` | Créer une page avec layout DSFR |
| `/dsfr:form` | Créer un formulaire accessible |
| `/dsfr:check` | Vérifier la conformité DSFR |
| `/dsfr:help` | Afficher l'aide des commandes |

## Checklist avant Commit

- [ ] Tous les composants utilisent `@codegouvfr/react-dsfr`
- [ ] Classes CSS : uniquement `fr-*` (via `fr.cx()`)
- [ ] Pas de CSS custom non justifié
- [ ] Accessibilité : navigation clavier testée
- [ ] Responsive : testé mobile/tablette/desktop
- [ ] TypeScript : pas d'erreurs de typage
- [ ] Formulaires : labels associés, messages d'erreur

## Troubleshooting

### ❌ Le site s'affiche sans style (HTML brut)

**Cause** : Les fichiers CSS DSFR ne sont pas liés dans `index.html`.

**Solution** : Ajouter dans `<head>` de `index.html` :
```html
<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
```

**Vérification** :
- `public/dsfr/dsfr.min.css` existe ? Sinon : `npx react-dsfr copy-static-assets`
- Le fichier est accessible ? Tester : `http://localhost:5173/dsfr/dsfr.min.css`

### ❌ Les icônes ne s'affichent pas

**Cause 1** : CSS icônes manquant
```html
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
```

**Cause 2** : Mauvais identifiant d'icône. Utiliser le format `fr-icon-[nom]-line` ou `fr-icon-[nom]-fill`.
Liste complète : https://www.systeme-de-design.gouv.fr/fondamentaux/icones

### ❌ Erreur "startReactDsfr must be called before React is rendered"

**Solution** : S'assurer que `startReactDsfr()` est appelé AVANT `ReactDOM.createRoot()` dans `main.tsx`.

### ❌ Le Header ne s'affiche pas correctement sur mobile

**Cause** : Le composant Header nécessite le JS DSFR pour le menu hamburger.
**Vérification** : La console affiche `dsfr : version X.X.X` au chargement. Si non, vérifier `startReactDsfr()`.

## Notes pour Claude

1. **Toujours consulter Context7** avant d'implémenter un composant :
   ```
   Context7 ID: /codegouvfr/react-dsfr
   ```

2. **Ne pas inventer de classes** : Si `fr-*` n'existe pas dans la doc, elle n'existe pas

3. **Demander confirmation** avant de créer du CSS custom

4. **Proposer des alternatives DSFR** si l'utilisateur demande quelque chose qui n'existe pas

5. **Vérifier les imports** : Toujours depuis `@codegouvfr/react-dsfr/[Component]`

6. **Vérifier index.html** : S'assurer que les CSS DSFR sont liés (cause n°1 de "site sans style")
