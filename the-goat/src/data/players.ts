// src/data/players.ts
import type { RealPlayer } from '../types';

export const nbaPlayers: RealPlayer[] = [
  {
    id: 1, name: 'Michael Jordan', position: 'SG',
    attributes: { Arremesso: 93, Drible: 88, Defesa: 97, IQ: 98, Atletismo: 99, Passe: 85, Rebote: 75, Velocidade: 94, Mentalidade: 99 }
  },
  {
    id: 2, name: 'Stephen Curry', position: 'PG',
    attributes: { Arremesso: 99, Drible: 96, Defesa: 65, IQ: 92, Atletismo: 78, Passe: 89, Rebote: 55, Velocidade: 86, Mentalidade: 95 }
  },
  {
    id: 3, name: 'Dennis Rodman', position: 'PF',
    attributes: { Arremesso: 45, Drible: 50, Defesa: 98, IQ: 85, Atletismo: 88, Passe: 60, Rebote: 99, Velocidade: 79, Mentalidade: 96 }
  },
  {
    id: 4, name: 'Kwame Brown', position: 'C',
    attributes: { Arremesso: 40, Drible: 35, Defesa: 60, IQ: 50, Atletismo: 70, Passe: 45, Rebote: 68, Velocidade: 55, Mentalidade: 40 }
  },
  {
    id: 5, name: 'Magic Johnson', position: 'PG',
    attributes: { Arremesso: 80, Drible: 94, Defesa: 75, IQ: 99, Atletismo: 82, Passe: 99, Rebote: 85, Velocidade: 84, Mentalidade: 97 }
  }
];