import { getAllDatasets } from '../lib/api/datagouv';
import { DATASETS } from '../lib/config/datasets';
import { calculateCompliance } from '../lib/compliance/calculator';
import { ComplianceTable } from '../components/dashboard/ComplianceTable';
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

        <ComplianceTable
          datasets={datasets}
          configs={DATASETS}
          complianceResults={complianceResults}
        />
      </div>
    </div>
  );
}
