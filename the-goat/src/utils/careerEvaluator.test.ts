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
  it('allows an elite decorated career to clear 90', () => {
    const evaluation = calculateGoatScore(eliteCareer, [
      ['MVP', 1],
      ['Finals MVP', 1],
      ['All-NBA 1st Team', 3],
      ['All-NBA 2nd Team', 2],
      ['All-NBA 3rd Team', 2],
      ['All-Defense 1st Team', 2],
      ['All-Defense 2nd Team', 2],
    ]);

    expect(evaluation.score).toBeGreaterThanOrEqual(90);
  });
});
