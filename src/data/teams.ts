// src/data/teams.ts
import type { Team } from '../types';

export const nbaTeams: Team[] = [
  // Conferência Leste
  { id: 'BOS', city: 'Boston', name: 'Celtics', baseOvr: 84, star1Ovr: 95, star2Ovr: 92 },
  { id: 'NYK', city: 'New York', name: 'Knicks', baseOvr: 83, star1Ovr: 92, star2Ovr: 85 },
  { id: 'PHI', city: 'Philadelphia', name: '76ers', baseOvr: 77, star1Ovr: 95, star2Ovr: 86 },
  { id: 'MIL', city: 'Milwaukee', name: 'Bucks', baseOvr: 79, star1Ovr: 96, star2Ovr: 89 },
  { id: 'CLE', city: 'Cleveland', name: 'Cavaliers', baseOvr: 81, star1Ovr: 90, star2Ovr: 86 },
  { id: 'IND', city: 'Indiana', name: 'Pacers', baseOvr: 80, star1Ovr: 89, star2Ovr: 84 },
  { id: 'MIA', city: 'Miami', name: 'Heat', baseOvr: 80, star1Ovr: 91, star2Ovr: 87 },
  { id: 'ORL', city: 'Orlando', name: 'Magic', baseOvr: 82, star1Ovr: 88, star2Ovr: 84 },
  { id: 'CHI', city: 'Chicago', name: 'Bulls', baseOvr: 75, star1Ovr: 85, star2Ovr: 82 },
  { id: 'ATL', city: 'Atlanta', name: 'Hawks', baseOvr: 76, star1Ovr: 88, star2Ovr: 81 },
  { id: 'BKN', city: 'Brooklyn', name: 'Nets', baseOvr: 72, star1Ovr: 83, star2Ovr: 79 },
  { id: 'TOR', city: 'Toronto', name: 'Raptors', baseOvr: 74, star1Ovr: 85, star2Ovr: 80 },
  { id: 'CHA', city: 'Charlotte', name: 'Hornets', baseOvr: 73, star1Ovr: 86, star2Ovr: 82 },
  { id: 'WAS', city: 'Washington', name: 'Wizards', baseOvr: 70, star1Ovr: 82, star2Ovr: 78 },
  { id: 'DET', city: 'Detroit', name: 'Pistons', baseOvr: 71, star1Ovr: 84, star2Ovr: 80 },
  
  // Conferência Oeste
  { id: 'DEN', city: 'Denver', name: 'Nuggets', baseOvr: 82, star1Ovr: 98, star2Ovr: 88 },
  { id: 'OKC', city: 'Oklahoma City', name: 'Thunder', baseOvr: 85, star1Ovr: 96, star2Ovr: 88 },
  { id: 'MIN', city: 'Minnesota', name: 'Timberwolves', baseOvr: 84, star1Ovr: 93, star2Ovr: 89 },
  { id: 'LAC', city: 'LA', name: 'Clippers', baseOvr: 81, star1Ovr: 94, star2Ovr: 87 },
  { id: 'DAL', city: 'Dallas', name: 'Mavericks', baseOvr: 78, star1Ovr: 96, star2Ovr: 89 },
  { id: 'PHX', city: 'Phoenix', name: 'Suns', baseOvr: 76, star1Ovr: 94, star2Ovr: 92 },
  { id: 'LAL', city: 'Los Angeles', name: 'Lakers', baseOvr: 75, star1Ovr: 96, star2Ovr: 90 },
  { id: 'NOP', city: 'New Orleans', name: 'Pelicans', baseOvr: 80, star1Ovr: 89, star2Ovr: 86 },
  { id: 'SAC', city: 'Sacramento', name: 'Kings', baseOvr: 79, star1Ovr: 90, star2Ovr: 87 },
  { id: 'GSW', city: 'Golden State', name: 'Warriors', baseOvr: 78, star1Ovr: 94, star2Ovr: 85 },
  { id: 'HOU', city: 'Houston', name: 'Rockets', baseOvr: 79, star1Ovr: 86, star2Ovr: 84 },
  { id: 'UTA', city: 'Utah', name: 'Jazz', baseOvr: 74, star1Ovr: 85, star2Ovr: 81 },
  { id: 'MEM', city: 'Memphis', name: 'Grizzlies', baseOvr: 77, star1Ovr: 91, star2Ovr: 86 },
  { id: 'SAS', city: 'San Antonio', name: 'Spurs', baseOvr: 75, star1Ovr: 89, star2Ovr: 82 },
  { id: 'POR', city: 'Portland', name: 'Trail Blazers', baseOvr: 72, star1Ovr: 84, star2Ovr: 80 }
];