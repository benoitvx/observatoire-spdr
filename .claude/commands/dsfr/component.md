# /dsfr:component - Créer un Composant DSFR React

Génère un composant React conforme au DSFR avec les bonnes pratiques.

## Usage

```
/dsfr:component [NomComposant] [--type button|card|form|layout|custom]
```

## Comportement

1. **Vérifier l'existence** dans @codegouvfr/react-dsfr via Context7
2. **Si existe** : Afficher l'exemple d'utilisation officiel
3. **Si custom nécessaire** : Générer avec classes DSFR et accessibilité

## Workflow

### Étape 1 : Vérification Context7

Avant de générer, chercher dans la documentation react-dsfr :
```
Context7 ID: /codegouvfr/react-dsfr
Topic: [nom du composant demandé]
```

### Étape 2 : Si composant existe

Afficher :
- Import correct depuis @codegouvfr/react-dsfr
- Props disponibles
- Exemple d'utilisation
- Lien vers documentation

### Étape 3 : Si composant custom nécessaire

Générer avec ce template :

```tsx
import { fr } from "@codegouvfr/react-dsfr/fr";
import type { ComponentProps } from "react";

export interface ${NomComposant}Props {
  /** Description de la prop */
  children?: React.ReactNode;
  /** Classes CSS additionnelles */
  className?: string;
}

/**
 * ${NomComposant} - Description du composant
 *
 * @example
 * <${NomComposant}>Contenu</${NomComposant}>
 */
export function ${NomComposant}({
  children,
  className,
  ...props
}: ${NomComposant}Props) {
  return (
    <div
      className={fr.cx("fr-component", className)}
      {...props}
    >
      {children}
    </div>
  );
}
```

## Règles de Génération

- ✅ Utiliser `fr.cx()` pour les classes CSS
- ✅ Typer avec TypeScript
- ✅ Documenter avec JSDoc
- ✅ Inclure attributs ARIA si interactif
- ✅ Supporter la prop `className` pour extension
- ❌ Ne pas créer de styles CSS custom
- ❌ Ne pas utiliser d'icônes externes

## Exemples

### Composant existant
```
/dsfr:component Button
→ Affiche l'utilisation de @codegouvfr/react-dsfr/Button
```

### Composant custom
```
/dsfr:component ServiceCard --type card
→ Génère un composant basé sur les patterns Card du DSFR
```

## Arguments

| Argument | Description |
|----------|-------------|
| `NomComposant` | Nom du composant en PascalCase |
| `--type` | Type de base : button, card, form, layout, custom |

$ARGUMENTS
