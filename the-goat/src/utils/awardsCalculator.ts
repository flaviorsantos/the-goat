import type { SeasonStatsFields, PlayerProfile } from '../types';

export function calculateAwards(
  stats: SeasonStatsFields, 
  player: PlayerProfile, 
  isRookie: boolean
): string[] {
  const awards: string[] = [];
  const rng = (min = 0.9, max = 1.1) => (Math.random() * (max - min)) + min;

  // Fórmulas de impacto compostas (Valorizam eficiência e vitórias, não apenas volume)
  const offensiveImpact = (stats.ppg * 1.5) + (stats.apg * 1.2) + (stats.rpg * 0.5);
  const defensiveImpact = (stats.bpg * 1.8) + (stats.spg * 1.8) + (stats.rpg * 0.6);
  const overallImpact = offensiveImpact + (defensiveImpact * 0.8) + (stats.plusMinus * 1.5);

  // Limites Dinâmicos da Liga (Simula a variação de nível da NBA ano a ano)
  const mvpThreshold = (60 + (Math.random() * 10)) * rng();
  const allNba1stThreshold = 58 * rng();
  const allNba2ndThreshold = 52 * rng();
  const allNba3rdThreshold = 46 * rng();

  const dpoyThreshold = (45 + (Math.random() * 5)) * rng();
  const allDef1stThreshold = 50 * rng();
  const allDef2ndThreshold = 40 * rng();

  if (isRookie && overallImpact > 35 * rng()) {
    awards.push('ROTY');
  }

  const isMvp = overallImpact > mvpThreshold && stats.teamWins >= 48;
  const isDpoy = defensiveImpact > dpoyThreshold;

  if (isMvp) {
    awards.push('MVP');
  }
   
  if (isDpoy) {
    awards.push('DPOY');
  }

  if (isMvp || overallImpact > allNba1stThreshold) {
    awards.push('All-NBA 1st');
  } else if (overallImpact > allNba2ndThreshold) {
    awards.push('All-NBA 2nd');
  } else if (overallImpact > allNba3rdThreshold) {
    awards.push('All-NBA 3rd');
  }
  
  if (isDpoy || defensiveImpact > allDef1stThreshold) {
    awards.push('All-Def 1st');
  } else if (defensiveImpact > allDef2ndThreshold) {
    awards.push('All-Def 2nd');
  }

  return awards;
}