import type { PlayerProfile, PlayoffRunStats } from '../types';
import { nbaPlayers } from '../data/players';

export function calculateAwards(
  stats: { mpg: number; ppg: number; apg: number; rpg: number; spg: number; bpg: number; plusMinus: number; }, 
  teamWins: number,
  player: PlayerProfile, 
  isRookie: boolean,
  playoffs: PlayoffRunStats
): { playerAwards: string[], leagueAwards: Record<string, string> } {
  
  const playerAwards: string[] = [];
  const leagueAwards: Record<string, string> = {};
  const rng = (min = 0.9, max = 1.1) => (Math.random() * (max - min)) + min;

  const offensiveImpact = (stats.ppg * 1.5) + (stats.apg * 1.2) + (stats.rpg * 0.5) + (stats.plusMinus * 1.5);
  const defensiveImpact = (stats.bpg * 4) + (stats.spg * 4) + (stats.rpg * 0.8) + (player.attributes.Defense * 0.15);
  const overallImpact = offensiveImpact + (defensiveImpact * 0.8);

  const mvpThreshold = (65 + (Math.random() * 10)) * rng();
  const dpoyThreshold = (32 + (Math.random() * 5)) * rng();
  const smotyThreshold = 25 * rng(); // Threshold para Sexto Homem
/*
  // Função auxiliar para achar um NPC para ganhar o prêmio
  const getRandomElite = (minOvr: number, isDefender = false) => {
    const candidates = nbaPlayers.filter(p => p.ovr >= minOvr && (!isDefender || p.attributes.Defense > 85));
    if (candidates.length === 0) return 'LeBron James'; // Fallback
    return candidates[Math.floor(Math.random() * candidates.length)].name;
  };*/

  // 1. Rookie of the Year
  if (isRookie && overallImpact > 35 * rng()) {
    playerAwards.push('ROTY');
    leagueAwards['ROTY'] = player.name;
  } else if (isRookie) {
    leagueAwards['ROTY'] = 'Random Top Draft Pick'; // Simulação genérica
  }

  // 2. Sixth Man of the Year (Exige menos de 28 MPG e impacto sólido)
  if (stats.mpg < 28 && overallImpact > smotyThreshold) {
    playerAwards.push('6MOTY');
    leagueAwards['6MOTY'] = player.name;
  } else {
    //leagueAwards['6MOTY'] = getRandomElite(80);
  }

  // 3. MVP
  if (overallImpact > mvpThreshold && teamWins >= 48) {
    playerAwards.push('MVP');
    leagueAwards['MVP'] = player.name;
  } else {
    //leagueAwards['MVP'] = getRandomElite(93);
  }

  // 4. DPOY
  if (defensiveImpact > dpoyThreshold) {
    playerAwards.push('DPOY');
    leagueAwards['DPOY'] = player.name;
  } else {
    //leagueAwards['DPOY'] = getRandomElite(88, true);
  }

  // 5. Playoffs Awards (Conference Finals MVP e Finals MVP)
  if (playoffs.wonRing || playoffs.eliminatedIn === 'NBA Finals') {
    // Se chegou na final, ganha o MVP das Finais de Conferência se tiver OVR de estrela
    if (player.ovr >= 85 && rng() > 0.95) {
      playerAwards.push('Conf. Finals MVP');
    }
  }

  if (playoffs.wonRing && player.ovr >= 88 && rng() > 0.9) {
    playerAwards.push('Finals MVP');
  }

  // 6. All-NBA e All-Defense (Apenas pro player)
  if (!playerAwards.includes('MVP') && overallImpact > 58 * rng()) playerAwards.push('All-NBA 1st');
  else if (overallImpact > 52 * rng() && !playerAwards.includes('All-NBA 1st')) playerAwards.push('All-NBA 2nd');
  else if (overallImpact > 46 * rng() && !playerAwards.includes('All-NBA 2nd') && !playerAwards.includes('All-NBA 1st')) playerAwards.push('All-NBA 3rd');

  if (!playerAwards.includes('DPOY') && defensiveImpact > 26 * rng()) playerAwards.push('All-Def 1st');
  else if (defensiveImpact > 22 * rng() && !playerAwards.includes('All-Def 1st')) playerAwards.push('All-Def 2nd');

  return { playerAwards, leagueAwards };
}