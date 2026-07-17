import { describe, expect, it } from 'vitest';
import type { SeasonStats } from '../types';
import { calculateRetiredJerseys } from './legacyCalculator';

const season = (teamId: string, wonRing = false) => ({
  teamId,
  playoffs: { wonRing },
}) as SeasonStats;

describe('jersey retirement', () => {
  it('honors long tenure and championship legacy', () => {
    const history = Array.from({ length: 12 }, (_, index) =>
      season('BOS', index < 2),
    );
    expect(calculateRetiredJerseys(history, 23)).toEqual([
      { teamId: 'BOS', jerseyNumber: 23, seasons: 12, rings: 2 },
    ]);
  });
});
