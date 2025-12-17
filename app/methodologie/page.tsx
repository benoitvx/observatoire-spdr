import Link from 'next/link';
import Badge from '@codegouvfr/react-dsfr/Badge';
import { fr } from '@codegouvfr/react-dsfr/fr';

export const metadata = {
  title: 'Méthodologie - Observatoire du SPDR',
  description: 'Méthodologie utilisée pour évaluer la conformité des jeux de données du Service Public de la Donnée de Référence'
};

export default function MethodologiePage() {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-12")}>
        {/* Fil d'Ariane */}
        <nav role="navigation" className={fr.cx("fr-breadcrumb")} aria-label="vous êtes ici :">
          <button className="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
            Voir le fil d'Ariane
          </button>
          <div className={fr.cx("fr-collapse")} id="breadcrumb">
            <ol className={fr.cx("fr-breadcrumb__list")}>
              <li>
                <Link href="/" className={fr.cx("fr-breadcrumb__link")}>Accueil</Link>
              </li>
              <li>
                <span className={fr.cx("fr-breadcrumb__link")} aria-current="page">Méthodologie</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Titre principal */}
        <h1>Méthodologie de l'Observatoire du SPDR</h1>

        {/* Introduction */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Introduction</h2>
          <p>
            L'Observatoire du Service Public de la Donnée de Référence (SPDR) est un tableau de bord public
            permettant de suivre la conformité des 9 jeux de données de référence définis par la loi pour une République Numérique.
          </p>
          <p>
            Cette page détaille la méthodologie utilisée pour évaluer la conformité de chaque jeu de données
            par rapport aux exigences réglementaires.
          </p>
        </section>

        {/* Cadre légal */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Cadre légal</h2>

          <h3>Textes de référence</h3>
          <p>L'Observatoire s'appuie sur les textes suivants :</p>
          <ul>
            <li>
              <strong>
                <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205148/2016-10-09" target="_blank" rel="noopener noreferrer">
                  Article 14 de la loi pour une République Numérique (2016)
                </a>
              </strong> : institue le Service Public de la Donnée de Référence
            </li>
            <li>
              <strong>
                <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033219118" target="_blank" rel="noopener noreferrer">
                  Article L321-4 du CRPA
                </a>
              </strong> : définit les données de référence
            </li>
            <li>
              <strong>
                <a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034194946" target="_blank" rel="noopener noreferrer">
                  Décret n° 2017-331 du 14 mars 2017
                </a>
              </strong> : précise les règles d'organisation
            </li>
            <li>
              <strong>
                <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034944648" target="_blank" rel="noopener noreferrer">
                  Arrêté du 14 juin 2017
                </a>
              </strong> : fixe les règles techniques et d'organisation
            </li>
          </ul>

          <h3>Les 9 jeux de données de référence</h3>
          <div className="fr-table" id="table-datasets">
            <table>
              <caption>Liste des 9 jeux de données de référence</caption>
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Producteur</th>
                  <th scope="col">Fréquence réglementaire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Base Sirene</strong> (SIREN, SIRET)</td>
                  <td>INSEE</td>
                  <td>Quotidienne (J+1 ouvré)</td>
                </tr>
                <tr>
                  <td><strong>Répertoire National des Associations</strong> (RNA)</td>
                  <td>Ministère de l'Intérieur</td>
                  <td>Mensuelle</td>
                </tr>
                <tr>
                  <td><strong>Plan Cadastral Informatisé</strong> (PCI)</td>
                  <td>DGFiP</td>
                  <td>Trimestrielle</td>
                </tr>
                <tr>
                  <td><strong>Référentiel à Grande Échelle</strong> (RGE)</td>
                  <td>IGN</td>
                  <td>Semestrielle</td>
                </tr>
                <tr>
                  <td><strong>Base Adresse Nationale</strong> (BAN)</td>
                  <td>DINUM / IGN</td>
                  <td>Hebdomadaire</td>
                </tr>
                <tr>
                  <td><strong>Organisation Administrative de l'État</strong></td>
                  <td>DILA</td>
                  <td>Hebdomadaire</td>
                </tr>
                <tr>
                  <td><strong>Répertoire des Métiers et Emplois</strong> (ROME)</td>
                  <td>France Travail</td>
                  <td>Quadrimestrielle</td>
                </tr>
                <tr>
                  <td><strong>Code Officiel Géographique</strong> (COG)</td>
                  <td>INSEE</td>
                  <td>Annuelle</td>
                </tr>
                <tr>
                  <td><strong>Registre Parcellaire Graphique</strong> (RPG)</td>
                  <td>IGN / ASP</td>
                  <td>Annuelle (fin campagne PAC)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Les 5 indicateurs */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Les 5 indicateurs de conformité</h2>
          <p>L'Observatoire évalue chaque jeu de données selon <strong>5 indicateurs</strong> :</p>
          <ol>
            <li><strong>Métadonnées</strong> (Méta)</li>
            <li><strong>Mise à jour</strong> (MAJ)</li>
            <li><strong>Format ouvert</strong></li>
            <li><strong>Téléchargement</strong></li>
            <li><strong>API</strong></li>
          </ol>
          <p>Un <strong>score global</strong> synthétise l'ensemble de ces indicateurs.</p>
        </section>

        {/* Indicateur 1 - Métadonnées */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>1. Métadonnées obligatoires</h2>

          <h3>Critère réglementaire</h3>
          <p>
            L'arrêté du 14 juin 2017 (Article 1) impose que l'administration renseigne <strong>au minimum 8 métadonnées</strong> :
          </p>
          <ol>
            <li><strong>Source et date de dernière mise à jour</strong> des données</li>
            <li><strong>Titre</strong> des données</li>
            <li><strong>Description</strong> des données</li>
            <li><strong>Périodicité</strong> de mise à disposition des données</li>
            <li><strong>Format</strong> des données</li>
            <li><strong>Couverture géographique</strong> des données</li>
            <li><strong>Licence</strong> de réutilisation applicable aux données</li>
            <li><strong>Mots-clés</strong> des données</li>
          </ol>

          <h3>Méthode de calcul</h3>
          <p>Pour chaque jeu de données, l'Observatoire vérifie la présence de ces 8 champs via l'API data.gouv.fr :</p>
          <pre className={fr.cx("fr-mb-2w")} style={{ background: 'var(--background-contrast-grey)', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`Score = Nombre de champs présents / 8

Exemple :
- Titre ✓
- Description ✓
- Date MAJ ✓
- Périodicité ✓
- Format ✓
- Couverture géographique ✓
- Licence ✓
- Mots-clés ✓

→ Score : 8/8`}
          </pre>

          <h3>Seuils de conformité</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Seuils de conformité des métadonnées</caption>
              <thead>
                <tr>
                  <th scope="col">Score</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>8/8 ou 7/8</strong></td>
                  <td>Conforme</td>
                  <td><Badge severity="success" small>CONFORME</Badge></td>
                </tr>
                <tr>
                  <td><strong>6/8 ou 5/8</strong></td>
                  <td>Attention</td>
                  <td><Badge severity="warning" small>AVERTISSEMENT</Badge></td>
                </tr>
                <tr>
                  <td><strong>&lt; 5/8</strong></td>
                  <td>Non conforme</td>
                  <td><Badge severity="error" small>NON CONFORME</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Indicateur 2 - Mise à jour */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>2. Respect de la périodicité de mise à jour</h2>

          <h3>Critère réglementaire</h3>
          <p>
            L'arrêté du 14 juin 2017 (Article 3) fixe une <strong>périodicité de mise à jour obligatoire</strong> pour chaque jeu de données.
          </p>

          <h3>Méthode de calcul</h3>
          <p>L'Observatoire calcule le nombre de jours écoulés depuis la dernière mise à jour :</p>
          <pre className={fr.cx("fr-mb-2w")} style={{ background: 'var(--background-contrast-grey)', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`Jours écoulés = Date du jour - Date de dernière mise à jour (last_modified)`}
          </pre>

          <h3>Seuils de conformité par fréquence</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Seuils de conformité par fréquence de mise à jour</caption>
              <thead>
                <tr>
                  <th scope="col">Fréquence</th>
                  <th scope="col"><Badge severity="success" small>CONFORME</Badge></th>
                  <th scope="col"><Badge severity="warning" small>AVERTISSEMENT</Badge></th>
                  <th scope="col"><Badge severity="error" small>NON CONFORME</Badge></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Quotidienne</strong></td>
                  <td>≤ 1 jour</td>
                  <td>2 à 3 jours</td>
                  <td>&gt; 3 jours</td>
                </tr>
                <tr>
                  <td><strong>Hebdomadaire</strong></td>
                  <td>≤ 7 jours</td>
                  <td>8 à 10 jours</td>
                  <td>&gt; 10 jours</td>
                </tr>
                <tr>
                  <td><strong>Mensuelle</strong></td>
                  <td>≤ 31 jours</td>
                  <td>32 à 45 jours</td>
                  <td>&gt; 45 jours</td>
                </tr>
                <tr>
                  <td><strong>Trimestrielle</strong></td>
                  <td>≤ 92 jours</td>
                  <td>93 à 100 jours</td>
                  <td>&gt; 100 jours</td>
                </tr>
                <tr>
                  <td><strong>Quadrimestrielle</strong></td>
                  <td>≤ 122 jours</td>
                  <td>123 à 135 jours</td>
                  <td>&gt; 135 jours</td>
                </tr>
                <tr>
                  <td><strong>Semestrielle</strong></td>
                  <td>≤ 183 jours</td>
                  <td>184 à 200 jours</td>
                  <td>&gt; 200 jours</td>
                </tr>
                <tr>
                  <td><strong>Annuelle</strong></td>
                  <td>≤ 365 jours</td>
                  <td>366 à 400 jours</td>
                  <td>&gt; 400 jours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Indicateur 3 - Format */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>3. Format ouvert</h2>

          <h3>Critère réglementaire</h3>
          <p>
            L'arrêté du 14 juin 2017 (Article 5) impose que les données soient disponibles en <strong>téléchargement intégral</strong>,
            ce qui implique l'utilisation de <strong>formats ouverts et réutilisables</strong>.
          </p>

          <h3>Formats ouverts reconnus</h3>
          <ul>
            <li><code>CSV</code> (Comma-Separated Values)</li>
            <li><code>JSON</code> (JavaScript Object Notation)</li>
            <li><code>GeoJSON</code> (format géographique)</li>
            <li><code>XML</code> (eXtensible Markup Language)</li>
            <li><code>Parquet</code> (format colonne)</li>
            <li><code>ODS</code> (OpenDocument Spreadsheet)</li>
            <li><code>TXT</code> (texte brut)</li>
            <li><code>SHP</code> (Shapefile)</li>
            <li><code>GPKG</code> (GeoPackage)</li>
            <li><code>GML</code> (Geography Markup Language)</li>
          </ul>

          <h3>Seuils de conformité</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Seuils de conformité des formats</caption>
              <thead>
                <tr>
                  <th scope="col">Condition</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Au moins 1 format ouvert</strong></td>
                  <td>Conforme</td>
                  <td><Badge severity="success" small>CONFORME</Badge></td>
                </tr>
                <tr>
                  <td><strong>Aucun format ouvert</strong></td>
                  <td>Non conforme</td>
                  <td><Badge severity="error" small>NON CONFORME</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Indicateur 4 - Téléchargement */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>4. Téléchargement intégral</h2>

          <h3>Critère réglementaire</h3>
          <p>L'arrêté du 14 juin 2017 (Article 5) impose que les données soient disponibles :</p>
          <blockquote className={fr.cx("fr-quote", "fr-mb-2w")}>
            <p>"en téléchargement dans leur intégralité, aisément réalisable par un traitement automatisé, en une ou plusieurs opérations"</p>
          </blockquote>

          <h3>Seuils de conformité</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Seuils de conformité du téléchargement</caption>
              <thead>
                <tr>
                  <th scope="col">Condition</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Au moins 1 ressource téléchargeable</strong></td>
                  <td>Conforme</td>
                  <td><Badge severity="success" small>CONFORME</Badge></td>
                </tr>
                <tr>
                  <td><strong>Aucune ressource téléchargeable</strong></td>
                  <td>Non conforme</td>
                  <td><Badge severity="error" small>NON CONFORME</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Indicateur 5 - API */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>5. Interface de programmation (API)</h2>

          <h3>Critère réglementaire</h3>
          <p>L'arrêté du 14 juin 2017 (Article 5) précise que les données doivent être disponibles :</p>
          <blockquote className={fr.cx("fr-quote", "fr-mb-2w")}>
            <p>"le cas échéant, par l'intermédiaire d'une interface de programmation"</p>
          </blockquote>
          <p>L'Article 4 ajoute que l'administration :</p>
          <blockquote className={fr.cx("fr-quote", "fr-mb-2w")}>
            <p>"s'efforce de garantir la disponibilité des données par l'intermédiaire d'une interface de programmation 99,5 % du temps mensuel"</p>
          </blockquote>

          <h3>APIs connues par jeu de données</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">APIs par jeu de données</caption>
              <thead>
                <tr>
                  <th scope="col">Jeu de données</th>
                  <th scope="col">API attendue ?</th>
                  <th scope="col">URL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SIRENE</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://api.insee.fr/entreprises/sirene/V3" target="_blank" rel="noopener noreferrer">api.insee.fr</a></td>
                </tr>
                <tr>
                  <td>RNA</td>
                  <td><Badge severity="error" small>NON</Badge></td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>PCI</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://cadastre.data.gouv.fr/api" target="_blank" rel="noopener noreferrer">cadastre.data.gouv.fr</a></td>
                </tr>
                <tr>
                  <td>RGE</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://data.geopf.fr/wfs" target="_blank" rel="noopener noreferrer">data.geopf.fr</a></td>
                </tr>
                <tr>
                  <td>BAN</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://api-adresse.data.gouv.fr" target="_blank" rel="noopener noreferrer">api-adresse.data.gouv.fr</a></td>
                </tr>
                <tr>
                  <td>Organisation Administrative</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://api-lannuaire.service-public.fr" target="_blank" rel="noopener noreferrer">api-lannuaire.service-public.fr</a></td>
                </tr>
                <tr>
                  <td>ROME</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://api.francetravail.io/partenaire/rome" target="_blank" rel="noopener noreferrer">api.francetravail.io</a></td>
                </tr>
                <tr>
                  <td>COG</td>
                  <td><Badge severity="success" small>OUI</Badge></td>
                  <td><a href="https://api.insee.fr/metadonnees/geo" target="_blank" rel="noopener noreferrer">api.insee.fr</a></td>
                </tr>
                <tr>
                  <td>RPG</td>
                  <td><Badge severity="error" small>NON</Badge></td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Seuils de conformité</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Seuils de conformité des APIs</caption>
              <thead>
                <tr>
                  <th scope="col">Condition</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Badge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>API attendue ET disponible</strong></td>
                  <td>Conforme</td>
                  <td><Badge severity="success" small>CONFORME</Badge></td>
                </tr>
                <tr>
                  <td><strong>API attendue MAIS absente</strong></td>
                  <td>Non conforme</td>
                  <td><Badge severity="error" small>NON CONFORME</Badge></td>
                </tr>
                <tr>
                  <td><strong>API non attendue</strong></td>
                  <td>Non applicable</td>
                  <td><Badge severity="info" small>N/A</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Score global */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Score global de conformité</h2>

          <h3>Méthode de calcul</h3>
          <p>Le <strong>score global</strong> synthétise l'ensemble des 5 indicateurs en un pourcentage de 0 à 100%.</p>
          <p>Chaque indicateur est converti en score :</p>
          <ul>
            <li><Badge severity="success" small>CONFORME</Badge> = 2 points</li>
            <li><Badge severity="warning" small>AVERTISSEMENT</Badge> = 1 point</li>
            <li><Badge severity="error" small>NON CONFORME</Badge> = 0 point</li>
            <li><Badge severity="info" small>N/A</Badge> = exclu du calcul</li>
          </ul>

          <pre className={fr.cx("fr-mb-2w")} style={{ background: 'var(--background-contrast-grey)', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`Score global = (Points obtenus / Points maximum possible) × 100

Avec :
- Points maximum = Nombre d'indicateurs applicables × 2`}
          </pre>

          <h3>Interprétation du score</h3>
          <div className="fr-table">
            <table>
              <caption className="fr-sr-only">Interprétation du score global</caption>
              <thead>
                <tr>
                  <th scope="col">Score</th>
                  <th scope="col">Interprétation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>90-100%</strong></td>
                  <td><Badge severity="success" small>Excellent</Badge> : conformité totale ou quasi-totale</td>
                </tr>
                <tr>
                  <td><strong>70-89%</strong></td>
                  <td><Badge severity="success" small>Bon</Badge> : conformité majoritaire avec quelques points d'amélioration</td>
                </tr>
                <tr>
                  <td><strong>50-69%</strong></td>
                  <td><Badge severity="warning" small>Moyen</Badge> : conformité partielle, amélioration nécessaire</td>
                </tr>
                <tr>
                  <td><strong>&lt; 50%</strong></td>
                  <td><Badge severity="error" small>Insuffisant</Badge> : non-conformité majeure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Source des données */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Source des données</h2>

          <h3>API data.gouv.fr</h3>
          <p>Toutes les données affichées dans l'Observatoire proviennent de l'<strong>API publique de data.gouv.fr</strong> :</p>
          <pre style={{ background: 'var(--background-contrast-grey)', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`https://www.data.gouv.fr/api/1/datasets/{id}/`}
          </pre>

          <h3>Fréquence de mise à jour</h3>
          <p>
            Les données affichées dans l'Observatoire sont <strong>actualisées en temps réel</strong> à chaque consultation,
            avec un cache de <strong>5 minutes</strong> pour éviter une surcharge de l'API.
          </p>
        </section>

        {/* Limites */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Limites de la méthodologie</h2>

          <h3>Détection des formats</h3>
          <p>
            La détection des formats ouverts se base sur l'<strong>extension déclarée</strong> dans les métadonnées.
            Il est possible qu'un fichier soit déclaré dans un format ouvert mais ne soit pas réellement exploitable.
          </p>

          <h3>Date de mise à jour</h3>
          <p>
            La date <code>last_modified</code> correspond à la <strong>dernière modification des métadonnées ou des ressources</strong> sur data.gouv.fr.
            Elle ne reflète pas toujours la date de production réelle des données.
          </p>

          <h3>Disponibilité des APIs</h3>
          <p>
            L'Observatoire vérifie la <strong>présence</strong> d'une API mais ne teste pas sa <strong>disponibilité effective</strong> ni sa <strong>performance</strong>.
          </p>
        </section>

        {/* Évolutions futures */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Évolutions futures</h2>

          <h3>Version 2</h3>
          <ul>
            <li><Badge severity="success" small>Prévu</Badge> <strong>Historisation</strong> des données de conformité</li>
            <li><Badge severity="success" small>Prévu</Badge> <strong>Graphiques d'évolution</strong> temporelle</li>
            <li><Badge severity="success" small>Prévu</Badge> <strong>Monitoring de disponibilité</strong> (uptime 99%)</li>
            <li><Badge severity="success" small>Prévu</Badge> Suivi des <strong>signalements</strong> et délais de réponse</li>
          </ul>

          <h3>Version 3</h3>
          <ul>
            <li><Badge severity="success" small>Prévu</Badge> Extension aux <strong>données de forte valeur</strong> (HVD)</li>
            <li><Badge severity="success" small>Prévu</Badge> <strong>API publique</strong> de l'Observatoire</li>
            <li><Badge severity="success" small>Prévu</Badge> <strong>Notifications</strong> aux producteurs</li>
            <li><Badge severity="success" small>Prévu</Badge> Tests de <strong>performance</strong> des APIs</li>
          </ul>
        </section>

        {/* Contact */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Contact et feedback</h2>

          <h3>Vous avez une question sur la méthodologie ?</h3>
          <p>Contactez l'équipe Etalab : <a href="mailto:contact@data.gouv.fr"><strong>contact@data.gouv.fr</strong></a></p>

          <h3>Vous souhaitez contribuer au code ?</h3>
          <p>
            Le code source de l'Observatoire est disponible sur GitHub :<br />
            <a href="https://github.com/benoitvx/observatoire-spdr" target="_blank" rel="noopener noreferrer">
              <strong>https://github.com/benoitvx/observatoire-spdr</strong>
            </a>
          </p>
        </section>

        {/* Références */}
        <section className={fr.cx("fr-mb-4w")}>
          <h2>Références</h2>
          <ul>
            <li>
              <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205148/2016-10-09" target="_blank" rel="noopener noreferrer">
                Loi pour une République Numérique (article 14)
              </a>
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033219118" target="_blank" rel="noopener noreferrer">
                Article L321-4 du CRPA
              </a>
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034194946" target="_blank" rel="noopener noreferrer">
                Décret n° 2017-331 du 14 mars 2017
              </a>
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034944648" target="_blank" rel="noopener noreferrer">
                Arrêté du 14 juin 2017
              </a>
            </li>
            <li>
              <a href="https://www.data.gouv.fr/fr/apidoc/" target="_blank" rel="noopener noreferrer">
                API data.gouv.fr
              </a>
            </li>
            <li>
              <a href="https://www.data.gouv.fr/fr/pages/spd/reference/" target="_blank" rel="noopener noreferrer">
                Service Public de la Donnée de Référence
              </a>
            </li>
          </ul>
        </section>

        <hr className={fr.cx("fr-mt-4w", "fr-mb-2w")} />
        <p className="fr-text--sm fr-text--mention-grey">
          <em>Dernière mise à jour de cette page : 17 décembre 2025</em>
        </p>

        {/* Retour accueil */}
        <div className={fr.cx("fr-mt-4w")}>
          <Link href="/" className={fr.cx("fr-link", "fr-link--icon-left", "fr-icon-arrow-left-line")}>
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
