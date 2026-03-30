import Link from 'next/link';
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb';
import { fr } from '@codegouvfr/react-dsfr/fr';

export const metadata = {
  title: 'Conditions générales d\'utilisation - Observatoire du SPDR',
  description: 'Conditions générales d\'utilisation de l\'Observatoire du Service Public de la Donnée de Référence'
};

export default function CguPage() {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-12")}>
        <Breadcrumb
          homeLinkProps={{ href: "/" }}
          segments={[]}
          currentPageLabel="Conditions générales d'utilisation"
        />

        <h1>Conditions générales d'utilisation</h1>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Présentation</h2>
          <p>
            L'Observatoire du Service Public de la Donnée de Référence (SPDR) est un service public
            numérique qui permet de suivre la conformité des 9 jeux de données de référence définis
            par la <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205649" target="_blank" rel="noopener noreferrer">
            loi pour une République Numérique</a> (2016, article 14).
          </p>
          <p>
            Le code source de l'application est libre et disponible sur{" "}
            <a href="https://github.com/benoitvx/observatoire-spdr" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Vocabulaire</h2>
          <ul>
            <li><strong>« Nous »</strong> désigne l'éditeur du service, la Direction interministérielle du numérique (DINUM).</li>
            <li><strong>« Vous »</strong> désigne toute personne utilisant l'Observatoire du SPDR.</li>
          </ul>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Absence de garantie</h2>
          <p>
            Les résultats affichés par l'Observatoire sont fournis à titre informatif. Ils sont calculés
            automatiquement à partir des données disponibles sur l'API de{" "}
            <a href="https://www.data.gouv.fr" target="_blank" rel="noopener noreferrer">data.gouv.fr</a> et
            ne constituent pas une évaluation officielle.
          </p>
          <p>
            L'Observatoire est mis à disposition sans garantie sur sa disponibilité. Nous nous efforçons
            de maintenir le service accessible en permanence, mais des interruptions peuvent survenir
            pour des raisons de maintenance ou techniques.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Vos données</h2>
          <p>
            L'Observatoire du SPDR ne collecte aucune donnée personnelle. Aucun compte utilisateur
            n'est nécessaire pour consulter le service.
          </p>
          <p>
            Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés.
            Aucun cookie de suivi ou de mesure d'audience n'est utilisé.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Évolutions du service</h2>
          <p>
            L'Observatoire peut évoluer sans préavis. Les présentes conditions d'utilisation peuvent
            être modifiées à tout moment. L'historique des modifications est consultable sur le dépôt GitHub du projet.
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Utilisation</h2>
          <p>
            L'utilisation de l'Observatoire est libre et gratuite. Elle ne nécessite aucune inscription.
          </p>
          <p>
            Nous nous réservons le droit de bloquer, sans préavis ni compensation, tout usage
            qui menacerait l'intégrité du service (attaque, scraping abusif, etc.).
          </p>
        </section>

        <section className={fr.cx("fr-mb-4w")}>
          <h2>Code source</h2>
          <p>
            Le code source de l'Observatoire est publié sous{" "}
            <a href="https://github.com/benoitvx/observatoire-spdr/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              licence MIT
            </a>.
            Les contenus du site, sauf mention contraire, sont sous{" "}
            <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener noreferrer">
              licence etalab-2.0
            </a>.
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
