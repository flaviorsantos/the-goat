import type {
  PlayoffGameStats,
  PlayoffRunStats,
  PlayoffSeriesStats,
} from '../types';
import { nbaTeams } from '../data/teams';

type RegularSeasonLine = {
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  fgPct?: number;
  fg3Pct?: number;
  ftPct?: number;
};

const averageGames = (games: PlayoffGameStats[]): PlayoffGameStats => {
  const average = (
    key: 'points' | 'rebounds' | 'assists' | 'steals' | 'blocks' |
      'fgPct' | 'fg3Pct' | 'ftPct',
  ) =>
    games.reduce((sum, game) => sum + game[key], 0) / games.length;

  return {
    gameNumber: games.length,
    round: games[0]?.round ?? '',
    won: games.filter(game => game.won).length > games.length / 2,
    home: false,
    opponentTeamId: games[0]?.opponentTeamId ?? '',
    opponentOvr: games[0]?.opponentOvr ?? 0,
    points: Number(average('points').toFixed(1)),
    rebounds: Number(average('rebounds').toFixed(1)),
    assists: Number(average('assists').toFixed(1)),
    steals: Number(average('steals').toFixed(1)),
    blocks: Number(average('blocks').toFixed(1)),
    fgPct: Number(average('fgPct').toFixed(3)),
    fg3Pct: Number(average('fg3Pct').toFixed(3)),
    ftPct: Number(average('ftPct').toFixed(3)),
  };
};

const emptyRun = (eliminatedIn: string): PlayoffRunStats => ({
  madePlayoffs: false,
  eliminatedIn,
  wonRing: false,
  series: [],
  finalsLog: [],
  overallAverages: null,
});

export function simulatePlayoffs(
  playerOvr: number,
  teamBaseOvr: number,
  regularSeasonWins: number,
  stats: RegularSeasonLine = {
    ppg: 12, rpg: 5, apg: 3, spg: 0.8, bpg: 0.6,
    fgPct: 0.45, fg3Pct: 0.35, ftPct: 0.75,
  },
  playerTeamId = 'LAL',
): PlayoffRunStats {
  if (regularSeasonWins < 40) return emptyRun('Missed Playoffs');

  const teamPower = teamBaseOvr * 0.6 + playerOvr * 0.4;
  const seedAdvantage = Math.max(0, (regularSeasonWins - 45) * 0.25);
  const eastIds = new Set([
    'BOS', 'NYK', 'PHI', 'MIL', 'CLE', 'IND', 'MIA', 'ORL',
    'CHI', 'ATL', 'BKN', 'TOR', 'CHA', 'WAS', 'DET',
  ]);
  const playerInEast = eastIds.has(playerTeamId);
  const sameConference = nbaTeams.filter(team =>
    team.id !== playerTeamId && eastIds.has(team.id) === playerInEast,
  );
  const otherConference = nbaTeams.filter(team =>
    eastIds.has(team.id) !== playerInEast,
  );
  const used = new Set<string>();
  const chooseOpponent = (pool: typeof nbaTeams, target: number) => {
    const chosen = pool
      .filter(team => !used.has(team.id))
      .map(team => ({
        team,
        distance: Math.abs(team.baseOvr - target) + Math.random() * 1.5,
      }))
      .sort((left, right) => left.distance - right.distance)[0].team;
    used.add(chosen.id);
    return chosen;
  };
  const targets = [
    Math.max(72, teamBaseOvr - 2) - seedAdvantage,
    teamBaseOvr + 1,
    teamBaseOvr + 3,
  ];
  const opponents = targets.map((target, index) => {
    const opponent = chooseOpponent(sameConference, target);
    return {
      round: ['1st Round', 'Conf. Semis', 'Conf. Finals'][index],
      teamId: opponent.id,
      ovr: opponent.baseOvr + index * 0.5,
    };
  });
  const finalsOpponent = chooseOpponent(otherConference, teamBaseOvr + 4);
  opponents.push({
    round: 'NBA Finals',
    teamId: finalsOpponent.id,
    ovr: finalsOpponent.baseOvr + 1.5,
  });
  const series: PlayoffSeriesStats[] = [];

  for (const matchup of opponents) {
    let wins = 0;
    let losses = 0;
    const games: PlayoffGameStats[] = [];
    const hasHomeCourt = teamPower > matchup.ovr;

    while (wins < 4 && losses < 4) {
      const gameNumber = games.length + 1;
      const homeSchedule = hasHomeCourt ? [1, 2, 5, 7] : [3, 4, 6];
      const home = homeSchedule.includes(gameNumber);
      const playerForm = (Math.random() + Math.random() - 1) * 5;
      const won =
        teamPower + (home ? 2.7 : -2.2) + playerForm + Math.random() * 18 >
        matchup.ovr + Math.random() * 18;
      if (won) wins++;
      else losses++;

      const variance = () => 0.82 + Math.random() * 0.36;
      const percentageVariance = () => (Math.random() - 0.5) * 0.08;
      const clampPercentage = (value: number, minimum: number, maximum: number) =>
        Math.max(minimum, Math.min(maximum, value));
      games.push({
        gameNumber,
        round: matchup.round,
        won,
        home,
        opponentTeamId: matchup.teamId,
        opponentOvr: Number(matchup.ovr.toFixed(1)),
        points: Math.max(0, Math.round(stats.ppg * variance() + playerForm * 0.7)),
        rebounds: Math.max(0, Math.round(stats.rpg * variance())),
        assists: Math.max(0, Math.round(stats.apg * variance())),
        steals: Math.max(0, Math.round(stats.spg * variance())),
        blocks: Math.max(0, Math.round(stats.bpg * variance())),
        fgPct: Number(clampPercentage(
          (stats.fgPct ?? 0.45) + percentageVariance(), 0.25, 0.75,
        ).toFixed(3)),
        fg3Pct: Number(clampPercentage(
          (stats.fg3Pct ?? 0.35) + percentageVariance(), 0.15, 0.65,
        ).toFixed(3)),
        ftPct: Number(clampPercentage(
          (stats.ftPct ?? 0.75) + percentageVariance(), 0.4, 1,
        ).toFixed(3)),
      });
    }

    series.push({
      round: matchup.round,
      opponentTeamId: matchup.teamId,
      opponentOvr: Number(matchup.ovr.toFixed(1)),
      gamesPlayed: games.length,
      wins,
      losses,
      averages: averageGames(games),
      games,
    });

    if (losses === 4) {
      const allGames = series.flatMap(item => item.games);
      return {
        madePlayoffs: true,
        eliminatedIn: matchup.round,
        wonRing: false,
        series,
        finalsLog: series.find(item => item.round === 'NBA Finals')?.games ?? [],
        overallAverages: { ...averageGames(allGames), gamesPlayed: allGames.length },
      };
    }
  }

  const allGames = series.flatMap(item => item.games);
  return {
    madePlayoffs: true,
    eliminatedIn: null,
    wonRing: true,
    series,
    finalsLog: series.at(-1)?.games ?? [],
    overallAverages: { ...averageGames(allGames), gamesPlayed: allGames.length },
  };
}
