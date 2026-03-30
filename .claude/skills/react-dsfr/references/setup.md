# Setup react-dsfr par framework

## Installation

```bash
npm install --save @codegouvfr/react-dsfr
# ou yarn add @codegouvfr/react-dsfr
# ou pnpm add @codegouvfr/react-dsfr (requiert .npmrc avec enable-pre-post-scripts=true)
```

## Vite

1. Copier les assets DSFR dans le dossier `public/` et ajouter les scripts dans `package.json` :
```bash
cp -r node_modules/@codegouvfr/react-dsfr/dsfr public/dsfr
```

Pour automatiser cette copie après chaque `npm install`, ajouter un script `postinstall` :
```json
{
  "scripts": {
    "postinstall": "cp -r node_modules/@codegouvfr/react-dsfr/dsfr public/dsfr",
    "predev": "react-dsfr update-icons",
    "prebuild": "react-dsfr update-icons"
  }
}
```

2. Dans `index.html`, ajouter les assets DSFR (CSS, favicon) :
```html
<link rel="stylesheet" href="/dsfr/dsfr.min.css" />
<link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
<link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
<link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
```

3. Dans `src/main.tsx` :
```tsx
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Link } from "react-router-dom";

startReactDsfr({ defaultColorScheme: "system", Link });

declare module "@codegouvfr/react-dsfr/spa" {
    interface RegisterLink {
        Link: typeof Link;
    }
}
```

## Next.js App Router

1. Utiliser le starter template ou configurer manuellement.

2. Dans `src/app/layout.tsx` :
```tsx
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "@codegouvfr/react-dsfr/next-appdir/StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const lang = "fr";
    return (
        <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
            <head>
                <StartDsfr />
                <DsfrHead Link={Link} />
            </head>
            <body>
                <DsfrProvider lang={lang}>{children}</DsfrProvider>
            </body>
        </html>
    );
}
```

### Prévention du flash dark mode (Next.js App Router)

Le flash blanc au chargement en mode sombre est un problème courant. Trois éléments sont **indispensables** pour l'éviter :

1. **`getHtmlAttributes()`** : définit `data-fr-scheme` et `data-fr-theme` sur la balise `<html>` côté SSR, pour que le CSS DSFR applique les bonnes couleurs dès le premier rendu.

2. **`<StartDsfr />`** : injecte un script inline qui s'exécute **avant** le CSS. Ce script lit `localStorage` (préférence utilisateur) ou `prefers-color-scheme` (préférence système) et applique le bon thème immédiatement.

3. **`<DsfrHead />`** : charge les feuilles de style DSFR dans le bon ordre.

**Piège courant** : utiliser `DsfrProviderBase` seul (sans `getHtmlAttributes` ni `StartDsfr`) provoque un flash car le thème n'est résolu que côté client après hydratation. Il faut impérativement utiliser le triplet `getHtmlAttributes` + `StartDsfr` + `DsfrHead` dans le layout racine.

```tsx
// ❌ PROVOQUE UN FLASH - Ne pas faire
<html lang="fr" suppressHydrationWarning>
    <body>
        <DsfrProviderBase defaultColorScheme="system">{children}</DsfrProviderBase>
    </body>
</html>

// ✅ PAS DE FLASH - Setup correct
<html {...getHtmlAttributes({ defaultColorScheme, lang })}>
    <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
    </head>
    <body>
        <DsfrProvider lang={lang}>{children}</DsfrProvider>
    </body>
</html>
```

## Next.js Pages Router

1. Ajouter dans `next.config.js` :
```js
module.exports = {
    transpilePackages: ["@codegouvfr/react-dsfr", "tss-react"],
};
```

2. Configurer `pages/_app.tsx` et `pages/_document.tsx` avec `createNextDsfrIntegrationApi` :
```tsx
import Link from "next/link";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";

declare module "@codegouvfr/react-dsfr/next-pagesdir" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
    defaultColorScheme: "system",
    Link,
});

// Dans _app.tsx : export default withDsfr(App);
// Dans _document.tsx : utiliser dsfrDocumentApi
```

## Create React App

1. Scripts dans `package.json` :
```json
{
  "scripts": {
    "postinstall": "react-dsfr update-icons",
    "prestart": "react-dsfr update-icons",
    "prebuild": "react-dsfr update-icons"
  }
}
```

2. Configurer Jest : `transformIgnorePatterns: []`

3. Lier les assets DSFR dans `public/index.html` et initialiser dans `src/index.tsx` avec `startReactDsfr`.
