import type { Metadata } from 'next';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

startReactDsfr({ defaultColorScheme: 'system' });

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
    <html lang="fr">
      <body>
        <Header />

        <main className="fr-container fr-mt-4w fr-mb-8w">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
