import { afterEach, describe, expect, it, vi } from 'vitest';
import { simulateLeagueAwards } from './leagueAwardsSimulation';

describe('league awards simulation', () => {
  afterEach(() => vi.restoreAllMocks());

  it('keeps MVP candidates out of the sixth-man pool', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const awards = simulateLeagueAwards({
      playerName: 'Test',
      playerAwards: [],
      playerWonFinalsMvp: false,
      championTeamId: 'BOS',
      standings: [],
    });

    expect(awards.SMOTY).not.toBe(awards.MVP);
    expect(awards.SMOTY).not.toBe('V. Wembanyama');
    expect(awards.FMVP).toBe('J. Tatum');
  });
});
