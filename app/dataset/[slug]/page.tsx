import { notFound } from 'next/navigation';
import { getDatasetBySlug } from '../../../lib/api/datagouv';
import { DATASETS } from '../../../lib/config/datasets';
import Badge from '@codegouvfr/react-dsfr/Badge';
import Button from '@codegouvfr/react-dsfr/Button';
import Link from 'next/link';
import { fr } from '@codegouvfr/react-dsfr/fr';

export default async function DatasetDetailPage({ params }: { params: { slug: string } }) {
  const dataset = await getDatasetBySlug(params.slug);
  
  if (!dataset) {
    notFound();
  }
  
  const config = DATASETS.find(d => d.id === dataset.id);
  
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-12")}>
        <div className={fr.cx("fr-breadcrumb", "fr-mb-4w")}>
          <ol className={fr.cx("fr-breadcrumb__list")}>
            <li>
              <Link href="/" className={fr.cx("fr-breadcrumb__link")}>Accueil</Link>
            </li>
            <li>
              <span className={fr.cx("fr-breadcrumb__link")} aria-current="page">{dataset.title}</span>
            </li>
          </ol>
        </div>

        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
            <h1>{dataset.title}</h1>
            <p className={fr.cx("fr-text--xl", "fr-mb-2w")}>{dataset.description}</p>

            <div className={fr.cx("fr-tags-group", "fr-mb-4w")}>
              {dataset.tags.map(tag => (
                <Badge key={tag} severity="info" small>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
            <div className={fr.cx("fr-card", "fr-card--no-border", "fr-card--horizontal", "fr-enlarge-link")}>
              <div className={fr.cx("fr-card__body")}>
                <div className={fr.cx("fr-card__content")}>
                  <h3 className={fr.cx("fr-card__title")}>
                    <span className="fr-icon-dashboard-fill fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                    Informations clés
                  </h3>
                  <div className={fr.cx("fr-card__desc")}>
                    <ul className="fr-m-0 fr-p-0 fr-list--bullet">
                      <li><strong>Producteur:</strong> {dataset.organization?.name || 'Inconnu'}</li>
                      <li><strong>Fréquence attendue:</strong> {config?.expectedFrequency || 'Non spécifié'}</li>
                      <li><strong>Dernière mise à jour:</strong> {new Date(dataset.last_modified).toLocaleDateString('fr-FR')}</li>
                      <li><strong>Licence:</strong> {dataset.license || 'Non spécifiée'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-4w")}>
          <div className={fr.cx("fr-col-12")}>
            <h2>Ressources disponibles</h2>
            <p>Ce jeu de données contient {dataset.resources.length} ressource(s).</p>

            <div className={fr.cx("fr-table", "fr-table--bordered")}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Format</th>
                    <th scope="col">Type</th>
                    <th scope="col">Taille</th>
                    <th scope="col">Dernière modification</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.resources.map(resource => (
                    <tr key={resource.id}>
                      <td>{resource.title}</td>
                      <td>{resource.format}</td>
                      <td>{resource.type}</td>
                      <td>{resource.filesize ? `${(resource.filesize / 1024 / 1024).toFixed(2)} Mo` : 'N/A'}</td>
                      <td>{resource.last_modified ? new Date(resource.last_modified).toLocaleDateString('fr-FR') : 'N/A'}</td>
                      <td>
                        <Button 
                          priority="secondary" 
                          size="small"
                          linkProps={{ href: resource.url, target: '_blank', rel: 'noopener noreferrer' }}
                        >
                          Accéder à la ressource
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-4w")}>
          <div className={fr.cx("fr-col-12")}>
            <Link href="/" passHref legacyBehavior>
              <Button priority="secondary" iconId="fr-icon-arrow-left-fill">
                Retour à la liste des datasets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}