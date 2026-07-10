import type { PlayerProfile, PlayoffRunStats, PlayoffSeriesStats, PlayoffGameStats } from '../types';

export function simulatePlayoffs(
  player: PlayerProfile, 
  teamWins: number, 
  regSeasonStats: { ppg: number; rpg: number; apg: number; spg: number; bpg: number; }
): PlayoffRunStats {
  
  const run: PlayoffRunStats = {
    madePlayoffs: teamWins >= 42,
    wonRing: false,
    eliminatedIn: null,
    series: [],
    finalsLog: [],
    overallAverages: null
  };

  if (!run.madePlayoffs) return run;

  const allGames: PlayoffGameStats[] = [];
  const rng = (min = 0.85, max = 1.15) => (Math.random() * (max - min)) + min;

  const myTeamPower = teamWins * 1.5; 

  const simulateGame = (isElimination: boolean): PlayoffGameStats => {
    const clutchBonus = isElimination ? (player.attributes.Mentality - 50) * 0.005 : 0;
    const modifier = rng() + Math.max(0, clutchBonus);

    const game = {
      points: Math.round(regSeasonStats.ppg * modifier),
      rebounds: Math.round(regSeasonStats.rpg * modifier),
      assists: Math.round(regSeasonStats.apg * modifier),
      steals: Math.round(regSeasonStats.spg * modifier),
      blocks: Math.round(regSeasonStats.bpg * modifier)
    };
    allGames.push(game);
    return game;
  };

  const playSeries = (roundName: string, opponentPower: number, isFinals = false): boolean => {
    let myWins = 0;
    let oppWins = 0;
    let gamesPlayed = 0;
    const seriesGames: PlayoffGameStats[] = [];

    while (myWins < 4 && oppWins < 4) {
      gamesPlayed++;
      const isElimination = myWins === 3 || oppWins === 3;
      
      const gameStats = simulateGame(isElimination);
      if (isFinals) run.finalsLog.push(gameStats);
      seriesGames.push(gameStats);

      const myChance = myTeamPower + (player.ovr * 0.5) + (isElimination ? (player.attributes.Mentality * 0.2) : 0);
      const oppChance = opponentPower * rng(0.9, 1.1);

      if (myChance >= oppChance) {
        myWins++;
      } else {
        oppWins++;
      }
    }

    const averages: PlayoffGameStats = {
      points: Number((seriesGames.reduce((acc, g) => acc + g.points, 0) / gamesPlayed).toFixed(1)),
      rebounds: Number((seriesGames.reduce((acc, g) => acc + g.rebounds, 0) / gamesPlayed).toFixed(1)),
      assists: Number((seriesGames.reduce((acc, g) => acc + g.assists, 0) / gamesPlayed).toFixed(1)),
      steals: Number((seriesGames.reduce((acc, g) => acc + g.steals, 0) / gamesPlayed).toFixed(1)),
      blocks: Number((seriesGames.reduce((acc, g) => acc + g.blocks, 0) / gamesPlayed).toFixed(1)),
    };

    run.series.push({ round: roundName, gamesPlayed, wins: myWins, losses: oppWins, averages });

    return myWins === 4;
  };

  const rounds = [
    { name: 'First Round', oppPower: 65 },
    { name: 'Conf Semifinals', oppPower: 75 },
    { name: 'Conf Finals', oppPower: 85 },
    { name: 'NBA Finals', oppPower: 95 }
  ];

  for (let i = 0; i < rounds.length; i++) {
    const isFinals = i === 3;
    const advanced = playSeries(rounds[i].name, rounds[i].oppPower, isFinals);
    
    if (!advanced) {
      run.eliminatedIn = rounds[i].name;
      break;
    }
    
    if (isFinals && advanced) {
      run.wonRing = true;
      run.eliminatedIn = 'Champion';
    }
  }

  if (allGames.length > 0) {
    run.overallAverages = {
      gamesPlayed: allGames.length,
      points: Number((allGames.reduce((acc, g) => acc + g.points, 0) / allGames.length).toFixed(1)),
      rebounds: Number((allGames.reduce((acc, g) => acc + g.rebounds, 0) / allGames.length).toFixed(1)),
      assists: Number((allGames.reduce((acc, g) => acc + g.assists, 0) / allGames.length).toFixed(1)),
      steals: Number((allGames.reduce((acc, g) => acc + g.steals, 0) / allGames.length).toFixed(1)),
      blocks: Number((allGames.reduce((acc, g) => acc + g.blocks, 0) / allGames.length).toFixed(1))
    };
  }

  return run;
}