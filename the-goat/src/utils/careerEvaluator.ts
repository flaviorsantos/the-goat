import type { CareerTotals } from '../types';

export type GoatEvaluation = {
  score: number;
  tier: string;
  rawScore: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export function calculateGoatScore(
  totals: CareerTotals,
  awardsCount: [string, number][],
): GoatEvaluation {
  const getCount = (awardName: string) =>
    awardsCount.find(([name]) => name === awardName)?.[1] ?? 0;

  let rawScore = 50;

  rawScore += clamp(totals.totalPoints / 40_474, 0, 1.1) * 14;
  rawScore += Math.max(
    clamp(totals.totalAssists / 15_806, 0, 1.1),
    clamp(totals.totalRebounds / 23_924, 0, 1.1),
  ) * 10;
  rawScore += Math.max(
    clamp(totals.totalSteals / 3_265, 0, 1.1),
    clamp(totals.totalBlocks / 3_830, 0, 1.1),
  ) * 8;
  rawScore += clamp(totals.seasonsPlayed / 20, 0, 1.1) * 4;

  rawScore += Math.min(totals.rings * 2, 12);
  rawScore += Math.min(getCount('MVP') * 4, 20);
  rawScore += Math.min(getCount('Finals MVP') * 2.5, 15);
  rawScore += Math.min(getCount('DPOY') * 2, 8);
  rawScore += Math.min(
    getCount('All-NBA 1st Team') * 1.8 +
    getCount('All-NBA 2nd Team') * 1.2 +
    getCount('All-NBA 3rd Team') * 0.8,
    18,
  );
  rawScore += Math.min(
    getCount('All-Defense 1st Team') +
    getCount('All-Defense 2nd Team') * 0.6,
    10,
  );

  let finalScore = rawScore;
  if (rawScore > 90) {
    finalScore = 90 + (rawScore - 90) * 0.45;
  }
  finalScore = Math.floor(clamp(finalScore, 40, 99));

  let tier = 'Journeyman';
  if (finalScore >= 99) tier = 'The Undisputed GOAT';
  else if (finalScore >= 97) tier = 'Mount Rushmore';
  else if (finalScore >= 94) tier = 'Generational Talent';
  else if (finalScore >= 88) tier = 'First Ballot Hall of Famer';
  else if (finalScore >= 82) tier = 'Hall of Famer';
  else if (finalScore >= 76) tier = 'All-Time Great';
  else if (finalScore >= 70) tier = 'Multiple-Time All-Star';
  else if (finalScore >= 62) tier = 'Solid Starter';
  else if (finalScore >= 55) tier = 'Role Player';

  return {
    score: finalScore,
    tier,
    rawScore: Number(rawScore.toFixed(2)),
  };
}
