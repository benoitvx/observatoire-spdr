import Link from 'next/link';
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb';
import { fr } from '@codegouvfr/react-dsfr/fr';

export const metadata = {
  title: 'Mentions légales - Observatoire du SPDR',
  description: 'Mentions légales de l\'Observatoire du Service Public de la Donnée de Référence'
};

export default function MentionsLegalesPage() {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-12")}>
        <Breadcrumb
          homeLinkProps={{ href: "/" }}
          segments={[]}
          currentPageLabel="Mentions légales"
        />

        <h1>Mentions légales</h1>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Éditeur</h2>
          <p>
            L&apos;Observatoire du Service Public de la Donnée de Référence (SPDR) est édité par la
            Direction interministérielle du numérique (DINUM).
          </p>
          <address>
            DINUM<br />
            20 avenue de Ségur<br />
            75007 Paris<br />
            France
          </address>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Directeur de la publication</h2>
          <p>Le directeur de la publication est le Directeur interministériel du numérique.</p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Hébergement</h2>
          <p>Ce site est hébergé par :</p>
          <address>
            Vercel Inc.<br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789<br />
            États-Unis
          </address>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Accessibilité</h2>
          <p>
            La conformité aux normes d&apos;accessibilité numérique est un objectif ultérieur.
            En attendant, si vous rencontrez un défaut d&apos;accessibilité vous empêchant d&apos;accéder
            à un contenu ou une fonctionnalité du site, merci de nous contacter
            à l&apos;adresse <a href="mailto:contact@data.gouv.fr">contact@data.gouv.fr</a>.
          </p>
          <p>
            Si vous n&apos;obtenez pas de réponse rapide de notre part, vous êtes en droit de faire
            parvenir vos doléances ou une demande de saisine au Défenseur des droits.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Sécurité</h2>
          <p>
            Le site est protégé par un certificat électronique, matérialisé pour la plupart des cas
            par un cadenas dans la barre d&apos;adresse et le protocole HTTPS.
          </p>
          <p>
            L&apos;Observatoire du SPDR ne vous demandera jamais vos informations personnelles
            par courriel non sollicité.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Contact</h2>
          <p>
            Pour toute question relative à l&apos;Observatoire du SPDR, vous pouvez nous contacter
            à l&apos;adresse : <a href="mailto:contact@data.gouv.fr"><strong>contact@data.gouv.fr</strong></a>
          </p>
        </section>

        <hr className={fr.cx("fr-mt-4w", "fr-mb-2w")} />

        <div className={fr.cx("fr-mt-4w")}>
          <Link href="/" className={fr.cx("fr-link", "fr-link--icon-left", "fr-icon-arrow-left-line")}>
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
