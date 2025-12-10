import { DatagouvDataset, DatagouvResource } from '../types';
import { DatasetConfig, Frequency } from '../config/datasets';
import { 
  ComplianceStatus, 
  MetadataCompliance, 
  UpdateCompliance, 
  FormatCompliance,
  DownloadCompliance,
  ApiCompliance,
  DatasetCompliance
} from './types';
import { FREQUENCY_THRESHOLDS, OPEN_FORMATS } from './thresholds';

// Calcule le statut de mise à jour selon les seuils
function calculateUpdateStatus(lastModified: Date, frequency: Frequency): UpdateCompliance {
  const now = new Date();
  const daysSinceUpdate = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
  const thresholds = FREQUENCY_THRESHOLDS[frequency];
  
  let status: ComplianceStatus = 'compliant';
  
  if (daysSinceUpdate > thresholds.warning) {
    status = 'non_compliant';
  } else if (daysSinceUpdate > thresholds.compliant) {
    status = 'warning';
  }
  
  return {
    expectedFrequency: frequency,
    lastModified,
    daysSinceUpdate,
    status
  };
}

// Vérifie la présence de formats ouverts
function calculateFormatCompliance(resources: DatagouvResource[]): FormatCompliance {
  const openFormatsFound: string[] = [];
  
  resources.forEach(resource => {
    const format = resource.format.toLowerCase();
    if (OPEN_FORMATS.includes(format) && !openFormatsFound.includes(format)) {
      openFormatsFound.push(format);
    }
  });
  
  const hasOpenFormat = openFormatsFound.length > 0;
  const status: ComplianceStatus = hasOpenFormat ? 'compliant' : 'non_compliant';
  
  return {
    hasOpenFormat,
    formats: openFormatsFound,
    status
  };
}

// Vérifie la complétude des 8 métadonnées obligatoires
function calculateMetadataCompliance(dataset: DatagouvDataset): MetadataCompliance {
  const hasTitle = !!(dataset.title && dataset.title.trim());
  const hasDescription = !!(dataset.description && dataset.description.trim());
  const hasLastModified = !!dataset.last_modified;
  const hasFrequency = !!(dataset.frequency && dataset.frequency.trim());
  const hasFormat = dataset.resources.length > 0 && dataset.resources.some(r => r.format && r.format.trim());
  const hasSpatial = !!dataset.spatial && (
    (dataset.spatial.zones && dataset.spatial.zones.length > 0) ||
    (dataset.spatial.granularity && dataset.spatial.granularity.trim())
  );
  
  // Convertir en boolean explicite
  const hasSpatialBoolean = Boolean(hasSpatial);
  const hasLicense = !!(dataset.license && dataset.license.trim());
  const hasTags = dataset.tags && dataset.tags.length > 0;
  
  const score = [
    hasTitle, hasDescription, hasLastModified, hasFrequency,
    hasFormat, hasSpatialBoolean, hasLicense, hasTags
  ].filter(Boolean).length;
  
  // Calcul du statut global des métadonnées
  let status: ComplianceStatus;
  if (score === 8) {
    status = 'compliant';
  } else if (score >= 6) {
    status = 'warning';
  } else {
    status = 'non_compliant';
  }
  
  return {
    title: hasTitle,
    description: hasDescription,
    lastModified: hasLastModified,
    frequency: hasFrequency,
    format: hasFormat,
    spatial: hasSpatialBoolean,
    license: hasLicense,
    tags: hasTags,
    score,
    status
  };
}

// Vérifie la disponibilité en téléchargement
function calculateDownloadCompliance(resources: DatagouvResource[]): DownloadCompliance {
  const downloadableResources = resources.filter(r => r.url && r.url.trim());
  const hasDownload = downloadableResources.length > 0;
  const status: ComplianceStatus = hasDownload ? 'compliant' : 'non_compliant';
  
  return {
    hasDownload,
    resourceCount: downloadableResources.length,
    status
  };
}

// Vérifie la disponibilité de l'API
function calculateApiCompliance(dataset: DatagouvDataset, config: DatasetConfig): ApiCompliance {
  if (!config.hasApi) {
    return {
      expected: false,
      available: false,
      url: null,
      status: 'not_applicable'
    };
  }
  
  // Vérifier si une ressource a type === 'api'
  const hasApiResource = dataset.resources.some(r => r.type === 'api');
  const available = hasApiResource || !!config.apiUrl;
  const url = config.apiUrl || (hasApiResource ? dataset.resources.find(r => r.type === 'api')?.url || null : null);
  
  const status: ComplianceStatus = available ? 'compliant' : 'non_compliant';
  
  return {
    expected: true,
    available,
    url,
    status
  };
}

// Score global : (conformes × 2 + warning × 1) / (total × 2) × 100
function calculateGlobalScore(compliance: DatasetCompliance): number {
  const indicators = [
    compliance.metadata.status,
    compliance.update.status,
    compliance.format.status,
    compliance.download.status,
    compliance.api.status
  ];
  
  let score = 0;
  const totalIndicators = indicators.length;
  
  indicators.forEach(indicator => {
    if (indicator === 'compliant') {
      score += 2;
    } else if (indicator === 'warning') {
      score += 1;
    }
    // non_compliant et not_applicable ne donnent pas de points
  });
  
  return Math.round((score / (totalIndicators * 2)) * 100);
}

// Fonction principale qui orchestre tout
export function calculateCompliance(dataset: DatagouvDataset, config: DatasetConfig): DatasetCompliance {
  const fetchedAt = new Date();
  const lastModifiedDate = new Date(dataset.last_modified);
  
  const metadata = calculateMetadataCompliance(dataset);
  const update = calculateUpdateStatus(lastModifiedDate, config.expectedFrequency);
  const format = calculateFormatCompliance(dataset.resources);
  const download = calculateDownloadCompliance(dataset.resources);
  const api = calculateApiCompliance(dataset, config);
  
  const globalScore = calculateGlobalScore({
    datasetId: dataset.id,
    datasetSlug: config.slug,
    fetchedAt,
    metadata,
    update,
    format,
    download,
    api,
    globalScore: 0 // Placeholder, sera calculé
  });
  
  return {
    datasetId: dataset.id,
    datasetSlug: config.slug,
    fetchedAt,
    metadata,
    update,
    format,
    download,
    api,
    globalScore
  };
}