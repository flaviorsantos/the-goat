import type { SeasonStats } from '../types';

export const calculateSeasonScore = (season: SeasonStats) => {
  const awards = season.awards ?? [];
  return (
    season.ppg +
    season.rpg * 0.9 +
    season.apg * 1.5 +
    season.spg * 2.4 +
    season.bpg * 1.8 -
    season.tov * 1.25 +
    season.plusMinus * 0.45 +
    ((season.fgPct - 0.45) * 10 + (season.fg3Pct - 0.35) * 5) +
    (season.gamesPlayed / 82) * 2 +
    (awards.includes('MVP') ? 12 : 0) +
    (awards.includes('Finals MVP') ? 8 : 0) +
    (awards.includes('DPOY') ? 6 : 0) +
    (season.playoffs?.wonRing ? 8 : 0)
  );
};

export const findBestSeasonNumber = (history: SeasonStats[]) =>
  history.reduce(
    (best, season) =>
      calculateSeasonScore(season) > calculateSeasonScore(best)
        ? season
        : best,
    history[0],
  )?.seasonNumber ?? -1;
