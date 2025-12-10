import { Frequency } from '../config/datasets';

export interface FrequencyThreshold {
  compliant: number;  // Jours max pour vert
  warning: number;    // Jours max pour orange (au-delà = rouge)
}

export const FREQUENCY_THRESHOLDS: Record<Frequency, FrequencyThreshold> = {
  daily: { compliant: 1, warning: 3 },
  weekly: { compliant: 7, warning: 10 },
  monthly: { compliant: 31, warning: 45 },
  quarterly: { compliant: 92, warning: 100 },
  quadrimestrial: { compliant: 122, warning: 135 },
  biannual: { compliant: 183, warning: 200 },
  annual: { compliant: 365, warning: 400 },
  campaign: { compliant: 365, warning: 450 }
};

export const OPEN_FORMATS = [
  'csv', 'json', 'geojson', 'xml', 'parquet', 'ods', 'txt', 'shp', 'gpkg', 'gml'
];