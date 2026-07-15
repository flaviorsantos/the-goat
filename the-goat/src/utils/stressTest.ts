import { useGameEngine } from '../composables/useGameEngine';

export async function runStressTest(iterationsPerPosition: number = 10) {
  const engine = useGameEngine();
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  
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

  console.log(`Iniciando stress test de ${iterationsPerPosition} carreiras para cada posição...`);

  for (const position of positions) {
    const results: StressResult[] = [];

    for (let i = 0; i < iterationsPerPosition; i++) {
      // Injeta a posição atual do laço no motor
      engine.initCareer('Bot Test', position as any, 'US', 23, 'pro', 'fast');
      
      engine.player.value.age = 19;
      
      const peak = 92;
      engine.player.value.potentialAttributes = { 
        Shooting: peak, Dribbling: peak, Defense: peak, IQ: peak, Athleticism: peak, 
        Passing: peak, Rebounding: peak, Speed: peak, Mentality: peak 
      };
      
      const getRookieValue = (val: number) => Math.max(40, val - (Math.floor(Math.random() * 11) + 8));
      
      engine.player.value.attributes = { 
        Shooting: getRookieValue(peak), 
        Dribbling: getRookieValue(peak), 
        Defense: getRookieValue(peak), 
        IQ: getRookieValue(peak), 
        Athleticism: getRookieValue(peak), 
        Passing: getRookieValue(peak), 
        Rebounding: getRookieValue(peak), 
        Speed: getRookieValue(peak), 
        Mentality: getRookieValue(peak) 
      };

      const attrs = engine.player.value.attributes;
      const initialOvr = Math.floor(
        (attrs.Shooting * 0.15) + (attrs.Dribbling * 0.1) + (attrs.Defense * 0.15) + 
        (attrs.IQ * 0.1) + (attrs.Athleticism * 0.15) + (attrs.Passing * 0.1) + 
        (attrs.Rebounding * 0.1) + (attrs.Speed * 0.1) + (attrs.Mentality * 0.05)
      );
      engine.player.value.ovr = initialOvr;
      
      engine.player.value.teamId = 'LAL';
      engine.player.value.contractYearsLeft = 4;
      engine.player.value.careerTimeline = [{ teamId: 'LAL', startYear: 1, endYear: null }];
      
      (engine.careerTotals.value as any) = {
        gamesPlayed: 0, totalPoints: 0, totalAssists: 0, totalRebounds: 0,
        totalSteals: 0, totalBlocks: 0, totalTurnovers: 0, mvps: 0, rings: 0, seasonsPlayed: 0
      };

      while (!engine.player.value.isRetired) {
        if (engine.player.value.contractYearsLeft === 0) {
          if (Math.random() > 0.7) {
            const availableTeams = ['BOS', 'GSW', 'MIA', 'CHI', 'NYK', 'DAL', 'DEN', 'LAL'];
            const newTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];
            
            if (engine.player.value.teamId !== newTeam) {
              engine.player.value.careerTimeline[engine.player.value.careerTimeline.length - 1].endYear = engine.history.value.length;
              engine.player.value.careerTimeline.push({ teamId: newTeam, startYear: engine.history.value.length + 1, endYear: null });
              engine.player.value.teamId = newTeam;
            }
          }
          engine.player.value.contractYearsLeft = Math.floor(Math.random() * 3) + 2;
        }
        
        engine.simulateSeason();
        
        if (engine.history.value.length > 25) {
          engine.forceRetirement();
        }
      }

      const h = engine.history.value;

      if (i === 0) {
        console.log(`\n--- PROGRESSÃO DE OVR (${position} - Exemplo) ---`);
        const ovrTimeline = h.map((s: any) => `Idade ${s.age}: ${s.ovr}`).join(' | ');
        console.log(ovrTimeline);
      }

      const calcTotal = (stat: string) => Math.floor(h.reduce((sum: number, s: any) => sum + ((s[stat] || 0) * 82), 0));

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
        allNba: h.filter((s: any) => s.awards?.includes('All-NBA 1st Team') || s.awards?.includes('All-NBA Team')).length,
        allDefense: h.filter((s: any) => s.awards?.includes('All-Defense 1st Team') || s.awards?.includes('All-Defense 2nd Team')).length,
        yearsPlayed: h.length
      });
    }

    const avg = (key: keyof StressResult) => results.reduce((acc, r) => acc + r[key], 0) / iterationsPerPosition;
    const max = (key: keyof StressResult) => Math.max(...results.map(r => r[key]));

    console.log(`\n=========================================`);
    console.log(` RELATÓRIO DO MOTOR - POSIÇÃO: ${position}`);
    console.log(`=========================================`);
    console.log(`Carreiras Simuladas: ${iterationsPerPosition}`);
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
    console.log(`DPOYs Média: ${avg('dpoy').toFixed(2)} | Máx: ${max('dpoy')}`);
    console.log(`SMOTYs Média: ${avg('smoty').toFixed(2)}`);
    console.log(`ROTYs Média: ${avg('roty').toFixed(2)}`);
    console.log(`All-NBA Média: ${avg('allNba').toFixed(2)}`);
    console.log(`All-Defense Média: ${avg('allDefense').toFixed(2)}`);
  }
}