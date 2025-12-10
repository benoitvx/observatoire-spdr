import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@codegouvfr/react-dsfr/Header';
import Footer from '@codegouvfr/react-dsfr/Footer';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

startReactDsfr({ defaultColorScheme: 'system' });

export const metadata: Metadata = {
  title: 'Observatoire du SPDR',
  description: 'Tableau de bord public pour suivre la conformité des jeux de données du Service Public de la Donnée de Référence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.className}>
      <body>
        <Header
          brandTop="République"
          serviceTitle="Observatoire du SPDR"
          serviceTagline="Service Public de la Donnée de Référence"
          homeLinkProps={{ href: '/', title: "Accueil - Observatoire du SPDR" }}
          quickAccessItems={[
            {
              iconId: 'fr-icon-information-fill',
              linkProps: { href: '/a-propos' },
              text: 'À propos',
            },
          ]}
        />
        
        <main className="fr-container fr-mt-4w fr-mb-8w">
          {children}
        </main>
        
        <Footer
          accessibility="fully compliant"
          contentDescription="L'Observatoire du SPDR est un service public qui permet de suivre la conformité des jeux de données de référence."
          bottomItems={[
            {
              text: 'Mentions légales',
              linkProps: { href: '/mentions-legales' },
            },
            {
              text: 'Données personnelles',
              linkProps: { href: '/donnees-personnelles' },
            },
            {
              text: 'Gestion des cookies',
              linkProps: { href: '/cookies' },
            },
          ]}
          partnersLogos={{
            main: {
              imgUrl: '/logo-marianne.svg',
              alt: 'Logo de la République Française',
              linkProps: {
                href: 'https://www.gouvernement.fr',
                title: 'Site du gouvernement français'
              }
            }
          }}
          license={<>Sauf mention contraire, tous les contenus de ce site sont sous <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener noreferrer">licence etalab-2.0</a></>}
        />
      </body>
    </html>
  );
}