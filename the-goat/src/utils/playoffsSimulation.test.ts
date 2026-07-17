import { afterEach, describe, expect, it, vi } from 'vitest';
import { simulatePlayoffs } from './playoffsSimulation';

describe('playoff simulation', () => {
  afterEach(() => vi.restoreAllMocks());

  it('records every series, game and player average', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const run = simulatePlayoffs(99, 84, 60, {
      ppg: 28, rpg: 8, apg: 7, spg: 1.5, bpg: 1,
    });

    expect(run.madePlayoffs).toBe(true);
    expect(run.series.length).toBeGreaterThan(0);
    expect(run.series[0].games.length).toBe(run.series[0].gamesPlayed);
    expect(run.overallAverages?.gamesPlayed).toBeGreaterThan(0);
  });
});
