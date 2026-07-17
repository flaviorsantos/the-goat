import type { Team, TeamStanding } from '../types';

type LeaguePlayer = {
  teamId: string;
  ovr: number;
  morale?: number;
};

export function simulateLeagueStandings(
  player: LeaguePlayer,
  leagueTeams: Team[],
): TeamStanding[] {
  const teamPowers = leagueTeams.map(team => {
    const playerBoost = team.id === player.teamId
      ? (player.ovr - 75) * 0.28 + ((player.morale ?? 50) - 50) * 0.04
      : 0;
    const effectivePower =
      team.baseOvr +
      (team.star1Ovr - 88) * 0.08 +
      (team.star2Ovr - 84) * 0.04 +
      (team.momentum ?? 0) * 0.12 +
      playerBoost;
    return { ...team, effectivePower, wins: 0, losses: 0 };
  });
  const averagePower = teamPowers.reduce(
    (sum, team) => sum + team.effectivePower,
    0,
  ) / teamPowers.length;

  teamPowers.forEach(team => {
    const variance = (Math.random() + Math.random() - 1) * 7;
    team.wins = Math.round(Math.max(
      10,
      Math.min(72, 41 + (team.effectivePower - averagePower) * 2.35 + variance),
    ));
  });

  let difference = 1_230 - teamPowers.reduce((sum, team) => sum + team.wins, 0);
  let cursor = 0;
  while (difference !== 0) {
    const team = teamPowers[cursor % teamPowers.length];
    const adjustment = difference > 0 ? 1 : -1;
    if (
      (adjustment > 0 && team.wins < 72) ||
      (adjustment < 0 && team.wins > 10)
    ) {
      team.wins += adjustment;
      difference -= adjustment;
    }
    cursor++;
  }

  teamPowers.forEach(team => {
    team.losses = 82 - team.wins;
    const source = leagueTeams.find(item => item.id === team.id);
    if (!source) return;
    const momentumChange = team.wins <= 25
      ? Math.floor(Math.random() * 4) + 2
      : team.wins >= 58
        ? -(Math.floor(Math.random() * 3) + 1)
        : Math.floor(Math.random() * 3) - 1;
    source.momentum = Math.max(-15, Math.min(15, (source.momentum ?? 0) + momentumChange));
  });

  return teamPowers.sort((left, right) => right.wins - left.wins);
}
