// src/types/index.ts

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type AttributeKey = 'Arremesso' | 'Drible' | 'Defesa' | 'IQ' | 'Atletismo' | 'Passe' | 'Rebote' | 'Velocidade' | 'Mentalidade';
export type PlayerAttributes = Record<AttributeKey, number>;

export interface Team {
  id: string;
  city: string;
  name: string;
  baseOvr: number; 
  star1Ovr: number; 
  star2Ovr: number; 
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
  attributes: PlayerAttributes;
}

export interface PlayerProfile {
  name: string;
  position: Position;
  nationality: string;
  teamId: string;
  age: number;
  ovr: number;
  isRetired: boolean;
  attributes: PlayerAttributes;
}

export interface SeasonStats {
  seasonNumber: number;
  age: number;
  ovr: number;
  teamId: string;
  teamWins: number;
  teamLosses: number;
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
  wonRing: boolean;
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