export interface DatagouvResource {
  id: string;
  title: string;
  description: string | null;
  format: string;
  url: string;
  filesize: number | null;
  mime: string | null;
  last_modified: string;
  type: 'main' | 'documentation' | 'api' | 'other';
}

export interface DatagouvDataset {
  id: string;
  title: string;
  description: string | null;
  frequency: string | null;
  last_modified: string;
  created_at: string;
  organization: {
    name: string;
    slug: string;
    logo: string | null;
  } | null;
  license: string | null;
  tags: string[];
  spatial: {
    geom: object | null;
    granularity: string | null;
    zones: string[];
  } | null;
  resources: DatagouvResource[];
  page: string;
}