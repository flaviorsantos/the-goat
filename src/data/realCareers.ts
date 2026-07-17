import type { Position } from '../types';
import { additionalRealCareers } from './additionalRealCareers';

export type RealCareer = {
  id: string;
  name: string;
  positions: Position[];
  era: string;
  seasons: number;
  games: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  rings: number;
  mvps: number;
  finalsMvps: number;
  dpoys: number;
  allNbaFirst: number;
  allNbaSecond: number;
  allNbaThird: number;
  allDefenseFirst: number;
  allDefenseSecond: number;
  accoladesKnown?: boolean;
  championshipsKnown?: boolean;
  summary: string;
};

// Regular-season career profiles. The set favors retired players so the
// comparison remains stable and works without network access.
export const realCareers: RealCareer[] = [
  {
    id: 'michael-jordan', name: 'Michael Jordan', positions: ['SG'], era: '1984–2003',
    seasons: 15, games: 1072, points: 32292, rebounds: 6672, assists: 5633,
    steals: 2514, blocks: 893, rings: 6, mvps: 5, finalsMvps: 6, dpoys: 1,
    allNbaFirst: 10, allNbaSecond: 1, allNbaThird: 0,
    allDefenseFirst: 9, allDefenseSecond: 0,
    summary: 'Scoring dominance, elite perimeter defense and unmatched championship peak.',
  },
  {
    id: 'magic-johnson', name: 'Magic Johnson', positions: ['PG'], era: '1979–1996',
    seasons: 13, games: 906, points: 17707, rebounds: 6559, assists: 10141,
    steals: 1724, blocks: 374, rings: 5, mvps: 3, finalsMvps: 3, dpoys: 0,
    allNbaFirst: 9, allNbaSecond: 1, allNbaThird: 0,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Oversized playmaker whose passing and team success defined an era.',
  },
  {
    id: 'larry-bird', name: 'Larry Bird', positions: ['SF', 'PF'], era: '1979–1992',
    seasons: 13, games: 897, points: 21791, rebounds: 8974, assists: 5695,
    steals: 1556, blocks: 755, rings: 3, mvps: 3, finalsMvps: 2, dpoys: 0,
    allNbaFirst: 9, allNbaSecond: 1, allNbaThird: 0,
    allDefenseFirst: 0, allDefenseSecond: 3,
    summary: 'Complete forward with shooting, rebounding, creation and a historic peak.',
  },
  {
    id: 'hakeem-olajuwon', name: 'Hakeem Olajuwon', positions: ['C'], era: '1984–2002',
    seasons: 18, games: 1238, points: 26946, rebounds: 13748, assists: 3058,
    steals: 2162, blocks: 3830, rings: 2, mvps: 1, finalsMvps: 2, dpoys: 2,
    allNbaFirst: 6, allNbaSecond: 3, allNbaThird: 3,
    allDefenseFirst: 5, allDefenseSecond: 4,
    summary: 'Two-way center combining refined scoring with record-level rim protection.',
  },
  {
    id: 'karl-malone', name: 'Karl Malone', positions: ['PF'], era: '1985–2004',
    seasons: 19, games: 1476, points: 36928, rebounds: 14968, assists: 5248,
    steals: 2085, blocks: 1145, rings: 0, mvps: 2, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 11, allNbaSecond: 2, allNbaThird: 1,
    allDefenseFirst: 3, allDefenseSecond: 1,
    summary: 'Exceptional durability and scoring volume without a championship.',
  },
  {
    id: 'charles-barkley', name: 'Charles Barkley', positions: ['PF'], era: '1984–2000',
    seasons: 16, games: 1073, points: 23757, rebounds: 12546, assists: 4215,
    steals: 1648, blocks: 888, rings: 0, mvps: 1, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 5, allNbaSecond: 5, allNbaThird: 1,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Undersized power forward with elite rebounding, efficiency and playmaking.',
  },
  {
    id: 'john-stockton', name: 'John Stockton', positions: ['PG'], era: '1984–2003',
    seasons: 19, games: 1504, points: 19711, rebounds: 4051, assists: 15806,
    steals: 3265, blocks: 315, rings: 0, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 2, allNbaSecond: 6, allNbaThird: 3,
    allDefenseFirst: 0, allDefenseSecond: 5,
    summary: 'Historic longevity, passing volume and disruptive guard defense.',
  },
  {
    id: 'scottie-pippen', name: 'Scottie Pippen', positions: ['SF'], era: '1987–2004',
    seasons: 17, games: 1178, points: 18940, rebounds: 7494, assists: 6135,
    steals: 2307, blocks: 947, rings: 6, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 3, allNbaSecond: 2, allNbaThird: 2,
    allDefenseFirst: 8, allDefenseSecond: 2,
    summary: 'Versatile point forward and one of the best perimeter defenders ever.',
  },
  {
    id: 'david-robinson', name: 'David Robinson', positions: ['C'], era: '1989–2003',
    seasons: 14, games: 987, points: 20790, rebounds: 10497, assists: 2441,
    steals: 1388, blocks: 2954, rings: 2, mvps: 1, finalsMvps: 0, dpoys: 1,
    allNbaFirst: 4, allNbaSecond: 2, allNbaThird: 4,
    allDefenseFirst: 4, allDefenseSecond: 4,
    summary: 'Athletic two-way center with elite regular-season impact.',
  },
  {
    id: 'patrick-ewing', name: 'Patrick Ewing', positions: ['C'], era: '1985–2002',
    seasons: 17, games: 1183, points: 24815, rebounds: 11607, assists: 2215,
    steals: 1136, blocks: 2894, rings: 0, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 1, allNbaSecond: 6, allNbaThird: 0,
    allDefenseFirst: 0, allDefenseSecond: 3,
    summary: 'Long-tenured franchise center with scoring and rim protection.',
  },
  {
    id: 'shaquille-oneal', name: "Shaquille O'Neal", positions: ['C'], era: '1992–2011',
    seasons: 19, games: 1207, points: 28596, rebounds: 13099, assists: 3026,
    steals: 739, blocks: 2732, rings: 4, mvps: 1, finalsMvps: 3, dpoys: 0,
    allNbaFirst: 8, allNbaSecond: 2, allNbaThird: 4,
    allDefenseFirst: 0, allDefenseSecond: 3,
    summary: 'Overwhelming interior scorer with a dominant championship peak.',
  },
  {
    id: 'tim-duncan', name: 'Tim Duncan', positions: ['PF', 'C'], era: '1997–2016',
    seasons: 19, games: 1392, points: 26496, rebounds: 15091, assists: 4225,
    steals: 1025, blocks: 3020, rings: 5, mvps: 2, finalsMvps: 3, dpoys: 0,
    allNbaFirst: 10, allNbaSecond: 3, allNbaThird: 2,
    allDefenseFirst: 8, allDefenseSecond: 7,
    summary: 'Sustained two-way excellence, consistency and championship leadership.',
  },
  {
    id: 'kevin-garnett', name: 'Kevin Garnett', positions: ['PF', 'C'], era: '1995–2016',
    seasons: 21, games: 1462, points: 26071, rebounds: 14662, assists: 5445,
    steals: 1859, blocks: 2037, rings: 1, mvps: 1, finalsMvps: 0, dpoys: 1,
    allNbaFirst: 4, allNbaSecond: 3, allNbaThird: 2,
    allDefenseFirst: 9, allDefenseSecond: 3,
    summary: 'Versatile defense, rebounding and playmaking across exceptional longevity.',
  },
  {
    id: 'dirk-nowitzki', name: 'Dirk Nowitzki', positions: ['PF'], era: '1998–2019',
    seasons: 21, games: 1522, points: 31560, rebounds: 11489, assists: 3651,
    steals: 1210, blocks: 1281, rings: 1, mvps: 1, finalsMvps: 1, dpoys: 0,
    allNbaFirst: 4, allNbaSecond: 5, allNbaThird: 3,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Transformative scoring forward with longevity and a signature title run.',
  },
  {
    id: 'kobe-bryant', name: 'Kobe Bryant', positions: ['SG'], era: '1996–2016',
    seasons: 20, games: 1346, points: 33643, rebounds: 7047, assists: 6306,
    steals: 1944, blocks: 640, rings: 5, mvps: 1, finalsMvps: 2, dpoys: 0,
    allNbaFirst: 11, allNbaSecond: 2, allNbaThird: 2,
    allDefenseFirst: 9, allDefenseSecond: 3,
    summary: 'High-volume shot creation, longevity, perimeter defense and five titles.',
  },
  {
    id: 'allen-iverson', name: 'Allen Iverson', positions: ['PG', 'SG'], era: '1996–2010',
    seasons: 14, games: 914, points: 24368, rebounds: 3394, assists: 5624,
    steals: 1983, blocks: 164, rings: 0, mvps: 1, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 3, allNbaSecond: 3, allNbaThird: 1,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Relentless scoring guard whose peak outweighed size and efficiency limits.',
  },
  {
    id: 'jason-kidd', name: 'Jason Kidd', positions: ['PG'], era: '1994–2013',
    seasons: 19, games: 1391, points: 17529, rebounds: 8725, assists: 12091,
    steals: 2684, blocks: 450, rings: 1, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 5, allNbaSecond: 1, allNbaThird: 0,
    allDefenseFirst: 4, allDefenseSecond: 5,
    summary: 'Elite floor general, rebounder and defender with remarkable longevity.',
  },
  {
    id: 'steve-nash', name: 'Steve Nash', positions: ['PG'], era: '1996–2014',
    seasons: 18, games: 1217, points: 17387, rebounds: 3642, assists: 10335,
    steals: 899, blocks: 102, rings: 0, mvps: 2, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 3, allNbaSecond: 2, allNbaThird: 2,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Efficient offensive engine and elite creator with two MVP peaks.',
  },
  {
    id: 'dwyane-wade', name: 'Dwyane Wade', positions: ['SG'], era: '2003–2019',
    seasons: 16, games: 1054, points: 23165, rebounds: 4933, assists: 5701,
    steals: 1620, blocks: 885, rings: 3, mvps: 0, finalsMvps: 1, dpoys: 0,
    allNbaFirst: 2, allNbaSecond: 3, allNbaThird: 3,
    allDefenseFirst: 0, allDefenseSecond: 3,
    summary: 'Explosive two-way guard with playmaking and a championship-level peak.',
  },
  {
    id: 'paul-pierce', name: 'Paul Pierce', positions: ['SF'], era: '1998–2017',
    seasons: 19, games: 1343, points: 26397, rebounds: 7527, assists: 4708,
    steals: 1752, blocks: 745, rings: 1, mvps: 0, finalsMvps: 1, dpoys: 0,
    allNbaFirst: 0, allNbaSecond: 1, allNbaThird: 3,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Durable wing scorer with steady production and a Finals MVP run.',
  },
  {
    id: 'chris-webber', name: 'Chris Webber', positions: ['PF'], era: '1993–2008',
    seasons: 15, games: 831, points: 17182, rebounds: 8124, assists: 3526,
    steals: 1197, blocks: 1200, rings: 0, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 1, allNbaSecond: 3, allNbaThird: 1,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Skilled passing big with a strong but injury-shortened prime.',
  },
  {
    id: 'ben-wallace', name: 'Ben Wallace', positions: ['C'], era: '1996–2012',
    seasons: 16, games: 1088, points: 6254, rebounds: 10482, assists: 1437,
    steals: 1369, blocks: 2137, rings: 1, mvps: 0, finalsMvps: 0, dpoys: 4,
    allNbaFirst: 0, allNbaSecond: 3, allNbaThird: 2,
    allDefenseFirst: 5, allDefenseSecond: 1,
    summary: 'Defense-first center whose rebounding and rim protection drove winning.',
  },
  {
    id: 'dennis-rodman', name: 'Dennis Rodman', positions: ['PF'], era: '1986–2000',
    seasons: 14, games: 911, points: 6683, rebounds: 11954, assists: 1600,
    steals: 611, blocks: 531, rings: 5, mvps: 0, finalsMvps: 0, dpoys: 2,
    allNbaFirst: 0, allNbaSecond: 0, allNbaThird: 2,
    allDefenseFirst: 7, allDefenseSecond: 1,
    summary: 'Specialist rebounder and defender with major championship impact.',
  },
  {
    id: 'andre-iguodala', name: 'Andre Iguodala', positions: ['SF'], era: '2004–2023',
    seasons: 19, games: 1231, points: 13568, rebounds: 6047, assists: 5147,
    steals: 1765, blocks: 633, rings: 4, mvps: 0, finalsMvps: 1, dpoys: 0,
    allNbaFirst: 0, allNbaSecond: 0, allNbaThird: 0,
    allDefenseFirst: 1, allDefenseSecond: 1,
    summary: 'Versatile connector, wing defender and high-value championship role player.',
  },
  {
    id: 'shawn-marion', name: 'Shawn Marion', positions: ['SF', 'PF'], era: '1999–2015',
    seasons: 16, games: 1163, points: 17700, rebounds: 10101, assists: 2198,
    steals: 1759, blocks: 1233, rings: 1, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 0, allNbaSecond: 0, allNbaThird: 2,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Unusual two-way forward with rebounding, finishing and defensive versatility.',
  },
  {
    id: 'jamal-crawford', name: 'Jamal Crawford', positions: ['SG'], era: '2000–2020',
    seasons: 20, games: 1327, points: 19419, rebounds: 2948, assists: 4541,
    steals: 1239, blocks: 269, rings: 0, mvps: 0, finalsMvps: 0, dpoys: 0,
    allNbaFirst: 0, allNbaSecond: 0, allNbaThird: 0,
    allDefenseFirst: 0, allDefenseSecond: 0,
    summary: 'Long-tenured bench scorer and creator with limited major accolades.',
  },
  ...additionalRealCareers,
];
