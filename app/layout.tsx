import type { Metadata } from 'next';
import { DsfrProviderBase } from '@codegouvfr/react-dsfr/next-app-router';
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import Link from 'next/link';
import { Display } from '@codegouvfr/react-dsfr/Display';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

declare module "@codegouvfr/react-dsfr/next-app-router" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const defaultColorScheme = "system" as const;

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
    <html lang="fr" suppressHydrationWarning>
      <head>
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
        </DsfrProviderBase>
      </body>
    </html>
  );
}
