// src/composables/useGameEngine.ts
import { ref, reactive, computed } from 'vue';
import type { PlayerProfile, SeasonStats, CareerTotals, Position, PlayerAttributes, Team } from '../types';
import { simulateLeagueStandings } from '../utils/leagueSimulation';
import { calculateSeasonStats } from '../utils/statsCalculator';
import { calculateAwards } from '../utils/awardsCalculator';
import { simulatePlayoffs } from '../utils/playoffsSimulation';
import { nbaTeams } from '../data/teams';

export function useGameEngine() {
  const player = reactive<PlayerProfile & { contractYearsLeft: number }>({
    name: '',
    position: 'SF',
    nationality: 'USA',
    teamId: 'LAL',
    age: 19,
    ovr: 68,
    isRetired: false,
    attributes: {} as PlayerAttributes,
    potentialAttributes: {} as PlayerAttributes,
    contractYearsLeft: 4
  });

  const history = ref<SeasonStats[]>([]);

  const leagueTeams = ref<Team[]>([]);

  const updateOVR = () => {
    const values = Object.values(player.attributes);
    const sum = values.reduce((acc, val) => acc + val, 0);
    player.ovr = Math.floor(sum / values.length);
  };

  const initCareer = (name: string, position: Position) => {
    player.name = name;
    player.position = position;
    player.age = 19;
    player.isRetired = false;
    player.contractYearsLeft = 4; 
    history.value = [];

    leagueTeams.value = JSON.parse(JSON.stringify(nbaTeams)).map((t: Team) => ({ ...t, momentum: 0 }));
  };

  const applyAttributeProgression = () => {
    const physicalAttrs: (keyof PlayerAttributes)[] = ['Speed', 'Athleticism', 'Defense'];
    const mentalAttrs: (keyof PlayerAttributes)[] = ['Shooting', 'Dribbling', 'IQ', 'Passing', 'Rebounding', 'Mentality'];

    const age = player.age;

    const modifyAttribute = (attr: keyof PlayerAttributes, change: number) => {
      let newVal = player.attributes[attr] + change;
      if (newVal > player.potentialAttributes[attr]) newVal = player.potentialAttributes[attr];
      if (newVal < 25) newVal = 25;
      player.attributes[attr] = newVal;
    };

    if (age < 26) {
      physicalAttrs.forEach(attr => modifyAttribute(attr, Math.floor(Math.random() * 4) + 1));
      mentalAttrs.forEach(attr => modifyAttribute(attr, Math.floor(Math.random() * 3) + 1));
    } else if (age >= 26 && age <= 31) {
      physicalAttrs.forEach(attr => modifyAttribute(attr, Math.floor(Math.random() * 3) - 1)); // -1 a +1
      mentalAttrs.forEach(attr => modifyAttribute(attr, Math.floor(Math.random() * 2))); // 0 a +1
    } else if (age > 31 && age <= 34) {
      physicalAttrs.forEach(attr => modifyAttribute(attr, -(Math.floor(Math.random() * 3) + 1))); // -1 a -3
      mentalAttrs.forEach(attr => modifyAttribute(attr, Math.floor(Math.random() * 2) - 1)); // -1 a 0
    } else {
      physicalAttrs.forEach(attr => modifyAttribute(attr, -(Math.floor(Math.random() * 4) + 2))); // -2 a -5
      mentalAttrs.forEach(attr => modifyAttribute(attr, -(Math.floor(Math.random() * 3) + 1))); // -1 a -3
    }
  };

  const exploreFreeAgency = () => {
    // Busca times que são "Contenders" (Momentum alto e Base OVR forte) para tentar assinar
    const contenders = leagueTeams.value
      .filter(t => t.id !== player.teamId)
      .sort((a, b) => (b.baseOvr + (b.momentum || 0)) - (a.baseOvr + (a.momentum || 0)))
      .slice(0, 5); // Top 5 times da liga no momento

    if (contenders.length > 0) {
      // Assina com o time que faz mais sentido (OVR do jogador influencia)
      const rngChoice = Math.floor(Math.random() * (player.ovr > 85 ? 2 : contenders.length));
      player.teamId = contenders[rngChoice].id;
      player.contractYearsLeft = 4; // Renova por 4 anos
    }
  };

  const reSignWithTeam = () => {
    player.contractYearsLeft = 4;
  };

  const simulateSeason = () => {
    if (player.isRetired) return;

    const seasonNumber = history.value.length + 1;

    const standings = simulateLeagueStandings(player, leagueTeams.value);
    const myTeamStandings = standings.find(t => t.id === player.teamId)!;

    // 2. Gerar Estatísticas Avançadas baseadas nos Atributos
    const rawStats = calculateSeasonStats(
      player.attributes, 
      player.position, 
      player.age, 
      player.ovr, 
      myTeamStandings.wins
    );

    // 3. Simular Playoffs
    const playoffRun = simulatePlayoffs(player, myTeamStandings.wins, rawStats);

    // 4. Prêmios Globais e Individuais (Agora recebendo playoffRun)
    const awardsData = calculateAwards(rawStats, myTeamStandings.wins, player, player.age === 19, playoffRun);
    
    if (playoffRun.wonRing) {
      careerTotals.value.rings += 1;
    }
    
    // Contabiliza MVPs para o cálculo de Goat
    if (awardsData.playerAwards.includes('MVP')) {
      careerTotals.value.mvps += 1;
    }

    // 5. Salvar Histórico
    history.value.push({
      seasonNumber,
      age: player.age,
      ovr: player.ovr,
      teamId: player.teamId,
      teamWins: myTeamStandings.wins,
      teamLosses: myTeamStandings.losses,
      ...rawStats,
      awards: awardsData.playerAwards,
      leagueAwards: awardsData.leagueAwards, 
      wonRing: playoffRun.wonRing,
      playoffs: playoffRun
    });

    if (player.age >= 40 || (player.age > 36 && Math.random() < 0.25)) {
      player.isRetired = true;
    } else {
      player.age += 1;
      player.contractYearsLeft -= 1; 
      applyAttributeProgression();
      updateOVR();
    }
      
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

  return { 
    player, 
    history, 
    careerTotals, 
    initCareer, 
    simulateSeason, 
    exploreFreeAgency, 
    reSignWithTeam 
  };
}