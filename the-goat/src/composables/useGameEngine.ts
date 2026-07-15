import { ref } from 'vue';
import { nbaTeams } from '../data/teams';
import { calculateSeasonStats } from '../utils/statsCalculator';
import { simulatePlayoffs } from '../utils/playoffsSimulation';
import { calculateAwards } from '../utils/awardsCalculator';
import { calculateGoatScore } from '../utils/careerEvaluator';
import type { Position } from '../types';

export interface ContractOffer {
  teamId: string;
  years: number;
  salary: number;
  role: string;
}

export function useGameEngine() {
  const player = ref<any>({
    name: '',
    position: 'PG',
    nationality: 'US',
    jerseyNumber: 0,
    age: 19,
    ovr: 75,
    attributes: {},
    potentialAttributes: {},
    teamId: '',
    contractYearsLeft: 4,
    isRetired: false,
    gameMode: 'fast',
    careerTimeline: []
  });

  const history = ref<any[]>([]);
  const careerTotals = ref({
    gamesPlayed: 0,
    totalPoints: 0,
    totalAssists: 0,
    totalRebounds: 0,
    totalSteals: 0,
    totalBlocks: 0,
    totalTurnovers: 0,
    totalEarnings: 0,
    mvps: 0,
    rings: 0,
    seasonsPlayed: 0
  });

  const leagueTeams = ref(JSON.parse(JSON.stringify(nbaTeams)));
  const freeAgencyOffers = ref<ContractOffer[]>([]);
  
  const pendingMilestones = ref<{ title: string; subtitle: string; icon: string }[]>([]);
  const achievedMilestones = ref<Set<string>>(new Set());

  const initCareer = (name: string, pos: Position, nat: string, jersey: number, _draftMode: string) => {
    player.value.name = name;
    player.value.position = pos;
    player.value.nationality = nat;
    player.value.jerseyNumber = jersey;
    player.value.isRetired = false;
    player.value.contractYearsLeft = 4;
    player.value.careerTimeline = [];
    
    history.value = [];
    careerTotals.value = {
      gamesPlayed: 0, totalPoints: 0, totalAssists: 0, totalRebounds: 0,
      totalSteals: 0, totalBlocks: 0, totalTurnovers: 0, totalEarnings: 0,
      mvps: 0, rings: 0, seasonsPlayed: 0
    };
    pendingMilestones.value = [];
    achievedMilestones.value = new Set();
  };

  const applyOffseasonProgression = () => {
    player.value.age++;
    
    if (player.value.contractYearsLeft > 0) {
      player.value.contractYearsLeft--;
    }

    const attrs = player.value.attributes;
    const pots = player.value.potentialAttributes;
    const age = player.value.age;

    // Agrupamento estrito de atributos para manipulação em lote
    const physicals = ['Speed', 'Athleticism', 'Defense'] as const;
    const mentals = ['IQ', 'Mentality'] as const;
    const technicals = ['Shooting', 'Dribbling', 'Passing', 'Rebounding'] as const;

    if (age < 24) {
      // Desenvolvimento Rápido: Cobre a distância até o potencial de forma agressiva
      for (const key in attrs) {
        const k = key as keyof typeof attrs;
        if (attrs[k] < pots[k]) {
          // O crescimento acelera consoante os anos restantes até ao auge (24 anos)
          const gap = pots[k] - attrs[k];
          const yearsToPrime = 24 - age;
          const baseGrowth = Math.ceil(gap / yearsToPrime);
          const growthVariance = Math.floor(Math.random() * 2); // +0 ou +1
          
          attrs[k] = Math.min(pots[k], attrs[k] + baseGrowth + growthVariance);
        }
      }
    } else if (age >= 24 && age <= 29) {
      // O Auge: Força a convergência exata ao potencial e estabiliza
      for (const key in attrs) {
        const k = key as keyof typeof attrs;
        if (attrs[k] < pots[k]) {
          attrs[k] = pots[k];
        }
      }
    } else if (age >= 30 && age <= 34) {
      // Declínio Leve
      physicals.forEach(k => {
        attrs[k] = Math.max(30, attrs[k] - 1);
      });
      technicals.forEach(k => {
        // 50% de probabilidade de perder 1 ponto em atributos técnicos
        if (Math.random() > 0.5) attrs[k] = Math.max(30, attrs[k] - 1);
      });
      mentals.forEach(k => {
        // IQ e Mentality sobem devido à experiência
        attrs[k] = Math.min(99, attrs[k] + 1);
      });
    } else if (age >= 35) {
      // Declínio Severo
      physicals.forEach(k => {
        const drop = Math.floor(Math.random() * 2) + 2; // -2 a -3 por ano
        attrs[k] = Math.max(30, attrs[k] - drop);
      });
      technicals.forEach(k => {
        const drop = Math.floor(Math.random() * 2) + 1; // -1 a -2 por ano
        attrs[k] = Math.max(30, attrs[k] - drop);
      });
      // Atributos mentais estabilizam no pico, não sofrem decaimento
    }

    // É imperativo recalcular o OVR após a manipulação dos atributos
    recalculateOVR();
  };

  const recalculateOVR = () => {
    const attrs = player.value.attributes;
    const position = player.value.position; // Ex: 'PG', 'SG', 'SF', 'PF', 'C'

    // Pesos padrão (os seus pesos atuais)
    let weights = {
      Shooting: 0.15, Defense: 0.15, Athleticism: 0.15,
      Dribbling: 0.10, IQ: 0.10, Passing: 0.10, Rebounding: 0.10, Speed: 0.10,
      Mentality: 0.05
    };

    // Exemplo de personalização por posição
    if (position === 'C' || position === 'PF') {
      weights = {
        Shooting: 0.05, Defense: 0.20, Athleticism: 0.15,
        Dribbling: 0.05, IQ: 0.10, Passing: 0.05, Rebounding: 0.25, Speed: 0.10,
        Mentality: 0.05
      };
    } else if (position === 'PG') {
      weights = {
        Shooting: 0.15, Defense: 0.10, Athleticism: 0.10,
        Dribbling: 0.20, IQ: 0.15, Passing: 0.20, Rebounding: 0.02, Speed: 0.03,
        Mentality: 0.05
      };
    }

    // Cálculo da média ponderada dinâmica
    const sum = Object.keys(weights).reduce((acc, key) => {
      return acc + (attrs[key as keyof typeof attrs] * weights[key as keyof typeof weights]);
    }, 0);

    // Arredondamento justo para o jogador
    player.value.ovr = Math.round(sum);
  };

  const getRandomTeam = () => {
    const randomTeam = leagueTeams.value[Math.floor(Math.random() * leagueTeams.value.length)];
    return randomTeam.id;
  };

  const generateOffers = () => {
    const offers = [];
    const numOffers = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numOffers; i++) {
      const isExtension = i === 0 && Math.random() > 0.3;
      const team = isExtension ? player.value.teamId : getRandomTeam();
      
      let maxYears = 4;
      if (player.value.age >= 39) maxYears = 1;
      else if (player.value.age >= 36) maxYears = 2;
      else if (player.value.age >= 34) maxYears = 3;
      
      const years = Math.floor(Math.random() * maxYears) + 1;
      const salary = Math.floor(Math.random() * (player.value.ovr > 85 ? 15 : 5)) + (player.value.ovr > 80 ? 25 : 10);
      
      offers.push({ 
        teamId: team, 
        salary, 
        years, 
        role: player.value.ovr > 85 ? 'Franchise Player' : 'Starter' 
      });
    }
    freeAgencyOffers.value = offers;
  };

  const acceptOffer = (offer: ContractOffer) => {
    if (player.value.teamId !== offer.teamId) {
      if (player.value.careerTimeline.length > 0) {
        player.value.careerTimeline[player.value.careerTimeline.length - 1].endYear = history.value.length;
      }
      player.value.careerTimeline.push({ 
        teamId: offer.teamId, 
        startYear: history.value.length + 1, 
        endYear: null 
      });
    }
    
    player.value.teamId = offer.teamId;
    player.value.contractYearsLeft = offer.years;
    freeAgencyOffers.value = [];
  };

  const checkMilestones = (awards: string[], wonRing: boolean, ppg: number) => {
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

    if (ppg >= 35 && !achievedMilestones.value.has('ppg_35')) {
      pendingMilestones.value.push({ title: 'Scoring Machine', subtitle: `Averaged ${ppg} PPG this season.`, icon: '📈' });
      achievedMilestones.value.add('ppg_35');
    }

    if (awards.includes('MVP') && !achievedMilestones.value.has('first_mvp')) {
      pendingMilestones.value.push({ title: 'First MVP Award', subtitle: 'The best player in the world.', icon: '⭐' });
      achievedMilestones.value.add('first_mvp');
    }
    if (wonRing && !achievedMilestones.value.has('first_ring')) {
      pendingMilestones.value.push({ title: 'NBA Champion', subtitle: 'Your first ring. History made.', icon: '🏆' });
      achievedMilestones.value.add('first_ring');
    }
  };

  const saveRetiredCareer = () => {
    const counts: Record<string, number> = {};
    history.value.forEach(season => {
      season.awards.forEach((award: string) => counts[award] = (counts[award] || 0) + 1);
    });
    
    const detailedAwards = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const goat = calculateGoatScore(careerTotals.value, detailedAwards);
    const rings = history.value.filter(s => s.playoffs?.wonRing).length;

    const savedList = JSON.parse(localStorage.getItem('the_goat_past_careers') || '[]');
    
    const newSave = {
      id: Date.now().toString(),
      player: JSON.parse(JSON.stringify(player.value)),
      history: JSON.parse(JSON.stringify(history.value)),
      careerTotals: JSON.parse(JSON.stringify(careerTotals.value)),
      goatScore: goat.score,
      goatTier: goat.tier,
      rings
    };

    savedList.unshift(newSave);
    localStorage.setItem('the_goat_past_careers', JSON.stringify(savedList.slice(0, 8)));
  };

  const loadPastCareer = (savedData: any) => {
    Object.assign(player.value, savedData.player);
    history.value = savedData.history;
    careerTotals.value = savedData.careerTotals;
  };

  const forceRetirement = () => {
    player.value.isRetired = true;
    player.value.contractYearsLeft = 0;
    if (player.value.careerTimeline.length > 0 && player.value.careerTimeline[player.value.careerTimeline.length - 1].endYear === null) {
      player.value.careerTimeline[player.value.careerTimeline.length - 1].endYear = history.value.length;
    }
    saveRetiredCareer();
  };

  const simulateSeason = () => {
    if (player.value.isRetired) return;

    // 1. Simulação de W/L para toda a liga
    leagueTeams.value.forEach((team: { baseOvr: number; wins: number; losses: number; }) => {
      const winProb = (team.baseOvr - 70) / 20; 
      let wins = Math.floor(winProb * 82) + Math.floor(Math.random() * 12 - 6);
      team.wins = Math.max(10, Math.min(73, wins));
      team.losses = 82 - team.wins;
    });

    const playerTeam = leagueTeams.value.find((t: { id: any; }) => t.id === player.value.teamId);
    const teamWins = playerTeam ? playerTeam.wins : 41;
    const teamBaseOvr = playerTeam ? playerTeam.baseOvr : 75;

    // 2. Cálculo de Estatísticas e Playoffs
    const seasonStats = calculateSeasonStats(
      player.value.attributes, 
      player.value.position, 
      player.value.ovr, 
      teamBaseOvr, 
      player.value.age
    );

    const seasonPlayoffs = simulatePlayoffs(teamWins, player.value.ovr, teamBaseOvr);
    
    // 3. Premiações Individuais (passando a posição)
    const seasonAwards = calculateAwards(
      seasonStats, 
      player.value.attributes, 
      player.value.ovr, 
      teamWins, 
      history.value.length === 0,
      player.value.position
    );

    // 4. Simulação de Prêmios Globais da Liga (NPCs)
    const npcStars = ['L. Doncic', 'N. Jokic', 'S. Gilgeous-Alexander', 'A. Edwards', 'V. Wembanyama', 'G. Antetokounmpo'];
    const getNPC = () => npcStars[Math.floor(Math.random() * npcStars.length)];

    const leagueAwards = {
      MVP: seasonAwards.includes('MVP') ? player.value.name : getNPC(),
      DPOY: seasonAwards.includes('DPOY') ? player.value.name : getNPC(),
      SMOTY: seasonAwards.includes('SMOTY') ? player.value.name : getNPC(),
      FMVP: seasonPlayoffs.wonRing ? player.value.name : getNPC(),
    };

    const currentContract = player.value.currentContract;

    // 5. Registro do Histórico da Temporada
    history.value.push({
      seasonNumber: history.value.length + 1,
      teamId: player.value.teamId,
      age: player.value.age,
      ovr: player.value.ovr,
      salary: currentContract ? currentContract.salary : 0,
      ...seasonStats,
      playoffs: seasonPlayoffs,
      awards: seasonAwards,
      leagueAwards
    });

    // 6. Acúmulo de Totais de Carreira
    careerTotals.value.gamesPlayed += 82;
    careerTotals.value.seasonsPlayed += 1;
    careerTotals.value.totalPoints += Math.floor(seasonStats.ppg * 82);
    careerTotals.value.totalRebounds += Math.floor(seasonStats.rpg * 82);
    careerTotals.value.totalAssists += Math.floor(seasonStats.apg * 82);
    careerTotals.value.totalSteals = (careerTotals.value.totalSteals || 0) + Math.floor(seasonStats.spg * 82);
    careerTotals.value.totalBlocks = (careerTotals.value.totalBlocks || 0) + Math.floor(seasonStats.bpg * 82);
    careerTotals.value.totalTurnovers = (careerTotals.value.totalTurnovers || 0) + Math.floor(seasonStats.tov * 82);
    careerTotals.value.totalEarnings = (careerTotals.value.totalEarnings || 0) + (currentContract ? currentContract.salary : 0);

    if (seasonAwards.includes('MVP')) careerTotals.value.mvps += 1;
    if (seasonPlayoffs.wonRing) careerTotals.value.rings += 1;

    checkMilestones(seasonAwards, seasonPlayoffs.wonRing, seasonStats.ppg);

    // 7. Aplicação da Progressão e Declínio (Envelhecimento)
    applyOffseasonProgression();

    // 8. Verificação de Aposentadoria Forçada
    if (player.value.age >= 44 || (player.value.age >= 38 && player.value.ovr < 70)) {
      forceRetirement();
    }
  };

  return { 
    player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones,
    initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
    loadPastCareer 
  };
}