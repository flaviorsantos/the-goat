import type { PlayerAttributes, Position } from '../types';

export interface SeasonStats {
  mpg: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  tov: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
  plusMinus: number;
}

export function calculateSeasonStats(
  attributes: PlayerAttributes, 
  position: Position, 
  playerOvr: number, 
  teamBaseOvr: number, 
  age: number
): SeasonStats {
  const baseMpg = playerOvr >= 85 ? 36 : (playerOvr >= 75 ? 28 : 16);
  const agePenalty = age > 33 ? (age - 33) * 1.5 : 0;
  const mpg = Math.max(8, Math.min(42, baseMpg + (attributes.Athleticism * 0.05) - agePenalty));
  const minuteFactor = mpg / 36; 

  // Correção: Uso máximo travado em 30% e escala suavizada para evitar super inflação
  const usageRate = Math.max(15, Math.min(30, 20 + ((playerOvr - teamBaseOvr) * 0.4)));
  const usageFactor = usageRate / 20;

  const scoringAbility = (attributes.Shooting * 0.4) + (attributes.Dribbling * 0.3) + (attributes.Athleticism * 0.3);
  let ppg = scoringAbility * 0.18 * minuteFactor * usageFactor * (0.9 + Math.random() * 0.2);

  const apgBase = position === 'PG' ? 8 : (position === 'SG' ? 4 : (position === 'SF' ? 3.5 : 1.5));
  const passingAbility = (attributes.Passing * 0.5) + (attributes.IQ * 0.3) + (attributes.Dribbling * 0.2);
  let apg = apgBase * (passingAbility / 75) * minuteFactor * (usageFactor * 0.75) * (0.8 + Math.random() * 0.4);

  const rpgBase = position === 'C' ? 10 : (position === 'PF' ? 8 : (position === 'SF' ? 5 : 3.5));
  const reboundingAbility = (attributes.Rebounding * 0.5) + (attributes.Athleticism * 0.3) + (attributes.IQ * 0.2);
  let rpg = rpgBase * (reboundingAbility / 75) * minuteFactor * (0.8 + Math.random() * 0.4);

  const spgBase = position === 'PG' ? 1.5 : (position === 'SG' ? 1.2 : (position === 'SF' ? 1.0 : 0.6));
  const stealAbility = (attributes.Defense * 0.5) + (attributes.Speed * 0.3) + (attributes.IQ * 0.2);
  let spg = spgBase * (stealAbility / 75) * minuteFactor * (0.8 + Math.random() * 0.4);

  const bpgBase = position === 'C' ? 2.0 : (position === 'PF' ? 1.4 : (position === 'SF' ? 0.6 : 0.2));
  const blockAbility = (attributes.Defense * 0.5) + (attributes.Athleticism * 0.3) + (attributes.IQ * 0.2);
  let bpg = bpgBase * (blockAbility / 75) * minuteFactor * (0.8 + Math.random() * 0.4);

  const tovBase = position === 'PG' ? 3.0 : (position === 'SG' ? 2.5 : (position === 'SF' ? 2.0 : 1.5));
  let tov = tovBase * (1 - (attributes.IQ * 0.01)) * minuteFactor * (usageRate * 0.3) * (0.8 + Math.random() * 0.4);

  let fgPct = 42 + (attributes.Shooting * 0.15) + (attributes.IQ * 0.08) - (usageRate * 0.2) + (Math.random() * 4 - 2);
  let fg3Pct = 25 + (attributes.Shooting * 0.22) + (attributes.IQ * 0.05) + (Math.random() * 6 - 3);
  let ftPct = 60 + (attributes.Shooting * 0.2) + (attributes.Mentality * 0.15) + (Math.random() * 5 - 2.5);

  let plusMinus = ((teamBaseOvr - 75) * 0.4) + ((playerOvr - 75) * 0.2) + (Math.random() * 6 - 3);

  return {
    mpg: Number(mpg.toFixed(1)),
    ppg: Number(Math.max(2, ppg).toFixed(1)),
    rpg: Number(Math.max(0.5, rpg).toFixed(1)),
    apg: Number(Math.max(0.5, apg).toFixed(1)),
    spg: Number(Math.max(0.1, spg).toFixed(1)),
    bpg: Number(Math.max(0.1, bpg).toFixed(1)),
    tov: Number(Math.max(0.5, tov).toFixed(1)),
    fgPct: Number(Math.min(65, Math.max(35, fgPct)).toFixed(1)),
    fg3Pct: Number(Math.min(50, Math.max(15, fg3Pct)).toFixed(1)),
    ftPct: Number(Math.min(99, Math.max(40, ftPct)).toFixed(1)),
    plusMinus: Number(plusMinus.toFixed(1))
  };
}