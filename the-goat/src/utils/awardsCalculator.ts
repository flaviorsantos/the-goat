import type { SeasonStats } from './statsCalculator';

export function calculateAwards(
  stats: SeasonStats, 
  attributes: any, 
  playerOvr: number, 
  teamWins: number, 
  isRookie: boolean,
  position: string
) {
  const awards: string[] = [];

  // ==========================================
  // 1. CÁLCULO DO MVP & ALL-NBA (Fórmula Unificada)
  // ==========================================
  // Produção base e justa de basquetebol para todas as posições
  let mvpScore = 
    (stats.ppg * 1.0) + 
    (stats.rpg * 1.1) + 
    (stats.apg * 1.2) + 
    (stats.spg * 1.6) + 
    (stats.bpg * 1.6) - 
    (stats.tov * 0.9);

  // Moderadores Marginais de Posição (Corrige os volumes sem criar supercorreções)
  if (position === 'SG') {
    mvpScore *= 1.12; // Valoriza ligeiramente o perfil focado em pontos de perímetro
  } else if (position === 'SF') {
    mvpScore *= 1.08; // Valoriza a versatilidade clássica do extremo
  } else if (position === 'PG') {
    mvpScore *= 0.95; // Amortece o volume massivo de assistências acumuladas
  } else if (position === 'C') {
    mvpScore *= 0.92; // Amortece o volume massivo de ressaltos acumulados
  } else if (position === 'PF') {
    mvpScore *= 0.94; // Amortece ligeiramente o volume de ressaltos/toquinhos
  }

  // Limiar dinâmico para competir com as estrelas simuladas (NPCs)
  const npcMvpThreshold = 42 + Math.random() * 10;

  if (teamWins >= 50 && mvpScore > npcMvpThreshold && stats.mpg >= 30) {
    awards.push('MVP');
  }

  // Nomeações All-NBA baseadas no Score de Eficiência Ponderado
  if (mvpScore > 35 && stats.mpg >= 30) {
    awards.push('All-NBA 1st Team');
  } else if (mvpScore > 30 && stats.mpg >= 28) {
    awards.push('All-NBA 2nd Team');
  } else if (mvpScore > 25 && stats.mpg >= 26) {
    awards.push('All-NBA 3rd Team');
  }

  // ==========================================
  // 2. CÁLCULO DE ROTY & SMOTY (Mantidos e Estáveis)
  // ==========================================
  if (isRookie && stats.mpg >= 20) {
    const rookieScore = stats.ppg + stats.rpg + stats.apg;
    const npcRookieThreshold = 18 + Math.random() * 10; 
    if (rookieScore > npcRookieThreshold) {
      awards.push('ROTY');
    }
  }

  if (stats.mpg > 18 && stats.mpg < 29 && stats.ppg > 14) {
    const npcSmotyThreshold = 15 + Math.random() * 5;
    if (stats.ppg > npcSmotyThreshold) {
      awards.push('SMOTY');
    }
  }

  // ==========================================
  // 3. CÁLCULO DO DPOY & ALL-DEFENSE (Fórmula Unificada)
  // ==========================================
  // Impacto defensivo base uniforme para todos
  let defensiveImpact = 
    (attributes.Defense * 0.4) + 
    (stats.spg * 11) + 
    (stats.bpg * 11) + 
    (stats.plusMinus * 1.5);

  // Moderadores de Posição para o DPOY
  // Proteção do aro (C/PF) vale historicamente mais, mas permite Guardas de elite pontuarem
  if (position === 'C') {
    defensiveImpact *= 1.30;
  } else if (position === 'PF') {
    defensiveImpact *= 1.15;
  } else if (position === 'SF') {
    defensiveImpact *= 1.00;
  } else if (position === 'SG') {
    defensiveImpact *= 0.90;
  } else if (position === 'PG') {
    defensiveImpact *= 0.78; // Contém o abuso de roubos de bola puros
  }

  const dpoyThreshold = 75 + Math.random() * 25;
  
  if (stats.mpg >= 28) {
    if (defensiveImpact > dpoyThreshold) {
      awards.push('DPOY');
      awards.push('All-Defense 1st Team');
    } else if (defensiveImpact > 68) {
      awards.push('All-Defense 1st Team');
    } else if (defensiveImpact > 60) {
      awards.push('All-Defense 2nd Team');
    }
  }

  return awards;
}
