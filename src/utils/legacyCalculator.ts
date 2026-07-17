import type { SeasonStats } from '../types';

export type RetiredJersey = {
  teamId: string;
  jerseyNumber: number;
  seasons: number;
  rings: number;
};

export const calculateRetiredJerseys = (
  history: SeasonStats[],
  jerseyNumber: number,
): RetiredJersey[] => {
  const teams = new Map<string, { seasons: number; rings: number }>();
  history.forEach(season => {
    const record = teams.get(season.teamId) ?? { seasons: 0, rings: 0 };
    record.seasons++;
    if (season.playoffs?.wonRing) record.rings++;
    teams.set(season.teamId, record);
  });

  return [...teams.entries()]
    .filter(([, record]) =>
      record.seasons >= 12 ||
      record.rings >= 3 ||
      (record.seasons >= 7 && record.rings >= 2),
    )
    .map(([teamId, record]) => ({ teamId, jerseyNumber, ...record }));
};
