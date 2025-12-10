export type Frequency =
  | 'daily' | 'weekly' | 'monthly' | 'quarterly' 
  | 'quadrimestrial' | 'biannual' | 'annual' | 'campaign';

export interface DatasetConfig {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  producer: string;
  expectedFrequency: Frequency;
  hasApi: boolean;
  apiUrl?: string;
}

export const DATASETS: DatasetConfig[] = [
  {
    id: '5b7ffc618b4c4169d30727e0',
    slug: 'sirene',
    name: 'SIRENE',
    fullName: 'Base Sirene des entreprises et de leurs établissements (SIREN, SIRET)',
    producer: 'INSEE',
    expectedFrequency: 'daily',
    hasApi: true,
    apiUrl: 'https://api.insee.fr/entreprises/sirene/V3'
  },
  {
    id: '58e53811c751df03df38f42d',
    slug: 'rna',
    name: 'RNA',
    fullName: 'Répertoire National des Associations',
    producer: 'Ministère de l\'Intérieur',
    expectedFrequency: 'monthly',
    hasApi: false
  },
  {
    id: '58e5924b88ee3802ca255566',
    slug: 'pci',
    name: 'PCI',
    fullName: 'Plan Cadastral Informatisé',
    producer: 'DGFiP',
    expectedFrequency: 'quarterly',
    hasApi: true,
    apiUrl: 'https://cadastre.data.gouv.fr/api'
  },
  {
    id: '58e5842688ee386c65805755',
    slug: 'rge',
    name: 'RGE',
    fullName: 'Référentiel à Grande Échelle',
    producer: 'IGN',
    expectedFrequency: 'biannual',
    hasApi: true,
    apiUrl: 'https://data.geopf.fr/wfs'
  },
  {
    id: '5530fbacc751df5ff937dddb',
    slug: 'ban',
    name: 'BAN',
    fullName: 'Base Adresse Nationale',
    producer: 'DINUM / IGN',
    expectedFrequency: 'weekly',
    hasApi: true,
    apiUrl: 'https://api-adresse.data.gouv.fr'
  },
  {
    id: '57343feb88ee3823b0d1b934',
    slug: 'organisation-administrative',
    name: 'Organisation Administrative',
    fullName: 'Référentiel de l\'organisation administrative de l\'État',
    producer: 'DILA',
    expectedFrequency: 'weekly',
    hasApi: true,
    apiUrl: 'https://api-lannuaire.service-public.fr'
  },
  {
    id: '58da857388ee384902e505f5',
    slug: 'rome',
    name: 'ROME',
    fullName: 'Répertoire Opérationnel des Métiers et des Emplois',
    producer: 'France Travail',
    expectedFrequency: 'quadrimestrial',
    hasApi: true,
    apiUrl: 'https://api.francetravail.io/partenaire/rome'
  },
  {
    id: '58c984b088ee386cdb1261f3',
    slug: 'cog',
    name: 'COG',
    fullName: 'Code Officiel Géographique',
    producer: 'INSEE',
    expectedFrequency: 'annual',
    hasApi: true,
    apiUrl: 'https://api.insee.fr/metadonnees/geo'
  },
  {
    id: '58d8d8a0c751df17537c66be',
    slug: 'rpg',
    name: 'RPG',
    fullName: 'Registre Parcellaire Graphique',
    producer: 'IGN / ASP',
    expectedFrequency: 'campaign',
    hasApi: false
  }
];