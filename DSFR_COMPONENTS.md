# Référence Rapide Composants DSFR React

Guide de référence des composants `@codegouvfr/react-dsfr` les plus utilisés.

> ⚠️ **Prérequis** : Assurez-vous que les CSS DSFR sont liés dans `index.html` :
> ```html
> <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
> <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
> ```
> Sans ces lignes, aucun composant ne sera stylé ! Voir `CLAUDE.md` pour le setup complet.

## Navigation & Layout

### Header
```tsx
import { Header } from "@codegouvfr/react-dsfr/Header";

<Header
  brandTop={<>RÉPUBLIQUE<br/>FRANÇAISE</>}
  homeLinkProps={{ href: "/", title: "Accueil" }}
  serviceTitle="Nom du Service"
  serviceTagline="Description"
  quickAccessItems={[
    { iconId: "fr-icon-account-line", text: "Connexion", linkProps: { href: "/login" } }
  ]}
  navigation={[
    { text: "Accueil", linkProps: { href: "/" }, isActive: true },
    { text: "Services", menuLinks: [
      { text: "Service 1", linkProps: { href: "/services/1" } }
    ]}
  ]}
/>
```

### Footer
```tsx
import { Footer } from "@codegouvfr/react-dsfr/Footer";

<Footer
  brandTop={<>RÉPUBLIQUE<br/>FRANÇAISE</>}
  homeLinkProps={{ href: "/", title: "Accueil" }}
  accessibility="partially compliant"
  contentDescription="Description du service..."
  bottomItems={[
    { text: "Accessibilité", linkProps: { href: "/accessibilite" } },
    { text: "Mentions légales", linkProps: { href: "/mentions-legales" } }
  ]}
/>
```

### Breadcrumb
```tsx
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

<Breadcrumb
  currentPageLabel="Page actuelle"
  segments={[
    { label: "Accueil", linkProps: { href: "/" } },
    { label: "Section", linkProps: { href: "/section" } }
  ]}
/>
```

### Tabs
```tsx
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";

<Tabs
  tabs={[
    { label: "Onglet 1", content: <p>Contenu 1</p> },
    { label: "Onglet 2", content: <p>Contenu 2</p> }
  ]}
/>
```

## Boutons & Actions

### Button
```tsx
import { Button } from "@codegouvfr/react-dsfr/Button";

// Variantes
<Button>Primary</Button>
<Button priority="secondary">Secondary</Button>
<Button priority="tertiary">Tertiary</Button>
<Button priority="tertiary no outline">Tertiary sans bordure</Button>

// Avec icône
<Button iconId="fr-icon-arrow-right-line" iconPosition="right">Continuer</Button>

// Comme lien
<Button linkProps={{ href: "/page" }}>Lien</Button>

// Icône seule
<Button title="Supprimer" iconId="fr-icon-delete-line" />

// Tailles
<Button size="small">Petit</Button>
<Button size="medium">Moyen (défaut)</Button>
<Button size="large">Grand</Button>
```

### ButtonsGroup
```tsx
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

<ButtonsGroup
  buttons={[
    { children: "Valider", type: "submit" },
    { children: "Annuler", priority: "secondary", type: "reset" }
  ]}
  inlineLayoutWhen="always" // ou "sm and up", "md and up", "lg and up", "never"
/>
```

## Formulaires

### Input
```tsx
import { Input } from "@codegouvfr/react-dsfr/Input";

// Texte
<Input
  label="Nom"
  hintText="Votre nom complet"
  nativeInputProps={{ name: "name", required: true }}
/>

// Email
<Input
  label="Email"
  nativeInputProps={{ type: "email", name: "email" }}
/>

// Avec erreur
<Input
  label="Email"
  state="error"
  stateRelatedMessage="Email invalide"
  nativeInputProps={{ type: "email" }}
/>

// Textarea
<Input
  label="Message"
  textArea
  nativeTextAreaProps={{ rows: 5, name: "message" }}
/>
```

### Select
```tsx
import { Select } from "@codegouvfr/react-dsfr/Select";

<Select
  label="Sujet"
  nativeSelectProps={{ name: "subject", required: true }}
>
  <option value="">Sélectionnez</option>
  <option value="info">Information</option>
  <option value="support">Support</option>
</Select>
```

### Checkbox
```tsx
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

<Checkbox
  legend="Préférences"
  options={[
    { label: "Newsletter", nativeInputProps: { name: "newsletter" } },
    { label: "Notifications", nativeInputProps: { name: "notifications" } }
  ]}
/>

// Simple
<Checkbox
  options={[{
    label: "J'accepte les CGU",
    nativeInputProps: { name: "consent", required: true }
  }]}
/>
```

### RadioButtons
```tsx
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

<RadioButtons
  legend="Civilité"
  name="civility"
  options={[
    { label: "Madame", nativeInputProps: { value: "mme" } },
    { label: "Monsieur", nativeInputProps: { value: "m" } }
  ]}
/>
```

### ToggleSwitch
```tsx
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";

<ToggleSwitch
  label="Activer les notifications"
  checked={isEnabled}
  onChange={checked => setIsEnabled(checked)}
/>
```

## Feedback & Alertes

### Alert
```tsx
import { Alert } from "@codegouvfr/react-dsfr/Alert";

<Alert severity="info" title="Information" description="Message informatif" />
<Alert severity="success" title="Succès" description="Action réussie" />
<Alert severity="warning" title="Attention" description="Point de vigilance" />
<Alert severity="error" title="Erreur" description="Une erreur est survenue" />

// Fermable
<Alert
  severity="info"
  title="Information"
  description="Message"
  closable
  onClose={() => console.log("Fermé")}
/>

// Petite taille
<Alert severity="info" small description="Message court" />
```

### Notice
```tsx
import { Notice } from "@codegouvfr/react-dsfr/Notice";

<Notice title="Avis important" description="Description de l'avis" />
```

### Badge
```tsx
import { Badge } from "@codegouvfr/react-dsfr/Badge";

<Badge severity="info">Nouveau</Badge>
<Badge severity="success">Validé</Badge>
<Badge severity="warning">En attente</Badge>
<Badge severity="error">Rejeté</Badge>
<Badge noIcon>Sans icône</Badge>
<Badge small>Petit</Badge>
```

### Tag
```tsx
import { Tag } from "@codegouvfr/react-dsfr/Tag";

<Tag>Tag simple</Tag>
<Tag small>Petit tag</Tag>
<Tag linkProps={{ href: "/category" }}>Tag lien</Tag>
<Tag dismissible onClose={() => {}}>Fermable</Tag>
```

## Contenu & Cartes

### Card
```tsx
import { Card } from "@codegouvfr/react-dsfr/Card";

<Card
  title="Titre de la carte"
  desc="Description de la carte"
  linkProps={{ href: "/detail" }}
  imageUrl="/image.jpg"
  imageAlt="Description image"
  footer={<Badge>Nouveau</Badge>}
/>

// Horizontale
<Card
  horizontal
  title="Titre"
  desc="Description"
  linkProps={{ href: "/" }}
/>
```

### Tile
```tsx
import { Tile } from "@codegouvfr/react-dsfr/Tile";

<Tile
  title="Titre de la tuile"
  desc="Description"
  linkProps={{ href: "/service" }}
  imageUrl="/icon.svg"
/>

// Horizontale
<Tile horizontal title="Titre" linkProps={{ href: "/" }} />
```

### Accordion
```tsx
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";

<Accordion
  label="Question 1"
  defaultExpanded
>
  Réponse 1
</Accordion>

<Accordion label="Question 2">
  Réponse 2
</Accordion>
```

### CallOut
```tsx
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";

<CallOut
  title="Mise en avant"
  iconId="fr-icon-information-fill"
>
  Contenu important à mettre en avant.
</CallOut>
```

### Quote
```tsx
import { Quote } from "@codegouvfr/react-dsfr/Quote";

<Quote
  text="Citation importante"
  author="Auteur"
  source="Source"
/>
```

### Highlight
```tsx
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";

<Highlight>
  Texte mis en évidence
</Highlight>
```

## Tableaux & Données

### Table
```tsx
import { Table } from "@codegouvfr/react-dsfr/Table";

<Table
  caption="Titre du tableau"
  headers={["Nom", "Email", "Rôle"]}
  data={[
    ["Jean Dupont", "jean@example.fr", "Admin"],
    ["Marie Martin", "marie@example.fr", "User"]
  ]}
/>
```

### Pagination
```tsx
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";

<Pagination
  count={10}
  defaultPage={1}
  getPageLinkProps={pageNumber => ({
    href: `/list?page=${pageNumber}`
  })}
/>
```

## Processus & Navigation

### Stepper
```tsx
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";

<Stepper
  currentStep={2}
  stepCount={4}
  title="Étape 2 : Informations personnelles"
  nextTitle="Étape suivante : Documents"
/>
```

## Modales

### Modal avec createModal
```tsx
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";

const modal = createModal({
  id: "my-modal",
  isOpenedByDefault: false
});

// Utilisation
<Button nativeButtonProps={modal.buttonProps}>Ouvrir</Button>

<modal.Component
  title="Titre de la modale"
  buttons={[
    { children: "Annuler", doClosesModal: true, priority: "secondary" },
    { children: "Confirmer", doClosesModal: true }
  ]}
>
  Contenu de la modale
</modal.Component>

// Contrôle programmatique
modal.open();
modal.close();
```

## Utilitaires CSS

### fr.cx() - Classes DSFR
```tsx
import { fr } from "@codegouvfr/react-dsfr/fr";

// Combinaison de classes
<div className={fr.cx("fr-container", "fr-mt-4w", "fr-mb-2w")}>

// Grid responsive
<div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
  <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
```

### Espacements DSFR
| Classe | Valeur |
|--------|--------|
| `fr-m-1w` | margin: 0.25rem |
| `fr-m-2w` | margin: 0.5rem |
| `fr-m-4w` | margin: 1rem |
| `fr-m-6w` | margin: 1.5rem |
| `fr-m-8w` | margin: 2rem |

Variantes : `fr-mt-*` (top), `fr-mb-*` (bottom), `fr-ml-*` (left), `fr-mr-*` (right), `fr-mx-*` (horizontal), `fr-my-*` (vertical), `fr-p-*` (padding)

### Grid Responsive
| Classe | Breakpoint |
|--------|------------|
| `fr-col-*` | Toujours |
| `fr-col-sm-*` | ≥576px |
| `fr-col-md-*` | ≥768px |
| `fr-col-lg-*` | ≥992px |
| `fr-col-xl-*` | ≥1248px |

## Ressources

- **Documentation** : https://react-dsfr.codegouv.studio/
- **Storybook** : https://components.react-dsfr.codegouv.studio/
- **DSFR officiel** : https://www.systeme-de-design.gouv.fr/
- **Context7 ID** : `/codegouvfr/react-dsfr`
