import type { CareerTotals } from '../types';

export function calculateGoatScore(totals: CareerTotals, awardsCount: [string, number][]): { score: number; tier: string } {
  let score = 0;

  // 1. Títulos e Volume Base
  score += totals.rings * 15; 

  if (totals.totalPoints >= 30000) score += 20;
  else if (totals.totalPoints >= 25000) score += 15;
  else if (totals.totalPoints >= 20000) score += 10;
  else if (totals.totalPoints >= 15000) score += 5;

  if (totals.totalAssists >= 10000 || totals.totalRebounds >= 12000) score += 10;
  else if (totals.totalAssists >= 7000 || totals.totalRebounds >= 8000) score += 5;

  if (totals.totalSteals >= 2000 || totals.totalBlocks >= 2000) score += 8;

  // 2. Pontuação Expandida por Prêmios
  const getCount = (awardName: string) => {
    const found = awardsCount.find(a => a[0] === awardName);
    return found ? found[1] : 0;
  };

  score += getCount('MVP') * 12;
  score += getCount('Finals MVP') * 10;
  score += getCount('DPOY') * 8;
  score += getCount('All-NBA 1st') * 4;
  score += getCount('All-NBA 2nd') * 2;
  score += getCount('Conf. Finals MVP') * 3;
  score += getCount('6MOTY') * 2;
  score += getCount('All-Def 1st') * 2;

  // 3. Normalização
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