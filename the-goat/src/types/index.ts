export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type Difficulty = 'amateur' | 'pro';
export type GameMode = 'fast' | 'full';

export type AttributeKey = 'Shooting' | 'Dribbling' | 'Defense' | 'IQ' | 'Athleticism' | 'Passing' | 'Rebounding' | 'Speed' | 'Mentality';

export type PlayerAttributes = Record<AttributeKey, number>;

export interface CareerTimelineEntry {
  teamId: string;
  startYear: number;
  endYear: number | null;
}

export interface Legend {
  id: number;
  name: string;
  position: Position;
  ovr: number;
  attributes: PlayerAttributes;
}

export interface ContractOffer {
  teamId: string;
  years: number;
  salary: number; 
  role: string;   
}

export interface Team {
  id: string;
  city: string;
  name: string;
  baseOvr: number; 
  star1Ovr: number; 
  star2Ovr: number; 
  momentum?: number; 
}

export interface TeamStanding extends Team {
  effectivePower: number;
  wins: number;
  losses: number;
}

export interface RealPlayer {
  id: number;
  name: string;
  position: Position;
  age: number;
  isRetired: boolean;
  attributes: PlayerAttributes;
  career: string;
}

export interface PlayerProfile {
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
  attributes: PlayerAttributes;
  potentialAttributes: PlayerAttributes;
  careerTimeline: CareerTimelineEntry[];
}

export interface PlayoffGameStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
}

export interface PlayoffSeriesStats {
  round: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  averages: PlayoffGameStats;
}

export interface PlayoffRunStats {
  madePlayoffs: boolean;
  wonRing: boolean;
  eliminatedIn: string | null;
  series: PlayoffSeriesStats[];
  finalsLog: PlayoffGameStats[]; // Jogo a jogo apenas nas finais
  overallAverages: PlayoffGameStats & { gamesPlayed: number } | null;
}

//export type SeasonStatsFields = Pick<SeasonStats, 'mpg' | 'ppg' | 'rpg' | 'apg' | 'spg' | 'bpg' | 'topg' | 'fgPct' | 'fg3Pct' | 'ftPct' | 'plusMinus' | 'teamWins'>;

export interface SeasonStats {
  seasonNumber: number;
  age: number;
  ovr: number;
  teamId: string;
  teamWins: number;
  teamLosses: number;
  mpg: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  topg: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
  plusMinus: number;
  awards: string[];
  leagueAwards: Record<string, string>; 
  wonRing: boolean;
  playoffs: PlayoffRunStats;
}
export interface CareerTotals {
  totalPoints: number;
  totalRebounds: number;
  totalAssists: number;
  totalSteals: number;
  totalBlocks: number;
  rings: number;
  mvps: number;
  seasonsPlayed: number;
}