import { describe, it, expect } from 'vitest';
import { FREQUENCY_THRESHOLDS, OPEN_FORMATS } from '../thresholds';

describe('FREQUENCY_THRESHOLDS', () => {
  it('defines thresholds for all 8 frequencies', () => {
    const frequencies = Object.keys(FREQUENCY_THRESHOLDS);
    expect(frequencies).toHaveLength(8);
    expect(frequencies).toEqual(
      expect.arrayContaining([
        'daily', 'weekly', 'monthly', 'quarterly',
        'quadrimestrial', 'biannual', 'annual', 'campaign',
      ])
    );
  });

  it('has warning threshold strictly greater than compliant for each frequency', () => {
    for (const [frequency, threshold] of Object.entries(FREQUENCY_THRESHOLDS)) {
      expect(threshold.warning, `${frequency}: warning should be > compliant`).toBeGreaterThan(threshold.compliant);
    }
  });

  it('has positive values for all thresholds', () => {
    for (const [frequency, threshold] of Object.entries(FREQUENCY_THRESHOLDS)) {
      expect(threshold.compliant, `${frequency}: compliant should be > 0`).toBeGreaterThan(0);
      expect(threshold.warning, `${frequency}: warning should be > 0`).toBeGreaterThan(0);
    }
  });

  it('has thresholds increasing with frequency period', () => {
    // Daily < weekly < monthly < quarterly < ... < annual
    const ordered = ['daily', 'weekly', 'monthly', 'quarterly', 'quadrimestrial', 'biannual', 'annual'] as const;
    for (let i = 1; i < ordered.length; i++) {
      const prev = FREQUENCY_THRESHOLDS[ordered[i - 1]];
      const curr = FREQUENCY_THRESHOLDS[ordered[i]];
      expect(curr.compliant, `${ordered[i]} compliant should be >= ${ordered[i - 1]}`).toBeGreaterThanOrEqual(prev.compliant);
    }
  });
});

describe('OPEN_FORMATS', () => {
  it('contains 10 recognized open formats', () => {
    expect(OPEN_FORMATS).toHaveLength(10);
  });

  it('includes key formats', () => {
    expect(OPEN_FORMATS).toContain('csv');
    expect(OPEN_FORMATS).toContain('json');
    expect(OPEN_FORMATS).toContain('geojson');
    expect(OPEN_FORMATS).toContain('xml');
    expect(OPEN_FORMATS).toContain('parquet');
  });

  it('contains only lowercase strings', () => {
    for (const format of OPEN_FORMATS) {
      expect(format).toBe(format.toLowerCase());
    }
  });
});
