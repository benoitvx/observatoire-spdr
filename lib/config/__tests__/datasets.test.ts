import { describe, it, expect } from 'vitest';
import { DATASETS } from '../datasets';

describe('DATASETS configuration', () => {
  it('contains exactly 9 reference datasets', () => {
    expect(DATASETS).toHaveLength(9);
  });

  it('has unique IDs', () => {
    const ids = DATASETS.map(d => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique slugs', () => {
    const slugs = DATASETS.map(d => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has required fields for every dataset', () => {
    for (const dataset of DATASETS) {
      expect(dataset.id, `${dataset.name}: id`).toBeTruthy();
      expect(dataset.slug, `${dataset.name}: slug`).toBeTruthy();
      expect(dataset.name, `${dataset.name}: name`).toBeTruthy();
      expect(dataset.fullName, `${dataset.name}: fullName`).toBeTruthy();
      expect(dataset.producer, `${dataset.name}: producer`).toBeTruthy();
      expect(dataset.expectedFrequency, `${dataset.name}: expectedFrequency`).toBeTruthy();
      expect(typeof dataset.hasApi).toBe('boolean');
    }
  });

  it('has apiUrl defined when hasApi is true', () => {
    const withApi = DATASETS.filter(d => d.hasApi);
    for (const dataset of withApi) {
      expect(dataset.apiUrl, `${dataset.name}: should have apiUrl when hasApi=true`).toBeTruthy();
    }
  });

  it('includes the expected dataset names', () => {
    const names = DATASETS.map(d => d.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'SIRENE', 'RNA', 'PCI', 'RGE', 'BAN',
        'Organisation Administrative', 'ROME', 'COG', 'RPG',
      ])
    );
  });

  it('uses valid frequency values', () => {
    const validFrequencies = [
      'daily', 'weekly', 'monthly', 'quarterly',
      'quadrimestrial', 'biannual', 'annual', 'campaign',
    ];
    for (const dataset of DATASETS) {
      expect(validFrequencies, `${dataset.name}: invalid frequency ${dataset.expectedFrequency}`)
        .toContain(dataset.expectedFrequency);
    }
  });
});
