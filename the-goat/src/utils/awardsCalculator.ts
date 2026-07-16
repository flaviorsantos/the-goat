import type { PlayerAttributes, Position } from '../types';

interface SeasonStats {
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  tov: number;
  mpg: number;
  plusMinus: number;
}

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

export function calculateAwards(
  stats: SeasonStats,
  attributes: PlayerAttributes | Record<string, number>,
  playerOvr: number,
  teamWins: number,
  gamesPlayed: number,
  isRookie: boolean,
  position: Position,
) {
  const awards: string[] = [];
  const isAwardEligible = gamesPlayed >= 65;
  const teamBonus = Math.max(-2, Math.min(5, (teamWins - 45) * 0.2));

  const mvpScore =
    stats.ppg +
    stats.rpg * 0.9 +
    stats.apg * 1.5 +
    stats.spg * 2.4 +
    stats.bpg * 1.8 -
    stats.tov * 1.25 +
    teamBonus;

  if (
    teamWins >= 46 &&
    isAwardEligible &&
    playerOvr >= 86 &&
    stats.mpg >= 31 &&
    mvpScore >= randomBetween(45, 55)
  ) {
    awards.push('MVP');
  }

  if (isAwardEligible && mvpScore >= 48 && stats.mpg >= 30) {
    awards.push('All-NBA 1st Team');
  } else if (isAwardEligible && mvpScore >= 43 && stats.mpg >= 28) {
    awards.push('All-NBA 2nd Team');
  } else if (isAwardEligible && mvpScore >= 38 && stats.mpg >= 26) {
    awards.push('All-NBA 3rd Team');
  }

  if (isRookie && gamesPlayed >= 55 && stats.mpg >= 22) {
    const rookieScore = stats.ppg + stats.rpg + stats.apg;
    if (rookieScore >= randomBetween(17, 26)) {
      awards.push('ROTY');
    }
  }

  if (
    stats.mpg >= 18 &&
    gamesPlayed >= 55 &&
    stats.mpg < 29 &&
    stats.ppg >= 13 &&
    stats.ppg + stats.rpg + stats.apg >= randomBetween(22, 30)
  ) {
    awards.push('SMOTY');
  }

  const defenseAttribute = attributes.Defense ?? 30;
  const positionBonus =
    position === 'C' ? 2.5 :
    position === 'PF' ? 1.5 :
    position === 'SF' ? 0.5 :
    0;
  const defensiveScore =
    (defenseAttribute - 65) * 0.22 +
    stats.spg * 5.5 +
    stats.bpg * 5 +
    stats.plusMinus * 0.3 +
    teamBonus * 0.4 +
    positionBonus;

  if (
    playerOvr >= 84 &&
    isAwardEligible &&
    stats.mpg >= 28 &&
    defensiveScore >= randomBetween(29, 39)
  ) {
    awards.push('DPOY', 'All-Defense 1st Team');
  } else if (isAwardEligible && stats.mpg >= 27 && defensiveScore >= 25) {
    awards.push('All-Defense 1st Team');
  } else if (isAwardEligible && stats.mpg >= 25 && defensiveScore >= 22) {
    awards.push('All-Defense 2nd Team');
  }

  return awards;
}
