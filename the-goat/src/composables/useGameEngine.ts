import { ref } from 'vue';
import { nbaTeams } from '../data/teams';
import { calculateOverall, calculateSeasonStats } from '../utils/statsCalculator';
import { simulatePlayoffs } from '../utils/playoffsSimulation';
import { calculateAwards } from '../utils/awardsCalculator';
import { calculateGoatScore } from '../utils/careerEvaluator';
import { simulateInjury } from '../utils/injurySimulation';
import type {
  CareerTimelineEntry,
  Difficulty,
  GameMode,
  Position,
  SeasonStats,
  Team,
} from '../types';

type AttributeSource = {
  attribute: string;
  player: string;
  value: string | number;
};

type PlayerDna = Record<string, AttributeSource>;

type GamePlayer = {
  name: string;
  position: Position;
  nationality: string;
  jerseyNumber: number;
  difficulty: Difficulty;
  gameMode: GameMode;
  teamId: string;
  age: number;
  ovr: number;
  isRetired: boolean;
  contractYearsLeft: number;
  attributes: Record<string, number>;
  potentialAttributes: Record<string, number>;
  careerTimeline: CareerTimelineEntry[];
  currentSalary: number;
  originalDNA: PlayerDna;
  morale: number;
  tradeRequestedThisSeason: boolean;
  retirementReason: string | null;
};

type LeagueTeam = Team & {
  wins: number;
  losses: number;
};

type CareerTotals = {
  gamesPlayed: number;
  totalPoints: number;
  totalAssists: number;
  totalRebounds: number;
  totalSteals: number;
  totalBlocks: number;
  totalTurnovers: number;
  totalEarnings: number;
  mvps: number;
  rings: number;
  seasonsPlayed: number;
};

type SavedCareer = {
  id: string;
  player: GamePlayer;
  history: SeasonStats[];
  careerTotals: CareerTotals;
  goatScore: number;
  goatTier: string;
  rings: number;
};

type PlayoffPresentation = {
  active: boolean;
  seriesIndex: number;
  currentGame: number;
  mode: 'series' | 'games' | null;
  complete: boolean;
};

const createPlayoffPresentation = (): PlayoffPresentation => ({
  active: false,
  seriesIndex: 0,
  currentGame: 0,
  mode: null,
  complete: false,
});

const clone = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) as T : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

const createCareerTotals = (): CareerTotals => ({
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
  seasonsPlayed: 0,
});

const createLeagueTeams = (): LeagueTeam[] =>
  nbaTeams.map(team => ({ ...team, wins: 0, losses: 0 }));

const initialPlayer: GamePlayer = {
  name: '',
  position: 'SG' as Position,
  nationality: '',
  jerseyNumber: 0,
  age: 18,
  teamId: '',
  isRetired: true,
  contractYearsLeft: 0,
  currentSalary: 0,
  difficulty: 'amateur',
  gameMode: 'fast',
  careerTimeline: [],
  originalDNA: {},
  morale: 60,
  tradeRequestedThisSeason: false,
  retirementReason: null,
  attributes: {
    Shooting: 30,
    Defense: 30,
    Athleticism: 30,
    Dribbling: 30,
    IQ: 30,
    Passing: 30,
    Rebounding: 30,
    Speed: 30,
    Finishing: 30
  },
  potentialAttributes: {
    Shooting: 30,
    Defense: 30,
    Athleticism: 30,
    Dribbling: 30,
    IQ: 30,
    Passing: 30,
    Rebounding: 30,
    Speed: 30,
    Finishing: 30
  },
  ovr: 30
};

export interface ContractOffer {
  teamId: string;
  years: number;
  salary: number;
  role: string;
}

export function useGameEngine(
  {
    persistRetiredCareers = true,
    interactivePlayoffs = true,
  }: {
    persistRetiredCareers?: boolean;
    interactivePlayoffs?: boolean;
  } = {},
) {
  const player = ref<GamePlayer>(clone(initialPlayer));

  const history = ref<SeasonStats[]>([]);
  const careerTotals = ref<CareerTotals>(createCareerTotals());

  const leagueTeams = ref<LeagueTeam[]>(createLeagueTeams());
  const freeAgencyOffers = ref<ContractOffer[]>([]);
  
  const pendingMilestones = ref<{ title: string; subtitle: string; icon: string }[]>([]);
  const achievedMilestones = ref<Set<string>>(new Set());
  const lastTransactionMessage = ref('');
  const playoffPresentation = ref<PlayoffPresentation>(createPlayoffPresentation());
  let suppressNotifications = false;

  const queueMilestone = (
    milestone: { title: string; subtitle: string; icon: string },
  ) => {
    if (!suppressNotifications) pendingMilestones.value.push(milestone);
  };

  const initCareer = (
    name: string,
    pos: Position,
    nat: string,
    jersey: number,
    draftMode: Difficulty,
    dna: PlayerDna = {},
  ) => {
    player.value.name = name;
    player.value.position = pos;
    player.value.nationality = nat;
    player.value.jerseyNumber = jersey;
    player.value.isRetired = false;
    player.value.contractYearsLeft = 4;
    player.value.currentSalary = 5;
    player.value.careerTimeline = [];
    player.value.difficulty = draftMode;
    player.value.gameMode = 'fast';
    player.value.morale = 60;
    player.value.tradeRequestedThisSeason = false;
    player.value.retirementReason = null;

    player.value.originalDNA = clone(dna);
    
    history.value = [];
    careerTotals.value = createCareerTotals();
    leagueTeams.value = createLeagueTeams();
    freeAgencyOffers.value = [];
    pendingMilestones.value = [];
    achievedMilestones.value = new Set();
    lastTransactionMessage.value = '';
    playoffPresentation.value = createPlayoffPresentation();
  };

  const applyOffseasonProgression = () => {
    player.value.age++;
    
    if (player.value.contractYearsLeft > 0) {
      player.value.contractYearsLeft--;
    }

    const attrs = player.value.attributes;
    const pots = player.value.potentialAttributes;
    const age = player.value.age;

    const physicals = ['Speed', 'Athleticism', 'Defense'] as const;
    const mentals = ['IQ'] as const;
    const technicals = ['Shooting', 'Dribbling', 'Passing', 'Rebounding', 'Finishing'] as const;

    if (age < 26) {
      for (const key in attrs) {
        const k = key as keyof typeof attrs;
        if (attrs[k] < pots[k]) {
          const gap = pots[k] - attrs[k];
          const yearsToPrime = 26 - age;
          const baseGrowth = Math.ceil(gap / yearsToPrime);
          const growthVariance = Math.floor(Math.random() * 2); 
          
          attrs[k] = Math.min(pots[k], attrs[k] + baseGrowth + growthVariance);
        }
      }
    } else if (age >= 26 && age <= 30) {
      for (const key in attrs) {
        const k = key as keyof typeof attrs;
        if (attrs[k] < pots[k]) {
          attrs[k] = pots[k];
        }
      }
    } else if (age >= 31 && age <= 34) {
      physicals.forEach(k => {
        attrs[k] = Math.max(30, attrs[k] - 1);
      });
      technicals.forEach(k => {
        if (Math.random() > 0.5) attrs[k] = Math.max(30, attrs[k] - 1);
      });
      mentals.forEach(k => {
        attrs[k] = Math.min(99, attrs[k] + 1);
      });
    } else if (age >= 35) {
      physicals.forEach(k => {
        const drop = Math.floor(Math.random() * 2) + 2; 
        attrs[k] = Math.max(30, attrs[k] - drop);
      });
      technicals.forEach(k => {
        const drop = Math.floor(Math.random() * 2) + 1; 
        attrs[k] = Math.max(30, attrs[k] - drop);
      });
    }

    recalculateOVR();
  };

  const recalculateOVR = () => {
    player.value.ovr = calculateOverall(
      player.value.attributes,
      player.value.position,
    );
  };

  const getRandomTeam = () => {
    const randomTeam = leagueTeams.value[Math.floor(Math.random() * leagueTeams.value.length)];
    return randomTeam.id;
  };

  const generateOffers = () => {
    const offers: ContractOffer[] = [];
    const numOffers = Math.floor(Math.random() * 3) + 2;
    const usedTeams = new Set<string>();
    
    for (let i = 0; i < numOffers; i++) {
      const isExtension = i === 0 && Math.random() > 0.3;
      let team = isExtension ? player.value.teamId : getRandomTeam();

      while (usedTeams.has(team)) {
        team = getRandomTeam();
      }
      usedTeams.add(team);
      
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
        role: player.value.ovr > 90 ? 'Star' : player.value.ovr > 85 ? 'Franchise Player' : player.value.ovr > 82 ? 'Starter' : 'Bench'
      });
    }
    freeAgencyOffers.value = offers;
  };

  const acceptOffer = (offer: ContractOffer) => {
    const changedTeam = player.value.teamId !== offer.teamId;
    if (changedTeam) {
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
    player.value.currentSalary = offer.salary;
    player.value.morale = changedTeam ? 62 : Math.min(100, player.value.morale + 8);
    player.value.tradeRequestedThisSeason = false;
    freeAgencyOffers.value = [];
  };

  const requestTrade = (preferredTeamId?: string) => {
    if (
      player.value.isRetired ||
      player.value.contractYearsLeft === 0 ||
      player.value.tradeRequestedThisSeason
    ) return false;

    player.value.tradeRequestedThisSeason = true;
    const approvalChance = Math.min(
      0.92,
      Math.max(
        0.3,
        0.38 +
          (player.value.ovr - 75) * 0.015 +
          (100 - player.value.morale) * 0.003,
      ),
    );

    if (Math.random() > approvalChance) {
      player.value.morale = Math.max(0, player.value.morale - 12);
      lastTransactionMessage.value = 'Trade request denied.';
      return false;
    }

    const canChooseDestination = player.value.morale >= 70;
    const candidates = leagueTeams.value.filter(team => team.id !== player.value.teamId);
    const requestedTeam = candidates.find(team => team.id === preferredTeamId);
    const destination = canChooseDestination && requestedTeam
      ? requestedTeam
      : candidates[Math.floor(Math.random() * candidates.length)];

    const lastStop = player.value.careerTimeline.at(-1);
    if (lastStop) lastStop.endYear = history.value.length;
    player.value.careerTimeline.push({
      teamId: destination.id,
      startYear: history.value.length + 1,
      endYear: null,
    });
    player.value.teamId = destination.id;
    player.value.morale = canChooseDestination && requestedTeam ? 65 : 52;
    lastTransactionMessage.value = `Traded to ${destination.id}.`;
    return true;
  };

  const checkMilestones = (awards: string[], wonRing: boolean, ppg: number) => {
    const pts = careerTotals.value.totalPoints;
    
    if (pts >= 10000 && !achievedMilestones.value.has('pts_10k')) {
      queueMilestone({ title: '10,000 Career Points', subtitle: 'A star is born.', icon: '🏀' });
      achievedMilestones.value.add('pts_10k');
    }
    if (pts >= 20000 && !achievedMilestones.value.has('pts_20k')) {
      queueMilestone({ title: '20,000 Career Points', subtitle: 'Entering the Hall of Fame discussion.', icon: '🔥' });
      achievedMilestones.value.add('pts_20k');
    }
    if (pts >= 30000 && !achievedMilestones.value.has('pts_30k')) {
      queueMilestone({ title: '30,000 Career Points', subtitle: 'Absolute Legend.', icon: '👑' });
      achievedMilestones.value.add('pts_30k');
    }

    if (ppg >= 35 && !achievedMilestones.value.has('ppg_35')) {
      queueMilestone({ title: 'Scoring Machine', subtitle: `Averaged ${ppg} PPG this season.`, icon: '📈' });
      achievedMilestones.value.add('ppg_35');
    }

    if (awards.includes('MVP') && !achievedMilestones.value.has('first_mvp')) {
      queueMilestone({ title: 'First MVP Award', subtitle: 'The best player in the world.', icon: '⭐' });
      achievedMilestones.value.add('first_mvp');
    }
    if (wonRing && !achievedMilestones.value.has('first_ring')) {
      queueMilestone({ title: 'NBA Champion', subtitle: 'Your first ring. History made.', icon: '🏆' });
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

    const savedList = readStorage<SavedCareer[]>('the_goat_past_careers', []);
    
    const newSave: SavedCareer = {
      id: Date.now().toString(),
      player: clone(player.value),
      history: clone(history.value),
      careerTotals: clone(careerTotals.value),
      goatScore: goat.score,
      goatTier: goat.tier,
      rings
    };

    savedList.unshift(newSave);
    localStorage.setItem('the_goat_past_careers', JSON.stringify(savedList.slice(0, 8)));
  };

  const loadPastCareer = (savedData: SavedCareer) => {
    Object.assign(player.value, savedData.player);
    player.value.morale ??= 60;
    player.value.tradeRequestedThisSeason ??= false;
    player.value.retirementReason ??= null;
    history.value = clone(savedData.history).map(season => ({
      ...season,
      gamesPlayed: season.gamesPlayed ?? 82,
      morale: season.morale ?? 60,
      injury: season.injury ?? null,
    }));
    const migratedGames = history.value.reduce(
      (sum, season) => sum + season.gamesPlayed,
      0,
    );
    careerTotals.value = {
      ...createCareerTotals(),
      ...clone(savedData.careerTotals),
      gamesPlayed: savedData.careerTotals.gamesPlayed ?? migratedGames,
    };
    freeAgencyOffers.value = [];
    pendingMilestones.value = [];
    playoffPresentation.value = createPlayoffPresentation();
  };

  const forceRetirement = () => {
    if (player.value.isRetired) return;

    player.value.isRetired = true;
    player.value.contractYearsLeft = 0;
    if (player.value.careerTimeline.length > 0 && player.value.careerTimeline[player.value.careerTimeline.length - 1].endYear === null) {
      player.value.careerTimeline[player.value.careerTimeline.length - 1].endYear = history.value.length;
    }
    if (persistRetiredCareers) {
      saveRetiredCareer();
    }
  };

  const simulateSeason = () => {
    if (player.value.isRetired || playoffPresentation.value.active) return;

    leagueTeams.value.forEach(team => {
      const moraleBoost = team.id === player.value.teamId
        ? Math.max(-2, Math.min(2.5, (player.value.morale - 50) / 20))
        : 0;
      const playerImpact = team.id === player.value.teamId
        ? (player.value.ovr - 75) * 0.7
        : 0;
      const expectedWins =
        41 +
        (team.baseOvr + moraleBoost - 78) * 2.2 +
        playerImpact;
      const wins = Math.round(expectedWins + (Math.random() + Math.random() - 1) * 7);
      team.wins = Math.max(14, Math.min(70, wins));
      team.losses = 82 - team.wins;
    });

    const playerTeam = leagueTeams.value.find(team => team.id === player.value.teamId);
    const teamWins = playerTeam ? playerTeam.wins : 41;
    const moraleBoost = Math.max(-2, Math.min(2.5, (player.value.morale - 50) / 20));
    const teamBaseOvr = playerTeam ? playerTeam.baseOvr + moraleBoost : 75;

    const seasonStats = calculateSeasonStats(
      player.value.attributes, 
      player.value.position, 
      player.value.ovr, 
      teamBaseOvr, 
      player.value.age
    );

    const injury = simulateInjury(player.value.attributes, player.value.age);
    const playoffPlayerOvr = injury && injury.gamesMissed >= 31
      ? Math.max(30, player.value.ovr - 8)
      : player.value.ovr;
    const seasonPlayoffs = simulatePlayoffs(
      playoffPlayerOvr,
      teamBaseOvr,
      teamWins,
      seasonStats,
    );
    const ageAvailabilityPenalty = Math.max(0, player.value.age - 30) * 0.7;
    const routineAbsences = Math.floor((Math.random() + Math.random()) * 5);
    const injuryAbsences = injury?.gamesMissed ?? 0;
    const gamesPlayed = Math.max(
      injury?.careerEnding ? 0 : 35,
      Math.min(
        82,
        Math.round(
          78 -
          ageAvailabilityPenalty -
          routineAbsences -
          injuryAbsences,
        ),
      ),
    );
    
    const seasonAwards = calculateAwards(
      seasonStats, 
      player.value.attributes, 
      player.value.ovr, 
      teamWins,
      gamesPlayed,
      history.value.length === 0,
      player.value.position
    );

    const npcStars = ['L. Doncic', 'N. Jokic', 'S. Gilgeous-Alexander', 'A. Edwards', 'V. Wembanyama', 'G. Antetokounmpo'];
    const getNPC = () => npcStars[Math.floor(Math.random() * npcStars.length)];
    const playoffAverages = seasonPlayoffs.overallAverages;
    const finalsMvpScore = playoffAverages
      ? playoffAverages.points +
        playoffAverages.rebounds * 0.7 +
        playoffAverages.assists +
        playoffAverages.steals * 2 +
        playoffAverages.blocks * 2
      : 0;
    const wonFinalsMvp =
      seasonPlayoffs.wonRing &&
      !injury?.careerEnding &&
      playoffAverages !== null &&
      finalsMvpScore >= 25 + Math.random() * 13;

    if (wonFinalsMvp) {
      seasonAwards.push('Finals MVP');
    }

    const leagueAwards = {
      MVP: seasonAwards.includes('MVP') ? player.value.name : getNPC(),
      DPOY: seasonAwards.includes('DPOY') ? player.value.name : getNPC(),
      SMOTY: seasonAwards.includes('SMOTY') ? player.value.name : getNPC(),
      FMVP: wonFinalsMvp ? player.value.name : getNPC(),
    };

    const seasonSalary = player.value.currentSalary || 0;
    const moraleChange =
      (teamWins - 41) * 0.18 +
      (seasonPlayoffs.wonRing ? 10 : 0) +
      (seasonAwards.includes('MVP') ? 5 : 0) -
      (!seasonPlayoffs.madePlayoffs ? 4 : 0) -
      (injury?.severity === 'severe' ? 4 : injury ? 1 : 0);
    player.value.morale = Math.round(
      Math.max(0, Math.min(100, player.value.morale + moraleChange)),
    );

    history.value.push({
      seasonNumber: history.value.length + 1,
      teamId: player.value.teamId,
      age: player.value.age,
      ovr: player.value.ovr,
      gamesPlayed,
      teamWins,
      teamLosses: 82 - teamWins,
      ...seasonStats,
      morale: player.value.morale,
      injury,
      playoffs: seasonPlayoffs,
      wonRing: seasonPlayoffs.wonRing,
      awards: seasonAwards,
      leagueAwards
    });

    careerTotals.value.gamesPlayed += gamesPlayed;
    careerTotals.value.seasonsPlayed += 1;
    careerTotals.value.totalPoints += Math.floor(seasonStats.ppg * gamesPlayed);
    careerTotals.value.totalRebounds += Math.floor(seasonStats.rpg * gamesPlayed);
    careerTotals.value.totalAssists += Math.floor(seasonStats.apg * gamesPlayed);
    careerTotals.value.totalSteals += Math.floor(seasonStats.spg * gamesPlayed);
    careerTotals.value.totalBlocks += Math.floor(seasonStats.bpg * gamesPlayed);
    careerTotals.value.totalTurnovers += Math.floor(seasonStats.tov * gamesPlayed);
    careerTotals.value.totalEarnings = (careerTotals.value.totalEarnings || 0) + seasonSalary;

    if (seasonAwards.includes('MVP')) careerTotals.value.mvps += 1;
    if (seasonPlayoffs.wonRing) careerTotals.value.rings += 1;

    checkMilestones(seasonAwards, seasonPlayoffs.wonRing, seasonStats.ppg);

    if (injury) {
      queueMilestone({
        title: injury.careerEnding ? 'Career-Ending Injury' : injury.name,
        subtitle: injury.careerEnding
          ? 'The injury forces an immediate retirement.'
          : `${injury.gamesMissed} games missed.`,
        icon: '🏥',
      });
    }

    if (
      seasonPlayoffs.madePlayoffs &&
      !injury?.careerEnding &&
      !suppressNotifications &&
      interactivePlayoffs
    ) {
      playoffPresentation.value = {
        active: true,
        seriesIndex: 0,
        currentGame: 0,
        mode: null,
        complete: seasonPlayoffs.series.length === 0,
      };
    }

    applyOffseasonProgression();
    player.value.tradeRequestedThisSeason = false;

    let shouldRetire = false;
    const currentAge = player.value.age;
    const currentOvr = player.value.ovr;

    if (injury?.careerEnding) {
      player.value.retirementReason = injury.name;
      shouldRetire = true;
    } else if (currentAge >= 41) {
      shouldRetire = true; 
    } else if (currentAge >= 39) {
      shouldRetire = currentOvr < 84 || Math.random() > 0.35;
    } else if (currentAge >= 37) {
      shouldRetire = currentOvr < 85 || Math.random() > 0.35;
    } else if (currentAge >= 35 && currentOvr < 82) {
      shouldRetire = Math.random() > 0.35;
    } else if (currentAge >= 33 && currentOvr < 77) {
      shouldRetire = Math.random() > 0.55;
    }

    if (shouldRetire) {
      forceRetirement();
    }
  };

  const simulateNextPlayoffSeries = () => {
    const progress = playoffPresentation.value;
    const run = history.value.at(-1)?.playoffs;
    if (
      !progress.active ||
      progress.complete ||
      !run ||
      (progress.mode === 'games' && progress.currentGame > 0)
    ) return false;

    progress.seriesIndex++;
    progress.currentGame = 0;
    progress.mode = null;
    progress.complete = progress.seriesIndex >= run.series.length;
    return true;
  };

  const simulateNextPlayoffGame = () => {
    const progress = playoffPresentation.value;
    const run = history.value.at(-1)?.playoffs;
    const series = run?.series[progress.seriesIndex];
    if (!progress.active || progress.complete || !series) return false;

    progress.mode = 'games';
    progress.currentGame++;
    if (progress.currentGame >= series.games.length) {
      progress.seriesIndex++;
      progress.currentGame = 0;
      progress.mode = null;
      progress.complete = progress.seriesIndex >= (run?.series.length ?? 0);
    }
    return true;
  };

  const finishPlayoffPresentation = () => {
    if (!playoffPresentation.value.complete) return false;
    playoffPresentation.value.active = false;
    return true;
  };

  const simulateRemainingCareer = () => {
    suppressNotifications = true;
    pendingMilestones.value = [];
    playoffPresentation.value = createPlayoffPresentation();
    try {
      while (!player.value.isRetired) {
        if (player.value.contractYearsLeft === 0) {
          generateOffers();
          if (freeAgencyOffers.value.length > 0) {
            const bestOffer = freeAgencyOffers.value.reduce((prev, current) => {
              return (prev.salary * prev.years > current.salary * current.years) ? prev : current;
            });
            acceptOffer(bestOffer);
          } else {
            forceRetirement();
            break;
          }
        }
        simulateSeason();
      }
    } finally {
      pendingMilestones.value = [];
      playoffPresentation.value = createPlayoffPresentation();
      suppressNotifications = false;
    }
  };

  return { 
    player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones,
    lastTransactionMessage, playoffPresentation,
    initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
    requestTrade, loadPastCareer, simulateRemainingCareer,
    simulateNextPlayoffSeries, simulateNextPlayoffGame,
    finishPlayoffPresentation,
  };
}
