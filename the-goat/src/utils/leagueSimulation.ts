// src/utils/leagueSimulation.ts
import type { Team, PlayerProfile } from '../types';
import { nbaTeams } from '../data/teams';

export interface TeamStanding extends Team {
  effectivePower: number;
  wins: number;
  losses: number;
}

export function simulateLeagueStandings(player: PlayerProfile): TeamStanding[] {
  // 1. Calcular a Força Efetiva (Team Power) com Fator RNG
  const teamPowers = nbaTeams.map(team => {
    let power = team.baseOvr + team.star1Ovr + team.star2Ovr;

    if (team.id === player.teamId) {
      // Se o jogador está no time, pegamos os 3 melhores (Estrela 1, Estrela 2 e o Jogador)
      // Os dois maiores OVRs formam o núcleo principal, o terceiro vira bônus de profundidade.
      const rosterStars = [team.star1Ovr, team.star2Ovr, player.ovr].sort((a, b) => b - a);
      power = team.baseOvr + rosterStars[0] + rosterStars[1] + (rosterStars[2] * 0.4);
    }

    // A Roleta: Multiplicador aleatório que varia a força da equipe em até 15% para mais ou para menos
    const rngMod = (Math.random() * 0.3) + 0.85; 
    
    return {
      ...team,
      effectivePower: power * rngMod,
      wins: 0,
      losses: 0
    };
  });

  // 2. Distribuir as 1230 vitórias totais de uma temporada regular da NBA (30 times * 82 jogos / 2)
  const totalLeaguePower = teamPowers.reduce((acc, team) => acc + team.effectivePower, 0);
  const totalMatches = 1230;

  // 3. Calcular o recorde W/L
  teamPowers.forEach(team => {
    let rawWins = Math.round((team.effectivePower / totalLeaguePower) * totalMatches);
    
    // Travas de realismo: Na NBA moderna, é quase impossível passar de 73 vitórias ou cair abaixo de 10
    rawWins = Math.min(Math.max(rawWins, 10), 73); 
    
    team.wins = rawWins;
    team.losses = 82 - rawWins;
  });

  // 4. Retornar a classificação geral ordenada do 1º ao 30º
  return teamPowers.sort((a, b) => b.wins - a.wins);
}