import { useGameEngine } from '../composables/useGameEngine';
import { calculateOverall } from './statsCalculator';
import { nbaPlayers } from '../data/players';
import type { PlayerAttributes, Position, SeasonStats } from '../types';

type StressResult = {
  initialOvr: number;
  potentialOvr: number;
  peakOvr: number;
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
  careerPpg: number;
  careerRpg: number;
  careerApg: number;
  careerSpg: number;
  careerBpg: number;
};

export type StressSummary = {
  position: Position;
  careers: number;
  averages: StressResult;
  maxima: StressResult;
};

export type StressTestOptions = {
  iterationsPerPosition?: number;
  fixedAttributeValue?: number;
};

const POSITIONS: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];
const TEST_TEAMS = ['BOS', 'GSW', 'MIA', 'CHI', 'NYK', 'DAL', 'DEN', 'LAL'];
const ATTRIBUTE_KEYS = [
  'Shooting',
  'Dribbling',
  'Defense',
  'IQ',
  'Athleticism',
  'Passing',
  'Rebounding',
  'Speed',
  'Finishing',
] as const;

const createDraftedPotential = (): PlayerAttributes => {
  const available = new Set<keyof PlayerAttributes>(ATTRIBUTE_KEYS);
  const selected: Partial<PlayerAttributes> = {};

  while (available.size > 0) {
    const source =
      nbaPlayers[Math.floor(Math.random() * nbaPlayers.length)];
    const bestAvailableAttribute = [...available].sort(
      (left, right) =>
        source.attributes[right] - source.attributes[left],
    )[0];

    selected[bestAvailableAttribute] =
      source.attributes[bestAvailableAttribute];
    available.delete(bestAvailableAttribute);
  }

  return selected as PlayerAttributes;
};

const createRookieAttributes = (
  potential: PlayerAttributes,
): PlayerAttributes =>
  Object.fromEntries(
    ATTRIBUTE_KEYS.map(key => [
      key,
      Math.max(
        40,
        potential[key] - (Math.floor(Math.random() * 11) + 8),
      ),
    ]),
  ) as unknown as PlayerAttributes;

const createFixedAttributes = (value: number): PlayerAttributes =>
  Object.fromEntries(
    ATTRIBUTE_KEYS.map(key => [key, Math.min(99, Math.max(30, value))]),
  ) as unknown as PlayerAttributes;

const hasAward = (season: SeasonStats, prefix: string) =>
  season.awards.some(award => award.startsWith(prefix));

const average = (results: StressResult[], key: keyof StressResult) =>
  results.reduce((sum, result) => sum + result[key], 0) / results.length;

const maximum = (results: StressResult[], key: keyof StressResult) =>
  Math.max(...results.map(result => result[key]));

const summarize = (
  position: Position,
  results: StressResult[],
): StressSummary => {
  const keys = Object.keys(results[0]) as Array<keyof StressResult>;
  const averages = {} as StressResult;
  const maxima = {} as StressResult;

  keys.forEach(key => {
    averages[key] = average(results, key);
    maxima[key] = maximum(results, key);
  });

  return {
    position,
    careers: results.length,
    averages,
    maxima,
  };
};

export async function runStressTest(
  options: number | StressTestOptions = 10,
): Promise<StressSummary[]> {
  const {
    iterationsPerPosition = 10,
    fixedAttributeValue,
  } = typeof options === 'number'
    ? { iterationsPerPosition: options, fixedAttributeValue: undefined }
    : options;
  const engine = useGameEngine({ persistRetiredCareers: false });
  const summaries: StressSummary[] = [];
  const scenario = fixedAttributeValue === undefined
    ? 'draft otimizado'
    : `todos os atributos fixados em ${fixedAttributeValue}`;

  console.log(
    `Iniciando stress test de ${iterationsPerPosition} carreiras para cada posição ` +
    `(${scenario})...`,
  );

  for (const position of POSITIONS) {
    const results: StressResult[] = [];

    for (let index = 0; index < iterationsPerPosition; index++) {
      engine.initCareer('Bot Test', position, 'US', 23, 'pro');
      engine.player.value.age = 19;

      const peakAttributes = fixedAttributeValue === undefined
        ? createDraftedPotential()
        : createFixedAttributes(fixedAttributeValue);
      const rookieAttributes = fixedAttributeValue === undefined
        ? createRookieAttributes(peakAttributes)
        : createFixedAttributes(fixedAttributeValue);
      const initialOvr = calculateOverall(rookieAttributes, position);
      const potentialOvr = calculateOverall(peakAttributes, position);
      engine.player.value.potentialAttributes = peakAttributes;
      engine.player.value.attributes = rookieAttributes;
      engine.player.value.ovr = initialOvr;
      engine.player.value.teamId = 'LAL';
      engine.player.value.contractYearsLeft = 4;
      engine.player.value.careerTimeline = [
        { teamId: 'LAL', startYear: 1, endYear: null },
      ];

      while (!engine.player.value.isRetired) {
        if (engine.player.value.contractYearsLeft === 0) {
          if (Math.random() > 0.7) {
            const newTeam =
              TEST_TEAMS[Math.floor(Math.random() * TEST_TEAMS.length)];

            if (engine.player.value.teamId !== newTeam) {
              const lastStop =
                engine.player.value.careerTimeline[
                  engine.player.value.careerTimeline.length - 1
                ];
              lastStop.endYear = engine.history.value.length;
              engine.player.value.careerTimeline.push({
                teamId: newTeam,
                startYear: engine.history.value.length + 1,
                endYear: null,
              });
              engine.player.value.teamId = newTeam;
            }
          }
          engine.player.value.contractYearsLeft =
            Math.floor(Math.random() * 3) + 2;
        }

        engine.simulateSeason();

        if (engine.history.value.length >= 25) {
          engine.forceRetirement();
        }
      }

      const seasons = engine.history.value;
      const years = Math.max(1, seasons.length);
      const games = Math.max(1, engine.careerTotals.value.gamesPlayed);

      if (index === 0) {
        console.log(`\n--- PROGRESSÃO DE OVR (${position} - Exemplo) ---`);
        console.log(
          seasons.map(season => `Idade ${season.age}: ${season.ovr}`).join(' | '),
        );
      }

      results.push({
        initialOvr,
        potentialOvr,
        peakOvr: Math.max(...seasons.map(season => season.ovr)),
        ovrFinal: engine.player.value.ovr,
        points: engine.careerTotals.value.totalPoints,
        rebounds: engine.careerTotals.value.totalRebounds,
        assists: engine.careerTotals.value.totalAssists,
        steals: engine.careerTotals.value.totalSteals,
        blocks: engine.careerTotals.value.totalBlocks,
        turnovers: engine.careerTotals.value.totalTurnovers,
        rings: seasons.filter(season => season.playoffs?.wonRing).length,
        mvps: seasons.filter(season => hasAward(season, 'MVP')).length,
        dpoy: seasons.filter(season => hasAward(season, 'DPOY')).length,
        smoty: seasons.filter(season => hasAward(season, 'SMOTY')).length,
        roty: seasons.filter(season => hasAward(season, 'ROTY')).length,
        allNba: seasons.filter(season => hasAward(season, 'All-NBA')).length,
        allDefense: seasons.filter(season => hasAward(season, 'All-Defense')).length,
        yearsPlayed: years,
        careerPpg: engine.careerTotals.value.totalPoints / games,
        careerRpg: engine.careerTotals.value.totalRebounds / games,
        careerApg: engine.careerTotals.value.totalAssists / games,
        careerSpg: engine.careerTotals.value.totalSteals / games,
        careerBpg: engine.careerTotals.value.totalBlocks / games,
      });

      if ((index + 1) % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    const summary = summarize(position, results);
    summaries.push(summary);

    console.log(`\n=========================================`);
    console.log(` RELATÓRIO DO MOTOR - POSIÇÃO: ${position}`);
    console.log(`=========================================`);
    console.log(`Cenário: ${scenario}`);
    console.log(`Carreiras Simuladas: ${iterationsPerPosition}`);
    console.log(`Duração Média: ${summary.averages.yearsPlayed.toFixed(1)} temporadas`);
    console.log(
      `OVR: ${summary.averages.initialOvr.toFixed(1)} inicial | ` +
      `${summary.averages.potentialOvr.toFixed(1)} potencial | ` +
      `${summary.averages.peakOvr.toFixed(1)} pico | ` +
      `${summary.averages.ovrFinal.toFixed(1)} final`,
    );
    console.log(
      `Médias de carreira: ${summary.averages.careerPpg.toFixed(1)} PTS | ` +
      `${summary.averages.careerRpg.toFixed(1)} REB | ` +
      `${summary.averages.careerApg.toFixed(1)} AST | ` +
      `${summary.averages.careerSpg.toFixed(1)} STL | ` +
      `${summary.averages.careerBpg.toFixed(1)} BLK`,
    );
    console.log(
      `Totais: ${summary.averages.points.toFixed(0)} PTS | ` +
      `${summary.averages.rebounds.toFixed(0)} REB | ` +
      `${summary.averages.assists.toFixed(0)} AST | ` +
      `${summary.averages.steals.toFixed(0)} STL | ` +
      `${summary.averages.blocks.toFixed(0)} BLK`,
    );
    console.log(
      `Títulos: ${summary.averages.rings.toFixed(2)} | ` +
      `MVPs: ${summary.averages.mvps.toFixed(2)} | ` +
      `DPOYs: ${summary.averages.dpoy.toFixed(2)}`,
    );
    console.log(
      `All-NBA: ${summary.averages.allNba.toFixed(2)} | ` +
      `All-Defense: ${summary.averages.allDefense.toFixed(2)} | ` +
      `ROTY: ${summary.averages.roty.toFixed(2)}`,
    );
  }

  return summaries;
}
