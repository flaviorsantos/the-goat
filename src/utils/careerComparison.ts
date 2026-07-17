import { realCareers, type RealCareer } from '../data/realCareers';
import type { CareerTotals, Position } from '../types';

type Dimension =
  | 'scoring'
  | 'playmaking'
  | 'rebounding'
  | 'defense'
  | 'longevity'
  | 'accolades'
  | 'championships';

type CareerVector = Record<Dimension, number>;

export type CareerComparisonInput = {
  position: Position;
  totals: CareerTotals;
  awards: Record<string, number>;
};

export type CareerComparison = {
  player: RealCareer;
  similarity: number;
  basis: 'complete' | 'statistical';
  sharedTraits: string[];
  mainDifference: string;
};

const DIMENSION_LABELS: Record<Dimension, string> = {
  scoring: 'scoring production',
  playmaking: 'playmaking',
  rebounding: 'rebounding',
  defense: 'defensive production',
  longevity: 'longevity',
  accolades: 'individual accolades',
  championships: 'championship success',
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const perGame = (total: number, games: number) =>
  games > 0 ? total / games : 0;

const accoladeScore = ({
  mvps,
  finalsMvps,
  dpoys,
  allNbaFirst,
  allNbaSecond,
  allNbaThird,
  allDefenseFirst,
  allDefenseSecond,
}: {
  mvps: number;
  finalsMvps: number;
  dpoys: number;
  allNbaFirst: number;
  allNbaSecond: number;
  allNbaThird: number;
  allDefenseFirst: number;
  allDefenseSecond: number;
}) =>
  mvps * 4 +
  finalsMvps * 2.5 +
  dpoys * 2 +
  allNbaFirst * 1.8 +
  allNbaSecond * 1.2 +
  allNbaThird * 0.8 +
  allDefenseFirst +
  allDefenseSecond * 0.6;

const createVector = ({
  games,
  seasons,
  points,
  rebounds,
  assists,
  steals,
  blocks,
  rings,
  accolades,
}: {
  games: number;
  seasons: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  rings: number;
  accolades: number;
}): CareerVector => ({
  scoring: clamp(
    points / 40_474 * 0.58 +
    perGame(points, games) / 30 * 0.42,
  ),
  playmaking: clamp(
    assists / 15_806 * 0.55 +
    perGame(assists, games) / 10 * 0.45,
  ),
  rebounding: clamp(
    rebounds / 23_924 * 0.55 +
    perGame(rebounds, games) / 13 * 0.45,
  ),
  defense: clamp(
    steals / 3_265 * 0.24 +
    blocks / 3_830 * 0.24 +
    perGame(steals, games) / 2.2 * 0.26 +
    perGame(blocks, games) / 3 * 0.26,
  ),
  longevity: clamp(
    games / 1_550 * 0.6 +
    seasons / 22 * 0.4,
  ),
  accolades: clamp(accolades / 48),
  championships: clamp(rings / 6),
});

const vectorForRealCareer = (career: RealCareer) =>
  createVector({
    games: career.games,
    seasons: career.seasons,
    points: career.points,
    rebounds: career.rebounds,
    assists: career.assists,
    steals: career.steals,
    blocks: career.blocks,
    rings: career.rings,
    accolades: accoladeScore(career),
  });

const vectorForSimulatedCareer = ({
  totals,
  awards,
}: CareerComparisonInput) =>
  createVector({
    games: totals.gamesPlayed,
    seasons: totals.seasonsPlayed,
    points: totals.totalPoints,
    rebounds: totals.totalRebounds,
    assists: totals.totalAssists,
    steals: totals.totalSteals,
    blocks: totals.totalBlocks,
    rings: totals.rings,
    accolades: accoladeScore({
      mvps: awards.MVP ?? 0,
      finalsMvps: awards['Finals MVP'] ?? 0,
      dpoys: awards.DPOY ?? 0,
      allNbaFirst: awards['All-NBA 1st Team'] ?? 0,
      allNbaSecond: awards['All-NBA 2nd Team'] ?? 0,
      allNbaThird: awards['All-NBA 3rd Team'] ?? 0,
      allDefenseFirst: awards['All-Defense 1st Team'] ?? 0,
      allDefenseSecond: awards['All-Defense 2nd Team'] ?? 0,
    }),
  });

const weightsForPosition = (position: Position): CareerVector => {
  if (position === 'PG') {
    return {
      scoring: 0.17, playmaking: 0.22, rebounding: 0.07,
      defense: 0.14, longevity: 0.12, accolades: 0.19,
      championships: 0.09,
    };
  }
  if (position === 'C') {
    return {
      scoring: 0.15, playmaking: 0.07, rebounding: 0.19,
      defense: 0.2, longevity: 0.12, accolades: 0.18,
      championships: 0.09,
    };
  }
  return {
    scoring: 0.18, playmaking: 0.12, rebounding: 0.14,
    defense: 0.16, longevity: 0.12, accolades: 0.19,
    championships: 0.09,
  };
};

const positionPenalty = (position: Position, career: RealCareer) => {
  if (career.positions.includes(position)) return 0;

  const adjacent: Record<Position, Position[]> = {
    PG: ['SG'],
    SG: ['PG', 'SF'],
    SF: ['SG', 'PF'],
    PF: ['SF', 'C'],
    C: ['PF'],
  };
  return career.positions.some(candidate => adjacent[position].includes(candidate))
    ? 0.035
    : 0.09;
};

export const compareCareer = (
  input: CareerComparisonInput,
  limit = 3,
): CareerComparison[] => {
  const simulated = vectorForSimulatedCareer(input);
  const weights = weightsForPosition(input.position);
  const dimensions = Object.keys(simulated) as Dimension[];

  return realCareers
    .map(player => {
      const real = vectorForRealCareer(player);
      const comparableDimensions = dimensions.filter(dimension => {
        if (dimension === 'accolades' && player.accoladesKnown === false) {
          return false;
        }
        if (
          dimension === 'championships' &&
          player.championshipsKnown === false
        ) {
          return false;
        }
        return true;
      });
      const differences = comparableDimensions
        .map(dimension => ({
          dimension,
          difference: Math.abs(simulated[dimension] - real[dimension]),
          direction: simulated[dimension] >= real[dimension] ? 'more' : 'less',
        }))
        .sort((left, right) => left.difference - right.difference);

      const comparableWeight = comparableDimensions.reduce(
        (sum, dimension) => sum + weights[dimension],
        0,
      );
      const squaredDistance = comparableDimensions.reduce(
        (sum, dimension) =>
          sum +
          weights[dimension] *
          Math.pow(simulated[dimension] - real[dimension], 2),
        0,
      ) / comparableWeight;
      const distance =
        Math.sqrt(squaredDistance) +
        positionPenalty(input.position, player);
      const largestDifference = differences[differences.length - 1];

      return {
        player,
        similarity: Math.round(clamp(1 - distance / 0.72, 0.25, 0.98) * 100),
        basis:
          player.accoladesKnown === false ||
          player.championshipsKnown === false
            ? 'statistical'
            : 'complete',
        sharedTraits: differences
          .slice(0, 2)
          .map(({ dimension }) => DIMENSION_LABELS[dimension]),
        mainDifference:
          `${largestDifference.direction === 'more' ? 'More' : 'Less'} ` +
          `${DIMENSION_LABELS[largestDifference.dimension]} than ${player.name}`,
      };
    })
    .sort((left, right) => right.similarity - left.similarity)
    .slice(0, limit);
};
