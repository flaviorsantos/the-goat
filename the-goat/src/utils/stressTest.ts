import { useGameEngine } from '../composables/useGameEngine';

export async function runStressTest(iterations: number = 50) {
  const engine = useGameEngine();
  
  type StressResult = {
    ovrFinal: number;
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    rings: number;
    mvps: number;
    dpoy: number;
    smoty: number;
    roty: number;
    allNba: number;
    allDefense: number;
    yearsPlayed: number;
  };

  const results: StressResult[] = [];

  console.log(`Iniciando stress test de ${iterations} carreiras...`);

  for (let i = 0; i < iterations; i++) {
    engine.initCareer('Bot Test', 'SF', 'US', 23, 'pro', 'fast');
    
    // Reset explícito da idade para evitar aposentadoria imediata na iteração seguinte
    engine.player.value.age = 19;
    
    // Setup dos atributos
    engine.player.value.attributes = { Shooting: 75, Dribbling: 75, Defense: 75, IQ: 75, Athleticism: 75, Passing: 75, Rebounding: 75, Speed: 75, Mentality: 75 };
    engine.player.value.potentialAttributes = { Shooting: 92, Dribbling: 92, Defense: 92, IQ: 92, Athleticism: 92, Passing: 92, Rebounding: 92, Speed: 92, Mentality: 92 };
    engine.player.value.ovr = 75;
    engine.player.value.teamId = 'LAL';
    engine.player.value.contractYearsLeft = 4;
    engine.player.value.careerTimeline = [{ teamId: 'LAL', startYear: 1, endYear: null }];
    
    // Reset forçado dos totais da carreira
    (engine.careerTotals.value as any) = {
      gamesPlayed: 0,
      totalPoints: 0,
      totalAssists: 0,
      totalRebounds: 0,
      totalSteals: 0,
      totalBlocks: 0,
      totalTurnovers: 0, 
      mvps: 0,
      rings: 0,
      seasonsPlayed: 0
    };

    while (!engine.player.value.isRetired) {
      if (engine.player.value.contractYearsLeft === 0) {
        engine.player.value.contractYearsLeft = 4;
      }
      
      engine.simulateSeason();
      
      if (engine.history.value.length > 25) {
        engine.forceRetirement();
      }
    }

    const h = engine.history.value;
    
    const calcTotal = (stat: string) => Math.floor(h.reduce((sum, s: any) => sum + ((s[stat] || 0) * 82), 0));

    results.push({
      ovrFinal: engine.player.value.ovr,
      points: engine.careerTotals.value.totalPoints || calcTotal('ppg'),
      rebounds: engine.careerTotals.value.totalRebounds || calcTotal('rpg'),
      assists: engine.careerTotals.value.totalAssists || calcTotal('apg'),
      steals: (engine.careerTotals.value as any).totalSteals || calcTotal('spg'),
      blocks: (engine.careerTotals.value as any).totalBlocks || calcTotal('bpg'),
      turnovers: (engine.careerTotals.value as any).totalTurnovers || calcTotal('tov'),
      rings: h.filter((s: any) => s.wonRing).length,
      mvps: h.filter((s: any) => s.awards?.includes('MVP')).length,
      dpoy: h.filter((s: any) => s.awards?.includes('DPOY')).length,
      smoty: h.filter((s: any) => s.awards?.includes('SMOTY')).length,
      roty: h.filter((s: any) => s.awards?.includes('ROTY')).length,
      allNba: h.filter((s: any) => s.awards?.includes('All-NBA 1st Team') || s.awards?.includes('All-NBA 2nd Team') || s.awards?.includes('All-NBA 3rd Team')).length,
      allDefense: h.filter((s: any) => s.awards?.includes('All-Defense 1st Team') || s.awards?.includes('All-Defense 2nd Team')).length,
      yearsPlayed: h.length
    });
  }

  console.table(results.slice(0, 15));

  const avg = (key: keyof StressResult) => results.reduce((acc, r) => acc + r[key], 0) / iterations;
  const max = (key: keyof StressResult) => Math.max(...results.map(r => r[key]));

  console.log(`\n--- RELATÓRIO DO MOTOR DE SIMULAÇÃO ---`);
  console.log(`Carreiras Simuladas: ${iterations}`);
  console.log(`Duração Média: ${avg('yearsPlayed').toFixed(1)} temporadas`);
  console.log(`Média OVR Final: ${avg('ovrFinal').toFixed(1)}`);
  console.log(`Pontos Média: ${avg('points').toFixed(0)} | Máx: ${max('points')}`);
  console.log(`Rebotes Média: ${avg('rebounds').toFixed(0)} | Máx: ${max('rebounds')}`);
  console.log(`Assistências Média: ${avg('assists').toFixed(0)} | Máx: ${max('assists')}`);
  console.log(`Roubos Média: ${avg('steals').toFixed(0)} | Máx: ${max('steals')}`);
  console.log(`Bloqueios Média: ${avg('blocks').toFixed(0)} | Máx: ${max('blocks')}`);
  console.log(`Turnovers Média: ${avg('turnovers').toFixed(0)} | Máx: ${max('turnovers')}`);
  console.log(`Títulos (Rings) Média: ${avg('rings').toFixed(2)} | Máx: ${max('rings')}`);
  console.log(`MVPs Média: ${avg('mvps').toFixed(2)} | Máx: ${max('mvps')}`);
  console.log(`DPOYs Média: ${avg('dpoy').toFixed(2)}`);
  console.log(`SMOTYs Média: ${avg('smoty').toFixed(2)}`);
  console.log(`ROTYs Média: ${avg('roty').toFixed(2)}`);
  console.log(`All-NBA Média: ${avg('allNba').toFixed(2)}`);
  console.log(`All-Defense Média: ${avg('allDefense').toFixed(2)}`);
}