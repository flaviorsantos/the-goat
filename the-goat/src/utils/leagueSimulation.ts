import type { Team, PlayerProfile, TeamStanding } from '../types';

export function simulateLeagueStandings(player: PlayerProfile, leagueTeams: Team[]): TeamStanding[] {
  const teamPowers = leagueTeams.map(team => {
    const currentMomentum = team.momentum || 0;
    let power = team.baseOvr + team.star1Ovr + team.star2Ovr + currentMomentum;

    if (team.id === player.teamId) {
      const rosterStars = [team.star1Ovr, team.star2Ovr, player.ovr].sort((a, b) => b - a);
      
      let carryBonus = 0;
      if (player.ovr >= 90) {
        carryBonus = Math.pow(player.ovr - 85, 1.5) * 2;
      }

      power = team.baseOvr + rosterStars[0] + (rosterStars[1] * 0.8) + (rosterStars[2] * 0.4) + currentMomentum + carryBonus;
    }

    const rngMod = (Math.random() * 0.25) + 0.875; 
    
    return {
      ...team,
      effectivePower: power * rngMod,
      wins: 0,
      losses: 0
    };
  });

  const totalLeaguePower = teamPowers.reduce((acc, team) => acc + team.effectivePower, 0);
  const totalMatches = 1230;

  teamPowers.forEach(team => {
    let rawWins = Math.round((team.effectivePower / totalLeaguePower) * totalMatches);
    rawWins = Math.min(Math.max(rawWins, 10), 73); 
    
    team.wins = rawWins;
    team.losses = 82 - rawWins;

    const originalTeam = leagueTeams.find(t => t.id === team.id);
    if (originalTeam) {
      if (rawWins <= 25) {
        originalTeam.momentum = (originalTeam.momentum || 0) + (Math.floor(Math.random() * 6) + 3);
      } else if (rawWins >= 58) {
        originalTeam.momentum = (originalTeam.momentum || 0) - (Math.floor(Math.random() * 5) + 2);
      } else {
        originalTeam.momentum = (originalTeam.momentum || 0) + (Math.floor(Math.random() * 5) - 2);
      }
      originalTeam.momentum = Math.min(Math.max(originalTeam.momentum, -15), 15);
    }
  });

  return teamPowers.sort((a, b) => b.wins - a.wins);
}