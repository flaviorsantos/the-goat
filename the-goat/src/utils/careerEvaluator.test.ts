import { describe, expect, it } from 'vitest';
import type { CareerTotals } from '../types';
import { calculateGoatScore } from './careerEvaluator';

const eliteCareer: CareerTotals = {
  gamesPlayed: 1_300,
  totalPoints: 25_000,
  totalRebounds: 7_000,
  totalAssists: 8_000,
  totalSteals: 1_800,
  totalBlocks: 700,
  totalTurnovers: 3_000,
  totalEarnings: 400,
  rings: 1,
  mvps: 1,
  seasonsPlayed: 18,
};

describe('GOAT score', () => {
  it('keeps an elite career below GOAT level without a dominant resume', () => {
    const evaluation = calculateGoatScore(eliteCareer, [
      ['MVP', 1],
      ['Finals MVP', 1],
      ['All-NBA 1st Team', 3],
      ['All-NBA 2nd Team', 2],
      ['All-NBA 3rd Team', 2],
      ['All-Defense 1st Team', 2],
      ['All-Defense 2nd Team', 2],
    ]);

    expect(evaluation.score).toBeGreaterThanOrEqual(84);
    expect(evaluation.score).toBeLessThan(94);
  });

  it('does not allow a ringless career to reach GOAT level', () => {
    const evaluation = calculateGoatScore({
      ...eliteCareer,
      totalPoints: 28_661,
      totalRebounds: 12_707,
      totalAssists: 6_745,
      totalSteals: 2_111,
      totalBlocks: 2_148,
      rings: 0,
      mvps: 6,
    }, [
      ['MVP', 6],
      ['DPOY', 2],
      ['All-NBA 1st Team', 11],
      ['All-Defense 1st Team', 10],
    ]);

    expect(evaluation.score).toBe(96);
  });

  it('reserves 99 for an all-time complete resume', () => {
    const evaluation = calculateGoatScore({
      ...eliteCareer,
      totalPoints: 36_000,
      totalRebounds: 9_000,
      totalAssists: 9_000,
      totalSteals: 2_400,
      totalBlocks: 1_000,
      rings: 6,
      mvps: 5,
      seasonsPlayed: 20,
    }, [
      ['MVP', 5],
      ['Finals MVP', 6],
      ['DPOY', 1],
      ['All-NBA 1st Team', 12],
      ['All-Defense 1st Team', 8],
    ]);

    expect(evaluation.score).toBe(99);
  });
});
