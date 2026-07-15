import type { CareerTotals } from '../types';

export function calculateGoatScore(totals: CareerTotals, awardsCount: [string, number][]): { score: number; tier: string } {
  let rawScore = 70; 

  // 1. Títulos
  rawScore += totals.rings * 2;

  // 2. Volume Estatístico (Progressão linear de acúmulo)
  if (totals.totalPoints >= 40000) rawScore += 12; 
  else if (totals.totalPoints >= 30000) rawScore += 8;
  else if (totals.totalPoints >= 20000) rawScore += 5;
  else if (totals.totalPoints >= 10000) rawScore += 2;

  if (totals.totalAssists >= 15000 || totals.totalRebounds >= 20000) rawScore += 10; 
  else if (totals.totalAssists >= 10000 || totals.totalRebounds >= 12000) rawScore += 6;
  else if (totals.totalAssists >= 5000 || totals.totalRebounds >= 6000) rawScore += 3;

  if (totals.totalSteals >= 3000 || totals.totalBlocks >= 3500) rawScore += 8; 
  else if (totals.totalSteals >= 1500 || totals.totalBlocks >= 1500) rawScore += 4;

  // 3. Prêmios Individuais
  const getCount = (awardName: string) => {
    const found = awardsCount.find(a => a[0] === awardName);
    return found ? found[1] : 0;
  };

  const mvps = getCount('MVP');
  const dpoys = getCount('DPOY');
  const fmvps = getCount('Finals MVP');

  rawScore += Math.min(mvps * 3, 15);
  rawScore += Math.min(fmvps * 2, 10);
  rawScore += Math.min(dpoys * 1.5, 7.5); 
  
  rawScore += getCount('All-NBA 1st Team') * 1.5;
  rawScore += getCount('All-NBA Team') * 0.5;
  rawScore += getCount('All-Defense 1st Team') * 1;
  rawScore += getCount('All-Defense 2nd Team') * 0.5;

  // 4. Curva de Dificuldade Extrema (Hard Cap para o 99)
  let finalScore = rawScore;
  
  if (rawScore <= 88) {
    // Escala 1:1 até o nível de "Hall da Fama"
    finalScore = rawScore;
  } else if (rawScore <= 130) {
    // Escala lentificada: De 88 até 130 pontos brutos, converte em até 98.5 reais.
    // Uma carreira de 6 Anéis, 35k Pts, 4 MVPs e 15 All-NBA termina retida nesta faixa (~98 de OVR).
    finalScore = 88 + ((rawScore - 88) / 4);
  } else {
    // Escala abismal: Acima de 130 pontos brutos, exige 40 pontos de atributos para subir 1 ponto real.
    // Apenas a combinação proposta de 10 Anéis, 10 MVPs, 8 DPOYs e 40k Pts ultrapassa a barreira do 99.
    finalScore = 98.5 + ((rawScore - 130) / 40); 
  }

  // Trava matemática de segurança rigorosa
  finalScore = Math.min(99, Math.floor(finalScore));

  // 5. Definição de Tiers Reajustada
  let tier = 'Role Player';
  if (finalScore >= 99) tier = 'The Undisputed GOAT';
  else if (finalScore >= 97) tier = 'Mount Rushmore';
  else if (finalScore >= 94) tier = 'Generational Talent';
  else if (finalScore >= 88) tier = 'First Ballot Hall of Famer';
  else if (finalScore >= 80) tier = 'All-Time Great';
  else if (finalScore >= 75) tier = 'Multiple-Time All-Star';
  else if (finalScore >= 70) tier = 'Solid Starter';

  return {
    score: finalScore,
    tier
  };
}