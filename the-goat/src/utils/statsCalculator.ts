import type { Position, PlayerAttributes } from '../types';

export function calculateSeasonStats(
  attributes: PlayerAttributes, 
  position: Position, 
  age: number, 
  teamWins: number
) {
  const rng = () => (Math.random() * 0.15) + 0.90; 
  
  // Curva de idade realista: Debuff pesado para novatos (19-21) e declínio severo após 32.
  let ageModifier = 1.0;
  if (age <= 21) ageModifier = 0.70 + ((age - 19) * 0.10); 
  else if (age >= 32 && age <= 34) ageModifier = 1.0 - ((age - 31) * 0.08);
  else if (age > 34) ageModifier = 0.76 - ((age - 34) * 0.15);

  // Nerf nos multiplicadores base (cerca de 25% menores)
  let ppg = ((attributes.Arremesso * 0.11) + (attributes.Mentalidade * 0.07) + (attributes.Atletismo * 0.03)) * rng() * ageModifier;
  let apg = ((attributes.Passe * 0.075) + (attributes.IQ * 0.035)) * rng() * ageModifier;
  let rpg = ((attributes.Rebote * 0.08) + (attributes.Atletismo * 0.025)) * rng() * ageModifier;
  let spg = ((attributes.Defesa * 0.012) + (attributes.Velocidade * 0.008)) * rng() * ageModifier;
  let bpg = ((attributes.Defesa * 0.012) + (attributes.Atletismo * 0.01)) * rng() * ageModifier;
  let topg = Math.max(0.5, 4.5 - (attributes.IQ * 0.03) - (attributes.Drible * 0.01)) * rng();

  switch (position) {
    case 'PG':
      apg *= 1.4; spg *= 1.2; rpg *= 0.5; bpg *= 0.2;
      break;
    case 'SG':
      ppg *= 1.2; apg *= 0.8; rpg *= 0.7; bpg *= 0.4;
      break;
    case 'SF':
      ppg *= 1.1; rpg *= 1.0; apg *= 0.9;
      break;
    case 'PF':
      rpg *= 1.3; bpg *= 1.2; apg *= 0.6; ppg *= 0.9;
      break;
    case 'C':
      rpg *= 1.5; bpg *= 1.5; apg *= 0.4; spg *= 0.5;
      break;
  }
  
  const fgPct = Math.min(62, (attributes.Arremesso * 0.35) + (attributes.IQ * 0.15)) * rng();
  const fg3Pct = Math.min(45, (attributes.Arremesso * 0.40)) * rng();
  const ftPct = Math.min(93, (attributes.Arremesso * 0.55) + (attributes.Mentalidade * 0.3)) * rng();

  const winRate = teamWins / 82;
  const plusMinus = ((winRate - 0.5) * 12) + (attributes.IQ * 0.04) * rng();

  return {
    ppg: Number(ppg.toFixed(1)),
    rpg: Number(rpg.toFixed(1)),
    apg: Number(apg.toFixed(1)),
    spg: Number(spg.toFixed(1)),
    bpg: Number(bpg.toFixed(1)),
    topg: Number(topg.toFixed(1)),
    fgPct: Number(fgPct.toFixed(1)),
    fg3Pct: Number(fg3Pct.toFixed(1)),
    ftPct: Number(ftPct.toFixed(1)),
    plusMinus: Number(plusMinus.toFixed(1))
  };
}