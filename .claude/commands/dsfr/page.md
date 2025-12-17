# /dsfr:page - Créer une Page DSFR

Génère une page React avec le layout DSFR complet (Header, Footer, structure).

## Usage

```
/dsfr:page [NomPage] [--with-breadcrumb] [--with-sidebar] [--protected]
```

## Template de Base

```tsx
import { fr } from "@codegouvfr/react-dsfr/fr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

export function ${NomPage}Page() {
  return (
    <main id="content">
      <div className={fr.cx("fr-container", "fr-py-8w")}>
        {/* Breadcrumb si --with-breadcrumb */}
        <Breadcrumb
          currentPageLabel="${NomPage}"
          segments={[
            { label: "Accueil", linkProps: { href: "/" } }
          ]}
        />

        {/* Titre de page */}
        <h1 className={fr.cx("fr-h1", "fr-mb-4w")}>
          ${NomPage}
        </h1>

        {/* Contenu principal */}
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
            {/* Contenu */}
          </div>

          {/* Sidebar si --with-sidebar */}
          <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
            {/* Sidebar */}
          </div>
        </div>
      </div>
    </main>
  );
}
```

## Template avec Protection Auth

Si `--protected` est spécifié :

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fr } from "@codegouvfr/react-dsfr/fr";

export function ${NomPage}Page() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={fr.cx("fr-container", "fr-py-8w")}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main id="content">
      {/* ... contenu de la page ... */}
    </main>
  );
}
```

## Structure Responsive

### Layout Standard (sans sidebar)
```
┌──────────────────────────────────────┐
│ fr-container fr-py-8w                │
│ ┌──────────────────────────────────┐ │
│ │ Breadcrumb                       │ │
│ ├──────────────────────────────────┤ │
│ │ h1 - Titre                       │ │
│ ├──────────────────────────────────┤ │
│ │ fr-col-12                        │ │
│ │ Contenu principal                │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### Layout avec Sidebar
```
Desktop (md+):
┌────────────────────┬─────────────┐
│ fr-col-md-8        │ fr-col-md-4 │
│ Contenu            │ Sidebar     │
└────────────────────┴─────────────┘

Mobile:
┌──────────────────────────────────┐
│ fr-col-12 - Contenu              │
├──────────────────────────────────┤
│ fr-col-12 - Sidebar              │
└──────────────────────────────────┘
```

## Composants Courants par Type de Page

| Type | Composants recommandés |
|------|----------------------|
| Liste | Tabs, Tile, Pagination, Badge |
| Détail | Breadcrumb, Stepper, Accordion, Button |
| Formulaire | Input, Select, Checkbox, ButtonsGroup, Alert |
| Dashboard | Card, Table, Badge, Notice |
| Contenu | CallOut, Quote, Highlight, Summary |

## Arguments

| Argument | Description |
|----------|-------------|
| `NomPage` | Nom de la page en PascalCase |
| `--with-breadcrumb` | Ajouter le fil d'Ariane |
| `--with-sidebar` | Ajouter une colonne latérale |
| `--protected` | Page nécessitant authentification |

$ARGUMENTS
