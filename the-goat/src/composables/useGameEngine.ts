// src/composables/useGameEngine.ts
import { ref, reactive, computed } from 'vue';
import type { PlayerProfile, SeasonStats, CareerTotals, Position } from '../types';
import { simulateLeagueStandings } from '../utils/leagueSimulation';
import { calculateSeasonStats } from '../utils/statsCalculator';
import { calculateAwards } from '../utils/awardsCalculator';
import { simulatePlayoffs } from '../utils/playoffsSimulation';

export function useGameEngine() {
  const player = reactive<PlayerProfile>({
    name: '',
    position: 'SF',
    nationality: 'USA',
    teamId: 'LAL',
    age: 19,
    ovr: 68,
    isRetired: false,
    attributes: { Arremesso: 60, Drible: 60, Defesa: 60, IQ: 60, Atletismo: 60, Passe: 60, Rebote: 60, Velocidade: 60, Mentalidade: 60 }
  });

  const history = ref<SeasonStats[]>([]);

  const initCareer = (name: string, position: Position) => {
    player.name = name;
    player.position = position;
    player.age = 19;
    player.isRetired = false;
    history.value = [];
  };

  const simulateSeason = () => {
    if (player.isRetired) return;

    const seasonNumber = history.value.length + 1;

    // 1. Simular Liga e Standings
    const standings = simulateLeagueStandings(player);
    const myTeamStandings = standings.find(t => t.id === player.teamId)!;

    // 2. Gerar Estatísticas Avançadas baseadas nos Atributos
    const rawStats = calculateSeasonStats(player.attributes, player.position, player.age, myTeamStandings.wins);

    // 3. Simular Playoffs (Anel)
    const wonRing = simulatePlayoffs(player, standings);

    // 4. Calcular Prêmios (Awards)
    const awards = calculateAwards(rawStats, seasonNumber, myTeamStandings.wins, standings, player.position);

    // 5. Salvar na História
    history.value.push({
      seasonNumber,
      age: player.age,
      ovr: player.ovr,
      teamId: player.teamId,
      teamWins: myTeamStandings.wins,
      teamLosses: myTeamStandings.losses,
      ...rawStats,
      awards,
      wonRing
    });

    // 6. Atualização de OVR e Idade (Teto e Regressão)
    if (player.age >= 40 || (player.age > 36 && Math.random() < 0.25)) {
      player.isRetired = true;
    } else {
      player.age += 1;
      
      // Define o teto máximo de OVR baseado na média dos atributos roubados (+12 de folga para desenvolvimento)
      const attrValues = Object.values(player.attributes) as number[];
      const baseAvg = attrValues.reduce((a, b) => a + b, 0) / attrValues.length;
      const potentialCeiling = Math.min(99, Math.floor(baseAvg + 12)); 

      if (player.age < 26) {
        // Evolução de novato a estrela
        player.ovr += Math.floor(Math.random() * 4);
        if (player.ovr > potentialCeiling) player.ovr = potentialCeiling;
      } else if (player.age >= 26 && player.age <= 31) {
        // Ápice: flutuação mínima
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0 ou +1
        player.ovr = Math.min(potentialCeiling, player.ovr + change);
      } else if (player.age > 31 && player.age <= 34) {
        // Início do declínio físico
        player.ovr -= Math.floor(Math.random() * 3) + 1; // Perde de 1 a 3 pontos por ano
      } else {
        // Declínio severo em idade avançada
        player.ovr -= Math.floor(Math.random() * 4) + 3; // Perde de 3 a 6 pontos por ano
      }
      
      player.ovr = Math.max(40, Math.floor(player.ovr)); // Nunca cai abaixo de 40
    }
  };

  // Atualize o computed 'careerTotals' para incluir Steals e Blocks
  const careerTotals = computed<CareerTotals>(() => {
    return history.value.reduce(
      (acc, season) => {
        acc.totalPoints += Math.round(season.ppg * 82);
        acc.totalRebounds += Math.round(season.rpg * 82);
        acc.totalAssists += Math.round(season.apg * 82);
        acc.totalSteals += Math.round(season.spg * 82);
        acc.totalBlocks += Math.round(season.bpg * 82);
        if (season.wonRing) acc.rings += 1;
        if (season.awards.includes('MVP')) acc.mvps += 1;
        acc.seasonsPlayed += 1;
        return acc;
      },
      { totalPoints: 0, totalRebounds: 0, totalAssists: 0, totalSteals: 0, totalBlocks: 0, rings: 0, mvps: 0, seasonsPlayed: 0 }
    );
  });

  return { player, history, careerTotals, initCareer, simulateSeason };
}