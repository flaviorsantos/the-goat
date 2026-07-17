import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes, Position } from '../types';
import { calculateAwards, calculateFinalsMvp } from './awardsCalculator';

const attributes = (defense = 85): PlayerAttributes => ({
  Shooting: 85, Dribbling: 85, Defense: defense, IQ: 88,
  Athleticism: 85, Passing: 85, Rebounding: 80,
  Speed: 85, Finishing: 85,
});

const stats = {
  ppg: 30, rpg: 8, apg: 8, spg: 1.5, bpg: 0.7,
  tov: 3, mpg: 35, plusMinus: 5,
};

const awards = (
  overrides: Partial<typeof stats> = {},
  options: {
    defense?: number;
    ovr?: number;
    wins?: number;
    games?: number;
    rookie?: boolean;
    position?: Position;
  } = {},
) => calculateAwards(
  { ...stats, ...overrides },
  attributes(options.defense ?? 85),
  options.ovr ?? 92,
  options.wins ?? 55,
  options.games ?? 75,
  options.rookie ?? false,
  options.position ?? 'SF',
);

describe('awards calculator', () => {
  afterEach(() => vi.restoreAllMocks());

  it('enforces the 65-game threshold for major awards', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = awards({}, { games: 64 });
    expect(result).not.toContain('MVP');
    expect(result.some(award => award.startsWith('All-NBA'))).toBe(false);
    expect(result).not.toContain('DPOY');
    expect(result.some(award => award.startsWith('All-Defense'))).toBe(false);
  });

  it('awards MVP, All-Star and All-NBA to an elite eligible season', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = awards();
    expect(result).toContain('MVP');
    expect(result).toContain('All-Star');
    expect(result).toContain('All-NBA 1st Team');
  });

  it('allows elite perimeter defenders to win DPOY', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = awards(
      { ppg: 18, rpg: 5, apg: 6, spg: 2, bpg: 0.4, tov: 2.2 },
      { defense: 96, ovr: 90, position: 'PG' },
    );
    expect(result).toContain('DPOY');
    expect(result).toContain('All-Defense 1st Team');
  });

  it('keeps ROTY competitive instead of automatic', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(awards(
      { ppg: 15, rpg: 5, apg: 4, mpg: 30 },
      { rookie: true, ovr: 80, wins: 35 },
    )).not.toContain('ROTY');
    expect(awards(
      { ppg: 18, rpg: 6, apg: 6, mpg: 30 },
      { rookie: true, ovr: 82, wins: 35 },
    )).toContain('ROTY');
  });

  it('limits SMOTY to sub-29-minute roles', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(awards(
      { ppg: 17, rpg: 5, apg: 5, mpg: 28.9 },
      { ovr: 82 },
    )).toContain('SMOTY');
    expect(awards(
      { ppg: 17, rpg: 5, apg: 5, mpg: 29 },
      { ovr: 82 },
    )).not.toContain('SMOTY');
  });

  it('calculates FMVP from Finals averages only', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const finalsLine = {
      gameNumber: 6,
      round: 'NBA Finals',
      won: true,
      home: false,
      opponentTeamId: 'BOS',
      opponentOvr: 90,
      points: 27,
      rebounds: 8,
      assists: 7,
      steals: 1.5,
      blocks: 0.8,
    };

    expect(calculateFinalsMvp(finalsLine, true)).toBe(true);
    expect(calculateFinalsMvp({ ...finalsLine, points: 11 }, true)).toBe(false);
    expect(calculateFinalsMvp(finalsLine, false)).toBe(false);
    expect(calculateFinalsMvp(null, true)).toBe(false);
  });
});
