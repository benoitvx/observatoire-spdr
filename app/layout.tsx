import type { Metadata } from 'next';
import { DsfrProviderBase, StartDsfrOnHydration } from '@codegouvfr/react-dsfr/next-app-router';
import { createGetHtmlAttributes } from '@codegouvfr/react-dsfr/next-app-router/getHtmlAttributes';
import { getScriptToRunAsap } from '@codegouvfr/react-dsfr/useIsDark/scriptToRunAsap';
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import { Display } from '@codegouvfr/react-dsfr/Display';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

declare module "@codegouvfr/react-dsfr/next-app-router" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const defaultColorScheme = "system" as const;

const { getHtmlAttributes } = createGetHtmlAttributes({ defaultColorScheme });

export const metadata: Metadata = {
  title: 'Observatoire du SPDR',
  description: 'Suivi de la conformité des 9 jeux de données de référence',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html {...getHtmlAttributes({ lang: "fr" })}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getScriptToRunAsap({
              defaultColorScheme,
              nonce: undefined,
              trustedTypesPolicyName: "react-dsfr",
            }),
          }}
        />
        <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
      </head>
      <body>
        <DsfrProviderBase lang="fr" Link={Link} defaultColorScheme={defaultColorScheme}>
          <Header />

          <main className="fr-container fr-mt-4w fr-mb-8w">
            {children}
          </main>

          <Footer />
          <Display />
          <StartDsfrOnHydration />
        </DsfrProviderBase>
      </body>
    </html>
  );
}
