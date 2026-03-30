import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateCompliance } from '../calculator';
import { DatagouvDataset } from '../../types';
import { DatasetConfig } from '../../config/datasets';

// Helper to create a minimal valid dataset
function makeDataset(overrides: Partial<DatagouvDataset> = {}): DatagouvDataset {
  return {
    id: 'test-id',
    title: 'Test Dataset',
    description: 'A test dataset',
    frequency: 'monthly',
    last_modified: '2025-12-01T00:00:00Z',
    last_update: '2025-12-01T00:00:00Z',
    created_at: '2025-01-01T00:00:00Z',
    organization: { name: 'Test Org', slug: 'test-org', logo: null },
    license: 'fr-lo',
    tags: ['test', 'data'],
    spatial: { geom: null, granularity: 'commune', zones: ['country:fr'] },
    resources: [
      {
        id: 'r1',
        title: 'Resource 1',
        description: null,
        format: 'csv',
        url: 'https://example.com/data.csv',
        filesize: 1000,
        mime: 'text/csv',
        last_modified: '2025-12-01T00:00:00Z',
        type: 'main',
      },
    ],
    page: 'https://www.data.gouv.fr/fr/datasets/test-id/',
    ...overrides,
  };
}

function makeConfig(overrides: Partial<DatasetConfig> = {}): DatasetConfig {
  return {
    id: 'test-id',
    slug: 'test',
    name: 'Test',
    fullName: 'Test Dataset',
    producer: 'Test Org',
    expectedFrequency: 'monthly',
    hasApi: false,
    ...overrides,
  };
}

describe('calculateCompliance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-12-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Metadata Compliance ---

  describe('metadata compliance', () => {
    it('returns compliant when all 8 fields are present', () => {
      const result = calculateCompliance(makeDataset(), makeConfig());
      expect(result.metadata.score).toBe(8);
      expect(result.metadata.status).toBe('compliant');
    });

    it('returns warning when 6 fields are present', () => {
      const dataset = makeDataset({
        spatial: null,
        tags: [],
      });
      const result = calculateCompliance(dataset, makeConfig());
      expect(result.metadata.score).toBe(6);
      expect(result.metadata.status).toBe('warning');
    });

    it('returns non_compliant when fewer than 5 fields are present', () => {
      const dataset = makeDataset({
        description: null,
        frequency: null,
        license: null,
        spatial: null,
        tags: [],
      });
      const result = calculateCompliance(dataset, makeConfig());
      expect(result.metadata.score).toBeLessThan(5);
      expect(result.metadata.status).toBe('non_compliant');
    });

    it('checks each metadata field individually', () => {
      const result = calculateCompliance(makeDataset(), makeConfig());
      expect(result.metadata.title).toBe(true);
      expect(result.metadata.description).toBe(true);
      expect(result.metadata.lastModified).toBe(true);
      expect(result.metadata.frequency).toBe(true);
      expect(result.metadata.format).toBe(true);
      expect(result.metadata.spatial).toBe(true);
      expect(result.metadata.license).toBe(true);
      expect(result.metadata.tags).toBe(true);
    });
  });

  // --- Update Status ---

  describe('update status', () => {
    it('returns compliant when update is within threshold', () => {
      // Monthly: compliant <= 31 days, last_update = Dec 1, now = Dec 15 => 14 days
      const dataset = makeDataset({ last_update: '2025-12-01T00:00:00Z' });
      const result = calculateCompliance(dataset, makeConfig({ expectedFrequency: 'monthly' }));
      expect(result.update.daysSinceUpdate).toBe(14);
      expect(result.update.status).toBe('compliant');
    });

    it('returns warning when update exceeds compliant but within warning threshold', () => {
      // Monthly: compliant=31, warning=45. 35 days ago => warning
      const dataset = makeDataset({ last_update: '2025-11-10T00:00:00Z' });
      const result = calculateCompliance(dataset, makeConfig({ expectedFrequency: 'monthly' }));
      expect(result.update.daysSinceUpdate).toBe(35);
      expect(result.update.status).toBe('warning');
    });

    it('returns non_compliant when update exceeds warning threshold', () => {
      // Monthly: warning=45. 60 days ago => non_compliant
      const dataset = makeDataset({ last_update: '2025-10-16T00:00:00Z' });
      const result = calculateCompliance(dataset, makeConfig({ expectedFrequency: 'monthly' }));
      expect(result.update.daysSinceUpdate).toBe(60);
      expect(result.update.status).toBe('non_compliant');
    });

    it('uses the correct frequency thresholds for daily', () => {
      // Daily: compliant=1. 0 days => compliant
      const dataset = makeDataset({ last_update: '2025-12-15T00:00:00Z' });
      const result = calculateCompliance(dataset, makeConfig({ expectedFrequency: 'daily' }));
      expect(result.update.daysSinceUpdate).toBe(0);
      expect(result.update.status).toBe('compliant');
    });
  });

  // --- Format Compliance ---

  describe('format compliance', () => {
    it('returns compliant when open formats are present', () => {
      const result = calculateCompliance(makeDataset(), makeConfig());
      expect(result.format.hasOpenFormat).toBe(true);
      expect(result.format.formats).toContain('csv');
      expect(result.format.status).toBe('compliant');
    });

    it('returns non_compliant when no open formats are present', () => {
      const dataset = makeDataset({
        resources: [
          {
            id: 'r1',
            title: 'Resource',
            description: null,
            format: 'xlsx',
            url: 'https://example.com/data.xlsx',
            filesize: 1000,
            mime: 'application/vnd.ms-excel',
            last_modified: '2025-12-01T00:00:00Z',
            type: 'main',
          },
        ],
      });
      const result = calculateCompliance(dataset, makeConfig());
      expect(result.format.hasOpenFormat).toBe(false);
      expect(result.format.status).toBe('non_compliant');
    });

    it('detects multiple open formats', () => {
      const dataset = makeDataset({
        resources: [
          { id: 'r1', title: 'CSV', description: null, format: 'csv', url: 'https://example.com/a.csv', filesize: null, mime: null, last_modified: '2025-12-01T00:00:00Z', type: 'main' },
          { id: 'r2', title: 'JSON', description: null, format: 'json', url: 'https://example.com/a.json', filesize: null, mime: null, last_modified: '2025-12-01T00:00:00Z', type: 'main' },
        ],
      });
      const result = calculateCompliance(dataset, makeConfig());
      expect(result.format.formats).toContain('csv');
      expect(result.format.formats).toContain('json');
      expect(result.format.formats.length).toBe(2);
    });
  });

  // --- Download Compliance ---

  describe('download compliance', () => {
    it('returns compliant when downloadable resources exist', () => {
      const result = calculateCompliance(makeDataset(), makeConfig());
      expect(result.download.hasDownload).toBe(true);
      expect(result.download.resourceCount).toBe(1);
      expect(result.download.status).toBe('compliant');
    });

    it('returns non_compliant when no downloadable resources', () => {
      const dataset = makeDataset({
        resources: [
          { id: 'r1', title: 'Empty', description: null, format: 'csv', url: '', filesize: null, mime: null, last_modified: '2025-12-01T00:00:00Z', type: 'main' },
        ],
      });
      const result = calculateCompliance(dataset, makeConfig());
      expect(result.download.hasDownload).toBe(false);
      expect(result.download.status).toBe('non_compliant');
    });
  });

  // --- API Compliance ---

  describe('API compliance', () => {
    it('returns not_applicable when API is not expected', () => {
      const result = calculateCompliance(makeDataset(), makeConfig({ hasApi: false }));
      expect(result.api.expected).toBe(false);
      expect(result.api.status).toBe('not_applicable');
    });

    it('returns compliant when API is expected and apiUrl is provided', () => {
      const config = makeConfig({ hasApi: true, apiUrl: 'https://api.example.com' });
      const result = calculateCompliance(makeDataset(), config);
      expect(result.api.expected).toBe(true);
      expect(result.api.available).toBe(true);
      expect(result.api.url).toBe('https://api.example.com');
      expect(result.api.status).toBe('compliant');
    });

    it('returns compliant when API resource exists in dataset', () => {
      const dataset = makeDataset({
        resources: [
          { id: 'r1', title: 'API', description: null, format: 'json', url: 'https://api.example.com', filesize: null, mime: null, last_modified: '2025-12-01T00:00:00Z', type: 'api' },
        ],
      });
      const config = makeConfig({ hasApi: true });
      const result = calculateCompliance(dataset, config);
      expect(result.api.available).toBe(true);
      expect(result.api.status).toBe('compliant');
    });

    it('returns non_compliant when API is expected but not available', () => {
      const dataset = makeDataset({
        resources: [
          { id: 'r1', title: 'Data', description: null, format: 'csv', url: 'https://example.com/data.csv', filesize: null, mime: null, last_modified: '2025-12-01T00:00:00Z', type: 'main' },
        ],
      });
      const config = makeConfig({ hasApi: true });
      const result = calculateCompliance(dataset, config);
      expect(result.api.expected).toBe(true);
      expect(result.api.available).toBe(false);
      expect(result.api.status).toBe('non_compliant');
    });
  });

  // --- Global Score ---

  describe('global score', () => {
    it('returns 100% when all indicators are compliant', () => {
      const config = makeConfig({ hasApi: true, apiUrl: 'https://api.example.com' });
      const result = calculateCompliance(makeDataset(), config);
      expect(result.globalScore).toBe(100);
    });

    it('returns 0% when all indicators are non_compliant', () => {
      const dataset = makeDataset({
        description: null,
        frequency: null,
        license: null,
        spatial: null,
        tags: [],
        last_update: '2025-01-01T00:00:00Z', // very old
        resources: [
          { id: 'r1', title: 'Bad', description: null, format: 'xlsx', url: '', filesize: null, mime: null, last_modified: '2025-01-01T00:00:00Z', type: 'main' },
        ],
      });
      const config = makeConfig({ hasApi: true });
      const result = calculateCompliance(dataset, config);
      expect(result.globalScore).toBe(0);
    });

    it('excludes not_applicable indicators from denominator', () => {
      // All compliant, API not applicable => 4 indicators, all compliant => 100%
      const result = calculateCompliance(makeDataset(), makeConfig({ hasApi: false }));
      expect(result.api.status).toBe('not_applicable');
      expect(result.globalScore).toBe(100);
    });

    it('calculates partial score correctly', () => {
      // 4 applicable indicators: metadata=compliant(2), update=compliant(2), format=compliant(2), download=compliant(2)
      // API=not_applicable => score = 8/8 = 100%
      // Let's make update=warning for a partial score
      // Monthly warning: 32-45 days. Set last_update 35 days ago
      const dataset = makeDataset({ last_update: '2025-11-10T00:00:00Z' });
      const config = makeConfig({ hasApi: false, expectedFrequency: 'monthly' });
      const result = calculateCompliance(dataset, config);
      // metadata=2, update=1(warning), format=2, download=2 = 7/8
      expect(result.update.status).toBe('warning');
      expect(result.globalScore).toBe(Math.round((7 / 8) * 100)); // 88%
    });
  });
});
