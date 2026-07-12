export function simulatePlayoffs(playerOvr: number, teamBaseOvr: number, regularSeasonWins: number) {
  // Poder real em quadra
  const teamPower = (teamBaseOvr * 0.60) + (playerOvr * 0.40);
  
  // Classificação: Precisa de aproximadamente 40+ vitórias para entrar
  if (regularSeasonWins < 40) {
    return { madePlayoffs: false, eliminatedIn: 'Missed Playoffs', wonRing: false };
  }

  const seedAdvantage = Math.max(0, (regularSeasonWins - 45) * 0.25); 
  
  // Correção: Oponentes reduzidos para escalar corretamente com o teto de 85-88 do teamPower
  const opponents = [
    { round: '1st Round', baseOvr: Math.max(72, teamBaseOvr - 2) - seedAdvantage },
    { round: 'Conf. Semis', baseOvr: teamBaseOvr + 1 },
    { round: 'Conf. Finals', baseOvr: teamBaseOvr + 3 },
    { round: 'NBA Finals', baseOvr: teamBaseOvr + 5 + (Math.random() * 4)}
  ];

  // Motor de Série Melhor de 7
  const playSeries = (opponentOvr: number, hasHomeCourt: boolean) => {
    let wins = 0;
    let losses = 0;
    
    for (let game = 1; game <= 7; game++) {
      if (wins === 4 || losses === 4) break;
      
      // Mando de quadra: Jogos 1, 2, 5 e 7 são em casa se tiver a vantagem
      const isHomeGame = hasHomeCourt ? [1, 2, 5, 7].includes(game) : [3, 4, 6].includes(game);
      const homeAdvantage = isHomeGame ? 3.5 : -3.5;

      const myRoll = teamPower + homeAdvantage + (Math.random() * 25);
      const oppRoll = opponentOvr + (Math.random() * 25);

      if (myRoll > oppRoll) wins++;
      else losses++;
    }
    return wins === 4;
  };

  // Execução do Bracket
  for (const matchup of opponents) {
    // Possui mando de quadra se teve mais vitórias/força que o oponente projetado
    const hasHomeCourt = teamPower > matchup.baseOvr; 
    const wonSeries = playSeries(matchup.baseOvr, hasHomeCourt);
    
    if (!wonSeries) {
      return { madePlayoffs: true, eliminatedIn: matchup.round, wonRing: false };
    }
  }

  return { madePlayoffs: true, eliminatedIn: 'None', wonRing: true };
}