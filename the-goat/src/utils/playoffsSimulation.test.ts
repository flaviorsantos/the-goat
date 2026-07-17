import { afterEach, describe, expect, it, vi } from 'vitest';
import { simulatePlayoffs } from './playoffsSimulation';

describe('playoff simulation', () => {
  afterEach(() => vi.restoreAllMocks());

  it('records every series, game and player average', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const run = simulatePlayoffs(99, 84, 60, {
      ppg: 28, rpg: 8, apg: 7, spg: 1.5, bpg: 1,
    }, 'LAL');

    expect(run.madePlayoffs).toBe(true);
    expect(run.series.length).toBeGreaterThan(0);
    expect(run.series[0].games.length).toBe(run.series[0].gamesPlayed);
    expect(run.series[0].opponentTeamId).not.toBe('LAL');
    expect(run.overallAverages?.gamesPlayed).toBeGreaterThan(0);
    expect(run.series.flatMap(series => series.games).every(
      game => Number.isInteger(game.steals) && Number.isInteger(game.blocks),
    )).toBe(true);
  });
});
