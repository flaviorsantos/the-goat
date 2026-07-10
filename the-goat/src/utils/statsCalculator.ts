import type { Position, PlayerAttributes } from '../types';

export function calculateSeasonStats(
  attributes: PlayerAttributes, 
  position: Position, 
  age: number, 
  ovr: number, 
  teamWins: number
) {
  const rng = (min = 0.9, max = 1.1) => (Math.random() * (max - min)) + min; 
  
  let baseMpg = 12 + ((ovr - 60) * 0.85);
  if (age >= 34) baseMpg -= (age - 33) * 1.5; 
  if (ovr >= 90) baseMpg = Math.min(baseMpg, 38.5); 
  
  const mpg = Math.max(8, Math.min(baseMpg * rng(0.95, 1.05), 42));
  const minutesModifier = mpg / 36;

  const normalize = (val: number) => Math.max(1, val);

  let ppg = ((attributes.Shooting * 0.16) + (attributes.Mentality * 0.08) + (attributes.Athleticism * 0.03)) * rng() * minutesModifier;
  
  let apg = (Math.pow(normalize(attributes.Passing), 1.2) / 25 + (attributes.IQ * 0.04)) * rng() * minutesModifier;
  
  let rpg = (Math.pow(normalize(attributes.Rebounding), 1.15) / 12 + (attributes.Athleticism * 0.03)) * rng() * minutesModifier;
  
  let spg = ((attributes.Defense * 0.015) + (attributes.Speed * 0.01) + (attributes.IQ * 0.005)) * rng() * minutesModifier;
  let bpg = ((attributes.Defense * 0.018) + (attributes.Athleticism * 0.012)) * rng() * minutesModifier;
  
  let topg = Math.max(0.5, 4.0 - (attributes.IQ * 0.02) - (attributes.Dribbling * 0.01)) * rng() * minutesModifier;

  switch (position) {
    case 'PG': apg *= 1.35; spg *= 1.15; rpg *= 0.5; bpg *= 0.2; ppg *= 1.05; break;
    case 'SG': ppg *= 1.15; apg *= 0.85; rpg *= 0.6; bpg *= 0.4; break;
    case 'SF': ppg *= 1.05; rpg *= 0.9; apg *= 0.9; break;
    case 'PF': rpg *= 1.25; bpg *= 1.15; apg *= 0.6; ppg *= 0.9; break;
    case 'C':  rpg *= 1.4; bpg *= 1.4; apg *= 0.4; spg *= 0.6; ppg *= 0.85; break;
  }

  const fgPct = (32 + (attributes.Shooting * 0.12) + (attributes.IQ * 0.10)) * rng(0.96, 1.04);
  const fg3Pct = (22 + (attributes.Shooting * 0.18)) * rng(0.92, 1.08);
  const ftPct = (55 + (attributes.Shooting * 0.35) + (attributes.Mentality * 0.05)) * rng(0.96, 1.04);

  const teamWinFactor = (teamWins - 41) / 5; 
  const playerImpact = ((ovr - 75) / 6) * minutesModifier; 
  const plusMinus = (teamWinFactor + playerImpact + (attributes.IQ * 0.04)) * rng(0.85, 1.15);

  return {
    mpg: Number(mpg.toFixed(1)),
    ppg: Number(ppg.toFixed(1)),
    rpg: Number(rpg.toFixed(1)),
    apg: Number(apg.toFixed(1)),
    spg: Number(spg.toFixed(1)),
    bpg: Number(bpg.toFixed(1)),
    topg: Number(topg.toFixed(1)),
    fgPct: Number(Math.min(fgPct, 75).toFixed(1)), 
    fg3Pct: Number(Math.min(fg3Pct, 55).toFixed(1)),
    ftPct: Number(Math.min(ftPct, 99.9).toFixed(1)),
    plusMinus: Number(plusMinus.toFixed(1))
  };
}