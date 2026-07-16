import type { Position } from '../types';

export const calculateSeasonStats = (
  attrs: any, 
  position: Position, 
  ovr: number, 
  teamOvr: number, 
  _age: number
) => {
  // 1. Garante que nenhum atributo essencial venha vazio ou indefinido
  const safeAttrs = {
    Shooting: attrs.Shooting || 30,
    Dribbling: attrs.Dribbling || 30,
    Defense: attrs.Defense || 30,
    IQ: attrs.IQ || 30,
    Athleticism: attrs.Athleticism || 30,
    Passing: attrs.Passing || 30,
    Rebounding: attrs.Rebounding || 30,
    Speed: attrs.Speed || 30,
    Finishing: attrs.Finishing || attrs.Mentality || 30 
  };

  // 2. NOVA FÓRMULA DE MINUTOS (Mais realista para o OVR)
  // Superestrelas (85+ OVR) DEVEM jogar 34 a 38 minutos, independentemente da equipa.
  let mpg = 20 + ((ovr - 65) * 1.1);
  if (ovr >= 85) {
    mpg = 34 + (Math.random() * 3); // Entre 34 e 37 minutos
  }
  if (mpg > 39.5) mpg = 39.5; 
  if (mpg < 12) mpg = 12; // Mínimo de minutos aceitável para um jogador Draftado com potencial

  // 3. NOVA FÓRMULA DE USAGE (Taxa de uso ofensivo)
  // O peso do OVR do jogador agora dita o protagonismo, o time não pode "afogar" a estrela.
  const starPower = (safeAttrs.Shooting + safeAttrs.Finishing + safeAttrs.Dribbling) / 3;
  let usage = 15 + ((ovr / teamOvr) * 10) + (starPower * 0.12);
  
  // Se o jogador for um pontuador nato de alto overall, ele lidera o ataque obrigatoriamente
  if (ovr >= 85) {
    usage = Math.max(usage, 26 + (Math.random() * 6)); // Mínimo de 26% a 32% de Usage
  }
  if (usage > 38) usage = 38;

  // Modificadores suaves de posição para não engessar as builds híbridas
  const posMods: Record<string, any> = {
    PG: { pts: 1.0, ast: 1.45, reb: 0.85, stl: 1.15, blk: 0.5 },
    SG: { pts: 1.12, ast: 0.95, reb: 0.90, stl: 1.05, blk: 0.6 },
    SF: { pts: 1.08, ast: 0.90, reb: 1.00, stl: 1.00, blk: 0.8 },
    PF: { pts: 1.02, ast: 0.80, reb: 1.18, stl: 0.85, blk: 1.15 },
    C:  { pts: 0.95, ast: 0.70, reb: 1.25, stl: 0.75, blk: 1.30 },
  };
  const mod = posMods[position] || posMods['SF'];

  // 4. EQUAÇÕES MATEMÁTICAS AMPLIADAS PARA REALISMO DA NBA
  // O volume de pontos (ppgBase) precisa de uma base aritmética muito mais agressiva
  let ppgBase = ((safeAttrs.Shooting * 0.40) + (safeAttrs.Finishing * 0.45) + (safeAttrs.Dribbling * 0.15)) * (usage / 100) * (mpg / 24);
  
  // Garantimos que o Passing + IQ escalem o APG de forma robusta
  let apgBase = ((safeAttrs.Passing * 0.65) + (safeAttrs.IQ * 0.35)) * (usage / 100) * (mpg / 22);
  
  // Ressaltos devem ser agressivos se o atributo Rebounding for alto (Estilo Westbrook/Robertson)
  let rpgBase = ((safeAttrs.Rebounding * 0.70) + (safeAttrs.Athleticism * 0.30)) * (mpg / 26);
  
  let spgBase = ((safeAttrs.Defense * 0.5) + (safeAttrs.Speed * 0.3) + (safeAttrs.IQ * 0.2)) * (mpg / 30);
  let bpgBase = ((safeAttrs.Defense * 0.4) + (safeAttrs.Athleticism * 0.6)) * (mpg / 30);

  // 5. MODIFICADORES FINAIS LIVRES DE SUPER-NERFS
  let ppg = ppgBase * mod.pts * 1.5 + (Math.random() * 3 - 1.5);
  let apg = apgBase * mod.ast * 0.45 + (Math.random() * 1.2 - 0.6);
  let rpg = rpgBase * mod.reb * 0.40 + (Math.random() * 1.5 - 0.75);
  let spg = spgBase * mod.stl * 0.50 + (Math.random() * 0.3 - 0.15);
  let bpg = bpgBase * mod.blk * 0.50 + (Math.random() * 0.3 - 0.15);
  let tov = (usage * 0.13) - (safeAttrs.IQ * 0.01) + (Math.random() * 0.8);

  // Garantia mínima realista baseada no OVR
  if (ovr >= 85) {
    ppg = Math.max(ppg, 20.0);
    if (position === 'PG' && safeAttrs.Passing >= 85) {
      apg = Math.max(apg, 7.5);
    }
    if (safeAttrs.Rebounding >= 85) {
      rpg = Math.max(rpg, 7.5); // Garante o perfil Westbrook de Triplos-Duplos!
    }
  } else if (ovr >= 78) {
    ppg = Math.max(ppg, 13.0);
  }

  // Percentagens de eficiência
  let fgPctBase = 0.41 + (safeAttrs.Finishing * 0.0012) + (safeAttrs.Shooting * 0.0008);
  if (position === 'C' || position === 'PF') fgPctBase += 0.04;
  let fgPct = fgPctBase + (Math.random() * 0.03 - 0.015);
  
  let threepPct = 0.26 + (safeAttrs.Shooting * 0.0016) + (Math.random() * 0.03 - 0.015);
  let ftPct = 0.65 + (safeAttrs.Shooting * 0.0025) + (Math.random() * 0.03 - 0.015);

  // Plus/Minus
  let plusMinusBase = ((teamOvr - 80) * 0.4) + ((ovr - 75) * 0.3);
  let plusMinus = plusMinusBase + (Math.random() * 3 - 1.5);

  return {
    mpg: Number(Math.max(2, mpg).toFixed(1)),
    ppg: Number(Math.max(2, ppg).toFixed(1)),
    rpg: Number(Math.max(1, rpg).toFixed(1)),
    apg: Number(Math.max(1, apg).toFixed(1)),
    spg: Number(Math.max(0.1, spg).toFixed(1)),
    bpg: Number(Math.max(0.1, bpg).toFixed(1)),
    tov: Number(Math.max(0.5, tov).toFixed(1)),
    fgPct: Number(Math.min(0.68, Math.max(0.33, fgPct)).toFixed(3)),
    threepPct: Number(Math.min(0.50, Math.max(0.08, threepPct)).toFixed(3)),
    ftPct: Number(Math.min(0.96, Math.max(0.35, ftPct)).toFixed(3)),
    plusMinus: Number(plusMinus.toFixed(1))
  };
};