import type { SeasonStats } from './statsCalculator';
import type { Position } from '../types';

export function calculateAwards(
  stats: SeasonStats, 
  attributes: any, 
  playerOvr: number, 
  teamWins: number, 
  isRookie: boolean,
  position: Position
) {
  const awards: string[] = [];

  let posMvpMultiplier = 1.0;
  let posDefMultiplier = 1.0;

  if (position === 'PG' || position === 'SG') {
    // Perímetro valoriza mais Assistências, Roubos e menos Ressaltos/Blocos
    posMvpMultiplier = (stats.apg * 1.6) + (stats.spg * 2.5) + (stats.rpg * 0.8);
    posDefMultiplier = (attributes.Defense * 0.5) + (stats.spg * 14) + (stats.bpg * 4);
  } else if (position === 'SF' || position === 'PF') {
    // Alas são híbridos equilibrados
    posMvpMultiplier = (stats.apg * 1.1) + (stats.spg * 1.5) + (stats.rpg * 1.2) + (stats.bpg * 1.5);
    posDefMultiplier = (attributes.Defense * 0.5) + (stats.spg * 9) + (stats.bpg * 9);
  } else if (position === 'C') {
    // Postes valorizam massivamente Ressaltos, Blocos e Eficiência, ignorando assistências
    posMvpMultiplier = (stats.rpg * 1.6) + (stats.bpg * 2.5) + (stats.apg * 0.5);
    posDefMultiplier = (attributes.Defense * 0.4) + (stats.bpg * 15) + (stats.spg * 4);
  }

  const mvpScore = stats.ppg + posMvpMultiplier - stats.tov;
  const npcMvpThreshold = 45 + Math.random() * 8; 

  if (teamWins >= 50 && mvpScore > npcMvpThreshold && stats.mpg >= 30 && playerOvr >= 88) {
    awards.push('MVP');
  }

  if (mvpScore > 40 && stats.mpg >= 30 && playerOvr >= 87) {
    awards.push('All-NBA 1st Team');
  } else if (mvpScore > 33 && stats.mpg >= 28 && playerOvr >= 83) {
    awards.push('All-NBA 2nd Team');
  } else if (mvpScore > 28 && stats.mpg >= 26 && playerOvr >= 80) {
    awards.push('All-NBA 3rd Team');
  }

  if (isRookie && stats.mpg >= 20) {
    const rookieScore = stats.ppg + stats.rpg + stats.apg;
    const npcRookieThreshold = 15 + Math.random() * 7; 
    if (rookieScore > npcRookieThreshold) {
      awards.push('ROTY');
    }
  }

  if (stats.mpg > 15 && stats.mpg < 28 && stats.ppg > 12) {
    const npcSmotyThreshold = 14 + Math.random() * 4;
    if (stats.ppg > npcSmotyThreshold) {
      awards.push('SMOTY');
    }
  }
  const defensiveImpact = (attributes.Defense * 0.5) + (stats.spg * 12) + (stats.bpg * 8) + (stats.plusMinus * 1.2);
  const dpoyThreshold = 80 + Math.random() * 15;
  
  if (stats.mpg >= 28) {
    if (defensiveImpact > dpoyThreshold && attributes.Defense >= 88) {
      awards.push('DPOY');
      awards.push('All-Defense 1st Team');
    } else if (defensiveImpact > 74 && attributes.Defense >= 82) {
      awards.push('All-Defense 1st Team');
    } else if (defensiveImpact > 66 && attributes.Defense >= 76) {
      awards.push('All-Defense 2nd Team');
    }
  }

  return awards;
}