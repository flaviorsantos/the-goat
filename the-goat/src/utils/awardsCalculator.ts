// src/utils/awardsCalculator.ts
import type { SeasonStats, TeamStanding, Position } from '../types';

export function calculateAwards(
  stats: Partial<SeasonStats>,
  seasonNumber: number,
  teamWins: number,
  standings: TeamStanding[],
  position: Position
): string[] {
  const awards: string[] = [];
  
  const ppg = stats.ppg || 0;
  const apg = stats.apg || 0;
  const rpg = stats.rpg || 0;
  const spg = stats.spg || 0;
  const bpg = stats.bpg || 0;
  const topg = stats.topg || 0;

  const teamRank = standings.findIndex(t => t.wins === teamWins) + 1;
  const isTop3Team = teamRank <= 3;
  const isPlayoffTeam = teamRank <= 16;
  const winPct = teamWins / 82;

  let offensiveScore = 0;
  switch (position) {
    case 'PG':
      offensiveScore = (ppg * 1.2) + (apg * 2.0) + (rpg * 0.5) - (topg * 1.0) + (winPct * 15);
      break;
    case 'SG':
    case 'SF':
      offensiveScore = (ppg * 1.3) + (apg * 1.0) + (rpg * 0.8) + (spg * 1.0) - (topg * 0.8) + (winPct * 15);
      break;
    case 'PF':
    case 'C':
      offensiveScore = (ppg * 1.0) + (rpg * 1.2) + (apg * 0.5) + (bpg * 2.0) - (topg * 1.0) + (winPct * 15);
      break;
  }

  let defensiveScore = 0;
  switch (position) {
    case 'PG':
    case 'SG':
      defensiveScore = (spg * 3.5) + (bpg * 1.5) + (rpg * 0.5) + (winPct * 5);
      break;
    case 'SF':
      defensiveScore = (spg * 2.5) + (bpg * 2.5) + (rpg * 0.6) + (winPct * 5);
      break;
    case 'PF':
    case 'C':
      defensiveScore = (bpg * 3.5) + (spg * 1.5) + (rpg * 0.8) + (winPct * 5);
      break;
  }

  const leagueMvpThreshold = 65 + (Math.random() * 8); 
  const leagueAllNba1stThreshold = 60 + (Math.random() * 6);
  const leagueAllNba2ndThreshold = 53 + (Math.random() * 5);
  const leagueAllNba3rdThreshold = 48 + (Math.random() * 4);

  const leagueDpoyThreshold = 22 + (Math.random() * 5);
  const leagueAllDef1stThreshold = 18 + (Math.random() * 3);
  const leagueAllDef2ndThreshold = 15 + (Math.random() * 2);

  const leagueRotyThreshold = 45 + (Math.random() * 8);

  if (seasonNumber === 1 && offensiveScore >= leagueRotyThreshold) {
    awards.push('ROTY');
  }

  if (offensiveScore >= leagueMvpThreshold && isTop3Team) {
    awards.push('MVP');
  }

  if (offensiveScore >= leagueAllNba1stThreshold) {
    awards.push('All-NBA 1st');
  } else if (offensiveScore >= leagueAllNba2ndThreshold) {
    awards.push('All-NBA 2nd');
  } else if (offensiveScore >= leagueAllNba3rdThreshold) {
    awards.push('All-NBA 3rd');
  }

  if (defensiveScore >= leagueDpoyThreshold && isPlayoffTeam) {
    awards.push('DPOY');
  }

  if (defensiveScore >= leagueAllDef1stThreshold) {
    awards.push('All-Defense 1st');
  } else if (defensiveScore >= leagueAllDef2ndThreshold) {
    awards.push('All-Defense 2nd');
  }

  return awards;
}