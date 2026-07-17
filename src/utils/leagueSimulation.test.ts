import { afterEach, describe, expect, it, vi } from 'vitest';
import { nbaTeams } from '../data/teams';
import { simulateLeagueStandings } from './leagueSimulation';

describe('league simulation', () => {
  afterEach(() => vi.restoreAllMocks());

  it('creates a complete 1,230-win league table', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const standings = simulateLeagueStandings(
      { teamId: 'LAL', ovr: 90, morale: 80 },
      nbaTeams.map(team => ({ ...team })),
    );

    expect(standings).toHaveLength(30);
    expect(standings.reduce((sum, team) => sum + team.wins, 0)).toBe(1_230);
    expect(standings.every(team => team.wins + team.losses === 82)).toBe(true);
  });
});
