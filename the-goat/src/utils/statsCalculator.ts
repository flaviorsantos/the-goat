import type { Position, PlayerAttributes, SeasonStatsFields } from '../types';

export function calculateSeasonStats(
  attributes: PlayerAttributes, 
  position: Position, 
  age: number, 
  ovr: number,
  teamWins: number
): SeasonStatsFields {
  const rng = (min = 0.9, max = 1.1) => (Math.random() * (max - min)) + min;
  
  // Curva de idade realista: Debuff pesado para novatos (19-21) e declínio severo após 32.
  let baseMpg = 12 + ((ovr - 60) * 0.8);
  if (age >= 34) baseMpg -= (age - 33) * 1.5; 
  if (ovr >= 90) baseMpg = Math.min(baseMpg, 38.5);

  const mpg = Math.max(8, Math.min(baseMpg * rng(0.95, 1.05), 42));
  const minutesModifier = mpg / 36;

  // Nerf nos multiplicadores base (cerca de 25% menores)
  let ppg = ((attributes.Arremesso * 0.18) + (attributes.Mentalidade * 0.08) + (attributes.Atletismo * 0.04)) * rng() * minutesModifier;
  let apg = ((attributes.Passe * 0.12) + (attributes.IQ * 0.05)) * rng() * minutesModifier;
  let rpg = ((attributes.Rebote * 0.14) + (attributes.Atletismo * 0.04)) * rng() * minutesModifier;
  let spg = ((attributes.Defesa * 0.02) + (attributes.Velocidade * 0.015)) * rng() * minutesModifier;
  let bpg = ((attributes.Defesa * 0.02) + (attributes.Atletismo * 0.02)) * rng() * minutesModifier;
  let topg = Math.max(0.5, 4.5 - (attributes.IQ * 0.02) - (attributes.Drible * 0.01)) * rng() * minutesModifier;

  switch (position) {
    case 'PG': apg *= 1.4; spg *= 1.2; rpg *= 0.5; bpg *= 0.2; break;
    case 'SG': ppg *= 1.2; apg *= 0.8; rpg *= 0.7; bpg *= 0.4; break;
    case 'SF': ppg *= 1.1; rpg *= 1.0; apg *= 0.9; break;
    case 'PF': rpg *= 1.3; bpg *= 1.2; apg *= 0.6; ppg *= 0.9; break;
    case 'C':  rpg *= 1.5; bpg *= 1.5; apg *= 0.4; spg *= 0.5; ppg *= 0.8; break;
  }
  
  const fgPct = (30 + (attributes.Arremesso * 0.15) + (attributes.IQ * 0.12)) * rng(0.95, 1.05);
  const fg3Pct = (20 + (attributes.Arremesso * 0.22)) * rng(0.9, 1.1);
  const ftPct = (50 + (attributes.Arremesso * 0.40) + (attributes.Mentalidade * 0.1)) * rng(0.95, 1.05);

  const teamWinFactor = (teamWins - 41) / 4; 
  const playerImpact = ((ovr - 75) / 5) * minutesModifier; 
  const plusMinus = (teamWinFactor + playerImpact + (attributes.IQ * 0.05)) * rng(0.8, 1.2);

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
    plusMinus: Number(plusMinus.toFixed(1)),
    teamWins
  };
}