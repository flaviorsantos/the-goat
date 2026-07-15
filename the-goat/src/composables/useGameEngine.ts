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
    mvps: 0,
    rings: 0,
    seasonsPlayed: 0
  });

  const leagueTeams = ref(JSON.parse(JSON.stringify(nbaTeams)));
  const freeAgencyOffers = ref<ContractOffer[]>([]);
  
  const pendingMilestones = ref<{ title: string; subtitle: string; icon: string }[]>([]);
  const achievedMilestones = ref<Set<string>>(new Set());

  const initCareer = (name: string, pos: Position, nat: string, jersey: number, _draftMode: string, gameMode: string) => {
    player.value.name = name;
    player.value.position = pos;
    player.value.nationality = nat;
    player.value.jerseyNumber = jersey;
    player.value.gameMode = gameMode;
    player.value.isRetired = false;
    player.value.contractYearsLeft = 4;
    player.value.careerTimeline = [];
    
    history.value = [];
    careerTotals.value = { gamesPlayed: 0, totalPoints: 0, totalAssists: 0, totalRebounds: 0, totalSteals: 0, totalBlocks: 0, mvps: 0, rings: 0, seasonsPlayed: 0 };
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

  const generateOffers = () => {
    freeAgencyOffers.value = [];

    if (player.value.ovr < 70 && player.value.age > 32) {
      forceRetirement();
      return;
    }
    
    const baseSalary = player.value.ovr >= 95 ? 50 : (player.value.ovr >= 85 ? 35 : (player.value.ovr >= 75 ? 20 : 5));
    const role = player.value.ovr >= 88 ? 'Franchise Player' : (player.value.ovr >= 78 ? 'Starter' : 'Role Player');
    const maxYears = player.value.age >= 35 ? 1 : (player.value.age >= 32 ? 2 : 4);

    freeAgencyOffers.value.push({
      teamId: player.value.teamId,
      years: Math.min(maxYears, Math.floor(Math.random() * 2) + 3),
      salary: Number((baseSalary * (Math.random() * 0.1 + 0.95)).toFixed(1)),
      role
    });

    const numOffers = Math.floor(Math.random() * 2) + 2;
    const availableTeams = leagueTeams.value
      .filter((t: any) => t.id !== player.value.teamId)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOffers);

    availableTeams.forEach((team: any) => {
      freeAgencyOffers.value.push({
        teamId: team.id,
        years: Math.min(maxYears, Math.floor(Math.random() * 3) + 2),
        salary: Number((baseSalary * (Math.random() * 0.3 + 0.85)).toFixed(1)),
        role
      });
    });
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

    const currentTeam = leagueTeams.value.find((t: any) => t.id === player.value.teamId);
    const teamBaseOvr = currentTeam ? currentTeam.baseOvr : 75;

    const teamPower = (teamBaseOvr * 0.65) + (player.value.ovr * 0.35);
    let regularSeasonWins = Math.floor(41 + ((teamPower - 75) * 2.5) + (Math.random() * 10 - 5));
    regularSeasonWins = Math.max(10, Math.min(74, regularSeasonWins)); 

    const rawStats = calculateSeasonStats(
      player.value.attributes, 
      player.value.position, 
      player.value.ovr, 
      teamBaseOvr, 
      player.value.age
    );

    const playoffRun = simulatePlayoffs(player.value.ovr, teamBaseOvr, regularSeasonWins);

    const isRookie = history.value.length === 0;
    const playerAwards = calculateAwards(
      rawStats, 
      player.value.attributes, 
      player.value.ovr, 
      regularSeasonWins, 
      isRookie,
      player.value.position
    );

    if (playoffRun.wonRing && player.value.ovr >= 90 && Math.random() > 0.2) {
      playerAwards.push('Finals MVP');
    }

    const gamesPlayedThisSeason = 75 + Math.floor(Math.random() * 8); 
    
    careerTotals.value.gamesPlayed += gamesPlayedThisSeason;
    careerTotals.value.totalPoints += Math.floor(rawStats.ppg * gamesPlayedThisSeason);
    careerTotals.value.totalAssists += Math.floor(rawStats.apg * gamesPlayedThisSeason);
    careerTotals.value.totalRebounds += Math.floor(rawStats.rpg * gamesPlayedThisSeason);
    
    if (playoffRun.wonRing) careerTotals.value.rings += 1;
    if (playerAwards.includes('MVP')) careerTotals.value.mvps += 1;

    checkMilestones(playerAwards, playoffRun.wonRing, rawStats.ppg);

    history.value.push({
      seasonNumber: history.value.length + 1,
      teamId: player.value.teamId,
      age: player.value.age,
      ovr: player.value.ovr,
      ...rawStats,
      playoffs: playoffRun,
      awards: playerAwards,
      wonRing: playoffRun.wonRing
    });

    applyOffseasonProgression();

    if ((player.value.age >= 34 && player.value.ovr < 68) || player.value.age >= 39) {
      forceRetirement();
    }
  };

  return { 
    player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones,
    initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
    loadPastCareer 
  };
}