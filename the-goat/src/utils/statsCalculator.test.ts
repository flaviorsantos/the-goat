import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes } from '../types';
import { calculateOverall, calculateSeasonStats } from './statsCalculator';

const ATTRIBUTES = [
  'Shooting', 'Dribbling', 'Defense', 'IQ', 'Athleticism',
  'Passing', 'Rebounding', 'Speed', 'Finishing',
] as const;

const attributes = (
  value: number,
  overrides: Partial<PlayerAttributes> = {},
): PlayerAttributes => ({
  ...Object.fromEntries(ATTRIBUTES.map(key => [key, value])),
  ...overrides,
}) as PlayerAttributes;

const season = (attrs: PlayerAttributes, teamOvr = 78) =>
  calculateSeasonStats(
    attrs,
    'PG',
    calculateOverall(attrs, 'PG'),
    teamOvr,
    25,
  );

describe('attribute impact', () => {
  beforeEach(() => vi.spyOn(Math, 'random').mockReturnValue(0.5));
  afterEach(() => vi.restoreAllMocks());

  it('makes IQ affect role, creation, ball security and impact', () => {
    const low = season(attributes(80, { IQ: 60 }));
    const high = season(attributes(80, { IQ: 90 }));

    expect(high.mpg).toBeGreaterThan(low.mpg);
    expect(high.apg).toBeGreaterThan(low.apg);
    expect(high.tov / (high.ppg + high.apg)).toBeLessThan(
      low.tov / (low.ppg + low.apg),
    );
    expect(high.plusMinus).toBeGreaterThan(low.plusMinus);
  });

  it('makes Speed affect scoring, creation, defense and impact', () => {
    const low = season(attributes(80, { Speed: 60 }));
    const high = season(attributes(80, { Speed: 90 }));

    expect(high.ppg).toBeGreaterThan(low.ppg);
    expect(high.apg).toBeGreaterThan(low.apg);
    expect(high.spg).toBeGreaterThan(low.spg);
    expect(high.plusMinus).toBeGreaterThan(low.plusMinus);
  });

  it('makes Dribbling affect scoring, creation and turnovers', () => {
    const low = season(attributes(80, { Dribbling: 60 }));
    const high = season(attributes(80, { Dribbling: 90 }));

    expect(high.ppg).toBeGreaterThan(low.ppg);
    expect(high.apg).toBeGreaterThan(low.apg);
    expect(high.tov / (high.ppg + high.apg)).toBeLessThan(
      low.tov / (low.ppg + low.apg),
    );
  });
});

describe('plus-minus', () => {
  beforeEach(() => vi.spyOn(Math, 'random').mockReturnValue(0.5));
  afterEach(() => vi.restoreAllMocks());

  it('rises with team quality', () => {
    const attrs = attributes(82);
    expect(season(attrs, 84).plusMinus).toBeGreaterThan(
      season(attrs, 72).plusMinus,
    );
  });

  it('rises with on-court production at the same team strength', () => {
    expect(season(attributes(90)).plusMinus).toBeGreaterThan(
      season(attributes(65)).plusMinus,
    );
  });
});
