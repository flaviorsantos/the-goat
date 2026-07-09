// src/composables/useGameEngine.ts
import { ref, reactive, computed } from 'vue';
import type { PlayerProfile, SeasonStats, CareerTotals, Position } from '../types';

export function useGameEngine() {
  const player = reactive<PlayerProfile>({
    name: '',
    position: 'SF',
    age: 19,
    ovr: 68,
    isRetired: false
  });

  const history = ref<SeasonStats[]>([]);

  // Computed para atualizar automaticamente o painel de carreira
  const careerTotals = computed<CareerTotals>(() => {
    return history.value.reduce(
      (acc, season) => {
        // Multiplica a média de pontos por uma base de 82 jogos na temporada regular
        acc.totalPoints += Math.round(season.ppg * 82);
        acc.totalRebounds += Math.round(season.rpg * 82);
        acc.totalAssists += Math.round(season.apg * 82);
        if (season.wonRing) acc.rings += 1;
        if (season.wonMVP) acc.mvps += 1;
        acc.seasonsPlayed += 1;
        return acc;
      },
      { totalPoints: 0, totalRebounds: 0, totalAssists: 0, rings: 0, mvps: 0, seasonsPlayed: 0 }
    );
  });

  const initCareer = (name: string, position: Position) => {
    player.name = name;
    player.position = position;
    player.age = 19;
    player.ovr = Math.floor(Math.random() * (75 - 65 + 1)) + 65; // OVR inicial entre 65 e 75
    player.isRetired = false;
    history.value = [];
  };

  const simulateSeason = () => {
    if (player.isRetired) return;

    // 1. Atualizar Idade e OVR
    const currentOvr = updateOVR(player.age, player.ovr);
    player.ovr = currentOvr;

    // 2. Gerar Estatísticas Baseadas no OVR e Posição
    const { ppg, rpg, apg } = generateStats(currentOvr, player.position);

    // 3. RNG para Prêmios
    // MVP exige um OVR alto. Anel sofre influência do OVR, mas tem fator sorte maior.
    const wonMVP = currentOvr > 90 && Math.random() < ((currentOvr - 90) * 0.1); 
    const wonRing = currentOvr > 80 && Math.random() < ((currentOvr - 70) * 0.05);

    // 4. Salvar histórico da temporada
    history.value.push({
      seasonNumber: history.value.length + 1,
      age: player.age,
      ovr: currentOvr,
      ppg,
      rpg,
      apg,
      wonRing,
      wonMVP
    });

    // 5. Verificar Aposentadoria (RNG aumenta drasticamente após os 36 anos)
    if (player.age >= 40 || (player.age > 35 && Math.random() < 0.3)) {
      player.isRetired = true;
    } else {
      player.age += 1;
    }
  };

  return {
    player,
    history,
    careerTotals,
    initCareer,
    simulateSeason
  };
}

function updateOVR(age: number, currentOvr: number): number {
  let change = 0;
  
  if (age < 26) {
    // Crescimento rápido
    change = Math.floor(Math.random() * 4) + 1; 
  } else if (age >= 26 && age <= 31) {
    // Ápice (Prime) - Manutenção ou ganho leve
    change = Math.floor(Math.random() * 3) - 1; 
  } else if (age > 31 && age <= 35) {
    // Declínio inicial
    change = -Math.floor(Math.random() * 3);
  } else {
    // Declínio acentuado
    change = -Math.floor(Math.random() * 4) - 1;
  }

  const newOvr = currentOvr + change;
  return Math.min(Math.max(newOvr, 40), 99); // Trava entre 40 e 99
}

function generateStats(ovr: number, position: Position) {
  // Base de cálculo vinculada ao OVR
  const baseStat = (ovr / 99); 
  
  // Variação RNG (± 10%)
  const variance = () => (Math.random() * 0.2) + 0.9;

  let ppg = 0, rpg = 0, apg = 0;

  switch (position) {
    case 'PG':
      ppg = baseStat * 25 * variance();
      apg = baseStat * 11 * variance();
      rpg = baseStat * 5 * variance();
      break;
    case 'SG':
      ppg = baseStat * 30 * variance();
      apg = baseStat * 6 * variance();
      rpg = baseStat * 6 * variance();
      break;
    case 'SF':
      ppg = baseStat * 28 * variance();
      apg = baseStat * 7 * variance();
      rpg = baseStat * 8 * variance();
      break;
    case 'PF':
      ppg = baseStat * 24 * variance();
      apg = baseStat * 4 * variance();
      rpg = baseStat * 11 * variance();
      break;
    case 'C':
      ppg = baseStat * 22 * variance();
      apg = baseStat * 3 * variance();
      rpg = baseStat * 13 * variance();
      break;
  }

  return {
    ppg: parseFloat(ppg.toFixed(1)),
    rpg: parseFloat(rpg.toFixed(1)),
    apg: parseFloat(apg.toFixed(1))
  };
}