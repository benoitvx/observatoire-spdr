import { Frequency } from '../config/datasets';

export type ComplianceStatus = 'compliant' | 'warning' | 'non_compliant' | 'not_applicable';

export interface MetadataCompliance {
  title: boolean;
  description: boolean;
  lastModified: boolean;
  frequency: boolean;
  format: boolean;
  spatial: boolean;
  license: boolean;
  tags: boolean;
  score: number; // X/8
  status: ComplianceStatus; // Statut global des métadonnées
}

export interface UpdateCompliance {
  expectedFrequency: Frequency;
  lastModified: Date;
  daysSinceUpdate: number;
  status: ComplianceStatus;
}

export interface FormatCompliance {
  hasOpenFormat: boolean;
  formats: string[];
  status: ComplianceStatus;
}

export interface DownloadCompliance {
  hasDownload: boolean;
  resourceCount: number;
  status: ComplianceStatus;
}

export interface ApiCompliance {
  expected: boolean;
  available: boolean;
  url: string | null;
  status: ComplianceStatus;
}

export interface DatasetCompliance {
  datasetId: string;
  datasetSlug: string;
  fetchedAt: Date;
  metadata: MetadataCompliance;
  update: UpdateCompliance;
  format: FormatCompliance;
  download: DownloadCompliance;
  api: ApiCompliance;
  globalScore: number; // 0-100
}