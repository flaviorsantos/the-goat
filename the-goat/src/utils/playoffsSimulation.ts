import type {
  PlayoffGameStats,
  PlayoffRunStats,
  PlayoffSeriesStats,
} from '../types';

type RegularSeasonLine = {
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
};

const averageGames = (games: PlayoffGameStats[]): PlayoffGameStats => {
  const average = (
    key: 'points' | 'rebounds' | 'assists' | 'steals' | 'blocks',
  ) =>
    games.reduce((sum, game) => sum + game[key], 0) / games.length;

  return {
    gameNumber: games.length,
    round: games[0]?.round ?? '',
    won: games.filter(game => game.won).length > games.length / 2,
    home: false,
    opponentOvr: games[0]?.opponentOvr ?? 0,
    points: Number(average('points').toFixed(1)),
    rebounds: Number(average('rebounds').toFixed(1)),
    assists: Number(average('assists').toFixed(1)),
    steals: Number(average('steals').toFixed(1)),
    blocks: Number(average('blocks').toFixed(1)),
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
  stats: RegularSeasonLine = { ppg: 12, rpg: 5, apg: 3, spg: 0.8, bpg: 0.6 },
): PlayoffRunStats {
  if (regularSeasonWins < 40) return emptyRun('Missed Playoffs');

  const teamPower = teamBaseOvr * 0.6 + playerOvr * 0.4;
  const seedAdvantage = Math.max(0, (regularSeasonWins - 45) * 0.25);
  const opponents = [
    { round: '1st Round', ovr: Math.max(72, teamBaseOvr - 2) - seedAdvantage },
    { round: 'Conf. Semis', ovr: teamBaseOvr + 1 },
    { round: 'Conf. Finals', ovr: teamBaseOvr + 3 },
    { round: 'NBA Finals', ovr: teamBaseOvr + 5 + Math.random() * 4 },
  ];
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
      games.push({
        gameNumber,
        round: matchup.round,
        won,
        home,
        opponentOvr: Number(matchup.ovr.toFixed(1)),
        points: Math.max(0, Math.round(stats.ppg * variance() + playerForm * 0.7)),
        rebounds: Math.max(0, Math.round(stats.rpg * variance())),
        assists: Math.max(0, Math.round(stats.apg * variance())),
        steals: Math.max(0, Number((stats.spg * variance()).toFixed(1))),
        blocks: Math.max(0, Number((stats.bpg * variance()).toFixed(1))),
      });
    }

    series.push({
      round: matchup.round,
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
