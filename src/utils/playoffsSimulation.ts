import { nbaTeams } from '../data/teams';
import type {
  PlayoffGameStats,
  PlayoffRunStats,
  PlayoffSeriesStats,
  Team,
} from '../types';

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

type PlayoffTeam = Team & { wins: number; losses: number };

const EAST_IDS = new Set([
  'BOS', 'NYK', 'PHI', 'MIL', 'CLE', 'IND', 'MIA', 'ORL',
  'CHI', 'ATL', 'BKN', 'TOR', 'CHA', 'WAS', 'DET',
]);

const averageGames = (games: PlayoffGameStats[]): PlayoffGameStats => {
  const average = (
    key: 'points' | 'rebounds' | 'assists' | 'steals' | 'blocks' |
      'fgPct' | 'fg3Pct' | 'ftPct',
  ) => games.reduce((sum, game) => sum + game[key], 0) / games.length;

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

export function simulatePlayoffs(
  playerOvr: number,
  teamBaseOvr: number,
  regularSeasonWins: number,
  stats: RegularSeasonLine = {
    ppg: 12, rpg: 5, apg: 3, spg: 0.8, bpg: 0.6,
    fgPct: 0.45, fg3Pct: 0.35, ftPct: 0.75,
  },
  playerTeamId = 'LAL',
  leagueStandings?: PlayoffTeam[],
): PlayoffRunStats {
  const standings = leagueStandings?.length === 30
    ? leagueStandings
    : nbaTeams.map(team => ({
        ...team,
        wins: team.id === playerTeamId
          ? regularSeasonWins
          : Math.round(30 + (team.baseOvr - 70) * 2.2),
        losses: 0,
      })).map(team => ({ ...team, losses: 82 - team.wins }));
  const qualifiers = (east: boolean) => standings
    .filter(team => EAST_IDS.has(team.id) === east)
    .sort((left, right) => right.wins - left.wins || right.baseOvr - left.baseOvr)
    .slice(0, 8);
  const east = qualifiers(true);
  const west = qualifiers(false);
  const madePlayoffs = [...east, ...west].some(team => team.id === playerTeamId);
  const playerSeries: PlayoffSeriesStats[] = [];
  let eliminatedIn: string | null = madePlayoffs ? null : 'Missed Playoffs';

  const teamPower = (team: PlayoffTeam) => team.id === playerTeamId
    ? teamBaseOvr * 0.45 + playerOvr * 0.55
    : team.baseOvr + (team.star1Ovr - 88) * 0.08 + (team.star2Ovr - 84) * 0.04;
  const clampPercentage = (value: number, minimum: number, maximum: number) =>
    Math.max(minimum, Math.min(maximum, value));

  const playSeries = (first: PlayoffTeam, second: PlayoffTeam, round: string) => {
    const firstHasHomeCourt = first.wins >= second.wins;
    let firstWins = 0;
    let secondWins = 0;
    const involvesPlayer = first.id === playerTeamId || second.id === playerTeamId;
    const games: PlayoffGameStats[] = [];

    while (firstWins < 4 && secondWins < 4) {
      const gameNumber = firstWins + secondWins + 1;
      const homeSchedule = firstHasHomeCourt ? [1, 2, 5, 7] : [3, 4, 6];
      const firstHome = homeSchedule.includes(gameNumber);
      const firstWon =
        teamPower(first) + (firstHome ? 2.5 : -2) + Math.random() * 16 >
        teamPower(second) + Math.random() * 16;
      if (firstWon) firstWins++;
      else secondWins++;

      if (involvesPlayer) {
        const playerIsFirst = first.id === playerTeamId;
        const playerWon = playerIsFirst ? firstWon : !firstWon;
        const playerHome = playerIsFirst ? firstHome : !firstHome;
        const opponent = playerIsFirst ? second : first;
        const playerForm = (Math.random() + Math.random() - 1) * 5;
        const variance = () => 0.82 + Math.random() * 0.36;
        const percentageVariance = () => (Math.random() - 0.5) * 0.08;
        games.push({
          gameNumber,
          round,
          won: playerWon,
          home: playerHome,
          opponentTeamId: opponent.id,
          opponentOvr: Number(teamPower(opponent).toFixed(1)),
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
    }

    const winner = firstWins === 4 ? first : second;
    if (involvesPlayer) {
      const playerIsFirst = first.id === playerTeamId;
      const wins = playerIsFirst ? firstWins : secondWins;
      const losses = playerIsFirst ? secondWins : firstWins;
      const opponent = playerIsFirst ? second : first;
      playerSeries.push({
        round,
        opponentTeamId: opponent.id,
        opponentOvr: Number(teamPower(opponent).toFixed(1)),
        gamesPlayed: games.length,
        wins,
        losses,
        averages: averageGames(games),
        games,
      });
      if (losses === 4) eliminatedIn = round;
    }
    return winner;
  };

  const simulateConference = (teams: PlayoffTeam[]) => {
    const firstRound = [
      playSeries(teams[0], teams[7], '1st Round'),
      playSeries(teams[3], teams[4], '1st Round'),
      playSeries(teams[2], teams[5], '1st Round'),
      playSeries(teams[1], teams[6], '1st Round'),
    ];
    const semifinals = [
      playSeries(firstRound[0], firstRound[1], 'Conf. Semis'),
      playSeries(firstRound[2], firstRound[3], 'Conf. Semis'),
    ];
    return playSeries(semifinals[0], semifinals[1], 'Conf. Finals');
  };

  const eastChampion = simulateConference(east);
  const westChampion = simulateConference(west);
  const champion = playSeries(eastChampion, westChampion, 'NBA Finals');
  const wonRing = champion.id === playerTeamId;
  const allGames = playerSeries.flatMap(series => series.games);
  const finals = playerSeries.find(series => series.round === 'NBA Finals');

  return {
    madePlayoffs,
    eliminatedIn: wonRing ? null : eliminatedIn,
    wonRing,
    championTeamId: champion.id,
    series: playerSeries,
    finalsLog: finals?.games ?? [],
    overallAverages: allGames.length > 0
      ? { ...averageGames(allGames), gamesPlayed: allGames.length }
      : null,
  };
}
