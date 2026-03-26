# Observatoire du Service Public de la Donnee de Reference (SPDR)

Tableau de bord de suivi de la conformite des 9 jeux de donnees de reference designes par la [Loi pour une Republique Numerique](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205649) (2016, article 14).

L'application interroge l'API [data.gouv.fr](https://www.data.gouv.fr) en temps reel et evalue chaque jeu de donnees selon 5 indicateurs de conformite.

## Jeux de donnees suivis

| Jeu de donnees | Producteur | Frequence attendue |
|---|---|---|
| SIRENE | INSEE | Quotidienne |
| RNA | Ministere de l'Interieur | Mensuelle |
| PCI (cadastre) | DGFiP | Trimestrielle |
| RGE | IGN | Semestrielle |
| BAN | DINUM / IGN | Hebdomadaire |
| Organisation Administrative | DILA | Hebdomadaire |
| ROME | France Travail | Quadrimestrielle |
| COG | INSEE | Annuelle |
| RPG | IGN / ASP | Annuelle (campagne) |

## Indicateurs de conformite

- **Metadonnees** : presence des 8 champs obligatoires (titre, description, date, frequence, format, couverture spatiale, licence, mots-cles)
- **Mise a jour** : ecart entre la derniere mise a jour et la frequence attendue
- **Formats ouverts** : disponibilite de ressources en formats ouverts (CSV, JSON, GeoJSON, XML, Parquet, ODS, SHP, GPKG, GML)
- **Telechargement** : presence de ressources telechargeables
- **API** : disponibilite d'une API documentee (si applicable)

Le score global (0-100 %) est calcule en convertissant chaque indicateur en points (Conforme = 2, Avertissement = 1, Non conforme = 0), les indicateurs non applicables etant exclus du denominateur.

## Stack technique

| Technologie | Usage |
|---|---|
| [Next.js](https://nextjs.org) 14 | Framework (App Router, Server Components) |
| [React](https://react.dev) 18 | UI |
| [TypeScript](https://www.typescriptlang.org) 5 | Typage statique |
| [@codegouvfr/react-dsfr](https://react-dsfr.codegouv.studio/) 1.29 | Design System de l'Etat (DSFR) |

## Installation

```bash
# Cloner le depot
git clone https://github.com/benoitvx/observatoire-spdr.git
cd observatoire-spdr

# Installer les dependances
npm install

# Lancer le serveur de developpement
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
app/
  page.tsx                  # Page d'accueil : tableau de conformite
  methodologie/page.tsx     # Page methodologie
  layout.tsx                # Layout racine (DSFR)
components/
  dashboard/
    ComplianceTable.tsx     # Tableau interactif avec lignes expandables
    DatasetDetails.tsx      # Detail d'un jeu de donnees (vue expandee)
    MetadataChecklist.tsx   # Checklist des metadonnees
  layout/
    Header.tsx              # En-tete DSFR
    Footer.tsx              # Pied de page DSFR
  ComplianceBadge.tsx       # Badge de statut (Conforme/Avertissement/Non conforme)
  ScoreTag.tsx              # Affichage du score
lib/
  api/datagouv.ts           # Client API data.gouv.fr (cache 5 min)
  compliance/calculator.ts  # Algorithme de scoring
  compliance/thresholds.ts  # Seuils par frequence de mise a jour
  config/datasets.ts        # Configuration des 9 jeux de donnees
```

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | Linting |

## Licence

[MIT](LICENSE)
