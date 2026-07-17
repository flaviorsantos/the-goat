import { describe, expect, it } from 'vitest';
import type { SeasonStats } from '../types';
import { findBestSeasonNumber } from './seasonEvaluator';

const season = (
  seasonNumber: number,
  overrides: Partial<SeasonStats> = {},
) => ({
  seasonNumber, ppg: 25, rpg: 6, apg: 6, spg: 1.2, bpg: 0.5,
  tov: 2.5, plusMinus: 3, fgPct: 0.48, fg3Pct: 0.37,
  gamesPlayed: 75, awards: [], playoffs: { wonRing: false },
  ...overrides,
}) as SeasonStats;

describe('best season', () => {
  it('uses production, efficiency, availability and achievements', () => {
    const history = [
      season(1, { ppg: 27 }),
      season(2, { ppg: 26, awards: ['MVP'], playoffs: { wonRing: true } as SeasonStats['playoffs'] }),
    ];
    expect(findBestSeasonNumber(history)).toBe(2);
  });
});
