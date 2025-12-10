import { DatagouvDataset } from '../types';
import { DATASETS } from '../config/datasets';

const DATA_GOUV_API_BASE = 'https://www.data.gouv.fr/api/1';

/**
 * Récupère un dataset depuis l'API data.gouv.fr
 * @param datasetId ID du dataset
 * @returns Dataset complet
 */
export async function getDataset(datasetId: string): Promise<DatagouvDataset> {
  const url = `${DATA_GOUV_API_BASE}/datasets/${datasetId}/`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache de 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dataset ${datasetId}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching dataset ${datasetId}:`, error);
    throw error;
  }
}

/**
 * Récupère tous les datasets configurés
 * @returns Liste des datasets avec leurs données complètes
 */
export async function getAllDatasets(): Promise<DatagouvDataset[]> {
  try {
    const datasets = await Promise.all(
      DATASETS.map(dataset => getDataset(dataset.id))
    );
    return datasets;
  } catch (error) {
    console.error('Error fetching all datasets:', error);
    throw error;
  }
}

/**
 * Récupère un dataset par son slug
 * @param slug Slug du dataset
 * @returns Dataset complet ou null si non trouvé
 */
export async function getDatasetBySlug(slug: string): Promise<DatagouvDataset | null> {
  const datasetConfig = DATASETS.find(d => d.slug === slug);
  
  if (!datasetConfig) {
    return null;
  }
  
  return getDataset(datasetConfig.id);
}