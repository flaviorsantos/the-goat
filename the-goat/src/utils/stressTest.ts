import { useGameEngine } from '../composables/useGameEngine';

export async function runStressTest(iterations: number = 100) {
  const engine = useGameEngine();
  const results = [];

  console.log(`Iniciando stress test de ${iterations} carreiras...`);

  for (let i = 0; i < iterations; i++) {
    // 1. Inicializa a carreira base
    engine.initCareer('Bot Test', 'C', 'US', 23, 'pro', 'fast');
    
    // 2. MOCK DO DRAFT: Injeta atributos simulados e limpa o banco de totais
    engine.player.attributes = { Shooting: 75, Dribbling: 75, Defense: 75, IQ: 75, Athleticism: 75, Passing: 75, Rebounding: 75, Speed: 75, Mentality: 75 };
    engine.player.potentialAttributes = { Shooting: 95, Dribbling: 95, Defense: 95, IQ: 95, Athleticism: 95, Passing: 95, Rebounding: 95, Speed: 95, Mentality: 95 };
    engine.player.ovr = 75;
    engine.player.teamId = 'LAL';
    engine.player.contractYearsLeft = 4;
    engine.player.careerTimeline = [{ teamId: 'LAL', startYear: 1, endYear: null }];
    
    // Limpeza forçada dos dados totais antes de iniciar a simulação do Bot
    Object.assign(engine.careerTotals.value, {
      gamesPlayed: 0,
      totalPoints: 0,
      totalAssists: 0,
      totalRebounds: 0,
      mvps: 0,
      rings: 0
    });

    // 3. Simula até a aposentadoria natural
    while (!engine.player.isRetired) {
      
      // Free Agency: Se o contrato acabar, o bot assina uma extensão de 4 anos automaticamente
      if (engine.player.contractYearsLeft === 0) {
        engine.player.contractYearsLeft = 4;
      }

      engine.simulateSeason();

      // Trava de segurança para evitar loops infinitos (Máximo de 25 temporadas)
      if (engine.history.value.length > 25) {
        engine.forceRetirement();
      }
    }

    // 4. Coleta de dados da vida gerada
    results.push({
      ovrFinal: engine.player.ovr,
      points: engine.careerTotals.value.totalPoints,
      rebounds: engine.careerTotals.value.totalRebounds,
      assists: engine.careerTotals.value.totalAssists,
      steals: engine.careerTotals.value.totalSteals,
      blocks: engine.careerTotals.value.totalBlocks,
      rings: engine.history.value.filter((s: any) => s.playoffs?.wonRing).length,
      mvps: engine.history.value.filter((s: any) => s.awards.includes('MVP')).length,
      dpoy: engine.history.value.filter((s: any) => s.awards.includes('DPOY')).length,
      smoty: engine.history.value.filter((s: any) => s.awards.includes('6MOTY')).length,
      rotY: engine.history.value.filter((s: any) => s.awards.includes('ROTY')).length,
      yearsPlayed: engine.history.value.length
    });
  }

  // 5. Exibição e Análise no Console
  console.table(results.slice(0, 15)); // Exibe a tabela detalhada das 15 primeiras carreiras

  const position = engine.player.position;
  const avgOVR = results.reduce((acc, r) => acc + r.ovrFinal, 0) / iterations;
  const maxOVR = Math.max(...results.map(r => r.ovrFinal));
  const avgPoints = results.reduce((acc, r) => acc + r.points, 0) / iterations;
  const maxPoints = Math.max(...results.map(r => r.points));
  const avgRebounds = results.reduce((acc, r) => acc + r.rebounds, 0) / iterations;
  const maxRebounds = Math.max(...results.map(r => r.rebounds));
  const avgAssists = results.reduce((acc, r) => acc + r.assists, 0) / iterations;
  const maxAssists = Math.max(...results.map(r => r.assists));
  const avgSteals = results.reduce((acc, r) => acc + r.steals, 0) / iterations;
  const maxSteals = Math.max(...results.map(r => r.steals));
  const avgBlocks = results.reduce((acc, r) => acc + r.blocks, 0) / iterations;
  const maxBlocks = Math.max(...results.map(r => r.blocks));
  const avgRings = results.reduce((acc, r) => acc + r.rings, 0) / iterations;
  const avgMVPs = results.reduce((acc, r) => acc + r.mvps, 0) / iterations;
  const avgDPOYs = results.reduce((acc, r) => acc + r.dpoy, 0) / iterations;
  const avgSMOTYs = results.reduce((acc, r) => acc + r.smoty, 0) / iterations;
  const avgROTYs = results.reduce((acc, r) => acc + r.rotY, 0) / iterations;
  const avgYears = results.reduce((acc, r) => acc + r.yearsPlayed, 0) / iterations;

    console.log(`\n--- RELATÓRIO DO MOTOR DE SIMULAÇÃO ---`);
    console.log(`Posição Simulada: ${position}`);
    console.log(`Carreiras Simuladas: ${iterations}`);
    console.log(`Duração Média: ${avgYears.toFixed(1)} temporadas`);
    console.log(`Média de OVR na Aposentadoria: ${avgOVR.toFixed(1)} (Ideal é entre 65 e 75 devido ao declínio)`);
    console.log(`Maior OVR Final: ${maxOVR}`);
    console.log(`Média de Pontos na Carreira: ${avgPoints.toFixed(0)}`);
    console.log(`Maior Pontuação Alcançada: ${maxPoints}`);
    console.log(`Média de Rebotes na Carreira: ${avgRebounds.toFixed(0)}`);
    console.log(`Maior Número de Rebotes Alcançado: ${maxRebounds}`);
    console.log(`Média de Assistências na Carreira: ${avgAssists.toFixed(0)}`);
    console.log(`Maior Número de Assistências Alcançado: ${maxAssists}`);
    console.log(`Média de Roubos de Bola na Carreira: ${avgSteals.toFixed(0)}`);
    console.log(`Maior Número de Roubos de Bola Alcançado: ${maxSteals}`);
    console.log(`Média de Bloqueios na Carreira: ${avgBlocks.toFixed(0)}`);
    console.log(`Maior Número de Bloqueios Alcançado: ${maxBlocks}`);
    console.log(`Média de Anéis Conquistados: ${avgRings.toFixed(2)}`);
    console.log(`Média de MVPs: ${avgMVPs.toFixed(2)}`);
    console.log(`Média de DPOYs: ${avgDPOYs.toFixed(2)}`);
    console.log(`Média de SMOTYs: ${avgSMOTYs.toFixed(2)}`);
    console.log(`Média de ROTYs: ${avgROTYs.toFixed(2)}`);
}