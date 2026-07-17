import { afterEach, describe, expect, it, vi } from 'vitest';
import { nbaTeams } from '../data/teams';
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

  it('uses only conference qualifiers and always produces a champion', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const standings = nbaTeams.map((team, index) => ({
      ...team,
      wins: index % 15 < 8 ? 60 - (index % 15) : 25 - (index % 15),
      losses: 0,
    })).map(team => ({ ...team, losses: 82 - team.wins }));
    const qualifiedIds = new Set(
      standings.filter((_, index) => index % 15 < 8).map(team => team.id),
    );
    const run = simulatePlayoffs(
      92,
      80,
      standings.find(team => team.id === 'LAL')?.wins ?? 50,
      { ppg: 25, rpg: 7, apg: 6, spg: 1.4, bpg: 0.8 },
      'LAL',
      standings,
    );

    expect(run.championTeamId).not.toBe('');
    expect(qualifiedIds.has(run.championTeamId)).toBe(true);
    expect(run.series.every(series => qualifiedIds.has(series.opponentTeamId))).toBe(true);
  });
});
