import Link from 'next/link';
import { getAllDatasets } from '../lib/api/datagouv';
import { DATASETS } from '../lib/config/datasets';
import { calculateCompliance } from '../lib/compliance/calculator';
import { ComplianceBadge } from '../components/ComplianceBadge';
import Button from '@codegouvfr/react-dsfr/Button';
import { fr } from '@codegouvfr/react-dsfr/fr';

export default async function HomePage() {
  const datasets = await getAllDatasets();
  const fetchedAt = new Date();

  // Calculer la conformité pour chaque dataset
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

        <div className="fr-table fr-table--bordered fr-table--row-hover">
          <table>
            <thead>
              <tr>
                <th scope="col">Jeu de données</th>
                <th scope="col">Méta ({complianceResults[0]?.metadata.score || 0}/8)</th>
                <th scope="col">MAJ</th>
                <th scope="col">Format</th>
                <th scope="col">Téléchargement</th>
                <th scope="col">API</th>
                <th scope="col">Score global</th>
                <th scope="col">Actions</th>
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
                      <small>{config.fullName}</small>
                    </td>
                    <td>
                      <div className={fr.cx("fr-mb-1v")}>
                        <ComplianceBadge status={compliance.metadata.status} />
                      </div>
                      <small>{compliance.metadata.score}/8</small>
                    </td>
                    <td>
                      <div className={fr.cx("fr-mb-1v")}>
                        <ComplianceBadge status={compliance.update.status} />
                      </div>
                      <small>{compliance.update.daysSinceUpdate} jours</small>
                    </td>
                    <td>
                      <div className={fr.cx("fr-mb-1v")}>
                        <ComplianceBadge status={compliance.format.status} />
                      </div>
                      <small>{compliance.format.formats.length} format(s)</small>
                    </td>
                    <td>
                      <div className={fr.cx("fr-mb-1v")}>
                        <ComplianceBadge status={compliance.download.status} />
                      </div>
                      <small>{compliance.download.resourceCount} ressource(s)</small>
                    </td>
                    <td>
                      {compliance.api.status === 'not_applicable' ? (
                        <small>N/A</small>
                      ) : (
                        <div className={fr.cx("fr-mb-1v")}>
                          <ComplianceBadge status={compliance.api.status} />
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="fr-progress fr-progress--sm fr-mb-1v">
                        <div
                          className="fr-progress__bar"
                          style={{ width: `${compliance.globalScore}%` }}
                          role="progressbar"
                          aria-valuenow={compliance.globalScore}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <small>{compliance.globalScore}%</small>
                    </td>
                    <td>
                      <Link href={`/dataset/${config.slug}`} passHref legacyBehavior>
                        <Button priority="secondary" size="small">
                          Voir les détails
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className={fr.cx("fr-mt-4w")}>
          <h3>Légende</h3>
          <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
            <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
              <div className={fr.cx("fr-mb-1w")}>
                <ComplianceBadge status="compliant" label="Conforme" />
              </div>
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
              <div className={fr.cx("fr-mb-1w")}>
                <ComplianceBadge status="warning" label="Avertissement" />
              </div>
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
              <div className={fr.cx("fr-mb-1w")}>
                <ComplianceBadge status="non_compliant" label="Non conforme" />
              </div>
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
              <div className={fr.cx("fr-mb-1w")}>
                <ComplianceBadge status="not_applicable" label="Non applicable" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}