# Observatoire du Service Public de la Donnee de Reference (SPDR)

Tableau de bord de suivi de la conformite des 9 jeux de donnees de reference designes par la [Loi pour une Republique Numerique](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205649) (2016, article 14).

L'application interroge l'API [data.gouv.fr](https://www.data.gouv.fr) en temps reel et evalue chaque jeu de donnees selon 5 indicateurs de conformite.

## Jeux de donnees suivis

| Jeu de donnees | Producteur | Frequence attendue |
|---|---|---|
| [SIRENE](https://www.data.gouv.fr/fr/datasets/5b7ffc618b4c4169d30727e0/) | INSEE | Quotidienne |
| [RNA](https://www.data.gouv.fr/fr/datasets/58e53811c751df03df38f42d/) | Ministere de l'Interieur | Mensuelle |
| [PCI (cadastre)](https://www.data.gouv.fr/fr/datasets/58e5924b88ee3802ca255566/) | DGFiP | Trimestrielle |
| [RGE](https://www.data.gouv.fr/fr/datasets/58e5842688ee386c65805755/) | IGN | Semestrielle |
| [BAN](https://www.data.gouv.fr/fr/datasets/5530fbacc751df5ff937dddb/) | DINUM / IGN | Hebdomadaire |
| [Organisation Administrative](https://www.data.gouv.fr/fr/datasets/57343feb88ee3823b0d1b934/) | DILA | Hebdomadaire |
| [ROME](https://www.data.gouv.fr/fr/datasets/58da857388ee384902e505f5/) | France Travail | Quadrimestrielle |
| [COG](https://www.data.gouv.fr/fr/datasets/58c984b088ee386cdb1261f3/) | INSEE | Annuelle |
| [RPG](https://www.data.gouv.fr/fr/datasets/58d8d8a0c751df17537c66be/) | IGN / ASP | Annuelle (campagne) |

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
