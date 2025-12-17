import Link from 'next/link';
import { getAllDatasets } from '../lib/api/datagouv';
import { DATASETS } from '../lib/config/datasets';
import { calculateCompliance } from '../lib/compliance/calculator';
import { ComplianceBadge } from '../components/ComplianceBadge';
import { fr } from '@codegouvfr/react-dsfr/fr';

export default async function HomePage() {
  const datasets = await getAllDatasets();
  const fetchedAt = new Date();

  const complianceResults = datasets.map(dataset => {
    const config = DATASETS.find(d => d.id === dataset.id);
    if (!config) return null;
    return calculateCompliance(dataset, config);
  }).filter((result): result is NonNullable<typeof result> => result !== null);

  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-12")}>
        <h1>Observatoire du Service Public de la Donnée de Référence</h1>
        <p className={fr.cx("fr-text--lead", "fr-mb-4w")}>
          Suivez la conformité et la qualité des 9 jeux de données de référence du SPDR.
        </p>

        <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-4w")}>
          <p className={fr.cx("fr-alert__title")}>
            Dernière actualisation : {fetchedAt.toLocaleString('fr-FR')}
          </p>
        </div>

        <div className="fr-table" id="table-compliance">
          <table>
            <caption>État de conformité des 9 jeux de données de référence</caption>
            <thead>
              <tr>
                <th scope="col" style={{ minWidth: '280px' }}>Jeu de données</th>
                <th scope="col">Méta (8/8)</th>
                <th scope="col">MAJ</th>
                <th scope="col">Format</th>
                <th scope="col">Téléchargement</th>
                <th scope="col">API</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {complianceResults.map((compliance) => {
                const dataset = datasets.find(d => d.id === compliance.datasetId);
                const config = DATASETS.find(d => d.id === compliance.datasetId);

                if (!dataset || !config) return null;

                return (
                  <tr key={compliance.datasetId}>
                    <td>
                      <Link href={`/dataset/${config.slug}`} className={fr.cx("fr-link")}>
                        <strong>{dataset.title}</strong>
                      </Link>
                      <br />
                      <span className="fr-text--xs fr-text--mention-grey">
                        {config.fullName}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <ComplianceBadge
                        status={compliance.metadata.status}
                        detail={`${compliance.metadata.score}/8`}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <ComplianceBadge
                        status={compliance.update.status}
                        detail={`${compliance.update.daysSinceUpdate} jours`}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <ComplianceBadge
                        status={compliance.format.status}
                        detail={`${compliance.format.formats.length} format(s)`}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <ComplianceBadge
                        status={compliance.download.status}
                        detail={`${compliance.download.resourceCount} ressource(s)`}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {compliance.api.status === 'not_applicable' ? (
                        <span className="fr-text--sm">N/A</span>
                      ) : (
                        <ComplianceBadge status={compliance.api.status} />
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <strong>{compliance.globalScore}%</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
