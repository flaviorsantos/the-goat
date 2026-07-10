import type { CareerTotals } from '../types';

export function calculateGoatScore(totals: CareerTotals): { score: number; tier: string } {
  let score = 0;

  score += totals.rings * 15; 

  score += totals.mvps * 12;

  if (totals.totalPoints >= 30000) score += 20;
  else if (totals.totalPoints >= 25000) score += 15;
  else if (totals.totalPoints >= 20000) score += 10;
  else if (totals.totalPoints >= 15000) score += 5;

  if (totals.totalAssists >= 10000 || totals.totalRebounds >= 12000) score += 10;
  else if (totals.totalAssists >= 7000 || totals.totalRebounds >= 8000) score += 5;

  if (totals.totalSteals >= 2000 || totals.totalBlocks >= 2000) score += 8;

  const finalScore = Math.min(99, Math.max(0, Math.floor(score)));

  let tier = 'Role Player';
  if (finalScore >= 95) tier = 'GOAT Contender';
  else if (finalScore >= 85) tier = 'Generational Talent';
  else if (finalScore >= 70) tier = 'First Ballot Hall of Famer';
  else if (finalScore >= 50) tier = 'All-Time Great';
  else if (finalScore >= 30) tier = 'Multiple-Time All-Star';
  else if (finalScore >= 15) tier = 'Solid Starter';

  return {
    score: finalScore,
    tier
  };
}