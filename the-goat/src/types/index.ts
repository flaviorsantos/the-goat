// src/types/index.ts

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export type AttributeKey = 'Arremesso' | 'Drible' | 'Defesa' | 'IQ' | 'Atletismo' | 'Passe' | 'Rebote' | 'Velocidade' | 'Mentalidade';

/** All attribute keys in a typed tuple for consistent iteration. */
export const ATTRIBUTES_LIST: AttributeKey[] = [
  'Arremesso', 'Drible', 'Defesa', 'IQ', 'Atletismo', 'Passe', 'Rebote', 'Velocidade', 'Mentalidade'
];

export type PlayerAttributes = Record<AttributeKey, number>;

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
  team: string;
  age: number;
  ovr: number;
  isRetired: boolean;
  attributes: Partial<PlayerAttributes>;
}

export interface SeasonStats {
  seasonNumber: number;
  age: number;
  ovr: number;
  ppg: number;
  rpg: number;
  apg: number;
  wonRing: boolean;
  wonMVP: boolean;
}

export interface CareerTotals {
  totalPoints: number;
  totalRebounds: number;
  totalAssists: number;
  rings: number;
  mvps: number;
  seasonsPlayed: number;
}