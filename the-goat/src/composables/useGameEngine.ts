// src/composables/useGameEngine.ts
import { ref, reactive, computed } from 'vue';
import type { PlayerProfile, Position, PlayerAttributes, Team, SeasonStats, CareerTotals, Difficulty, GameMode, ContractOffer } from '../types';
import { simulateLeagueStandings } from '../utils/leagueSimulation';
import { calculateSeasonStats } from '../utils/statsCalculator';
import { calculateAwards } from '../utils/awardsCalculator';
import { simulatePlayoffs } from '../utils/playoffsSimulation';
import { nbaTeams } from '../data/teams';
import { calculateGoatScore } from '../utils/careerEvaluator';

export function useGameEngine() {
  const player = reactive<PlayerProfile>({
    name: '',
    position: 'SF',
    nationality: 'USA',
    jerseyNumber: 0,
    difficulty: 'amateur',
    gameMode: 'fast',
    teamId: 'LAL',
    age: 19,
    ovr: 68,
    isRetired: false,
    contractYearsLeft: 4,
    attributes: {} as PlayerAttributes,
    potentialAttributes: {} as PlayerAttributes,
    careerTimeline: []
  });

  const pendingMilestones = ref<{ title: string; subtitle: string; icon: string }[]>([]);
  const achievedMilestones = ref<Set<string>>(new Set());

  const history = ref<SeasonStats[]>([]);

  const leagueTeams = ref<Team[]>([]);

  const recalculateOVR = () => {
    const attrs = player.attributes;
    const sum = (attrs.Shooting * 0.15) + (attrs.Dribbling * 0.1) +
                (attrs.Defense * 0.15) + (attrs.IQ * 0.1) +
                (attrs.Athleticism * 0.15) + (attrs.Passing * 0.1) +
                (attrs.Rebounding * 0.1) + (attrs.Speed * 0.1) +
                (attrs.Mentality * 0.05);
    player.ovr = Math.floor(sum);
  };

  const initCareer = (
    name: string, 
    position: Position, 
    nationality: string, 
    jerseyNumber: number, 
    difficulty: Difficulty, 
    gameMode: GameMode
  ) => {
    player.name = name;
    player.position = position;
    player.nationality = nationality;
    player.jerseyNumber = jerseyNumber;
    player.difficulty = difficulty;
    player.gameMode = gameMode;
    player.age = 19;
    player.isRetired = false;
    player.contractYearsLeft = 4;
    player.careerTimeline = []; 
    history.value = [];
    pendingMilestones.value = [];
    achievedMilestones.value = new Set(); 
    
    leagueTeams.value = JSON.parse(JSON.stringify(nbaTeams)).map((t: Team) => ({ ...t, momentum: 0 }));
  };

  const applyAttributeProgression = () => {
    player.age++;
    if (player.contractYearsLeft > 0) player.contractYearsLeft--;

    const isDeclining = player.age >= 33;

    if (player.age < 27) {
      // Evolução orgânica até o teto de potencial (DNA roubado)
      for (const key in player.attributes) {
        const k = key as keyof typeof player.attributes;
        if (player.attributes[k] < player.potentialAttributes[k]) {
          player.attributes[k] += Math.floor(Math.random() * 3) + 1;
          if (player.attributes[k] > player.potentialAttributes[k]) {
            player.attributes[k] = player.potentialAttributes[k];
          }
        }
      }
    } else if (isDeclining) {
      // Regressão baseada na idade (Peso severo no físico)
      const declineRate = player.age - 32; // Acelera o declínio a cada ano
      
      player.attributes.Speed = Math.max(30, player.attributes.Speed - (Math.floor(Math.random() * 3) + declineRate));
      player.attributes.Athleticism = Math.max(30, player.attributes.Athleticism - (Math.floor(Math.random() * 3) + declineRate));
      player.attributes.Defense = Math.max(30, player.attributes.Defense - (Math.floor(Math.random() * 2) + 1));
      
      if (player.age >= 35) {
        player.attributes.Shooting = Math.max(40, player.attributes.Shooting - Math.floor(Math.random() * 2));
        player.attributes.Dribbling = Math.max(40, player.attributes.Dribbling - 2);
      }
      
      // QI e Mentalidade não sofrem regressão na velhice
      player.attributes.IQ = Math.min(99, player.attributes.IQ + 1);
    }

    recalculateOVR();
  };

  const saveRetiredCareer = () => {
    const counts: Record<string, number> = {};
    history.value.forEach(season => {
      season.awards.forEach(award => counts[award] = (counts[award] || 0) + 1);
    });
    const detailedAwards = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const goat = calculateGoatScore(careerTotals.value, detailedAwards);
    const rings = history.value.filter(s => s.playoffs?.wonRing).length;

    const savedList = JSON.parse(localStorage.getItem('the_goat_past_careers') || '[]');
    
    const newSave = {
      id: Date.now().toString(),
      player: JSON.parse(JSON.stringify(player)),
      history: JSON.parse(JSON.stringify(history.value)),
      careerTotals: JSON.parse(JSON.stringify(careerTotals.value)),
      goatScore: goat.score,
      goatTier: goat.tier,
      rings
    };

    savedList.unshift(newSave); // Adiciona a carreira no topo da lista
    localStorage.setItem('the_goat_past_careers', JSON.stringify(savedList.slice(0, 8))); // Limita a 8 cards recentes
  };

  const loadPastCareer = (savedData: any) => {
    Object.assign(player, savedData.player);
    history.value = savedData.history;
  };

  const forceRetirement = () => {
    player.isRetired = true;
    player.contractYearsLeft = 0;
    if (player.careerTimeline.length > 0 && player.careerTimeline[player.careerTimeline.length - 1].endYear === null) {
      player.careerTimeline[player.careerTimeline.length - 1].endYear = history.value.length;
    }
    saveRetiredCareer(); 
  };

  const checkMilestones = (awards: string[], wonRing: boolean, ppg: number) => {
    // 1. Marcas de Pontuação na Carreira
    const pts = careerTotals.value.totalPoints;
    
    if (pts >= 10000 && !achievedMilestones.value.has('pts_10k')) {
      pendingMilestones.value.push({ title: '10,000 Career Points', subtitle: 'A star is born.', icon: '🏀' });
      achievedMilestones.value.add('pts_10k');
    }
    if (pts >= 20000 && !achievedMilestones.value.has('pts_20k')) {
      pendingMilestones.value.push({ title: '20,000 Career Points', subtitle: 'Entering the Hall of Fame discussion.', icon: '🔥' });
      achievedMilestones.value.add('pts_20k');
    }
    if (pts >= 30000 && !achievedMilestones.value.has('pts_30k')) {
      pendingMilestones.value.push({ title: '30,000 Career Points', subtitle: 'Absolute Legend.', icon: '👑' });
      achievedMilestones.value.add('pts_30k');
    }

    // 2. Pontuação em uma Temporada (Ex: Média Histórica)
    if (ppg >= 35 && !achievedMilestones.value.has('ppg_35')) {
      pendingMilestones.value.push({ title: 'Scoring Machine', subtitle: `Averaged ${ppg} PPG this season.`, icon: '📈' });
      achievedMilestones.value.add('ppg_35');
    }

    // 3. Prêmios Inéditos (Mostra apenas na primeira vez que ganha)
    if (awards.includes('MVP') && !achievedMilestones.value.has('first_mvp')) {
      pendingMilestones.value.push({ title: 'First MVP Award', subtitle: 'The best player in the world.', icon: '⭐' });
      achievedMilestones.value.add('first_mvp');
    }
    if (wonRing && !achievedMilestones.value.has('first_ring')) {
      pendingMilestones.value.push({ title: 'NBA Champion', subtitle: 'Your first ring. History made.', icon: '🏆' });
      achievedMilestones.value.add('first_ring');
    }
  };

  // Estado para armazenar as ofertas ativas
  const freeAgencyOffers = ref<ContractOffer[]>([]);

  const generateOffers = () => {
    freeAgencyOffers.value = [];
    
    // Determina o valor de mercado baseado no OVR
    const baseSalary = player.ovr >= 95 ? 50 : (player.ovr >= 85 ? 35 : (player.ovr >= 75 ? 20 : 5));
    const role = player.ovr >= 88 ? 'Franchise Player' : (player.ovr >= 78 ? 'Starter' : 'Role Player');
    const maxYears = player.age >= 35 ? 1 : (player.age >= 32 ? 2 : 4);

    // 1. Oferta de renovação do time atual
    freeAgencyOffers.value.push({
      teamId: player.teamId,
      years: Math.min(maxYears, Math.floor(Math.random() * 2) + 3), // Geralmente oferecem mais anos
      salary: Number((baseSalary * (Math.random() * 0.1 + 0.95)).toFixed(1)),
      role
    });

    // 2. Ofertas de 2 a 3 times rivais aleatórios
    const numOffers = Math.floor(Math.random() * 2) + 2;
    const availableTeams = leagueTeams.value
      .filter((t: Team) => t.id !== player.teamId)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOffers);

    availableTeams.forEach((team: Team) => {
      freeAgencyOffers.value.push({
        teamId: team.id,
        years: Math.min(maxYears, Math.floor(Math.random() * 3) + 2),
        salary: Number((baseSalary * (Math.random() * 0.3 + 0.85)).toFixed(1)),
        role
      });
    });
  };

  const acceptOffer = (offer: ContractOffer) => {
    // Se mudou de time, encerra o ciclo no time antigo e adiciona o novo na timeline
    if (player.teamId !== offer.teamId) {
      if (player.careerTimeline.length > 0) {
        player.careerTimeline[player.careerTimeline.length - 1].endYear = history.value.length;
      }
      player.careerTimeline.push({ 
        teamId: offer.teamId, 
        startYear: history.value.length + 1, 
        endYear: null 
      });
    }
    
    player.teamId = offer.teamId;
    player.contractYearsLeft = offer.years;
    freeAgencyOffers.value = []; // Limpa as ofertas para retomar a simulação
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

    checkMilestones(awardsData.playerAwards, playoffRun.wonRing, rawStats.ppg);

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

    applyAttributeProgression();

    // Aposentadoria Forçada (Regra de Idade ou Queda de Rendimento Absoluto)
    if (player.age >= 40 || (player.age >= 36 && player.ovr < 72)) {
      forceRetirement();
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
    player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones,
    initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
    loadPastCareer
  };
}