// Ratings represent each player's established NBA archetype/peak, not only
// the most recent season. Scale: 30 (replacement level) to 99 (historic).
import type { RealPlayer } from '../types';

export const nbaPlayers: RealPlayer[] = [
{
    id: 1,
    name: 'A.J. Green',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 85, Dribbling: 70, Defense: 68, IQ: 75, Athleticism: 70, Passing: 68, Rebounding: 60, Speed: 72, Finishing: 45}
  },
{
    id: 2,
    name: 'Aaron Gordon',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 76, Dribbling: 75, Defense: 88, IQ: 85, Athleticism: 94, Passing: 82, Rebounding: 85, Speed: 80, Finishing: 86}
  },
{
    id: 3,
    name: 'Aaron Holiday',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 79, Dribbling: 78, Defense: 76, IQ: 77, Athleticism: 75, Passing: 76, Rebounding: 62, Speed: 84, Finishing: 58}
  },
{
    id: 4,
    name: 'Aaron Nesmith',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 83, Dribbling: 72, Defense: 84, IQ: 78, Athleticism: 82, Passing: 70, Rebounding: 74, Speed: 80, Finishing: 68}
  },
{
    id: 5,
    name: 'Aaron Wiggins',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 81, Dribbling: 75, Defense: 78, IQ: 79, Athleticism: 78, Passing: 72, Rebounding: 68, Speed: 82, Finishing: 72}
  },
{
    id: 6,
    name: 'Acie Earl',
    position: 'C',
    age: 55,
    isRetired: true,
    career: '1993-1997',
    attributes: {Shooting: 62, Dribbling: 55, Defense: 66, IQ: 64, Athleticism: 70, Passing: 58, Rebounding: 72, Speed: 60, Finishing: 62}
  },
{
    id: 7,
    name: 'Adrian Dantley',
    position: 'SF',
    age: 70,
    isRetired: true,
    career: '1976-1991',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 75, IQ: 94, Athleticism: 85, Passing: 80, Rebounding: 84, Speed: 82, Finishing: 92}
  },
{
    id: 8,
    name: 'Adrian Griffin',
    position: 'SG',
    age: 51,
    isRetired: true,
    career: '1999-2008',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 82, IQ: 85, Athleticism: 75, Passing: 74, Rebounding: 72, Speed: 76, Finishing: 58}
  },
{
    id: 9,
    name: 'AJ Griffin',
    position: 'SF',
    age: 22,
    isRetired: true,
    career: '2022-2024',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 65, IQ: 68, Athleticism: 75, Passing: 65, Rebounding: 64, Speed: 74, Finishing: 54}
  },
{
    id: 10,
    name: 'Al Harrington',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '1998-2014',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 74, IQ: 80, Athleticism: 82, Passing: 72, Rebounding: 80, Speed: 78, Finishing: 72}
  },
{
    id: 11,
    name: 'Al Horford',
    position: 'C',
    age: 39,
    isRetired: false,
    career: '2007-present',
    attributes: {Shooting: 83, Dribbling: 68, Defense: 85, IQ: 95, Athleticism: 65, Passing: 84, Rebounding: 78, Speed: 62, Finishing: 64}
  },
{
    id: 12,
    name: 'Al Jefferson',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2004-2018',
    attributes: {Shooting: 85, Dribbling: 65, Defense: 72, IQ: 84, Athleticism: 70, Passing: 70, Rebounding: 90, Speed: 58, Finishing: 85}
  },
{
    id: 13,
    name: 'Al-Farouq Aminu',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '2010-2021',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 85, IQ: 78, Athleticism: 82, Passing: 68, Rebounding: 84, Speed: 78, Finishing: 58}
  },
{
    id: 14,
    name: 'Alan Anderson',
    position: 'SG',
    age: 43,
    isRetired: true,
    career: '2005-2017',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 74, IQ: 76, Athleticism: 75, Passing: 68, Rebounding: 66, Speed: 74, Finishing: 56}
  },
{
    id: 15,
    name: 'Alan Henderson',
    position: 'PF',
    age: 53,
    isRetired: true,
    career: '1995-2007',
    attributes: {Shooting: 65, Dribbling: 60, Defense: 75, IQ: 78, Athleticism: 78, Passing: 62, Rebounding: 84, Speed: 72, Finishing: 72}
  },
{
    id: 16,
    name: 'Alec Burks',
    position: 'SG',
    age: 34,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 70, IQ: 78, Athleticism: 75, Passing: 74, Rebounding: 68, Speed: 78, Finishing: 64}
  },
{
    id: 17,
    name: 'Aleksej Pokuševski',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2020-2024',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 70, IQ: 70, Athleticism: 76, Passing: 78, Rebounding: 72, Speed: 75, Finishing: 52}
  },
{
    id: 18,
    name: 'Alex Abrines',
    position: 'SG',
    age: 32,
    isRetired: true,
    career: '2016-2019',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 70, IQ: 74, Athleticism: 72, Passing: 66, Rebounding: 60, Speed: 74, Finishing: 46}
  },
{
    id: 19,
    name: 'Alex Caruso',
    position: 'SG',
    age: 31,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 79, Dribbling: 78, Defense: 94, IQ: 94, Athleticism: 82, Passing: 80, Rebounding: 74, Speed: 85, Finishing: 74}
  },
{
    id: 20,
    name: 'Alex English',
    position: 'SF',
    age: 71,
    isRetired: true,
    career: '1976-1991',
    attributes: {Shooting: 95, Dribbling: 85, Defense: 78, IQ: 93, Athleticism: 86, Passing: 84, Rebounding: 82, Speed: 84, Finishing: 88}
  },
{
    id: 21,
    name: 'Alex Len',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 65, Dribbling: 55, Defense: 76, IQ: 72, Athleticism: 74, Passing: 62, Rebounding: 80, Speed: 60, Finishing: 68}
  },
{
    id: 22,
    name: 'Alize Johnson',
    position: 'PF',
    age: 29,
    isRetired: true,
    career: '2018-2023',
    attributes: {Shooting: 60, Dribbling: 65, Defense: 68, IQ: 66, Athleticism: 78, Passing: 64, Rebounding: 85, Speed: 74, Finishing: 62}
  },
{
    id: 23,
    name: 'Alperen Şengün',
    position: 'C',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 78, Dribbling: 84, Defense: 82, IQ: 92, Athleticism: 78, Passing: 90, Rebounding: 92, Speed: 74, Finishing: 84}
  },
{
    id: 24,
    name: 'Alvan Adams',
    position: 'C',
    age: 71,
    isRetired: true,
    career: '1975-1988',
    attributes: {Shooting: 84, Dribbling: 72, Defense: 82, IQ: 90, Athleticism: 78, Passing: 86, Rebounding: 88, Speed: 74, Finishing: 78}
  },
{
    id: 25,
    name: 'Amir Coffey',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 76, IQ: 78, Athleticism: 77, Passing: 72, Rebounding: 66, Speed: 78, Finishing: 68}
  },
{
    id: 26,
    name: 'Amir Johnson',
    position: 'PF',
    age: 38,
    isRetired: true,
    career: '2005-2019',
    attributes: {Shooting: 72, Dribbling: 60, Defense: 82, IQ: 84, Athleticism: 78, Passing: 68, Rebounding: 82, Speed: 70, Finishing: 80}
  },
{
    id: 27,
    name: 'Andre Drummond',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 55, Dribbling: 62, Defense: 78, IQ: 70, Athleticism: 82, Passing: 65, Rebounding: 98, Speed: 68, Finishing: 70}
  },
{
    id: 28,
    name: 'Andre Emmett',
    position: 'SG',
    age: 37,
    isRetired: true,
    career: '2004-2012',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 65, IQ: 68, Athleticism: 80, Passing: 65, Rebounding: 68, Speed: 78, Finishing: 58}
  },
{
    id: 29,
    name: 'Andrea Bargnani',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2006-2016',
    attributes: {Shooting: 85, Dribbling: 68, Defense: 62, IQ: 72, Athleticism: 75, Passing: 66, Rebounding: 74, Speed: 68, Finishing: 62}
  },
{
    id: 30,
    name: 'Andrew Bogut',
    position: 'C',
    age: 41,
    isRetired: true,
    career: '2005-2020',
    attributes: {Shooting: 60, Dribbling: 62, Defense: 90, IQ: 92, Athleticism: 74, Passing: 85, Rebounding: 88, Speed: 62, Finishing: 76}
  },
{
    id: 31,
    name: 'Andrew Bynum',
    position: 'C',
    age: 38,
    isRetired: true,
    career: '2005-2014',
    attributes: {Shooting: 70, Dribbling: 60, Defense: 86, IQ: 78, Athleticism: 84, Passing: 64, Rebounding: 92, Speed: 64, Finishing: 84}
  },
{
    id: 32,
    name: 'Andrew Nembhard',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 80, Dribbling: 84, Defense: 82, IQ: 86, Athleticism: 78, Passing: 85, Rebounding: 65, Speed: 84, Finishing: 66}
  },
{
    id: 33,
    name: 'Andrew Wiggins',
    position: 'SF',
    age: 30,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 86, IQ: 80, Athleticism: 88, Passing: 72, Rebounding: 76, Speed: 85, Finishing: 76}
  },
{
    id: 34,
    name: 'Andris Biedriņš',
    position: 'C',
    age: 39,
    isRetired: true,
    career: '2004-2014',
    attributes: {Shooting: 45, Dribbling: 50, Defense: 78, IQ: 74, Athleticism: 78, Passing: 60, Rebounding: 88, Speed: 68, Finishing: 78}
  },
{
    id: 35,
    name: 'Anfernee Hardaway',
    position: 'PG',
    age: 54,
    isRetired: true,
    career: '1993-2007',
    attributes: {Shooting: 86, Dribbling: 95, Defense: 84, IQ: 94, Athleticism: 92, Passing: 94, Rebounding: 78, Speed: 92, Finishing: 86}
  },
{
    id: 36,
    name: 'Anfernee Simons',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 65, IQ: 80, Athleticism: 90, Passing: 82, Rebounding: 64, Speed: 90, Finishing: 68}
  },
{
    id: 37,
    name: 'Antawn Jamison',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1998-2014',
    attributes: {Shooting: 85, Dribbling: 78, Defense: 72, IQ: 85, Athleticism: 84, Passing: 72, Rebounding: 88, Speed: 78, Finishing: 81}
  },
{
    id: 38,
    name: 'Anthony Carter',
    position: 'PG',
    age: 50,
    isRetired: true,
    career: '1999-2012',
    attributes: {Shooting: 68, Dribbling: 82, Defense: 78, IQ: 82, Athleticism: 78, Passing: 85, Rebounding: 62, Speed: 84, Finishing: 58}
  },
{
    id: 39,
    name: 'Anthony Davis',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 96, IQ: 94, Athleticism: 90, Passing: 78, Rebounding: 95, Speed: 82, Finishing: 92}
  },
{
    id: 40,
    name: 'Anthony Edwards',
    position: 'SG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 88, Dribbling: 92, Defense: 88, IQ: 88, Athleticism: 98, Passing: 84, Rebounding: 78, Speed: 95, Finishing: 86}
  },
{
    id: 41,
    name: 'Anthony Lamb',
    position: 'SF',
    age: 27,
    isRetired: true,
    career: '2020-2023',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 72, IQ: 74, Athleticism: 72, Passing: 68, Rebounding: 70, Speed: 70, Finishing: 58}
  },
{
    id: 42,
    name: 'Antonio Blakeney',
    position: 'SG',
    age: 29,
    isRetired: true,
    career: '2017-2019',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 62, IQ: 65, Athleticism: 82, Passing: 62, Rebounding: 64, Speed: 84, Finishing: 60}
  },
{
    id: 43,
    name: 'Arron Afflalo',
    position: 'SG',
    age: 40,
    isRetired: true,
    career: '2007-2018',
    attributes: {Shooting: 84, Dribbling: 74, Defense: 82, IQ: 80, Athleticism: 78, Passing: 72, Rebounding: 70, Speed: 76, Finishing: 68}
  },
{
    id: 44,
    name: 'Ausar Thompson',
    position: 'SF',
    age: 22,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 65, Dribbling: 78, Defense: 88, IQ: 82, Athleticism: 94, Passing: 80, Rebounding: 84, Speed: 92, Finishing: 75}
  },
{
    id: 45,
    name: 'Austin Croshere',
    position: 'PF',
    age: 50,
    isRetired: true,
    career: '1997-2009',
    attributes: {Shooting: 80, Dribbling: 68, Defense: 72, IQ: 80, Athleticism: 74, Passing: 70, Rebounding: 78, Speed: 68, Finishing: 64}
  },
{
    id: 46,
    name: 'Austin Daye',
    position: 'SF',
    age: 37,
    isRetired: true,
    career: '2009-2015',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 65, IQ: 70, Athleticism: 75, Passing: 68, Rebounding: 68, Speed: 72, Finishing: 52}
  },
{
    id: 47,
    name: 'Austin Reaves',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 85, Dribbling: 84, Defense: 78, IQ: 90, Athleticism: 76, Passing: 84, Rebounding: 70, Speed: 80, Finishing: 78}
  },
{
    id: 48,
    name: 'Avery Bradley',
    position: 'SG',
    age: 35,
    isRetired: true,
    career: '2010-2022',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 92, IQ: 84, Athleticism: 82, Passing: 70, Rebounding: 68, Speed: 86, Finishing: 62}
  },
{
    id: 49,
    name: 'Avery Johnson',
    position: 'PG',
    age: 60,
    isRetired: true,
    career: '1988-2004',
    attributes: {Shooting: 70, Dribbling: 88, Defense: 82, IQ: 94, Athleticism: 78, Passing: 90, Rebounding: 60, Speed: 88, Finishing: 64}
  },
{
    id: 50,
    name: 'Ayo Dosunmu',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 80, Dribbling: 80, Defense: 84, IQ: 82, Athleticism: 84, Passing: 78, Rebounding: 70, Speed: 86, Finishing: 76}
  },
{
    id: 51,
    name: 'B.J. Armstrong',
    position: 'PG',
    age: 58,
    isRetired: true,
    career: '1989-2000',
    attributes: {Shooting: 88, Dribbling: 84, Defense: 78, IQ: 88, Athleticism: 75, Passing: 82, Rebounding: 60, Speed: 85, Finishing: 60}
  },
{
    id: 52,
    name: 'B.J. Johnson',
    position: 'SF',
    age: 29,
    isRetired: true,
    career: '2018-2022',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 65, IQ: 66, Athleticism: 78, Passing: 64, Rebounding: 68, Speed: 75, Finishing: 58}
  },
{
    id: 53,
    name: 'Bailey Howell',
    position: 'PF',
    age: 88,
    isRetired: true,
    career: '1959-1971',
    attributes: {Shooting: 88, Dribbling: 70, Defense: 82, IQ: 90, Athleticism: 80, Passing: 75, Rebounding: 92, Speed: 72, Finishing: 86}
  },
{
    id: 54,
    name: 'Bam Adebayo',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 96, IQ: 94, Athleticism: 88, Passing: 84, Rebounding: 92, Speed: 80, Finishing: 82}
  },
{
    id: 55,
    name: 'Baron Davis',
    position: 'PG',
    age: 46,
    isRetired: true,
    career: '1999-2012',
    attributes: {Shooting: 84, Dribbling: 94, Defense: 85, IQ: 88, Athleticism: 92, Passing: 90, Rebounding: 74, Speed: 92, Finishing: 82}
  },
{
    id: 56,
    name: 'Ben Gordon',
    position: 'SG',
    age: 42,
    isRetired: true,
    career: '2004-2015',
    attributes: {Shooting: 92, Dribbling: 84, Defense: 70, IQ: 82, Athleticism: 82, Passing: 74, Rebounding: 64, Speed: 86, Finishing: 65}
  },
{
    id: 57,
    name: 'Bennedict Mathurin',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 74, IQ: 78, Athleticism: 88, Passing: 74, Rebounding: 72, Speed: 88, Finishing: 74}
  },
{
    id: 58,
    name: 'Bill Henry',
    position: 'C',
    age: 101,
    isRetired: true,
    career: '1948-1950',
    attributes: {Shooting: 65, Dribbling: 50, Defense: 70, IQ: 75, Athleticism: 70, Passing: 60, Rebounding: 80, Speed: 60, Finishing: 60}
  },
{
    id: 59,
    name: 'Billy Cunningham',
    position: 'SF',
    age: 82,
    isRetired: true,
    career: '1965-1976',
    attributes: {Shooting: 86, Dribbling: 80, Defense: 85, IQ: 94, Athleticism: 90, Passing: 82, Rebounding: 94, Speed: 85, Finishing: 88}
  },
{
    id: 60,
    name: 'Bismack Biyombo',
    position: 'C',
    age: 33,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 45, Dribbling: 45, Defense: 82, IQ: 76, Athleticism: 78, Passing: 58, Rebounding: 84, Speed: 65, Finishing: 66}
  },
{
    id: 61,
    name: 'Bison Dele',
    position: 'C',
    age: 56,
    isRetired: true,
    career: '1991-1999',
    attributes: {Shooting: 74, Dribbling: 62, Defense: 78, IQ: 76, Athleticism: 84, Passing: 68, Rebounding: 86, Speed: 74, Finishing: 78}
  },
{
    id: 62,
    name: 'Blake Griffin',
    position: 'PF',
    age: 36,
    isRetired: true,
    career: '2010-2023',
    attributes: {Shooting: 82, Dribbling: 85, Defense: 76, IQ: 88, Athleticism: 96, Passing: 86, Rebounding: 88, Speed: 84, Finishing: 88}
  },
{
    id: 63,
    name: 'Blake Wesley',
    position: 'PG',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 70, Dribbling: 78, Defense: 75, IQ: 72, Athleticism: 85, Passing: 74, Rebounding: 62, Speed: 92, Finishing: 58}
  },
{
    id: 64,
    name: 'Blue Edwards',
    position: 'SG',
    age: 60,
    isRetired: true,
    career: '1989-1999',
    attributes: {Shooting: 80, Dribbling: 76, Defense: 78, IQ: 78, Athleticism: 88, Passing: 70, Rebounding: 72, Speed: 84, Finishing: 74}
  },
{
    id: 65,
    name: 'Bo Ellis',
    position: 'PF',
    age: 71,
    isRetired: true,
    career: '1977-1980',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 74, IQ: 72, Athleticism: 78, Passing: 64, Rebounding: 76, Speed: 72, Finishing: 62}
  },
{
    id: 66,
    name: 'Bob Dandridge',
    position: 'SF',
    age: 77,
    isRetired: true,
    career: '1969-1982',
    attributes: {Shooting: 88, Dribbling: 82, Defense: 88, IQ: 92, Athleticism: 84, Passing: 78, Rebounding: 82, Speed: 84, Finishing: 78}
  },
{
    id: 67,
    name: 'Bob Harrison',
    position: 'PG',
    age: 98,
    isRetired: true,
    career: '1949-1958',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 80, IQ: 84, Athleticism: 75, Passing: 78, Rebounding: 64, Speed: 82, Finishing: 55}
  },
{
    id: 68,
    name: 'Boban Marjanović',
    position: 'C',
    age: 37,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 75, Dribbling: 58, Defense: 65, IQ: 82, Athleticism: 55, Passing: 72, Rebounding: 88, Speed: 45, Finishing: 82}
  },
{
    id: 69,
    name: 'Bobby Jackson',
    position: 'PG',
    age: 52,
    isRetired: true,
    career: '1997-2009',
    attributes: {Shooting: 82, Dribbling: 86, Defense: 78, IQ: 84, Athleticism: 85, Passing: 80, Rebounding: 68, Speed: 90, Finishing: 68}
  },
{
    id: 70,
    name: 'Bobby Jones',
    position: 'PF',
    age: 73,
    isRetired: true,
    career: '1974-1986',
    attributes: {Shooting: 75, Dribbling: 70, Defense: 98, IQ: 98, Athleticism: 85, Passing: 82, Rebounding: 88, Speed: 82, Finishing: 80}
  },
{
    id: 71,
    name: 'Bobby Portis',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 84, Dribbling: 72, Defense: 74, IQ: 80, Athleticism: 80, Passing: 70, Rebounding: 88, Speed: 72, Finishing: 74}
  },
{
    id: 72,
    name: 'Bogdan Bogdanović',
    position: 'SG',
    age: 33,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 90, Dribbling: 84, Defense: 72, IQ: 88, Athleticism: 74, Passing: 82, Rebounding: 68, Speed: 78, Finishing: 66}
  },
{
    id: 73,
    name: 'Bojan Bogdanović',
    position: 'SF',
    age: 36,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 91, Dribbling: 78, Defense: 65, IQ: 85, Athleticism: 70, Passing: 74, Rebounding: 70, Speed: 72, Finishing: 72}
  },
{
    id: 74,
    name: 'Bol Bol',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 75, IQ: 68, Athleticism: 78, Passing: 70, Rebounding: 76, Speed: 74, Finishing: 68}
  },
{
    id: 75,
    name: 'Bones Hyland',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 82, Dribbling: 88, Defense: 62, IQ: 75, Athleticism: 82, Passing: 78, Rebounding: 60, Speed: 88, Finishing: 58}
  },
{
    id: 76,
    name: 'Boris Diaw',
    position: 'PF',
    age: 43,
    isRetired: true,
    career: '2003-2017',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 82, IQ: 96, Athleticism: 75, Passing: 92, Rebounding: 78, Speed: 74, Finishing: 76}
  },
{
    id: 77,
    name: 'Brad Daugherty',
    position: 'C',
    age: 60,
    isRetired: true,
    career: '1986-1994',
    attributes: {Shooting: 88, Dribbling: 68, Defense: 82, IQ: 92, Athleticism: 82, Passing: 84, Rebounding: 92, Speed: 72, Finishing: 85}
  },
{
    id: 78,
    name: 'Brandin Podziemski',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 82, Dribbling: 82, Defense: 78, IQ: 88, Athleticism: 76, Passing: 84, Rebounding: 80, Speed: 80, Finishing: 68}
  },
{
    id: 79,
    name: 'Brandon Bass',
    position: 'PF',
    age: 40,
    isRetired: true,
    career: '2005-2017',
    attributes: {Shooting: 82, Dribbling: 65, Defense: 76, IQ: 78, Athleticism: 82, Passing: 65, Rebounding: 78, Speed: 70, Finishing: 74}
  },
{
    id: 80,
    name: 'Brandon Davies',
    position: 'C',
    age: 34,
    isRetired: true,
    career: '2013-2015',
    attributes: {Shooting: 74, Dribbling: 65, Defense: 72, IQ: 75, Athleticism: 78, Passing: 68, Rebounding: 76, Speed: 70, Finishing: 64}
  },
{
    id: 81,
    name: 'Brandon Ingram',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 89, Dribbling: 88, Defense: 76, IQ: 86, Athleticism: 84, Passing: 85, Rebounding: 75, Speed: 82, Finishing: 78}
  },
{
    id: 82,
    name: 'Brandon Jennings',
    position: 'PG',
    age: 36,
    isRetired: true,
    career: '2009-2018',
    attributes: {Shooting: 82, Dribbling: 92, Defense: 70, IQ: 80, Athleticism: 88, Passing: 85, Rebounding: 62, Speed: 92, Finishing: 58}
  },
{
    id: 83,
    name: 'Brendan Haywood',
    position: 'C',
    age: 46,
    isRetired: true,
    career: '2001-2015',
    attributes: {Shooting: 55, Dribbling: 50, Defense: 82, IQ: 76, Athleticism: 78, Passing: 60, Rebounding: 85, Speed: 60, Finishing: 72}
  },
{
    id: 84,
    name: 'Brent Barry',
    position: 'SG',
    age: 54,
    isRetired: true,
    career: '1995-2009',
    attributes: {Shooting: 90, Dribbling: 82, Defense: 76, IQ: 88, Athleticism: 88, Passing: 82, Rebounding: 68, Speed: 84, Finishing: 70}
  },
{
    id: 85,
    name: 'Brian Cardinal',
    position: 'PF',
    age: 48,
    isRetired: true,
    career: '2000-2012',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 74, IQ: 85, Athleticism: 65, Passing: 70, Rebounding: 72, Speed: 64, Finishing: 56}
  },
{
    id: 86,
    name: 'Brian Cook',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '2003-2012',
    attributes: {Shooting: 80, Dribbling: 62, Defense: 65, IQ: 72, Athleticism: 68, Passing: 65, Rebounding: 70, Speed: 62, Finishing: 52}
  },
{
    id: 87,
    name: 'Brian Grant',
    position: 'PF',
    age: 53,
    isRetired: true,
    career: '1994-2006',
    attributes: {Shooting: 75, Dribbling: 65, Defense: 82, IQ: 84, Athleticism: 82, Passing: 68, Rebounding: 90, Speed: 72, Finishing: 75}
  },
{
    id: 88,
    name: 'Brice Johnson',
    position: 'PF',
    age: 31,
    isRetired: true,
    career: '2016-2018',
    attributes: {Shooting: 68, Dribbling: 65, Defense: 66, IQ: 64, Athleticism: 85, Passing: 62, Rebounding: 78, Speed: 76, Finishing: 62}
  },
{
    id: 89,
    name: 'Brook Lopez',
    position: 'C',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 84, Dribbling: 65, Defense: 92, IQ: 90, Athleticism: 70, Passing: 72, Rebounding: 78, Speed: 62, Finishing: 66}
  },
{
    id: 90,
    name: 'Bruce Bowen',
    position: 'SF',
    age: 54,
    isRetired: true,
    career: '1996-2009',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 96, IQ: 94, Athleticism: 78, Passing: 70, Rebounding: 70, Speed: 82, Finishing: 45}
  },
{
    id: 91,
    name: 'Bruce Brown',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 85, IQ: 88, Athleticism: 84, Passing: 80, Rebounding: 76, Speed: 82, Finishing: 78}
  },
{
    id: 92,
    name: 'Bruno Caboclo',
    position: 'PF',
    age: 30,
    isRetired: true,
    career: '2014-2021',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 78, IQ: 70, Athleticism: 82, Passing: 65, Rebounding: 78, Speed: 76, Finishing: 62}
  },
{
    id: 93,
    name: 'Bruno Fernando',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 65, Dribbling: 60, Defense: 75, IQ: 72, Athleticism: 84, Passing: 65, Rebounding: 82, Speed: 70, Finishing: 70}
  },
{
    id: 94,
    name: 'Buddy Hield',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 95, Dribbling: 78, Defense: 70, IQ: 80, Athleticism: 75, Passing: 72, Rebounding: 70, Speed: 80, Finishing: 48}
  },
{
    id: 95,
    name: 'Butch Carter',
    position: 'SG',
    age: 67,
    isRetired: true,
    career: '1980-1986',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 72, IQ: 82, Athleticism: 75, Passing: 74, Rebounding: 64, Speed: 78, Finishing: 66}
  },
{
    id: 96,
    name: 'Cade Cunningham',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 84, Dribbling: 90, Defense: 82, IQ: 92, Athleticism: 82, Passing: 90, Rebounding: 78, Speed: 85, Finishing: 68}
  },
{
    id: 97,
    name: 'Calbert Cheaney',
    position: 'SG',
    age: 54,
    isRetired: true,
    career: '1993-2006',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 78, IQ: 80, Athleticism: 80, Passing: 72, Rebounding: 70, Speed: 80, Finishing: 66}
  },
{
    id: 98,
    name: 'Caldwell Jones',
    position: 'C',
    age: 75,
    isRetired: true,
    career: '1976-1990',
    attributes: {Shooting: 65, Dribbling: 55, Defense: 88, IQ: 85, Athleticism: 78, Passing: 68, Rebounding: 92, Speed: 65, Finishing: 66}
  },
{
    id: 99,
    name: 'Caleb Martin',
    position: 'SF',
    age: 30,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 84, IQ: 82, Athleticism: 84, Passing: 72, Rebounding: 74, Speed: 82, Finishing: 72}
  },
{
    id: 100,
    name: 'Cam Johnson',
    position: 'PF',
    age: 29,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 88, Dribbling: 74, Defense: 76, IQ: 82, Athleticism: 78, Passing: 72, Rebounding: 72, Speed: 76, Finishing: 58}
  },
{
    id: 101,
    name: 'Cam Reddish',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 76, Dribbling: 78, Defense: 82, IQ: 72, Athleticism: 85, Passing: 68, Rebounding: 68, Speed: 84, Finishing: 62}
  },
{
    id: 102,
    name: 'Cam Whitmore',
    position: 'SF',
    age: 21,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 74, IQ: 74, Athleticism: 92, Passing: 65, Rebounding: 76, Speed: 88, Finishing: 78}
  },
{
    id: 103,
    name: 'Caris LeVert',
    position: 'SG',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 82, Dribbling: 88, Defense: 78, IQ: 82, Athleticism: 84, Passing: 84, Rebounding: 72, Speed: 85, Finishing: 73}
  },
{
    id: 104,
    name: 'Carl Herrera',
    position: 'PF',
    age: 58,
    isRetired: true,
    career: '1991-1999',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 76, IQ: 78, Athleticism: 78, Passing: 64, Rebounding: 78, Speed: 70, Finishing: 68}
  },
{
    id: 105,
    name: 'Carl Jones',
    position: 'PG',
    age: 44,
    isRetired: true,
    career: 'N/A',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 65, IQ: 70, Athleticism: 78, Passing: 72, Rebounding: 58, Speed: 82, Finishing: 58}
  },
{
    id: 106,
    name: 'Carlos Boozer',
    position: 'PF',
    age: 44,
    isRetired: true,
    career: '2002-2015',
    attributes: {Shooting: 86, Dribbling: 72, Defense: 78, IQ: 88, Athleticism: 84, Passing: 78, Rebounding: 92, Speed: 74, Finishing: 84}
  },
{
    id: 107,
    name: 'Carlos Delfino',
    position: 'SF',
    age: 43,
    isRetired: true,
    career: '2004-2014',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 76, IQ: 82, Athleticism: 78, Passing: 75, Rebounding: 70, Speed: 76, Finishing: 63}
  },
{
    id: 108,
    name: 'Carmelo Anthony',
    position: 'SF',
    age: 41,
    isRetired: true,
    career: '2003-2022',
    attributes: {Shooting: 95, Dribbling: 88, Defense: 74, IQ: 92, Athleticism: 88, Passing: 82, Rebounding: 86, Speed: 82, Finishing: 82}
  },
{
    id: 109,
    name: 'Caron Butler',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2002-2016',
    attributes: {Shooting: 86, Dribbling: 82, Defense: 84, IQ: 88, Athleticism: 85, Passing: 78, Rebounding: 82, Speed: 82, Finishing: 76}
  },
{
    id: 110,
    name: 'Carrick Felix',
    position: 'SG',
    age: 35,
    isRetired: true,
    career: '2013-2018',
    attributes: {Shooting: 68, Dribbling: 68, Defense: 70, IQ: 68, Athleticism: 80, Passing: 64, Rebounding: 66, Speed: 78, Finishing: 58}
  },
{
    id: 111,
    name: 'Carsen Edwards',
    position: 'PG',
    age: 27,
    isRetired: true,
    career: '2019-2022',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 65, IQ: 70, Athleticism: 82, Passing: 68, Rebounding: 58, Speed: 85, Finishing: 52}
  },
{
    id: 112,
    name: 'Cedi Osman',
    position: 'SF',
    age: 30,
    isRetired: true,
    career: '2017-present',
    attributes: {Shooting: 80, Dribbling: 76, Defense: 72, IQ: 78, Athleticism: 78, Passing: 74, Rebounding: 70, Speed: 78, Finishing: 68}
  },
{
    id: 113,
    name: 'Channing Frye',
    position: 'C',
    age: 42,
    isRetired: true,
    career: '2005-2019',
    attributes: {Shooting: 88, Dribbling: 62, Defense: 70, IQ: 84, Athleticism: 72, Passing: 70, Rebounding: 78, Speed: 68, Finishing: 58}
  },
{
    id: 114,
    name: 'Charles Barkley',
    position: 'PF',
    age: 62,
    isRetired: true,
    career: '1984-2000',
    attributes: {Shooting: 88, Dribbling: 88, Defense: 85, IQ: 96, Athleticism: 94, Passing: 88, Rebounding: 99, Speed: 85, Finishing: 93}
  },
{
    id: 115,
    name: 'Charles Bassey',
    position: 'C',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 62, Dribbling: 55, Defense: 82, IQ: 74, Athleticism: 82, Passing: 64, Rebounding: 84, Speed: 70, Finishing: 72}
  },
{
    id: 116,
    name: 'Charles Claxton',
    position: 'C',
    age: 54,
    isRetired: true,
    career: '1995-1996',
    attributes: {Shooting: 55, Dribbling: 48, Defense: 68, IQ: 64, Athleticism: 72, Passing: 52, Rebounding: 70, Speed: 60, Finishing: 55}
  },
{
    id: 117,
    name: 'Charles Johnson',
    position: 'PG',
    age: 76,
    isRetired: true,
    career: '1972-1979',
    attributes: {Shooting: 80, Dribbling: 82, Defense: 84, IQ: 85, Athleticism: 80, Passing: 84, Rebounding: 64, Speed: 85, Finishing: 65}
  },
{
    id: 118,
    name: 'Charles Jones',
    position: 'PF',
    age: 68,
    isRetired: true,
    career: '1983-1998',
    attributes: {Shooting: 55, Dribbling: 52, Defense: 84, IQ: 80, Athleticism: 76, Passing: 62, Rebounding: 84, Speed: 68, Finishing: 53}
  },
{
    id: 119,
    name: 'Charles R. Jones',
    position: 'PF',
    age: 63,
    isRetired: true,
    career: '1984-1989',
    attributes: {Shooting: 58, Dribbling: 54, Defense: 78, IQ: 76, Athleticism: 74, Passing: 60, Rebounding: 80, Speed: 64, Finishing: 53}
  },
{
    id: 120,
    name: 'Chauncey Billups',
    position: 'PG',
    age: 49,
    isRetired: true,
    career: '1997-2014',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 88, IQ: 97, Athleticism: 82, Passing: 90, Rebounding: 68, Speed: 85, Finishing: 72}
  },
{
    id: 121,
    name: 'Chet Holmgren',
    position: 'C',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 94, IQ: 90, Athleticism: 88, Passing: 76, Rebounding: 86, Speed: 80, Finishing: 83}
  },
{
    id: 122,
    name: 'Chimezie Metu',
    position: 'PF',
    age: 28,
    isRetired: true,
    career: '2018-present',
    attributes: {Shooting: 75, Dribbling: 68, Defense: 74, IQ: 72, Athleticism: 82, Passing: 66, Rebounding: 76, Speed: 76, Finishing: 71}
  },
{
    id: 123,
    name: 'Chris Andersen',
    position: 'C',
    age: 47,
    isRetired: true,
    career: '2001-2017',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 85, IQ: 78, Athleticism: 90, Passing: 60, Rebounding: 86, Speed: 74, Finishing: 78}
  },
{
    id: 124,
    name: 'Chris Babb',
    position: 'SG',
    age: 35,
    isRetired: true,
    career: '2013-2014',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 72, IQ: 70, Athleticism: 72, Passing: 66, Rebounding: 62, Speed: 72, Finishing: 45}
  },
{
    id: 125,
    name: 'Chris Bosh',
    position: 'PF',
    age: 41,
    isRetired: true,
    career: '2003-2016',
    attributes: {Shooting: 88, Dribbling: 78, Defense: 88, IQ: 94, Athleticism: 85, Passing: 80, Rebounding: 92, Speed: 78, Finishing: 82}
  },
{
    id: 126,
    name: 'Chris Childs',
    position: 'PG',
    age: 57,
    isRetired: true,
    career: '1994-2003',
    attributes: {Shooting: 80, Dribbling: 84, Defense: 82, IQ: 85, Athleticism: 78, Passing: 84, Rebounding: 65, Speed: 84, Finishing: 60}
  },
{
    id: 127,
    name: 'Chris Chiozza',
    position: 'PG',
    age: 30,
    isRetired: true,
    career: '2018-2022',
    attributes: {Shooting: 74, Dribbling: 82, Defense: 68, IQ: 76, Athleticism: 74, Passing: 80, Rebounding: 58, Speed: 88, Finishing: 52}
  },
{
    id: 128,
    name: 'Chris Douglas-Roberts',
    position: 'SF',
    age: 38,
    isRetired: true,
    career: '2008-2015',
    attributes: {Shooting: 76, Dribbling: 76, Defense: 72, IQ: 74, Athleticism: 82, Passing: 70, Rebounding: 68, Speed: 78, Finishing: 68}
  },
{
    id: 129,
    name: 'Chris Duarte',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 79, Dribbling: 75, Defense: 76, IQ: 77, Athleticism: 78, Passing: 72, Rebounding: 68, Speed: 78, Finishing: 64}
  },
{
    id: 130,
    name: 'Chris Dudley',
    position: 'C',
    age: 60,
    isRetired: true,
    career: '1987-2003',
    attributes: {Shooting: 40, Dribbling: 42, Defense: 82, IQ: 78, Athleticism: 72, Passing: 55, Rebounding: 88, Speed: 58, Finishing: 48}
  },
{
    id: 131,
    name: 'Chris Johnson',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '2012-2016',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 76, IQ: 72, Athleticism: 80, Passing: 66, Rebounding: 70, Speed: 78, Finishing: 68}
  },
{
    id: 132,
    name: 'Chris Johnson (ala-pivô)',
    position: 'PF',
    age: 40,
    isRetired: true,
    career: '2010-2013',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 78, IQ: 70, Athleticism: 84, Passing: 58, Rebounding: 80, Speed: 70, Finishing: 67}
  },
{
    id: 133,
    name: 'Chris Kaman',
    position: 'C',
    age: 43,
    isRetired: true,
    career: '2003-2016',
    attributes: {Shooting: 80, Dribbling: 64, Defense: 78, IQ: 82, Athleticism: 74, Passing: 72, Rebounding: 88, Speed: 62, Finishing: 73}
  },
{
    id: 134,
    name: 'Chris Paul',
    position: 'PG',
    age: 40,
    isRetired: false,
    career: '2005-present',
    attributes: {Shooting: 86, Dribbling: 92, Defense: 84, IQ: 99, Athleticism: 68, Passing: 96, Rebounding: 68, Speed: 76, Finishing: 76}
  },
{
    id: 135,
    name: 'Christian Braun',
    position: 'SG',
    age: 24,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 82, IQ: 84, Athleticism: 86, Passing: 75, Rebounding: 74, Speed: 84, Finishing: 75}
  },
{
    id: 136,
    name: 'Christian Eyenga',
    position: 'SF',
    age: 36,
    isRetired: true,
    career: '2010-2012',
    attributes: {Shooting: 68, Dribbling: 72, Defense: 65, IQ: 64, Athleticism: 90, Passing: 62, Rebounding: 68, Speed: 85, Finishing: 69}
  },
{
    id: 137,
    name: 'Christian Wood',
    position: 'C',
    age: 30,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 68, IQ: 72, Athleticism: 82, Passing: 68, Rebounding: 84, Speed: 74, Finishing: 80}
  },
{
    id: 138,
    name: 'Chuck Cooper',
    position: 'SF',
    age: 99,
    isRetired: true,
    career: '1950-1956',
    attributes: {Shooting: 72, Dribbling: 70, Defense: 82, IQ: 88, Athleticism: 78, Passing: 74, Rebounding: 84, Speed: 72, Finishing: 65}
  },
{
    id: 139,
    name: 'Chuck Hayes',
    position: 'C',
    age: 42,
    isRetired: true,
    career: '2005-2016',
    attributes: {Shooting: 55, Dribbling: 62, Defense: 88, IQ: 92, Athleticism: 70, Passing: 78, Rebounding: 86, Speed: 62, Finishing: 54}
  },
{
    id: 140,
    name: 'Chuma Okeke',
    position: 'PF',
    age: 27,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 75, Dribbling: 70, Defense: 80, IQ: 78, Athleticism: 78, Passing: 70, Rebounding: 72, Speed: 74, Finishing: 59}
  },
{
    id: 141,
    name: 'CJ McCollum',
    position: 'SG',
    age: 34,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 90, Dribbling: 88, Defense: 68, IQ: 88, Athleticism: 78, Passing: 84, Rebounding: 70, Speed: 82, Finishing: 73}
  },
{
    id: 142,
    name: 'Cleanthony Early',
    position: 'SF',
    age: 34,
    isRetired: true,
    career: '2014-2016',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 64, IQ: 66, Athleticism: 78, Passing: 64, Rebounding: 68, Speed: 75, Finishing: 61}
  },
{
    id: 143,
    name: 'Clemon Johnson',
    position: 'C',
    age: 69,
    isRetired: true,
    career: '1978-1988',
    attributes: {Shooting: 62, Dribbling: 52, Defense: 78, IQ: 78, Athleticism: 76, Passing: 64, Rebounding: 82, Speed: 65, Finishing: 68}
  },
{
    id: 144,
    name: 'Cliff Alexander',
    position: 'PF',
    age: 30,
    isRetired: true,
    career: '2015-2016',
    attributes: {Shooting: 64, Dribbling: 60, Defense: 66, IQ: 62, Athleticism: 85, Passing: 58, Rebounding: 80, Speed: 72, Finishing: 62}
  },
{
    id: 145,
    name: 'Clint Capela',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 50, Dribbling: 52, Defense: 85, IQ: 80, Athleticism: 82, Passing: 62, Rebounding: 94, Speed: 70, Finishing: 78}
  },
{
    id: 146,
    name: 'Coby Karl',
    position: 'SG',
    age: 42,
    isRetired: true,
    career: '2007-2010',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 68, IQ: 82, Athleticism: 72, Passing: 78, Rebounding: 62, Speed: 74, Finishing: 55}
  },
{
    id: 147,
    name: 'Coby White',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 88, Dribbling: 86, Defense: 75, IQ: 84, Athleticism: 84, Passing: 82, Rebounding: 72, Speed: 90, Finishing: 71}
  },
{
    id: 148,
    name: 'Cole Aldrich',
    position: 'C',
    age: 37,
    isRetired: true,
    career: '2010-2018',
    attributes: {Shooting: 62, Dribbling: 50, Defense: 78, IQ: 76, Athleticism: 70, Passing: 64, Rebounding: 84, Speed: 58, Finishing: 65}
  },
{
    id: 149,
    name: 'Cole Anthony',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 83, Dribbling: 85, Defense: 72, IQ: 80, Athleticism: 85, Passing: 78, Rebounding: 74, Speed: 88, Finishing: 66}
  },
{
    id: 150,
    name: 'Collin Sexton',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 84, Dribbling: 86, Defense: 70, IQ: 78, Athleticism: 88, Passing: 76, Rebounding: 64, Speed: 92, Finishing: 78}
  },
{
    id: 151,
    name: 'Connie Hawkins',
    position: 'PF',
    age: 83,
    isRetired: true,
    career: '1969-1976',
    attributes: {Shooting: 82, Dribbling: 89, Defense: 84, IQ: 92, Athleticism: 96, Passing: 85, Rebounding: 93, Speed: 84, Finishing: 89}
  },
{
    id: 152,
    name: 'Corey Brewer',
    position: 'SF',
    age: 39,
    isRetired: true,
    career: '2007-2020',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 82, IQ: 76, Athleticism: 88, Passing: 70, Rebounding: 72, Speed: 91, Finishing: 74}
  },
{
    id: 153,
    name: 'Corey Crowder',
    position: 'SF',
    age: 56,
    isRetired: true,
    career: '1991-1995',
    attributes: {Shooting: 70, Dribbling: 65, Defense: 68, IQ: 68, Athleticism: 72, Passing: 64, Rebounding: 66, Speed: 70, Finishing: 52}
  },
{
    id: 154,
    name: 'Cory Alexander',
    position: 'PG',
    age: 52,
    isRetired: true,
    career: '1995-2005',
    attributes: {Shooting: 74, Dribbling: 80, Defense: 75, IQ: 77, Athleticism: 82, Passing: 78, Rebounding: 60, Speed: 85, Finishing: 61}
  },
{
    id: 155,
    name: 'Cory Higgins',
    position: 'SG',
    age: 36,
    isRetired: true,
    career: '2011-2012',
    attributes: {Shooting: 80, Dribbling: 76, Defense: 74, IQ: 79, Athleticism: 78, Passing: 72, Rebounding: 62, Speed: 79, Finishing: 58}
  },
{
    id: 156,
    name: 'Cory Joseph',
    position: 'PG',
    age: 34,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 78, Dribbling: 79, Defense: 77, IQ: 84, Athleticism: 70, Passing: 80, Rebounding: 62, Speed: 75, Finishing: 67}
  },
{
    id: 157,
    name: 'Craig Hodges',
    position: 'SG',
    age: 65,
    isRetired: true,
    career: '1982-1992',
    attributes: {Shooting: 94, Dribbling: 72, Defense: 68, IQ: 82, Athleticism: 65, Passing: 74, Rebounding: 55, Speed: 70, Finishing: 43}
  },
{
    id: 158,
    name: 'Cristiano Felício',
    position: 'C',
    age: 33,
    isRetired: true,
    career: '2015-2021',
    attributes: {Shooting: 60, Dribbling: 58, Defense: 68, IQ: 66, Athleticism: 78, Passing: 60, Rebounding: 79, Speed: 65, Finishing: 64}
  },
{
    id: 159,
    name: 'D.J. Augustin',
    position: 'PG',
    age: 37,
    isRetired: true,
    career: '2008-2023',
    attributes: {Shooting: 85, Dribbling: 84, Defense: 62, IQ: 85, Athleticism: 72, Passing: 84, Rebounding: 58, Speed: 82, Finishing: 61}
  },
{
    id: 160,
    name: 'D\'Angelo Russell',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 88, Dribbling: 89, Defense: 64, IQ: 86, Athleticism: 74, Passing: 88, Rebounding: 65, Speed: 80, Finishing: 63}
  },
{
    id: 161,
    name: 'Daequan Cook',
    position: 'SG',
    age: 38,
    isRetired: true,
    career: '2007-2013',
    attributes: {Shooting: 85, Dribbling: 72, Defense: 68, IQ: 70, Athleticism: 76, Passing: 65, Rebounding: 64, Speed: 76, Finishing: 46}
  },
{
    id: 162,
    name: 'Dahntay Jones',
    position: 'SF',
    age: 44,
    isRetired: true,
    career: '2003-2017',
    attributes: {Shooting: 70, Dribbling: 70, Defense: 82, IQ: 75, Athleticism: 85, Passing: 68, Rebounding: 70, Speed: 80, Finishing: 72}
  },
{
    id: 163,
    name: 'Daishen Nix',
    position: 'PG',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 68, Dribbling: 78, Defense: 72, IQ: 74, Athleticism: 78, Passing: 79, Rebounding: 68, Speed: 78, Finishing: 54}
  },
{
    id: 164,
    name: 'Dale Davis',
    position: 'C',
    age: 56,
    isRetired: true,
    career: '1991-2007',
    attributes: {Shooting: 62, Dribbling: 60, Defense: 87, IQ: 84, Athleticism: 82, Passing: 66, Rebounding: 92, Speed: 68, Finishing: 74}
  },
{
    id: 165,
    name: 'Dale Ellis',
    position: 'SG',
    age: 64,
    isRetired: true,
    career: '1983-2000',
    attributes: {Shooting: 95, Dribbling: 78, Defense: 74, IQ: 85, Athleticism: 80, Passing: 75, Rebounding: 76, Speed: 80, Finishing: 68}
  },
{
    id: 166,
    name: 'Dalen Terry',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 70, Dribbling: 75, Defense: 79, IQ: 76, Athleticism: 84, Passing: 78, Rebounding: 68, Speed: 85, Finishing: 63}
  },
{
    id: 167,
    name: 'Dalibor Bagarić',
    position: 'C',
    age: 45,
    isRetired: true,
    career: '2000-2003',
    attributes: {Shooting: 58, Dribbling: 50, Defense: 65, IQ: 62, Athleticism: 68, Passing: 55, Rebounding: 72, Speed: 55, Finishing: 52}
  },
{
    id: 168,
    name: 'Damion Lee',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 84, Dribbling: 74, Defense: 70, IQ: 78, Athleticism: 75, Passing: 72, Rebounding: 68, Speed: 76, Finishing: 58}
  },
{
    id: 169,
    name: 'Dan Dickau',
    position: 'PG',
    age: 46,
    isRetired: true,
    career: '2002-2008',
    attributes: {Shooting: 82, Dribbling: 79, Defense: 60, IQ: 80, Athleticism: 68, Passing: 80, Rebounding: 55, Speed: 76, Finishing: 54}
  },
{
    id: 170,
    name: 'Dan Gadzuric',
    position: 'C',
    age: 47,
    isRetired: true,
    career: '2002-2012',
    attributes: {Shooting: 55, Dribbling: 52, Defense: 74, IQ: 68, Athleticism: 79, Passing: 58, Rebounding: 80, Speed: 66, Finishing: 68}
  },
{
    id: 171,
    name: 'Daniel Ewing',
    position: 'PG',
    age: 42,
    isRetired: true,
    career: '2005-2007',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 72, IQ: 72, Athleticism: 78, Passing: 74, Rebounding: 60, Speed: 82, Finishing: 58}
  },
{
    id: 172,
    name: 'Daniel Gibson',
    position: 'PG',
    age: 39,
    isRetired: true,
    career: '2006-2013',
    attributes: {Shooting: 87, Dribbling: 78, Defense: 68, IQ: 77, Athleticism: 75, Passing: 76, Rebounding: 60, Speed: 82, Finishing: 52}
  },
{
    id: 173,
    name: 'Daniel Theis',
    position: 'C',
    age: 33,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 75, Dribbling: 68, Defense: 82, IQ: 84, Athleticism: 78, Passing: 74, Rebounding: 78, Speed: 70, Finishing: 72}
  },
{
    id: 174,
    name: 'Danilo Gallinari',
    position: 'PF',
    age: 37,
    isRetired: true,
    career: '2008-present',
    attributes: {Shooting: 88, Dribbling: 78, Defense: 68, IQ: 87, Athleticism: 70, Passing: 79, Rebounding: 76, Speed: 65, Finishing: 70}
  },
{
    id: 175,
    name: 'Danny Granger',
    position: 'SF',
    age: 42,
    isRetired: true,
    career: '2005-2015',
    attributes: {Shooting: 89, Dribbling: 82, Defense: 84, IQ: 86, Athleticism: 84, Passing: 76, Rebounding: 80, Speed: 80, Finishing: 75}
  },
{
    id: 176,
    name: 'Dante Cunningham',
    position: 'PF',
    age: 38,
    isRetired: true,
    career: '2009-2019',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 78, IQ: 76, Athleticism: 79, Passing: 68, Rebounding: 74, Speed: 74, Finishing: 63}
  },
{
    id: 177,
    name: 'Danuel House Jr.',
    position: 'SF',
    age: 32,
    isRetired: true,
    career: '2016-present',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 76, IQ: 74, Athleticism: 84, Passing: 68, Rebounding: 70, Speed: 82, Finishing: 67}
  },
{
    id: 178,
    name: 'DaQuan Jeffries',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 72, Dribbling: 72, Defense: 75, IQ: 70, Athleticism: 85, Passing: 68, Rebounding: 68, Speed: 82, Finishing: 65}
  },
{
    id: 179,
    name: 'Darington Hobson',
    position: 'SF',
    age: 37,
    isRetired: true,
    career: '2010-2012',
    attributes: {Shooting: 72, Dribbling: 76, Defense: 65, IQ: 72, Athleticism: 74, Passing: 78, Rebounding: 70, Speed: 75, Finishing: 52}
  },
{
    id: 180,
    name: 'Dario Šarić',
    position: 'PF',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 79, Dribbling: 76, Defense: 68, IQ: 88, Athleticism: 68, Passing: 84, Rebounding: 80, Speed: 65, Finishing: 69}
  },
{
    id: 181,
    name: 'Darius Bazley',
    position: 'PF',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 72, Dribbling: 76, Defense: 79, IQ: 72, Athleticism: 86, Passing: 70, Rebounding: 78, Speed: 80, Finishing: 63}
  },
{
    id: 182,
    name: 'Darius Garland',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 89, Dribbling: 92, Defense: 66, IQ: 90, Athleticism: 80, Passing: 91, Rebounding: 62, Speed: 88, Finishing: 68}
  },
{
    id: 183,
    name: 'Darrell Armstrong',
    position: 'PG',
    age: 57,
    isRetired: true,
    career: '1994-2008',
    attributes: {Shooting: 78, Dribbling: 84, Defense: 82, IQ: 80, Athleticism: 88, Passing: 82, Rebounding: 65, Speed: 92, Finishing: 70}
  },
{
    id: 184,
    name: 'Darren Collison',
    position: 'PG',
    age: 38,
    isRetired: true,
    career: '2009-2022',
    attributes: {Shooting: 84, Dribbling: 85, Defense: 78, IQ: 85, Athleticism: 82, Passing: 84, Rebounding: 62, Speed: 89, Finishing: 71}
  },
{
    id: 185,
    name: 'Darren Daye',
    position: 'SF',
    age: 64,
    isRetired: true,
    career: '1983-1988',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 72, IQ: 76, Athleticism: 75, Passing: 74, Rebounding: 72, Speed: 76, Finishing: 66}
  },
{
    id: 186,
    name: 'Darrun Hilliard',
    position: 'SG',
    age: 32,
    isRetired: true,
    career: '2015-2018',
    attributes: {Shooting: 76, Dribbling: 75, Defense: 70, IQ: 74, Athleticism: 78, Passing: 72, Rebounding: 65, Speed: 78, Finishing: 58}
  },
{
    id: 187,
    name: 'Darryl Johnson',
    position: 'PG',
    age: 59,
    isRetired: true,
    career: '1995-1996',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 65, IQ: 70, Athleticism: 78, Passing: 70, Rebounding: 58, Speed: 80, Finishing: 53}
  },
{
    id: 188,
    name: 'Dave Cowens',
    position: 'C',
    age: 76,
    isRetired: true,
    career: '1970-1983',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 94, IQ: 97, Athleticism: 88, Passing: 85, Rebounding: 97, Speed: 82, Finishing: 85}
  },
{
    id: 189,
    name: 'David Andersen',
    position: 'C',
    age: 45,
    isRetired: true,
    career: '2009-2011',
    attributes: {Shooting: 78, Dribbling: 65, Defense: 66, IQ: 79, Athleticism: 68, Passing: 72, Rebounding: 74, Speed: 64, Finishing: 62}
  },
{
    id: 190,
    name: 'David Greenwood',
    position: 'PF',
    age: 68,
    isRetired: true,
    career: '1979-1991',
    attributes: {Shooting: 75, Dribbling: 68, Defense: 82, IQ: 84, Athleticism: 80, Passing: 72, Rebounding: 89, Speed: 72, Finishing: 73}
  },
{
    id: 191,
    name: 'David Johnson',
    position: 'SG',
    age: 24,
    isRetired: false,
    career: '2021-2022',
    attributes: {Shooting: 74, Dribbling: 75, Defense: 74, IQ: 72, Athleticism: 82, Passing: 72, Rebounding: 64, Speed: 84, Finishing: 55}
  },
{
    id: 192,
    name: 'Dāvis Bertāns',
    position: 'PF',
    age: 32,
    isRetired: true,
    career: '2016-present',
    attributes: {Shooting: 91, Dribbling: 64, Defense: 60, IQ: 79, Athleticism: 72, Passing: 68, Rebounding: 65, Speed: 70, Finishing: 42}
  },
{
    id: 193,
    name: 'De\'Aaron Fox',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 84, Dribbling: 92, Defense: 82, IQ: 88, Athleticism: 93, Passing: 86, Rebounding: 68, Speed: 98, Finishing: 83}
  },
{
    id: 194,
    name: 'De\'Andre Hunter',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 82, IQ: 80, Athleticism: 80, Passing: 72, Rebounding: 74, Speed: 78, Finishing: 69}
  },
{
    id: 195,
    name: 'De\'Anthony Melton',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 82, Dribbling: 79, Defense: 88, IQ: 85, Athleticism: 82, Passing: 78, Rebounding: 72, Speed: 84, Finishing: 65}
  },
{
    id: 196,
    name: 'Dean Wade',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 70, Defense: 82, IQ: 82, Athleticism: 76, Passing: 72, Rebounding: 74, Speed: 75, Finishing: 58}
  },
{
    id: 197,
    name: 'DeAndre Ayton',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 79, Dribbling: 68, Defense: 80, IQ: 76, Athleticism: 88, Passing: 72, Rebounding: 92, Speed: 76, Finishing: 76}
  },
{
    id: 198,
    name: 'DeAndre Jordan',
    position: 'C',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 52, Dribbling: 55, Defense: 76, IQ: 78, Athleticism: 75, Passing: 68, Rebounding: 88, Speed: 60, Finishing: 81}
  },
{
    id: 199,
    name: 'Dejounte Murray',
    position: 'PG',
    age: 28,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 84, Dribbling: 88, Defense: 86, IQ: 89, Athleticism: 84, Passing: 90, Rebounding: 80, Speed: 88, Finishing: 71}
  },
{
    id: 200,
    name: 'Dell Curry',
    position: 'SG',
    age: 61,
    isRetired: true,
    career: '1986-2002',
    attributes: {Shooting: 95, Dribbling: 76, Defense: 70, IQ: 84, Athleticism: 74, Passing: 75, Rebounding: 65, Speed: 76, Finishing: 50}
  },
{
    id: 201,
    name: 'DeMar DeRozan',
    position: 'SF',
    age: 36,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 88, Dribbling: 89, Defense: 74, IQ: 92, Athleticism: 82, Passing: 86, Rebounding: 76, Speed: 79, Finishing: 84}
  },
{
    id: 202,
    name: 'DeMarre Carroll',
    position: 'SF',
    age: 39,
    isRetired: true,
    career: '2009-2020',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 82, IQ: 80, Athleticism: 79, Passing: 70, Rebounding: 78, Speed: 75, Finishing: 64}
  },
{
    id: 203,
    name: 'DeMarre Johnson',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '1999-2000',
    attributes: {Shooting: 68, Dribbling: 65, Defense: 66, IQ: 68, Athleticism: 75, Passing: 64, Rebounding: 68, Speed: 72, Finishing: 58}
  },
{
    id: 204,
    name: 'Dennis Horner',
    position: 'PF',
    age: 37,
    isRetired: true,
    career: '2011-2012',
    attributes: {Shooting: 68, Dribbling: 60, Defense: 62, IQ: 64, Athleticism: 70, Passing: 60, Rebounding: 70, Speed: 65, Finishing: 52}
  },
{
    id: 205,
    name: 'Dennis Johnson',
    position: 'PG',
    age: 52,
    isRetired: true,
    career: '1976-1990',
    attributes: {Shooting: 80, Dribbling: 88, Defense: 97, IQ: 96, Athleticism: 88, Passing: 89, Rebounding: 78, Speed: 88, Finishing: 78}
  },
{
    id: 206,
    name: 'Dennis Schröder',
    position: 'PG',
    age: 32,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 82, Dribbling: 87, Defense: 78, IQ: 84, Athleticism: 82, Passing: 85, Rebounding: 64, Speed: 92, Finishing: 73}
  },
{
    id: 207,
    name: 'Dennis Smith Jr.',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 74, Dribbling: 84, Defense: 85, IQ: 80, Athleticism: 94, Passing: 82, Rebounding: 68, Speed: 92, Finishing: 68}
  },
{
    id: 208,
    name: 'DeQuan Jones',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '2012-2013',
    attributes: {Shooting: 70, Dribbling: 70, Defense: 72, IQ: 68, Athleticism: 88, Passing: 65, Rebounding: 70, Speed: 85, Finishing: 62}
  },
{
    id: 209,
    name: 'Derek Fisher',
    position: 'PG',
    age: 51,
    isRetired: true,
    career: '1996-2014',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 85, IQ: 94, Athleticism: 74, Passing: 80, Rebounding: 62, Speed: 78, Finishing: 58}
  },
{
    id: 210,
    name: 'DerMarr Johnson',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2000-2008',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 70, IQ: 72, Athleticism: 84, Passing: 70, Rebounding: 70, Speed: 80, Finishing: 65}
  },
{
    id: 211,
    name: 'Derrick Favors',
    position: 'C',
    age: 34,
    isRetired: true,
    career: '2010-2023',
    attributes: {Shooting: 70, Dribbling: 65, Defense: 82, IQ: 80, Athleticism: 82, Passing: 68, Rebounding: 86, Speed: 68, Finishing: 79}
  },
{
    id: 212,
    name: 'Derrick Jones Jr.',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 76, Dribbling: 72, Defense: 84, IQ: 78, Athleticism: 97, Passing: 68, Rebounding: 76, Speed: 88, Finishing: 82}
  },
{
    id: 213,
    name: 'Derrick Rose',
    position: 'PG',
    age: 37,
    isRetired: true,
    career: '2008-2024',
    attributes: {Shooting: 80, Dribbling: 96, Defense: 75, IQ: 90, Athleticism: 98, Passing: 88, Rebounding: 72, Speed: 98, Finishing: 83}
  },
{
    id: 214,
    name: 'Derrick White',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 86, Dribbling: 84, Defense: 92, IQ: 95, Athleticism: 80, Passing: 86, Rebounding: 74, Speed: 82, Finishing: 78}
  },
{
    id: 215,
    name: 'Desmond Bane',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 94, Dribbling: 84, Defense: 80, IQ: 87, Athleticism: 82, Passing: 80, Rebounding: 76, Speed: 80, Finishing: 74}
  },
{
    id: 216,
    name: 'Devin Booker',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 94, Dribbling: 89, Defense: 78, IQ: 92, Athleticism: 82, Passing: 88, Rebounding: 74, Speed: 84, Finishing: 82}
  },
{
    id: 217,
    name: 'Devin Cannady',
    position: 'PG',
    age: 29,
    isRetired: true,
    career: '2020-2023',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 68, IQ: 72, Athleticism: 72, Passing: 70, Rebounding: 58, Speed: 76, Finishing: 48}
  },
{
    id: 218,
    name: 'Devin Harris',
    position: 'PG',
    age: 42,
    isRetired: true,
    career: '2004-2019',
    attributes: {Shooting: 78, Dribbling: 88, Defense: 76, IQ: 82, Athleticism: 86, Passing: 82, Rebounding: 62, Speed: 96, Finishing: 74}
  },
{
    id: 219,
    name: 'Devin Vassell',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 86, Dribbling: 82, Defense: 82, IQ: 84, Athleticism: 80, Passing: 78, Rebounding: 72, Speed: 82, Finishing: 70}
  },
{
    id: 220,
    name: 'Dewayne Dedmon',
    position: 'C',
    age: 36,
    isRetired: true,
    career: '2013-2023',
    attributes: {Shooting: 74, Dribbling: 58, Defense: 76, IQ: 74, Athleticism: 78, Passing: 62, Rebounding: 84, Speed: 65, Finishing: 72}
  },
{
    id: 221,
    name: 'Dick Barnett',
    position: 'SG',
    age: 88,
    isRetired: true,
    career: '1959-1977',
    attributes: {Shooting: 88, Dribbling: 82, Defense: 84, IQ: 90, Athleticism: 82, Passing: 78, Rebounding: 72, Speed: 84, Finishing: 74}
  },
{
    id: 222,
    name: 'Domantas Sabonis',
    position: 'C',
    age: 29,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 78, IQ: 95, Athleticism: 80, Passing: 90, Rebounding: 96, Speed: 72, Finishing: 88}
  },
{
    id: 223,
    name: 'Dominique Jones',
    position: 'SG',
    age: 36,
    isRetired: true,
    career: '2010-2013',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 68, IQ: 70, Athleticism: 84, Passing: 74, Rebounding: 66, Speed: 82, Finishing: 58}
  },
{
    id: 224,
    name: 'Don Adams',
    position: 'SF',
    age: 77,
    isRetired: true,
    career: '1970-1977',
    attributes: {Shooting: 70, Dribbling: 68, Defense: 78, IQ: 75, Athleticism: 74, Passing: 70, Rebounding: 78, Speed: 70, Finishing: 68}
  },
{
    id: 225,
    name: 'Dontae\' Jones',
    position: 'SF',
    age: 50,
    isRetired: true,
    career: '1997-1998',
    attributes: {Shooting: 72, Dribbling: 70, Defense: 68, IQ: 68, Athleticism: 82, Passing: 66, Rebounding: 72, Speed: 78, Finishing: 58}
  },
{
    id: 226,
    name: 'Donte DiVincenzo',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 87, Dribbling: 78, Defense: 82, IQ: 84, Athleticism: 84, Passing: 78, Rebounding: 72, Speed: 84, Finishing: 72}
  },
{
    id: 227,
    name: 'Dontell Jefferson',
    position: 'PG',
    age: 42,
    isRetired: true,
    career: '2008-2009',
    attributes: {Shooting: 68, Dribbling: 74, Defense: 68, IQ: 70, Athleticism: 78, Passing: 75, Rebounding: 58, Speed: 80, Finishing: 55}
  },
{
    id: 228,
    name: 'Dorian Finney-Smith',
    position: 'SF',
    age: 32,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 80, Dribbling: 70, Defense: 84, IQ: 82, Athleticism: 80, Passing: 70, Rebounding: 76, Speed: 76, Finishing: 61}
  },
{
    id: 229,
    name: 'Doug Christie',
    position: 'SG',
    age: 55,
    isRetired: true,
    career: '1992-2007',
    attributes: {Shooting: 80, Dribbling: 80, Defense: 94, IQ: 92, Athleticism: 82, Passing: 82, Rebounding: 74, Speed: 84, Finishing: 68}
  },
{
    id: 230,
    name: 'Doug McDermott',
    position: 'SF',
    age: 33,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 89, Dribbling: 70, Defense: 62, IQ: 82, Athleticism: 72, Passing: 68, Rebounding: 68, Speed: 72, Finishing: 68}
  },
{
    id: 231,
    name: 'Draymond Green',
    position: 'PF',
    age: 35,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 75, Dribbling: 78, Defense: 96, IQ: 98, Athleticism: 78, Passing: 91, Rebounding: 88, Speed: 74, Finishing: 66}
  },
{
    id: 232,
    name: 'Drew Barry',
    position: 'PG',
    age: 52,
    isRetired: true,
    career: '1996-2000',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 68, IQ: 78, Athleticism: 68, Passing: 76, Rebounding: 55, Speed: 74, Finishing: 52}
  },
{
    id: 233,
    name: 'Drew Eubanks',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 65, Dribbling: 62, Defense: 78, IQ: 75, Athleticism: 84, Passing: 68, Rebounding: 80, Speed: 70, Finishing: 75}
  },
{
    id: 234,
    name: 'Drew Gooden',
    position: 'PF',
    age: 44,
    isRetired: true,
    career: '2002-2016',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 74, IQ: 78, Athleticism: 80, Passing: 72, Rebounding: 88, Speed: 72, Finishing: 72}
  },
{
    id: 235,
    name: 'Duncan Robinson',
    position: 'SG',
    age: 31,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 92, Dribbling: 74, Defense: 65, IQ: 84, Athleticism: 70, Passing: 78, Rebounding: 64, Speed: 74, Finishing: 44}
  },
{
    id: 236,
    name: 'Dwayne Bacon',
    position: 'SF',
    age: 30,
    isRetired: true,
    career: '2017-2021',
    attributes: {Shooting: 76, Dribbling: 78, Defense: 68, IQ: 72, Athleticism: 82, Passing: 70, Rebounding: 72, Speed: 80, Finishing: 62}
  },
{
    id: 237,
    name: 'Dwight Buycks',
    position: 'PG',
    age: 36,
    isRetired: true,
    career: '2013-2019',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 68, IQ: 72, Athleticism: 80, Passing: 74, Rebounding: 58, Speed: 84, Finishing: 58}
  },
{
    id: 238,
    name: 'Dwight Howard',
    position: 'C',
    age: 39,
    isRetired: true,
    career: '2004-2022',
    attributes: {Shooting: 58, Dribbling: 62, Defense: 96, IQ: 88, Athleticism: 98, Passing: 68, Rebounding: 99, Speed: 78, Finishing: 91}
  },
{
    id: 239,
    name: 'Dwight Powell',
    position: 'C',
    age: 34,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 72, Dribbling: 65, Defense: 74, IQ: 82, Athleticism: 84, Passing: 70, Rebounding: 76, Speed: 74, Finishing: 80}
  },
{
    id: 240,
    name: 'Dylan Windler',
    position: 'SF',
    age: 29,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 70, Defense: 68, IQ: 74, Athleticism: 75, Passing: 70, Rebounding: 76, Speed: 74, Finishing: 52}
  },
{
    id: 241,
    name: 'Earl Barron',
    position: 'C',
    age: 44,
    isRetired: true,
    career: '2005-2015',
    attributes: {Shooting: 70, Dribbling: 55, Defense: 68, IQ: 70, Athleticism: 72, Passing: 60, Rebounding: 78, Speed: 60, Finishing: 64}
  },
{
    id: 242,
    name: 'Earl Clark',
    position: 'SF',
    age: 37,
    isRetired: true,
    career: '2009-2015',
    attributes: {Shooting: 75, Dribbling: 74, Defense: 76, IQ: 72, Athleticism: 82, Passing: 70, Rebounding: 78, Speed: 78, Finishing: 65}
  },
{
    id: 243,
    name: 'Ed Kalafat',
    position: 'C',
    age: 92,
    isRetired: true,
    career: '1954-1957',
    attributes: {Shooting: 60, Dribbling: 55, Defense: 72, IQ: 74, Athleticism: 76, Passing: 64, Rebounding: 78, Speed: 60, Finishing: 60}
  },
{
    id: 244,
    name: 'Eddie Griffin',
    position: 'PF',
    age: 25,
    isRetired: true,
    career: '2001-2007',
    attributes: {Shooting: 74, Dribbling: 65, Defense: 88, IQ: 72, Athleticism: 88, Passing: 64, Rebounding: 84, Speed: 76, Finishing: 63}
  },
{
    id: 245,
    name: 'Eddie House',
    position: 'SG',
    age: 47,
    isRetired: true,
    career: '2000-2011',
    attributes: {Shooting: 90, Dribbling: 78, Defense: 70, IQ: 80, Athleticism: 75, Passing: 76, Rebounding: 60, Speed: 80, Finishing: 48}
  },
{
    id: 246,
    name: 'Eddie Johnson (ala)',
    position: 'SF',
    age: 66,
    isRetired: true,
    career: '1981-1999',
    attributes: {Shooting: 92, Dribbling: 78, Defense: 68, IQ: 85, Athleticism: 76, Passing: 74, Rebounding: 76, Speed: 75, Finishing: 70}
  },
{
    id: 247,
    name: 'Eddie Johnson (armador)',
    position: 'PG',
    age: 70,
    isRetired: true,
    career: '1977-1987',
    attributes: {Shooting: 80, Dribbling: 86, Defense: 76, IQ: 84, Athleticism: 88, Passing: 86, Rebounding: 64, Speed: 92, Finishing: 72}
  },
{
    id: 248,
    name: 'Eddie Jones',
    position: 'SG',
    age: 53,
    isRetired: true,
    career: '1994-2008',
    attributes: {Shooting: 87, Dribbling: 84, Defense: 92, IQ: 90, Athleticism: 89, Passing: 80, Rebounding: 76, Speed: 88, Finishing: 79}
  },
{
    id: 249,
    name: 'Eddie Jordan',
    position: 'PG',
    age: 70,
    isRetired: true,
    career: '1977-1984',
    attributes: {Shooting: 76, Dribbling: 84, Defense: 82, IQ: 88, Athleticism: 78, Passing: 84, Rebounding: 62, Speed: 86, Finishing: 68}
  },
{
    id: 250,
    name: 'Eddy Curry',
    position: 'C',
    age: 42,
    isRetired: true,
    career: '2001-2013',
    attributes: {Shooting: 65, Dribbling: 62, Defense: 65, IQ: 70, Athleticism: 82, Passing: 58, Rebounding: 82, Speed: 66, Finishing: 81}
  },
{
    id: 251,
    name: 'Elton Brand',
    position: 'PF',
    age: 46,
    isRetired: true,
    career: '1999-2016',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 89, IQ: 92, Athleticism: 84, Passing: 78, Rebounding: 93, Speed: 72, Finishing: 83}
  },
{
    id: 252,
    name: 'Elvin Hayes',
    position: 'PF',
    age: 79,
    isRetired: true,
    career: '1968-1984',
    attributes: {Shooting: 85, Dribbling: 74, Defense: 93, IQ: 94, Athleticism: 92, Passing: 76, Rebounding: 98, Speed: 78, Finishing: 85}
  },
{
    id: 253,
    name: 'Enes Kanter Freedom',
    position: 'C',
    age: 33,
    isRetired: true,
    career: '2011-2022',
    attributes: {Shooting: 75, Dribbling: 66, Defense: 60, IQ: 78, Athleticism: 74, Passing: 68, Rebounding: 95, Speed: 62, Finishing: 82}
  },
{
    id: 254,
    name: 'Eric Bledsoe',
    position: 'PG',
    age: 35,
    isRetired: true,
    career: '2010-2022',
    attributes: {Shooting: 78, Dribbling: 84, Defense: 88, IQ: 82, Athleticism: 92, Passing: 82, Rebounding: 76, Speed: 92, Finishing: 80}
  },
{
    id: 255,
    name: 'Eric Fernsten',
    position: 'C',
    age: 71,
    isRetired: true,
    career: '1975-1982',
    attributes: {Shooting: 62, Dribbling: 55, Defense: 70, IQ: 72, Athleticism: 74, Passing: 60, Rebounding: 74, Speed: 65, Finishing: 60}
  },
{
    id: 256,
    name: 'Eric Gordon',
    position: 'SG',
    age: 36,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 88, Dribbling: 79, Defense: 74, IQ: 84, Athleticism: 78, Passing: 76, Rebounding: 64, Speed: 78, Finishing: 76}
  },
{
    id: 257,
    name: 'Eric Paschall',
    position: 'PF',
    age: 28,
    isRetired: true,
    career: '2019-2022',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 70, IQ: 72, Athleticism: 84, Passing: 68, Rebounding: 72, Speed: 76, Finishing: 71}
  },
{
    id: 258,
    name: 'Erick Dampier',
    position: 'C',
    age: 50,
    isRetired: true,
    career: '1996-2012',
    attributes: {Shooting: 55, Dribbling: 50, Defense: 84, IQ: 78, Athleticism: 79, Passing: 58, Rebounding: 88, Speed: 60, Finishing: 72}
  },
{
    id: 259,
    name: 'Ervin Johnson',
    position: 'C',
    age: 57,
    isRetired: true,
    career: '1993-2006',
    attributes: {Shooting: 52, Dribbling: 52, Defense: 82, IQ: 76, Athleticism: 78, Passing: 60, Rebounding: 86, Speed: 64, Finishing: 63}
  },
{
    id: 260,
    name: 'Eugene Omoruyi',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 76, IQ: 74, Athleticism: 82, Passing: 68, Rebounding: 74, Speed: 78, Finishing: 68}
  },
{
    id: 261,
    name: 'Evan Eschmeyer',
    position: 'C',
    age: 50,
    isRetired: true,
    career: '1999-2003',
    attributes: {Shooting: 58, Dribbling: 52, Defense: 70, IQ: 72, Athleticism: 70, Passing: 62, Rebounding: 76, Speed: 60, Finishing: 58}
  },
{
    id: 262,
    name: 'Evan Fournier',
    position: 'SG',
    age: 32,
    isRetired: true,
    career: '2012-2024',
    attributes: {Shooting: 85, Dribbling: 80, Defense: 65, IQ: 82, Athleticism: 74, Passing: 78, Rebounding: 68, Speed: 76, Finishing: 69}
  },
{
    id: 263,
    name: 'Evan Mobley',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 76, Dribbling: 78, Defense: 92, IQ: 90, Athleticism: 90, Passing: 80, Rebounding: 90, Speed: 82, Finishing: 81}
  },
{
    id: 264,
    name: 'Festus Ezeli',
    position: 'C',
    age: 35,
    isRetired: true,
    career: '2012-2016',
    attributes: {Shooting: 55, Dribbling: 52, Defense: 78, IQ: 74, Athleticism: 80, Passing: 60, Rebounding: 80, Speed: 65, Finishing: 71}
  },
{
    id: 265,
    name: 'Frank Brickowski',
    position: 'PF',
    age: 66,
    isRetired: true,
    career: '1984-1997',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 76, IQ: 82, Athleticism: 74, Passing: 72, Rebounding: 80, Speed: 66, Finishing: 70}
  },
{
    id: 266,
    name: 'Frank Jackson',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2017-2023',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 68, IQ: 72, Athleticism: 84, Passing: 70, Rebounding: 62, Speed: 85, Finishing: 66}
  },
{
    id: 267,
    name: 'Frank Johnson',
    position: 'PG',
    age: 66,
    isRetired: true,
    career: '1981-1994',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 78, IQ: 84, Athleticism: 80, Passing: 82, Rebounding: 64, Speed: 86, Finishing: 68}
  },
{
    id: 268,
    name: 'Frank Kaminsky',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2015-2023',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 66, IQ: 82, Athleticism: 70, Passing: 75, Rebounding: 74, Speed: 65, Finishing: 62}
  },
{
    id: 269,
    name: 'Franz Wagner',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 82, Dribbling: 86, Defense: 84, IQ: 90, Athleticism: 84, Passing: 84, Rebounding: 78, Speed: 82, Finishing: 82}
  },
{
    id: 270,
    name: 'Fred VanVleet',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 85, Dribbling: 86, Defense: 88, IQ: 94, Athleticism: 76, Passing: 87, Rebounding: 70, Speed: 82, Finishing: 58}
  },
{
    id: 271,
    name: 'Furkan Korkmaz',
    position: 'SG',
    age: 28,
    isRetired: true,
    career: '2017-2024',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 65, IQ: 78, Athleticism: 74, Passing: 74, Rebounding: 66, Speed: 76, Finishing: 55}
  },
{
    id: 272,
    name: 'Gabe Vincent',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 82, IQ: 84, Athleticism: 78, Passing: 76, Rebounding: 62, Speed: 82, Finishing: 61}
  },
{
    id: 273,
    name: 'Gail Goodrich',
    position: 'SG',
    age: 82,
    isRetired: true,
    career: '1965-1979',
    attributes: {Shooting: 90, Dribbling: 88, Defense: 80, IQ: 94, Athleticism: 82, Passing: 86, Rebounding: 70, Speed: 86, Finishing: 80}
  },
{
    id: 274,
    name: 'Garrison Mathews',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 85, Dribbling: 68, Defense: 72, IQ: 76, Athleticism: 74, Passing: 66, Rebounding: 64, Speed: 75, Finishing: 46}
  },
{
    id: 275,
    name: 'Gary Grant',
    position: 'PG',
    age: 60,
    isRetired: true,
    career: '1988-2001',
    attributes: {Shooting: 76, Dribbling: 84, Defense: 80, IQ: 82, Athleticism: 82, Passing: 84, Rebounding: 65, Speed: 88, Finishing: 68}
  },
{
    id: 276,
    name: 'Gary Harris',
    position: 'SG',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 84, IQ: 82, Athleticism: 80, Passing: 72, Rebounding: 68, Speed: 82, Finishing: 74}
  },
{
    id: 277,
    name: 'Gary Payton II',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 75, Dribbling: 76, Defense: 92, IQ: 88, Athleticism: 90, Passing: 74, Rebounding: 78, Speed: 88, Finishing: 84}
  },
{
    id: 278,
    name: 'Gary Trent Jr.',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 87, Dribbling: 78, Defense: 78, IQ: 80, Athleticism: 76, Passing: 70, Rebounding: 68, Speed: 80, Finishing: 56}
  },
{
    id: 279,
    name: 'George Hill',
    position: 'PG',
    age: 39,
    isRetired: true,
    career: '2008-2023',
    attributes: {Shooting: 84, Dribbling: 80, Defense: 84, IQ: 89, Athleticism: 78, Passing: 82, Rebounding: 70, Speed: 82, Finishing: 72}
  },
{
    id: 280,
    name: 'George Karl (jogador)',
    position: 'PG',
    age: 74,
    isRetired: true,
    career: '1973-1978',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 75, IQ: 95, Athleticism: 70, Passing: 82, Rebounding: 58, Speed: 76, Finishing: 64}
  },
{
    id: 281,
    name: 'Georges Niang',
    position: 'PF',
    age: 32,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 86, Dribbling: 70, Defense: 65, IQ: 84, Athleticism: 65, Passing: 74, Rebounding: 70, Speed: 62, Finishing: 52}
  },
{
    id: 282,
    name: 'Gerald Green',
    position: 'SF',
    age: 39,
    isRetired: true,
    career: '2005-2020',
    attributes: {Shooting: 84, Dribbling: 76, Defense: 68, IQ: 74, Athleticism: 97, Passing: 68, Rebounding: 72, Speed: 88, Finishing: 78}
  },
{
    id: 283,
    name: 'Gerald Henderson',
    position: 'SG',
    age: 37,
    isRetired: true,
    career: '1979-1992',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 76, IQ: 78, Athleticism: 88, Passing: 74, Rebounding: 72, Speed: 84, Finishing: 73}
  },
{
    id: 284,
    name: 'Giannis Antetokounmpo',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 74, Dribbling: 88, Defense: 94, IQ: 93, Athleticism: 99, Passing: 84, Rebounding: 95, Speed: 88, Finishing: 94}
  },
{
    id: 285,
    name: 'Gilbert Arenas',
    position: 'PG',
    age: 43,
    isRetired: true,
    career: '2001-2012',
    attributes: {Shooting: 92, Dribbling: 94, Defense: 76, IQ: 88, Athleticism: 90, Passing: 85, Rebounding: 74, Speed: 92, Finishing: 81}
  },
{
    id: 286,
    name: 'Glen Davis (Big Baby)',
    position: 'PF',
    age: 39,
    isRetired: true,
    career: '2007-2015',
    attributes: {Shooting: 74, Dribbling: 68, Defense: 76, IQ: 78, Athleticism: 72, Passing: 68, Rebounding: 84, Speed: 64, Finishing: 70}
  },
{
    id: 287,
    name: 'Goga Bitadze',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 70, Dribbling: 62, Defense: 82, IQ: 78, Athleticism: 76, Passing: 72, Rebounding: 85, Speed: 68, Finishing: 71}
  },
{
    id: 288,
    name: 'Goran Dragić',
    position: 'PG',
    age: 39,
    isRetired: true,
    career: '2008-2023',
    attributes: {Shooting: 84, Dribbling: 88, Defense: 74, IQ: 92, Athleticism: 78, Passing: 88, Rebounding: 70, Speed: 84, Finishing: 80}
  },
{
    id: 289,
    name: 'Gordan Giriček',
    position: 'SG',
    age: 48,
    isRetired: true,
    career: '2002-2008',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 70, IQ: 78, Athleticism: 78, Passing: 72, Rebounding: 68, Speed: 78, Finishing: 66}
  },
{
    id: 290,
    name: 'Gordon Hayward',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '2010-2024',
    attributes: {Shooting: 86, Dribbling: 85, Defense: 78, IQ: 90, Athleticism: 82, Passing: 84, Rebounding: 76, Speed: 80, Finishing: 77}
  },
{
    id: 291,
    name: 'Gorgui Dieng',
    position: 'C',
    age: 35,
    isRetired: true,
    career: '2013-2023',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 80, IQ: 82, Athleticism: 74, Passing: 72, Rebounding: 84, Speed: 65, Finishing: 68}
  },
{
    id: 292,
    name: 'Grant Hill',
    position: 'SF',
    age: 52,
    isRetired: true,
    career: '1994-2013',
    attributes: {Shooting: 84, Dribbling: 94, Defense: 88, IQ: 96, Athleticism: 95, Passing: 92, Rebounding: 85, Speed: 89, Finishing: 85}
  },
{
    id: 293,
    name: 'Grant Williams',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 72, Defense: 84, IQ: 86, Athleticism: 76, Passing: 76, Rebounding: 74, Speed: 70, Finishing: 59}
  },
{
    id: 294,
    name: 'Grayson Allen',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 92, Dribbling: 78, Defense: 79, IQ: 84, Athleticism: 82, Passing: 76, Rebounding: 68, Speed: 80, Finishing: 68}
  },
{
    id: 295,
    name: 'Greg Anthony',
    position: 'PG',
    age: 57,
    isRetired: true,
    career: '1991-2002',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 86, IQ: 85, Athleticism: 80, Passing: 82, Rebounding: 62, Speed: 86, Finishing: 64}
  },
{
    id: 296,
    name: 'Greg Ballard',
    position: 'SF',
    age: 70,
    isRetired: true,
    career: '1977-1989',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 82, IQ: 84, Athleticism: 80, Passing: 76, Rebounding: 85, Speed: 78, Finishing: 71}
  },
{
    id: 297,
    name: 'Greg Buckner',
    position: 'SG',
    age: 49,
    isRetired: true,
    career: '1999-2009',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 84, IQ: 78, Athleticism: 78, Passing: 70, Rebounding: 68, Speed: 80, Finishing: 63}
  },
{
    id: 298,
    name: 'Greg Foster',
    position: 'C',
    age: 56,
    isRetired: true,
    career: '1990-2003',
    attributes: {Shooting: 72, Dribbling: 58, Defense: 74, IQ: 76, Athleticism: 74, Passing: 64, Rebounding: 78, Speed: 62, Finishing: 64}
  },
{
    id: 299,
    name: 'Gus Johnson',
    position: 'PF',
    age: 87,
    isRetired: true,
    career: '1963-1973',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 92, IQ: 92, Athleticism: 97, Passing: 78, Rebounding: 95, Speed: 84, Finishing: 83}
  },
{
    id: 300,
    name: 'Gustavo Ayón',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2011-2014',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 76, IQ: 82, Athleticism: 70, Passing: 74, Rebounding: 84, Speed: 60, Finishing: 73}
  },
{
    id: 301,
    name: 'Hamidou Diallo',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2018-2024',
    attributes: {Shooting: 68, Dribbling: 72, Defense: 74, IQ: 68, Athleticism: 94, Passing: 65, Rebounding: 72, Speed: 92, Finishing: 76}
  },
{
    id: 302,
    name: 'Harold Jamison',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1999-2002',
    attributes: {Shooting: 45, Dribbling: 50, Defense: 70, IQ: 68, Athleticism: 78, Passing: 55, Rebounding: 85, Speed: 64, Finishing: 62}
  },
{
    id: 303,
    name: 'Harrison Barnes',
    position: 'SF',
    age: 33,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 84, Dribbling: 75, Defense: 76, IQ: 84, Athleticism: 74, Passing: 70, Rebounding: 72, Speed: 72, Finishing: 73}
  },
{
    id: 304,
    name: 'Harvey Grant',
    position: 'SF',
    age: 60,
    isRetired: true,
    career: '1988-1999',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 78, IQ: 80, Athleticism: 82, Passing: 72, Rebounding: 77, Speed: 78, Finishing: 71}
  },
{
    id: 305,
    name: 'Haywood Highsmith',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 76, Dribbling: 65, Defense: 86, IQ: 78, Athleticism: 78, Passing: 66, Rebounding: 70, Speed: 78, Finishing: 58}
  },
{
    id: 306,
    name: 'Herb Jones',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 96, IQ: 92, Athleticism: 84, Passing: 75, Rebounding: 74, Speed: 82, Finishing: 70}
  },
{
    id: 307,
    name: 'Hersey Hawkins',
    position: 'SG',
    age: 59,
    isRetired: true,
    career: '1988-2001',
    attributes: {Shooting: 89, Dribbling: 80, Defense: 82, IQ: 85, Athleticism: 78, Passing: 78, Rebounding: 65, Speed: 82, Finishing: 68}
  },
{
    id: 308,
    name: 'Hilton Armstrong',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2006-2014',
    attributes: {Shooting: 40, Dribbling: 42, Defense: 74, IQ: 65, Athleticism: 78, Passing: 50, Rebounding: 76, Speed: 60, Finishing: 64}
  },
{
    id: 309,
    name: 'Horace Grant',
    position: 'PF',
    age: 60,
    isRetired: true,
    career: '1987-2004',
    attributes: {Shooting: 78, Dribbling: 65, Defense: 92, IQ: 90, Athleticism: 85, Passing: 75, Rebounding: 92, Speed: 74, Finishing: 79}
  },
{
    id: 310,
    name: 'Hubert Davis',
    position: 'SG',
    age: 55,
    isRetired: true,
    career: '1992-2004',
    attributes: {Shooting: 94, Dribbling: 74, Defense: 65, IQ: 85, Athleticism: 65, Passing: 74, Rebounding: 58, Speed: 72, Finishing: 45}
  },
{
    id: 311,
    name: 'Ian Clark',
    position: 'SG',
    age: 34,
    isRetired: true,
    career: '2013-2019',
    attributes: {Shooting: 82, Dribbling: 75, Defense: 68, IQ: 78, Athleticism: 72, Passing: 70, Rebounding: 55, Speed: 78, Finishing: 58}
  },
{
    id: 312,
    name: 'Ike Diogu',
    position: 'PF',
    age: 41,
    isRetired: true,
    career: '2005-2012',
    attributes: {Shooting: 72, Dribbling: 60, Defense: 68, IQ: 70, Athleticism: 82, Passing: 58, Rebounding: 84, Speed: 62, Finishing: 68}
  },
{
    id: 313,
    name: 'Immanuel Quickley',
    position: 'PG',
    age: 26,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 87, Dribbling: 86, Defense: 78, IQ: 85, Athleticism: 78, Passing: 84, Rebounding: 64, Speed: 88, Finishing: 66}
  },
{
    id: 314,
    name: 'Isaac Bonga',
    position: 'SF',
    age: 25,
    isRetired: false,
    career: '2018-2022',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 78, IQ: 75, Athleticism: 76, Passing: 74, Rebounding: 68, Speed: 74, Finishing: 52}
  },
{
    id: 315,
    name: 'Isaac Okoro',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 76, Dribbling: 70, Defense: 88, IQ: 78, Athleticism: 86, Passing: 68, Rebounding: 65, Speed: 85, Finishing: 72}
  },
{
    id: 316,
    name: 'Isaiah Hartenstein',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 88, IQ: 92, Athleticism: 78, Passing: 86, Rebounding: 92, Speed: 68, Finishing: 78}
  },
{
    id: 317,
    name: 'Isaiah Hicks',
    position: 'PF',
    age: 31,
    isRetired: true,
    career: '2017-2019',
    attributes: {Shooting: 62, Dribbling: 58, Defense: 70, IQ: 66, Athleticism: 82, Passing: 55, Rebounding: 74, Speed: 68, Finishing: 60}
  },
{
    id: 318,
    name: 'Isaiah Joe',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 93, Dribbling: 74, Defense: 75, IQ: 80, Athleticism: 74, Passing: 68, Rebounding: 58, Speed: 82, Finishing: 45}
  },
{
    id: 319,
    name: 'Isaiah Livers',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2021-2024',
    attributes: {Shooting: 78, Dribbling: 66, Defense: 74, IQ: 72, Athleticism: 72, Passing: 65, Rebounding: 62, Speed: 70, Finishing: 52}
  },
{
    id: 320,
    name: 'Isaiah Stewart',
    position: 'C',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 84, IQ: 76, Athleticism: 82, Passing: 65, Rebounding: 88, Speed: 68, Finishing: 68}
  },
{
    id: 321,
    name: 'Ish Smith',
    position: 'PG',
    age: 37,
    isRetired: false,
    career: '2010-2024',
    attributes: {Shooting: 74, Dribbling: 88, Defense: 70, IQ: 84, Athleticism: 76, Passing: 85, Rebounding: 58, Speed: 92, Finishing: 63}
  },
{
    id: 322,
    name: 'J.J. Barea',
    position: 'PG',
    age: 41,
    isRetired: true,
    career: '2006-2020',
    attributes: {Shooting: 80, Dribbling: 86, Defense: 62, IQ: 94, Athleticism: 70, Passing: 88, Rebounding: 54, Speed: 84, Finishing: 64}
  },
{
    id: 323,
    name: 'J.J. Hickson',
    position: 'PF',
    age: 36,
    isRetired: true,
    career: '2008-2016',
    attributes: {Shooting: 64, Dribbling: 62, Defense: 68, IQ: 66, Athleticism: 88, Passing: 58, Rebounding: 90, Speed: 74, Finishing: 75}
  },
{
    id: 324,
    name: 'J.R. Henderson',
    position: 'SF',
    age: 48,
    isRetired: true,
    career: '1998-1999',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 72, IQ: 78, Athleticism: 76, Passing: 70, Rebounding: 75, Speed: 72, Finishing: 58}
  },
{
    id: 325,
    name: 'Ja Morant',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 95, Defense: 75, IQ: 90, Athleticism: 98, Passing: 92, Rebounding: 70, Speed: 97, Finishing: 88}
  },
{
    id: 326,
    name: 'Jabari Smith Jr.',
    position: 'PF',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 84, Dribbling: 70, Defense: 84, IQ: 78, Athleticism: 82, Passing: 65, Rebounding: 85, Speed: 75, Finishing: 64}
  },
{
    id: 327,
    name: 'Jabari Walker',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 74, Dribbling: 68, Defense: 76, IQ: 74, Athleticism: 78, Passing: 64, Rebounding: 86, Speed: 72, Finishing: 66}
  },
{
    id: 328,
    name: 'Jackie Butler',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2004-2007',
    attributes: {Shooting: 60, Dribbling: 45, Defense: 68, IQ: 62, Athleticism: 72, Passing: 50, Rebounding: 76, Speed: 55, Finishing: 62}
  },
{
    id: 329,
    name: 'Jaden Ivey',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 80, Dribbling: 88, Defense: 75, IQ: 78, Athleticism: 94, Passing: 82, Rebounding: 64, Speed: 96, Finishing: 74}
  },
{
    id: 330,
    name: 'Jaden Springer',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 88, IQ: 76, Athleticism: 88, Passing: 64, Rebounding: 60, Speed: 86, Finishing: 60}
  },
{
    id: 331,
    name: 'Jae Crowder',
    position: 'SF',
    age: 35,
    isRetired: false,
    career: '2012-2024',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 82, IQ: 84, Athleticism: 72, Passing: 70, Rebounding: 72, Speed: 70, Finishing: 58}
  },
{
    id: 332,
    name: 'Jaime Jaquez Jr.',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 82, IQ: 88, Athleticism: 82, Passing: 78, Rebounding: 74, Speed: 78, Finishing: 75}
  },
{
    id: 333,
    name: 'Jakob Poeltl',
    position: 'C',
    age: 30,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 55, Dribbling: 62, Defense: 88, IQ: 86, Athleticism: 76, Passing: 78, Rebounding: 92, Speed: 62, Finishing: 79}
  },
{
    id: 334,
    name: 'Jalen Brunson',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 92, Dribbling: 92, Defense: 78, IQ: 96, Athleticism: 78, Passing: 90, Rebounding: 66, Speed: 86, Finishing: 83}
  },
{
    id: 335,
    name: 'Jalen Duren',
    position: 'C',
    age: 21,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 55, Dribbling: 60, Defense: 82, IQ: 76, Athleticism: 92, Passing: 72, Rebounding: 95, Speed: 72, Finishing: 78}
  },
{
    id: 336,
    name: 'Jalen Green',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 84, Dribbling: 88, Defense: 74, IQ: 78, Athleticism: 96, Passing: 76, Rebounding: 68, Speed: 95, Finishing: 72}
  },
{
    id: 337,
    name: 'Jalen Johnson',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 80, Dribbling: 84, Defense: 82, IQ: 84, Athleticism: 90, Passing: 82, Rebounding: 88, Speed: 85, Finishing: 78}
  },
{
    id: 338,
    name: 'Jalen McDaniels',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2019-2024',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 82, IQ: 74, Athleticism: 82, Passing: 65, Rebounding: 70, Speed: 78, Finishing: 63}
  },
{
    id: 339,
    name: 'Jalen Smith',
    position: 'PF',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 82, Dribbling: 65, Defense: 78, IQ: 75, Athleticism: 80, Passing: 62, Rebounding: 84, Speed: 70, Finishing: 68}
  },
{
    id: 340,
    name: 'Jalen Suggs',
    position: 'SG',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 94, IQ: 86, Athleticism: 88, Passing: 80, Rebounding: 70, Speed: 88, Finishing: 70}
  },
{
    id: 341,
    name: 'Jalen Williams',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 88, Dribbling: 88, Defense: 86, IQ: 92, Athleticism: 88, Passing: 85, Rebounding: 72, Speed: 86, Finishing: 82}
  },
{
    id: 342,
    name: 'Jamal Crawford',
    position: 'SG',
    age: 45,
    isRetired: true,
    career: '2000-2020',
    attributes: {Shooting: 88, Dribbling: 98, Defense: 65, IQ: 88, Athleticism: 82, Passing: 84, Rebounding: 58, Speed: 86, Finishing: 72}
  },
{
    id: 343,
    name: 'Jamal Murray',
    position: 'PG',
    age: 28,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 90, Dribbling: 90, Defense: 78, IQ: 90, Athleticism: 82, Passing: 88, Rebounding: 68, Speed: 84, Finishing: 79}
  },
{
    id: 344,
    name: 'James Anderson',
    position: 'SG',
    age: 36,
    isRetired: true,
    career: '2010-2016',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 70, IQ: 74, Athleticism: 76, Passing: 68, Rebounding: 62, Speed: 78, Finishing: 58}
  },
{
    id: 345,
    name: 'James Augustine',
    position: 'PF',
    age: 41,
    isRetired: true,
    career: '2006-2008',
    attributes: {Shooting: 65, Dribbling: 55, Defense: 70, IQ: 72, Athleticism: 74, Passing: 62, Rebounding: 78, Speed: 64, Finishing: 55}
  },
{
    id: 346,
    name: 'James Bouknight',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2021-2024',
    attributes: {Shooting: 75, Dribbling: 80, Defense: 68, IQ: 68, Athleticism: 86, Passing: 68, Rebounding: 62, Speed: 84, Finishing: 55}
  },
{
    id: 347,
    name: 'James Edwards',
    position: 'C',
    age: 69,
    isRetired: true,
    career: '1977-1996',
    attributes: {Shooting: 84, Dribbling: 58, Defense: 76, IQ: 82, Athleticism: 75, Passing: 65, Rebounding: 80, Speed: 60, Finishing: 78}
  },
{
    id: 348,
    name: 'James Ennis III',
    position: 'SF',
    age: 35,
    isRetired: true,
    career: '2014-2022',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 76, IQ: 72, Athleticism: 84, Passing: 64, Rebounding: 68, Speed: 78, Finishing: 68}
  },
{
    id: 349,
    name: 'James Harden',
    position: 'PG',
    age: 36,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 89, Dribbling: 96, Defense: 72, IQ: 97, Athleticism: 75, Passing: 96, Rebounding: 78, Speed: 80, Finishing: 86}
  },
{
    id: 350,
    name: 'James Johnson',
    position: 'PF',
    age: 38,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 82, IQ: 84, Athleticism: 78, Passing: 80, Rebounding: 70, Speed: 72, Finishing: 73}
  },
{
    id: 351,
    name: 'James Jones',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2003-2017',
    attributes: {Shooting: 88, Dribbling: 62, Defense: 72, IQ: 88, Athleticism: 68, Passing: 68, Rebounding: 60, Speed: 68, Finishing: 43}
  },
{
    id: 352,
    name: 'James Wiseman',
    position: 'C',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 74, IQ: 68, Athleticism: 90, Passing: 60, Rebounding: 84, Speed: 74, Finishing: 68}
  },
{
    id: 353,
    name: 'Jamison Brewer',
    position: 'PG',
    age: 44,
    isRetired: true,
    career: '2001-2005',
    attributes: {Shooting: 64, Dribbling: 76, Defense: 72, IQ: 72, Athleticism: 78, Passing: 75, Rebounding: 60, Speed: 84, Finishing: 52}
  },
{
    id: 354,
    name: 'Jarace Walker',
    position: 'PF',
    age: 22,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 84, IQ: 80, Athleticism: 86, Passing: 78, Rebounding: 78, Speed: 76, Finishing: 65}
  },
{
    id: 355,
    name: 'Jared Dudley',
    position: 'PF',
    age: 40,
    isRetired: true,
    career: '2007-2021',
    attributes: {Shooting: 82, Dribbling: 65, Defense: 74, IQ: 94, Athleticism: 62, Passing: 78, Rebounding: 68, Speed: 60, Finishing: 56}
  },
{
    id: 356,
    name: 'Jared Jeffries',
    position: 'SF',
    age: 43,
    isRetired: true,
    career: '2002-2013',
    attributes: {Shooting: 62, Dribbling: 66, Defense: 84, IQ: 82, Athleticism: 78, Passing: 72, Rebounding: 74, Speed: 72, Finishing: 50}
  },
{
    id: 357,
    name: 'Jaren Jackson Jr.',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 82, Dribbling: 72, Defense: 95, IQ: 88, Athleticism: 88, Passing: 68, Rebounding: 84, Speed: 76, Finishing: 74}
  },
{
    id: 358,
    name: 'Jarred Vanderbilt',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 68, Dribbling: 65, Defense: 90, IQ: 84, Athleticism: 86, Passing: 70, Rebounding: 90, Speed: 78, Finishing: 68}
  },
{
    id: 359,
    name: 'Jarrett Allen',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 60, Dribbling: 58, Defense: 90, IQ: 86, Athleticism: 88, Passing: 72, Rebounding: 92, Speed: 70, Finishing: 82}
  },
{
    id: 360,
    name: 'Jarron Collins',
    position: 'C',
    age: 46,
    isRetired: true,
    career: '2001-2011',
    attributes: {Shooting: 55, Dribbling: 50, Defense: 78, IQ: 84, Athleticism: 68, Passing: 65, Rebounding: 76, Speed: 55, Finishing: 58}
  },
{
    id: 361,
    name: 'Jarvis Hayes',
    position: 'SF',
    age: 44,
    isRetired: true,
    career: '2003-2010',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 70, IQ: 72, Athleticism: 78, Passing: 68, Rebounding: 68, Speed: 75, Finishing: 60}
  },
{
    id: 362,
    name: 'Jason Collins',
    position: 'C',
    age: 46,
    isRetired: true,
    career: '2001-2014',
    attributes: {Shooting: 50, Dribbling: 45, Defense: 82, IQ: 85, Athleticism: 68, Passing: 62, Rebounding: 74, Speed: 55, Finishing: 55}
  },
{
    id: 363,
    name: 'Jason Hart',
    position: 'PG',
    age: 47,
    isRetired: true,
    career: '2000-2010',
    attributes: {Shooting: 74, Dribbling: 80, Defense: 78, IQ: 82, Athleticism: 72, Passing: 82, Rebounding: 60, Speed: 84, Finishing: 58}
  },
{
    id: 364,
    name: 'Jason Kapono',
    position: 'SF',
    age: 44,
    isRetired: true,
    career: '2003-2012',
    attributes: {Shooting: 96, Dribbling: 68, Defense: 62, IQ: 82, Athleticism: 64, Passing: 70, Rebounding: 62, Speed: 68, Finishing: 42}
  },
{
    id: 365,
    name: 'JaVale McGee',
    position: 'C',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 80, IQ: 72, Athleticism: 88, Passing: 60, Rebounding: 84, Speed: 70, Finishing: 78}
  },
{
    id: 366,
    name: 'Javonte Green',
    position: 'SF',
    age: 32,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 76, Dribbling: 72, Defense: 84, IQ: 78, Athleticism: 92, Passing: 66, Rebounding: 76, Speed: 86, Finishing: 76}
  },
{
    id: 367,
    name: 'Jaxson Hayes',
    position: 'C',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 62, Dribbling: 64, Defense: 78, IQ: 70, Athleticism: 94, Passing: 62, Rebounding: 82, Speed: 78, Finishing: 74}
  },
{
    id: 368,
    name: 'Jaylen Adams',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2018-2021',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 70, IQ: 76, Athleticism: 74, Passing: 80, Rebounding: 58, Speed: 84, Finishing: 55}
  },
{
    id: 369,
    name: 'Jaylen Brown',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 88, Dribbling: 88, Defense: 92, IQ: 88, Athleticism: 94, Passing: 80, Rebounding: 78, Speed: 90, Finishing: 82}
  },
{
    id: 370,
    name: 'Jaylin Williams',
    position: 'C',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 80, IQ: 92, Athleticism: 72, Passing: 82, Rebounding: 78, Speed: 66, Finishing: 64}
  },
{
    id: 371,
    name: 'Jayson Tatum',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 92, Dribbling: 90, Defense: 90, IQ: 94, Athleticism: 88, Passing: 88, Rebounding: 88, Speed: 85, Finishing: 80}
  },
{
    id: 372,
    name: 'Jeff Adrien',
    position: 'PF',
    age: 39,
    isRetired: true,
    career: '2010-2015',
    attributes: {Shooting: 60, Dribbling: 55, Defense: 74, IQ: 70, Athleticism: 82, Passing: 58, Rebounding: 86, Speed: 64, Finishing: 64}
  },
{
    id: 373,
    name: 'Jeff Ayres',
    position: 'PF',
    age: 38,
    isRetired: true,
    career: '2009-2016',
    attributes: {Shooting: 68, Dribbling: 54, Defense: 72, IQ: 75, Athleticism: 78, Passing: 60, Rebounding: 78, Speed: 62, Finishing: 63}
  },
{
    id: 374,
    name: 'Jeff Foster',
    position: 'C',
    age: 48,
    isRetired: true,
    career: '1999-2012',
    attributes: {Shooting: 52, Dribbling: 48, Defense: 84, IQ: 85, Athleticism: 76, Passing: 65, Rebounding: 94, Speed: 60, Finishing: 61}
  },
{
    id: 375,
    name: 'Jeff Green',
    position: 'PF',
    age: 39,
    isRetired: false,
    career: '2007-present',
    attributes: {Shooting: 78, Dribbling: 74, Defense: 75, IQ: 85, Athleticism: 80, Passing: 74, Rebounding: 70, Speed: 74, Finishing: 75}
  },
{
    id: 376,
    name: 'Jerami Grant',
    position: 'PF',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 86, Dribbling: 78, Defense: 84, IQ: 82, Athleticism: 88, Passing: 72, Rebounding: 72, Speed: 82, Finishing: 76}
  },
{
    id: 377,
    name: 'Jeremy Sochan',
    position: 'PF',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 86, IQ: 88, Athleticism: 86, Passing: 80, Rebounding: 80, Speed: 82, Finishing: 68}
  },
{
    id: 378,
    name: 'Jericho Sims',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 50, Dribbling: 52, Defense: 78, IQ: 72, Athleticism: 96, Passing: 58, Rebounding: 82, Speed: 76, Finishing: 70}
  },
{
    id: 379,
    name: 'Jermaine Jackson',
    position: 'PG',
    age: 49,
    isRetired: true,
    career: '1999-2006',
    attributes: {Shooting: 70, Dribbling: 80, Defense: 72, IQ: 76, Athleticism: 74, Passing: 78, Rebounding: 58, Speed: 84, Finishing: 55}
  },
{
    id: 380,
    name: 'Jerome Dyson',
    position: 'SG',
    age: 38,
    isRetired: true,
    career: '2012-2012',
    attributes: {Shooting: 74, Dribbling: 82, Defense: 72, IQ: 70, Athleticism: 84, Passing: 72, Rebounding: 60, Speed: 88, Finishing: 55}
  },
{
    id: 381,
    name: 'Jerome Henderson',
    position: 'PF',
    age: 66,
    isRetired: true,
    career: '1985-1986',
    attributes: {Shooting: 60, Dribbling: 50, Defense: 70, IQ: 68, Athleticism: 76, Passing: 55, Rebounding: 78, Speed: 62, Finishing: 53}
  },
{
    id: 382,
    name: 'Jerome Jordan',
    position: 'C',
    age: 38,
    isRetired: true,
    career: '2011-2015',
    attributes: {Shooting: 58, Dribbling: 48, Defense: 72, IQ: 68, Athleticism: 78, Passing: 52, Rebounding: 76, Speed: 58, Finishing: 58}
  },
{
    id: 383,
    name: 'Jevon Carter',
    position: 'PG',
    age: 30,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 84, Dribbling: 76, Defense: 88, IQ: 84, Athleticism: 74, Passing: 75, Rebounding: 62, Speed: 82, Finishing: 55}
  },
{
    id: 384,
    name: 'Jim Ard',
    position: 'C',
    age: 76,
    isRetired: true,
    career: '1970-1978',
    attributes: {Shooting: 65, Dribbling: 52, Defense: 76, IQ: 78, Athleticism: 74, Passing: 64, Rebounding: 80, Speed: 62, Finishing: 62}
  },
{
    id: 385,
    name: 'Jim Jackson',
    position: 'SG',
    age: 55,
    isRetired: true,
    career: '1992-2006',
    attributes: {Shooting: 82, Dribbling: 84, Defense: 78, IQ: 84, Athleticism: 82, Passing: 80, Rebounding: 74, Speed: 78, Finishing: 72}
  },
{
    id: 386,
    name: 'Jimmy Butler',
    position: 'SF',
    age: 36,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 84, Dribbling: 86, Defense: 94, IQ: 97, Athleticism: 84, Passing: 88, Rebounding: 82, Speed: 80, Finishing: 84}
  },
{
    id: 387,
    name: 'Joe Bryant',
    position: 'PF',
    age: 70,
    isRetired: true,
    career: '1975-1983',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 74, IQ: 80, Athleticism: 84, Passing: 78, Rebounding: 78, Speed: 76, Finishing: 70}
  },
{
    id: 388,
    name: 'Joe Crawford',
    position: 'SG',
    age: 39,
    isRetired: true,
    career: '2009-2009',
    attributes: {Shooting: 76, Dribbling: 75, Defense: 68, IQ: 70, Athleticism: 80, Passing: 68, Rebounding: 60, Speed: 82, Finishing: 55}
  },
{
    id: 389,
    name: 'Joe Harris',
    position: 'SG',
    age: 34,
    isRetired: false,
    career: '2014-2024',
    attributes: {Shooting: 92, Dribbling: 72, Defense: 68, IQ: 84, Athleticism: 70, Passing: 72, Rebounding: 62, Speed: 72, Finishing: 54}
  },
{
    id: 390,
    name: 'Joe Ingles',
    position: 'SF',
    age: 38,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 86, Dribbling: 78, Defense: 74, IQ: 96, Athleticism: 62, Passing: 88, Rebounding: 68, Speed: 64, Finishing: 63}
  },
{
    id: 391,
    name: 'Joe Johnson',
    position: 'SG',
    age: 44,
    isRetired: true,
    career: '2001-2022',
    attributes: {Shooting: 92, Dribbling: 94, Defense: 78, IQ: 90, Athleticism: 80, Passing: 84, Rebounding: 74, Speed: 78, Finishing: 76}
  },
{
    id: 392,
    name: 'Joel Anthony',
    position: 'C',
    age: 43,
    isRetired: true,
    career: '2007-2017',
    attributes: {Shooting: 40, Dribbling: 44, Defense: 88, IQ: 82, Athleticism: 78, Passing: 52, Rebounding: 76, Speed: 62, Finishing: 50}
  },
{
    id: 393,
    name: 'Joel Embiid',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 90, Dribbling: 85, Defense: 94, IQ: 94, Athleticism: 88, Passing: 84, Rebounding: 96, Speed: 74, Finishing: 92}
  },
{
    id: 394,
    name: 'Joey Graham',
    position: 'SF',
    age: 43,
    isRetired: true,
    career: '2005-2011',
    attributes: {Shooting: 70, Dribbling: 70, Defense: 74, IQ: 68, Athleticism: 92, Passing: 62, Rebounding: 72, Speed: 85, Finishing: 68}
  },
{
    id: 395,
    name: 'John Barnhill',
    position: 'PG',
    age: 87,
    isRetired: true,
    career: '1962-1972',
    attributes: {Shooting: 75, Dribbling: 78, Defense: 72, IQ: 80, Athleticism: 76, Passing: 82, Rebounding: 60, Speed: 84, Finishing: 62}
  },
{
    id: 396,
    name: 'John Butler Jr.',
    position: 'C',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 78, Dribbling: 64, Defense: 76, IQ: 70, Athleticism: 74, Passing: 60, Rebounding: 70, Speed: 72, Finishing: 52}
  },
{
    id: 397,
    name: 'John Collins',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 82, Dribbling: 70, Defense: 76, IQ: 78, Athleticism: 90, Passing: 68, Rebounding: 88, Speed: 76, Finishing: 79}
  },
{
    id: 398,
    name: 'John Crotty',
    position: 'PG',
    age: 56,
    isRetired: true,
    career: '1992-2003',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 70, IQ: 85, Athleticism: 65, Passing: 82, Rebounding: 55, Speed: 76, Finishing: 55}
  },
{
    id: 399,
    name: 'John Havlicek',
    position: 'SF',
    age: 85,
    isRetired: true,
    career: '1962-1978',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 96, IQ: 99, Athleticism: 90, Passing: 90, Rebounding: 84, Speed: 92, Finishing: 84}
  },
{
    id: 400,
    name: 'John Henson',
    position: 'C',
    age: 34,
    isRetired: true,
    career: '2012-2020',
    attributes: {Shooting: 60, Dribbling: 58, Defense: 85, IQ: 78, Athleticism: 82, Passing: 65, Rebounding: 82, Speed: 68, Finishing: 68}
  },
{
    id: 401,
    name: 'John Johnson',
    position: 'SF',
    age: 78,
    isRetired: true,
    career: '1970-1982',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 80, IQ: 85, Athleticism: 78, Passing: 84, Rebounding: 76, Speed: 75, Finishing: 72}
  },
{
    id: 402,
    name: 'Johnny Davis',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '1976-1986',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 74, IQ: 72, Athleticism: 78, Passing: 70, Rebounding: 64, Speed: 82, Finishing: 58}
  },
{
    id: 403,
    name: 'Johnny Green',
    position: 'PF',
    age: 91,
    isRetired: true,
    career: '1959-1973',
    attributes: {Shooting: 65, Dribbling: 60, Defense: 82, IQ: 84, Athleticism: 92, Passing: 68, Rebounding: 94, Speed: 78, Finishing: 83}
  },
{
    id: 404,
    name: 'Jon Barry',
    position: 'SG',
    age: 56,
    isRetired: true,
    career: '1992-2006',
    attributes: {Shooting: 86, Dribbling: 76, Defense: 72, IQ: 85, Athleticism: 72, Passing: 80, Rebounding: 62, Speed: 78, Finishing: 58}
  },
{
    id: 405,
    name: 'Jonas Jerebko',
    position: 'PF',
    age: 38,
    isRetired: true,
    career: '2009-2019',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 74, IQ: 78, Athleticism: 74, Passing: 70, Rebounding: 78, Speed: 68, Finishing: 63}
  },
{
    id: 406,
    name: 'Jonas Valančiūnas',
    position: 'C',
    age: 33,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 80, Dribbling: 62, Defense: 78, IQ: 84, Athleticism: 72, Passing: 74, Rebounding: 94, Speed: 58, Finishing: 68}
  },
{
    id: 407,
    name: 'Jonathan Kuminga',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 84, IQ: 78, Athleticism: 96, Passing: 72, Rebounding: 76, Speed: 88, Finishing: 82}
  },
{
    id: 408,
    name: 'Jordan Adams',
    position: 'SG',
    age: 31,
    isRetired: true,
    career: '2014-2016',
    attributes: {Shooting: 78, Dribbling: 75, Defense: 72, IQ: 72, Athleticism: 74, Passing: 70, Rebounding: 62, Speed: 78, Finishing: 58}
  },
{
    id: 409,
    name: 'Jordan Clarkson',
    position: 'SG',
    age: 33,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 86, Dribbling: 88, Defense: 68, IQ: 82, Athleticism: 78, Passing: 78, Rebounding: 68, Speed: 85, Finishing: 72}
  },
{
    id: 410,
    name: 'Jordan Crawford',
    position: 'SG',
    age: 37,
    isRetired: true,
    career: '2010-2018',
    attributes: {Shooting: 84, Dribbling: 86, Defense: 65, IQ: 78, Athleticism: 80, Passing: 78, Rebounding: 62, Speed: 84, Finishing: 66}
  },
{
    id: 411,
    name: 'Jordan Farmar',
    position: 'PG',
    age: 38,
    isRetired: true,
    career: '2006-2017',
    attributes: {Shooting: 82, Dribbling: 84, Defense: 72, IQ: 84, Athleticism: 80, Passing: 82, Rebounding: 60, Speed: 86, Finishing: 63}
  },
{
    id: 412,
    name: 'Jordan Hill',
    position: 'C',
    age: 38,
    isRetired: true,
    career: '2009-2017',
    attributes: {Shooting: 68, Dribbling: 60, Defense: 74, IQ: 70, Athleticism: 82, Passing: 58, Rebounding: 88, Speed: 68, Finishing: 71}
  },
{
    id: 413,
    name: 'Jordan Nwora',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 84, Dribbling: 74, Defense: 68, IQ: 72, Athleticism: 76, Passing: 66, Rebounding: 70, Speed: 74, Finishing: 60}
  },
{
    id: 414,
    name: 'Jordan Poole',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 84, Dribbling: 92, Defense: 65, IQ: 75, Athleticism: 82, Passing: 84, Rebounding: 62, Speed: 88, Finishing: 71}
  },
{
    id: 415,
    name: 'Jorge Gutiérrez',
    position: 'PG',
    age: 36,
    isRetired: true,
    career: '2013-2016',
    attributes: {Shooting: 70, Dribbling: 78, Defense: 78, IQ: 82, Athleticism: 72, Passing: 78, Rebounding: 60, Speed: 80, Finishing: 57}
  },
{
    id: 416,
    name: 'José Calderón',
    position: 'PG',
    age: 44,
    isRetired: true,
    career: '2005-2019',
    attributes: {Shooting: 90, Dribbling: 84, Defense: 62, IQ: 96, Athleticism: 65, Passing: 94, Rebounding: 58, Speed: 76, Finishing: 65}
  },
{
    id: 417,
    name: 'Josh Childress',
    position: 'SF',
    age: 42,
    isRetired: true,
    career: '2004-2013',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 78, IQ: 82, Athleticism: 85, Passing: 75, Rebounding: 76, Speed: 82, Finishing: 76}
  },
{
    id: 418,
    name: 'Josh Giddey',
    position: 'PG',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 76, Dribbling: 85, Defense: 74, IQ: 94, Athleticism: 78, Passing: 94, Rebounding: 84, Speed: 80, Finishing: 72}
  },
{
    id: 419,
    name: 'Josh Grant',
    position: 'PF',
    age: 57,
    isRetired: true,
    career: '1993-1994',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 70, IQ: 74, Athleticism: 72, Passing: 65, Rebounding: 74, Speed: 64, Finishing: 50}
  },
{
    id: 420,
    name: 'Josh Green',
    position: 'SG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 82, IQ: 80, Athleticism: 88, Passing: 75, Rebounding: 68, Speed: 90, Finishing: 74}
  },
{
    id: 421,
    name: 'Josh Harrellson',
    position: 'C',
    age: 36,
    isRetired: true,
    career: '2011-2014',
    attributes: {Shooting: 78, Dribbling: 55, Defense: 72, IQ: 75, Athleticism: 72, Passing: 65, Rebounding: 82, Speed: 60, Finishing: 59}
  },
{
    id: 422,
    name: 'Josh Hart',
    position: 'SF',
    age: 30,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 88, IQ: 92, Athleticism: 85, Passing: 84, Rebounding: 95, Speed: 82, Finishing: 81}
  },
{
    id: 423,
    name: 'Josh Howard',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2003-2013',
    attributes: {Shooting: 82, Dribbling: 82, Defense: 85, IQ: 84, Athleticism: 86, Passing: 76, Rebounding: 80, Speed: 82, Finishing: 75}
  },
{
    id: 424,
    name: 'Josh Jackson',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2017-2022',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 78, IQ: 70, Athleticism: 90, Passing: 72, Rebounding: 70, Speed: 88, Finishing: 64}
  },
{
    id: 425,
    name: 'Josh Richardson',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 84, IQ: 82, Athleticism: 78, Passing: 76, Rebounding: 68, Speed: 82, Finishing: 67}
  },
{
    id: 426,
    name: 'Jrue Holiday',
    position: 'PG',
    age: 35,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 86, Dribbling: 88, Defense: 97, IQ: 96, Athleticism: 82, Passing: 88, Rebounding: 76, Speed: 84, Finishing: 81}
  },
{
    id: 427,
    name: 'JT Thor',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 74, Dribbling: 68, Defense: 78, IQ: 72, Athleticism: 86, Passing: 62, Rebounding: 74, Speed: 76, Finishing: 62}
  },
{
    id: 428,
    name: 'Juancho Hernangómez',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2016-2023',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 74, IQ: 80, Athleticism: 76, Passing: 70, Rebounding: 78, Speed: 70, Finishing: 64}
  },
{
    id: 429,
    name: 'Julian Strawther',
    position: 'SF',
    age: 23,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 84, Dribbling: 74, Defense: 72, IQ: 78, Athleticism: 78, Passing: 70, Rebounding: 66, Speed: 80, Finishing: 61}
  },
{
    id: 430,
    name: 'Julius Erving',
    position: 'SF',
    age: 75,
    isRetired: true,
    career: '1976-1987',
    attributes: {Shooting: 88, Dribbling: 92, Defense: 90, IQ: 94, Athleticism: 99, Passing: 88, Rebounding: 88, Speed: 96, Finishing: 96}
  },
{
    id: 431,
    name: 'Julius Hodge',
    position: 'SG',
    age: 41,
    isRetired: true,
    career: '2005-2007',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 74, IQ: 76, Athleticism: 78, Passing: 78, Rebounding: 68, Speed: 82, Finishing: 58}
  },
{
    id: 432,
    name: 'Julius Randle',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 84, Dribbling: 84, Defense: 78, IQ: 88, Athleticism: 88, Passing: 85, Rebounding: 94, Speed: 76, Finishing: 81}
  },
{
    id: 433,
    name: 'Jumaine Jones',
    position: 'SF',
    age: 46,
    isRetired: true,
    career: '1999-2007',
    attributes: {Shooting: 80, Dribbling: 70, Defense: 74, IQ: 75, Athleticism: 80, Passing: 68, Rebounding: 76, Speed: 76, Finishing: 62}
  },
{
    id: 434,
    name: 'Justin Holiday',
    position: 'SG',
    age: 36,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 82, IQ: 84, Athleticism: 76, Passing: 72, Rebounding: 64, Speed: 78, Finishing: 58}
  },
{
    id: 435,
    name: 'Justin Jackson',
    position: 'SF',
    age: 30,
    isRetired: false,
    career: '2017-2023',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 72, IQ: 75, Athleticism: 74, Passing: 70, Rebounding: 62, Speed: 75, Finishing: 61}
  },
{
    id: 436,
    name: 'Jusuf Nurkić',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 84, IQ: 88, Athleticism: 72, Passing: 86, Rebounding: 95, Speed: 58, Finishing: 74}
  },
{
    id: 437,
    name: 'Juwan Howard',
    position: 'PF',
    age: 52,
    isRetired: true,
    career: '1994-2013',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 78, IQ: 92, Athleticism: 78, Passing: 82, Rebounding: 84, Speed: 68, Finishing: 78}
  },
{
    id: 438,
    name: 'K.C. Jones',
    position: 'PG',
    age: 88,
    isRetired: true,
    career: '1958-1967',
    attributes: {Shooting: 68, Dribbling: 82, Defense: 96, IQ: 98, Athleticism: 84, Passing: 88, Rebounding: 65, Speed: 88, Finishing: 61}
  },
{
    id: 439,
    name: 'Kai Jones',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 70, Dribbling: 74, Defense: 76, IQ: 68, Athleticism: 95, Passing: 62, Rebounding: 78, Speed: 86, Finishing: 68}
  },
{
    id: 440,
    name: 'Kaniel Dickens',
    position: 'SF',
    age: 47,
    isRetired: true,
    career: '2000-2008',
    attributes: {Shooting: 70, Dribbling: 68, Defense: 68, IQ: 65, Athleticism: 82, Passing: 58, Rebounding: 68, Speed: 78, Finishing: 55}
  },
{
    id: 441,
    name: 'Kareem Abdul-Jabbar',
    position: 'C',
    age: 78,
    isRetired: true,
    career: '1969-1989',
    attributes: {Shooting: 98, Dribbling: 74, Defense: 96, IQ: 99, Athleticism: 92, Passing: 88, Rebounding: 98, Speed: 78, Finishing: 99}
  },
{
    id: 442,
    name: 'Kawhi Leonard',
    position: 'SF',
    age: 34,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 94, Dribbling: 90, Defense: 98, IQ: 97, Athleticism: 88, Passing: 84, Rebounding: 84, Speed: 82, Finishing: 89}
  },
{
    id: 443,
    name: 'Keita Bates-Diop',
    position: 'SF',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 72, Defense: 78, IQ: 80, Athleticism: 78, Passing: 68, Rebounding: 72, Speed: 74, Finishing: 67}
  },
{
    id: 444,
    name: 'Keldon Johnson',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 76, IQ: 80, Athleticism: 86, Passing: 74, Rebounding: 76, Speed: 84, Finishing: 77}
  },
{
    id: 445,
    name: 'Kelenna Azubuike',
    position: 'SG',
    age: 41,
    isRetired: true,
    career: '2006-2012',
    attributes: {Shooting: 84, Dribbling: 76, Defense: 78, IQ: 78, Athleticism: 88, Passing: 68, Rebounding: 70, Speed: 84, Finishing: 71}
  },
{
    id: 446,
    name: 'Kemba Walker',
    position: 'PG',
    age: 35,
    isRetired: true,
    career: '2011-2023',
    attributes: {Shooting: 88, Dribbling: 96, Defense: 65, IQ: 92, Athleticism: 82, Passing: 88, Rebounding: 58, Speed: 94, Finishing: 73}
  },
{
    id: 447,
    name: 'Ken Bannister',
    position: 'PF',
    age: 65,
    isRetired: true,
    career: '1984-1991',
    attributes: {Shooting: 62, Dribbling: 55, Defense: 74, IQ: 70, Athleticism: 84, Passing: 58, Rebounding: 82, Speed: 68, Finishing: 70}
  },
{
    id: 448,
    name: 'Kenneth Faried',
    position: 'PF',
    age: 35,
    isRetired: true,
    career: '2011-2019',
    attributes: {Shooting: 55, Dribbling: 62, Defense: 78, IQ: 80, Athleticism: 94, Passing: 60, Rebounding: 95, Speed: 82, Finishing: 80}
  },
{
    id: 449,
    name: 'Kenny Anderson',
    position: 'PG',
    age: 55,
    isRetired: true,
    career: '1991-2005',
    attributes: {Shooting: 84, Dribbling: 96, Defense: 78, IQ: 92, Athleticism: 85, Passing: 94, Rebounding: 60, Speed: 92, Finishing: 74}
  },
{
    id: 450,
    name: 'Kenrich Williams',
    position: 'PF',
    age: 30,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 75, Dribbling: 68, Defense: 79, IQ: 82, Athleticism: 72, Passing: 71, Rebounding: 74, Speed: 72, Finishing: 67}
  },
{
    id: 451,
    name: 'Kentavious Caldwell-Pope',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 84, Dribbling: 70, Defense: 86, IQ: 84, Athleticism: 76, Passing: 70, Rebounding: 65, Speed: 78, Finishing: 69}
  },
{
    id: 452,
    name: 'Kenyon Martin Jr.',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 71, IQ: 70, Athleticism: 91, Passing: 66, Rebounding: 73, Speed: 84, Finishing: 81}
  },
{
    id: 453,
    name: 'Keon Clark',
    position: 'C',
    age: 50,
    isRetired: true,
    career: '1998-2004',
    attributes: {Shooting: 62, Dribbling: 58, Defense: 80, IQ: 72, Athleticism: 88, Passing: 60, Rebounding: 82, Speed: 76, Finishing: 75}
  },
{
    id: 454,
    name: 'Keon Johnson',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 72, Dribbling: 75, Defense: 74, IQ: 68, Athleticism: 94, Passing: 69, Rebounding: 64, Speed: 89, Finishing: 65}
  },
{
    id: 455,
    name: 'Kevin Duckworth',
    position: 'C',
    age: 61,
    isRetired: true,
    career: '1986-1997',
    attributes: {Shooting: 76, Dribbling: 52, Defense: 70, IQ: 78, Athleticism: 65, Passing: 62, Rebounding: 84, Speed: 60, Finishing: 74}
  },
{
    id: 456,
    name: 'Kevin Durant',
    position: 'PF',
    age: 37,
    isRetired: false,
    career: '2007-present',
    attributes: {Shooting: 98, Dribbling: 92, Defense: 82, IQ: 96, Athleticism: 85, Passing: 85, Rebounding: 76, Speed: 81, Finishing: 91}
  },
{
    id: 457,
    name: 'Kevin Edwards',
    position: 'SG',
    age: 60,
    isRetired: true,
    career: '1988-2001',
    attributes: {Shooting: 77, Dribbling: 76, Defense: 74, IQ: 75, Athleticism: 78, Passing: 73, Rebounding: 64, Speed: 79, Finishing: 68}
  },
{
    id: 458,
    name: 'Kevin Garnett',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1995-2016',
    attributes: {Shooting: 84, Dribbling: 82, Defense: 99, IQ: 98, Athleticism: 92, Passing: 86, Rebounding: 97, Speed: 84, Finishing: 86}
  },
{
    id: 459,
    name: 'Kevin Huerter',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 85, Dribbling: 76, Defense: 70, IQ: 79, Athleticism: 74, Passing: 78, Rebounding: 66, Speed: 77, Finishing: 63}
  },
{
    id: 460,
    name: 'Kevin Johnson',
    position: 'PG',
    age: 59,
    isRetired: true,
    career: '1987-2000',
    attributes: {Shooting: 80, Dribbling: 93, Defense: 78, IQ: 92, Athleticism: 94, Passing: 95, Rebounding: 64, Speed: 95, Finishing: 84}
  },
{
    id: 461,
    name: 'Kevin Jones',
    position: 'PF',
    age: 36,
    isRetired: true,
    career: '2012-2013',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 66, IQ: 70, Athleticism: 70, Passing: 61, Rebounding: 78, Speed: 65, Finishing: 59}
  },
{
    id: 462,
    name: 'Kevin Knox II',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 72, Dribbling: 70, Defense: 65, IQ: 66, Athleticism: 82, Passing: 64, Rebounding: 68, Speed: 76, Finishing: 58}
  },
{
    id: 463,
    name: 'Kevin Love',
    position: 'PF',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 85, Dribbling: 70, Defense: 68, IQ: 94, Athleticism: 65, Passing: 88, Rebounding: 92, Speed: 62, Finishing: 76}
  },
{
    id: 464,
    name: 'Kevin Porter Jr.',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 81, Dribbling: 88, Defense: 70, IQ: 72, Athleticism: 84, Passing: 80, Rebounding: 68, Speed: 85, Finishing: 70}
  },
{
    id: 465,
    name: 'Kevon Looney',
    position: 'C',
    age: 29,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 62, Dribbling: 60, Defense: 82, IQ: 90, Athleticism: 68, Passing: 77, Rebounding: 92, Speed: 60, Finishing: 76}
  },
{
    id: 466,
    name: 'Keyon Dooling',
    position: 'PG',
    age: 45,
    isRetired: true,
    career: '2000-2013',
    attributes: {Shooting: 76, Dribbling: 82, Defense: 75, IQ: 78, Athleticism: 84, Passing: 76, Rebounding: 60, Speed: 88, Finishing: 62}
  },
{
    id: 467,
    name: 'Khris Middleton',
    position: 'SF',
    age: 34,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 90, Dribbling: 82, Defense: 78, IQ: 88, Athleticism: 72, Passing: 84, Rebounding: 70, Speed: 74, Finishing: 74}
  },
{
    id: 468,
    name: 'Killian Hayes',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 66, Dribbling: 78, Defense: 77, IQ: 75, Athleticism: 74, Passing: 82, Rebounding: 64, Speed: 80, Finishing: 54}
  },
{
    id: 469,
    name: 'Klay Thompson',
    position: 'SG',
    age: 35,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 94, Dribbling: 72, Defense: 76, IQ: 90, Athleticism: 70, Passing: 72, Rebounding: 66, Speed: 74, Finishing: 62}
  },
{
    id: 470,
    name: 'Kobe Bryant',
    position: 'SG',
    age: 47,
    isRetired: true,
    career: '1996-2016',
    attributes: {Shooting: 95, Dribbling: 95, Defense: 96, IQ: 98, Athleticism: 94, Passing: 86, Rebounding: 78, Speed: 92, Finishing: 90}
  },
{
    id: 471,
    name: 'Kornél Dávid',
    position: 'PF',
    age: 54,
    isRetired: true,
    career: '1998-2001',
    attributes: {Shooting: 70, Dribbling: 60, Defense: 65, IQ: 72, Athleticism: 74, Passing: 63, Rebounding: 72, Speed: 68, Finishing: 58}
  },
{
    id: 472,
    name: 'Kostas Antetokounmpo',
    position: 'PF',
    age: 28,
    isRetired: true,
    career: '2018-2021',
    attributes: {Shooting: 58, Dribbling: 62, Defense: 74, IQ: 64, Athleticism: 88, Passing: 58, Rebounding: 72, Speed: 78, Finishing: 62}
  },
{
    id: 473,
    name: 'Kris Dunn',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 88, IQ: 80, Athleticism: 82, Passing: 78, Rebounding: 68, Speed: 84, Finishing: 61}
  },
{
    id: 474,
    name: 'Kyle Anderson',
    position: 'PF',
    age: 32,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 74, Dribbling: 80, Defense: 84, IQ: 95, Athleticism: 62, Passing: 86, Rebounding: 74, Speed: 60, Finishing: 68}
  },
{
    id: 475,
    name: 'Kyle Lowry',
    position: 'PG',
    age: 39,
    isRetired: false,
    career: '2006-present',
    attributes: {Shooting: 82, Dribbling: 84, Defense: 78, IQ: 96, Athleticism: 68, Passing: 88, Rebounding: 70, Speed: 76, Finishing: 74}
  },
{
    id: 476,
    name: 'Kyrie Irving',
    position: 'PG',
    age: 33,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 95, Dribbling: 99, Defense: 76, IQ: 94, Athleticism: 82, Passing: 88, Rebounding: 65, Speed: 90, Finishing: 93}
  },
{
    id: 477,
    name: 'Kyrylo Fesenko',
    position: 'C',
    age: 38,
    isRetired: true,
    career: '2007-2012',
    attributes: {Shooting: 52, Dribbling: 48, Defense: 72, IQ: 65, Athleticism: 74, Passing: 55, Rebounding: 78, Speed: 58, Finishing: 63}
  },
{
    id: 478,
    name: 'Lamar Stevens',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 68, Dribbling: 66, Defense: 82, IQ: 74, Athleticism: 80, Passing: 64, Rebounding: 72, Speed: 74, Finishing: 69}
  },
{
    id: 479,
    name: 'LaMarcus Aldridge',
    position: 'PF',
    age: 40,
    isRetired: true,
    career: '2006-2022',
    attributes: {Shooting: 90, Dribbling: 70, Defense: 76, IQ: 88, Athleticism: 72, Passing: 74, Rebounding: 86, Speed: 65, Finishing: 83}
  },
{
    id: 480,
    name: 'LaMelo Ball',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 86, Dribbling: 94, Defense: 72, IQ: 92, Athleticism: 84, Passing: 96, Rebounding: 80, Speed: 88, Finishing: 72}
  },
{
    id: 481,
    name: 'LaPhonso Ellis',
    position: 'PF',
    age: 55,
    isRetired: true,
    career: '1992-2003',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 76, IQ: 80, Athleticism: 88, Passing: 72, Rebounding: 84, Speed: 78, Finishing: 78}
  },
{
    id: 482,
    name: 'Larry Johnson',
    position: 'PF',
    age: 56,
    isRetired: true,
    career: '1991-2001',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 78, IQ: 88, Athleticism: 94, Passing: 78, Rebounding: 90, Speed: 82, Finishing: 84}
  },
{
    id: 483,
    name: 'Lauri Markkanen',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 91, Dribbling: 78, Defense: 74, IQ: 85, Athleticism: 82, Passing: 72, Rebounding: 86, Speed: 76, Finishing: 81}
  },
{
    id: 484,
    name: 'Lavoy Allen',
    position: 'C',
    age: 36,
    isRetired: true,
    career: '2011-2017',
    attributes: {Shooting: 65, Dribbling: 55, Defense: 72, IQ: 75, Athleticism: 68, Passing: 68, Rebounding: 78, Speed: 60, Finishing: 64}
  },
{
    id: 485,
    name: 'LeBron James',
    position: 'PF',
    age: 41,
    isRetired: false,
    career: '2003-present',
    attributes: {Shooting: 88, Dribbling: 92, Defense: 84, IQ: 99, Athleticism: 88, Passing: 97, Rebounding: 85, Speed: 84, Finishing: 95}
  },
{
    id: 486,
    name: 'Ledell Eackles',
    position: 'SG',
    age: 59,
    isRetired: true,
    career: '1988-1995',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 68, IQ: 72, Athleticism: 76, Passing: 68, Rebounding: 62, Speed: 78, Finishing: 65}
  },
{
    id: 487,
    name: 'Leroy Ellis',
    position: 'C',
    age: 85,
    isRetired: true,
    career: '1962-1976',
    attributes: {Shooting: 68, Dribbling: 50, Defense: 76, IQ: 78, Athleticism: 72, Passing: 62, Rebounding: 88, Speed: 64, Finishing: 71}
  },
{
    id: 488,
    name: 'LiAngelo Ball',
    position: 'SG',
    age: 27,
    isRetired: true,
    career: '2021-2022',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 62, IQ: 68, Athleticism: 72, Passing: 65, Rebounding: 64, Speed: 70, Finishing: 48}
  },
{
    id: 489,
    name: 'Lindell Wigginton',
    position: 'PG',
    age: 27,
    isRetired: true,
    career: '2021-2024',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 68, IQ: 70, Athleticism: 80, Passing: 74, Rebounding: 60, Speed: 84, Finishing: 58}
  },
{
    id: 490,
    name: 'Lindy Waters III',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 72, IQ: 75, Athleticism: 70, Passing: 68, Rebounding: 62, Speed: 74, Finishing: 55}
  },
{
    id: 491,
    name: 'Linton Johnson',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2003-2009',
    attributes: {Shooting: 68, Dribbling: 64, Defense: 76, IQ: 72, Athleticism: 80, Passing: 62, Rebounding: 70, Speed: 75, Finishing: 58}
  },
{
    id: 492,
    name: 'Lonnie Walker IV',
    position: 'SG',
    age: 27,
    isRetired: true,
    career: '2018-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 68, IQ: 72, Athleticism: 92, Passing: 70, Rebounding: 65, Speed: 90, Finishing: 74}
  },
{
    id: 493,
    name: 'Lonzo Ball',
    position: 'PG',
    age: 28,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 82, Dribbling: 82, Defense: 88, IQ: 94, Athleticism: 78, Passing: 92, Rebounding: 78, Speed: 82, Finishing: 59}
  },
{
    id: 494,
    name: 'Lucious Harris',
    position: 'SG',
    age: 55,
    isRetired: true,
    career: '1993-2005',
    attributes: {Shooting: 80, Dribbling: 75, Defense: 74, IQ: 78, Athleticism: 76, Passing: 74, Rebounding: 64, Speed: 78, Finishing: 65}
  },
{
    id: 495,
    name: 'Luguentz Dort',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 81, Dribbling: 74, Defense: 92, IQ: 82, Athleticism: 85, Passing: 70, Rebounding: 72, Speed: 82, Finishing: 66}
  },
{
    id: 496,
    name: 'Luka Dončić',
    position: 'PG',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 92, Dribbling: 98, Defense: 78, IQ: 99, Athleticism: 80, Passing: 98, Rebounding: 88, Speed: 82, Finishing: 91}
  },
{
    id: 497,
    name: 'Luke Babbitt',
    position: 'SF',
    age: 36,
    isRetired: true,
    career: '2010-2018',
    attributes: {Shooting: 84, Dribbling: 62, Defense: 60, IQ: 74, Athleticism: 68, Passing: 66, Rebounding: 68, Speed: 65, Finishing: 48}
  },
{
    id: 498,
    name: 'Luke Jackson',
    position: 'SF',
    age: 44,
    isRetired: true,
    career: '2004-2008',
    attributes: {Shooting: 75, Dribbling: 70, Defense: 66, IQ: 76, Athleticism: 74, Passing: 72, Rebounding: 64, Speed: 72, Finishing: 49}
  },
{
    id: 499,
    name: 'Luke Kornet',
    position: 'C',
    age: 30,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 78, IQ: 85, Athleticism: 70, Passing: 75, Rebounding: 78, Speed: 64, Finishing: 71}
  },
{
    id: 500,
    name: 'Luol Deng',
    position: 'SF',
    age: 40,
    isRetired: true,
    career: '2004-2019',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 88, IQ: 92, Athleticism: 82, Passing: 80, Rebounding: 84, Speed: 78, Finishing: 77}
  },
{
    id: 501,
    name: 'Luther Head',
    position: 'SG',
    age: 43,
    isRetired: true,
    career: '2005-2011',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 72, IQ: 75, Athleticism: 76, Passing: 76, Rebounding: 62, Speed: 82, Finishing: 48}
  },
{
    id: 502,
    name: 'Maceo Baston',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '2002-2009',
    attributes: {Shooting: 65, Dribbling: 62, Defense: 74, IQ: 72, Athleticism: 82, Passing: 60, Rebounding: 76, Speed: 74, Finishing: 68}
  },
{
    id: 503,
    name: 'Magic Johnson',
    position: 'PG',
    age: 66,
    isRetired: true,
    career: '1979-1996',
    attributes: {Shooting: 78, Dribbling: 96, Defense: 85, IQ: 99, Athleticism: 88, Passing: 99, Rebounding: 90, Speed: 88, Finishing: 88}
  },
{
    id: 504,
    name: 'Mahmoud Abdul-Rauf',
    position: 'PG',
    age: 56,
    isRetired: true,
    career: '1990-2001',
    attributes: {Shooting: 92, Dribbling: 94, Defense: 70, IQ: 88, Athleticism: 82, Passing: 82, Rebounding: 58, Speed: 92, Finishing: 65}
  },
{
    id: 505,
    name: 'Major Jones',
    position: 'PF',
    age: 72,
    isRetired: true,
    career: '1979-1985',
    attributes: {Shooting: 60, Dribbling: 55, Defense: 72, IQ: 74, Athleticism: 72, Passing: 62, Rebounding: 84, Speed: 66, Finishing: 58}
  },
{
    id: 506,
    name: 'Malaki Branham',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 65, IQ: 76, Athleticism: 78, Passing: 74, Rebounding: 64, Speed: 78, Finishing: 64}
  },
{
    id: 507,
    name: 'Malcolm Brogdon',
    position: 'PG',
    age: 33,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 88, Dribbling: 84, Defense: 82, IQ: 94, Athleticism: 74, Passing: 86, Rebounding: 72, Speed: 76, Finishing: 74}
  },
{
    id: 508,
    name: 'Malcolm Hill',
    position: 'SF',
    age: 30,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 75, Dribbling: 70, Defense: 74, IQ: 74, Athleticism: 72, Passing: 68, Rebounding: 68, Speed: 72, Finishing: 52}
  },
{
    id: 509,
    name: 'Malik Allen',
    position: 'PF',
    age: 47,
    isRetired: true,
    career: '2001-2011',
    attributes: {Shooting: 76, Dribbling: 58, Defense: 74, IQ: 76, Athleticism: 68, Passing: 64, Rebounding: 74, Speed: 62, Finishing: 58}
  },
{
    id: 510,
    name: 'Malik Beasley',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 88, Dribbling: 76, Defense: 70, IQ: 76, Athleticism: 82, Passing: 70, Rebounding: 66, Speed: 80, Finishing: 55}
  },
{
    id: 511,
    name: 'Manu Ginóbili',
    position: 'SG',
    age: 48,
    isRetired: true,
    career: '2002-2018',
    attributes: {Shooting: 86, Dribbling: 92, Defense: 85, IQ: 98, Athleticism: 84, Passing: 90, Rebounding: 72, Speed: 86, Finishing: 85}
  },
{
    id: 512,
    name: 'Marc Gasol',
    position: 'C',
    age: 41,
    isRetired: true,
    career: '2008-2021',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 94, IQ: 98, Athleticism: 65, Passing: 91, Rebounding: 88, Speed: 62, Finishing: 76}
  },
{
    id: 513,
    name: 'Marc Jackson',
    position: 'C',
    age: 51,
    isRetired: true,
    career: '2000-2007',
    attributes: {Shooting: 74, Dribbling: 62, Defense: 70, IQ: 78, Athleticism: 68, Passing: 68, Rebounding: 82, Speed: 60, Finishing: 68}
  },
{
    id: 514,
    name: 'Marcin Gortat',
    position: 'C',
    age: 41,
    isRetired: true,
    career: '2007-2019',
    attributes: {Shooting: 72, Dribbling: 64, Defense: 82, IQ: 85, Athleticism: 78, Passing: 74, Rebounding: 90, Speed: 68, Finishing: 78}
  },
{
    id: 515,
    name: 'Marcus Smart',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 94, IQ: 92, Athleticism: 82, Passing: 84, Rebounding: 70, Speed: 82, Finishing: 62}
  },
{
    id: 516,
    name: 'Mardy Collins',
    position: 'SG',
    age: 41,
    isRetired: true,
    career: '2006-2010',
    attributes: {Shooting: 68, Dribbling: 78, Defense: 74, IQ: 72, Athleticism: 78, Passing: 76, Rebounding: 64, Speed: 80, Finishing: 52}
  },
{
    id: 517,
    name: 'Mario Elie',
    position: 'SF',
    age: 62,
    isRetired: true,
    career: '1990-2001',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 85, IQ: 88, Athleticism: 78, Passing: 76, Rebounding: 68, Speed: 78, Finishing: 68}
  },
{
    id: 518,
    name: 'Mario Hezonja',
    position: 'SF',
    age: 30,
    isRetired: true,
    career: '2015-2020',
    attributes: {Shooting: 78, Dribbling: 80, Defense: 68, IQ: 72, Athleticism: 88, Passing: 72, Rebounding: 74, Speed: 82, Finishing: 64}
  },
{
    id: 519,
    name: 'MarJon Beauchamp',
    position: 'SF',
    age: 25,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 76, IQ: 72, Athleticism: 85, Passing: 68, Rebounding: 70, Speed: 80, Finishing: 62}
  },
{
    id: 520,
    name: 'Mark Blount',
    position: 'C',
    age: 49,
    isRetired: true,
    career: '2000-2009',
    attributes: {Shooting: 76, Dribbling: 58, Defense: 72, IQ: 74, Athleticism: 68, Passing: 64, Rebounding: 78, Speed: 60, Finishing: 62}
  },
{
    id: 521,
    name: 'Mark Jackson',
    position: 'PG',
    age: 60,
    isRetired: true,
    career: '1987-2004',
    attributes: {Shooting: 75, Dribbling: 88, Defense: 78, IQ: 98, Athleticism: 65, Passing: 97, Rebounding: 74, Speed: 72, Finishing: 72}
  },
{
    id: 522,
    name: 'Mark Jones',
    position: 'SF',
    age: 50,
    isRetired: true,
    career: '1983-2005',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 70, IQ: 70, Athleticism: 78, Passing: 66, Rebounding: 64, Speed: 76, Finishing: 55}
  },
{
    id: 523,
    name: 'Mark Williams',
    position: 'C',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 82, IQ: 78, Athleticism: 82, Passing: 64, Rebounding: 88, Speed: 68, Finishing: 78}
  },
{
    id: 524,
    name: 'Markelle Fultz',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 70, Dribbling: 88, Defense: 78, IQ: 84, Athleticism: 84, Passing: 86, Rebounding: 68, Speed: 85, Finishing: 73}
  },
{
    id: 525,
    name: 'Marko Simonović',
    position: 'C',
    age: 26,
    isRetired: true,
    career: '2021-2023',
    attributes: {Shooting: 74, Dribbling: 60, Defense: 65, IQ: 70, Athleticism: 72, Passing: 65, Rebounding: 74, Speed: 68, Finishing: 58}
  },
{
    id: 526,
    name: 'Marques Johnson',
    position: 'SF',
    age: 69,
    isRetired: true,
    career: '1977-1989',
    attributes: {Shooting: 84, Dribbling: 85, Defense: 82, IQ: 92, Athleticism: 90, Passing: 88, Rebounding: 84, Speed: 84, Finishing: 84}
  },
{
    id: 527,
    name: 'Marvin Bagley III',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 66, IQ: 68, Athleticism: 86, Passing: 64, Rebounding: 84, Speed: 76, Finishing: 75}
  },
{
    id: 528,
    name: 'Marvin Barnes',
    position: 'PF',
    age: 73,
    isRetired: true,
    career: '1976-1980',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 80, IQ: 75, Athleticism: 92, Passing: 70, Rebounding: 94, Speed: 82, Finishing: 78}
  },
{
    id: 529,
    name: 'Mason Plumlee',
    position: 'C',
    age: 35,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 62, Dribbling: 70, Defense: 74, IQ: 84, Athleticism: 78, Passing: 85, Rebounding: 84, Speed: 70, Finishing: 74}
  },
{
    id: 530,
    name: 'Matisse Thybulle',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 74, Dribbling: 68, Defense: 92, IQ: 84, Athleticism: 84, Passing: 66, Rebounding: 64, Speed: 82, Finishing: 54}
  },
{
    id: 531,
    name: 'Matt Barnes',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2003-2017',
    attributes: {Shooting: 78, Dribbling: 74, Defense: 82, IQ: 85, Athleticism: 78, Passing: 76, Rebounding: 74, Speed: 76, Finishing: 66}
  },
{
    id: 532,
    name: 'Matt Bonner',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '2004-2016',
    attributes: {Shooting: 88, Dribbling: 58, Defense: 65, IQ: 84, Athleticism: 62, Passing: 70, Rebounding: 68, Speed: 60, Finishing: 45}
  },
{
    id: 533,
    name: 'Matt Carroll',
    position: 'SG',
    age: 45,
    isRetired: true,
    career: '2003-2013',
    attributes: {Shooting: 84, Dribbling: 68, Defense: 62, IQ: 76, Athleticism: 68, Passing: 68, Rebounding: 60, Speed: 70, Finishing: 44}
  },
{
    id: 534,
    name: 'Matthew Dellavedova',
    position: 'PG',
    age: 35,
    isRetired: true,
    career: '2013-2023',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 82, IQ: 88, Athleticism: 70, Passing: 84, Rebounding: 62, Speed: 74, Finishing: 52}
  },
{
    id: 535,
    name: 'Maurice Cheeks',
    position: 'PG',
    age: 69,
    isRetired: true,
    career: '1978-1993',
    attributes: {Shooting: 82, Dribbling: 90, Defense: 95, IQ: 96, Athleticism: 86, Passing: 92, Rebounding: 68, Speed: 92, Finishing: 80}
  },
{
    id: 536,
    name: 'Max Christie',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 76, IQ: 74, Athleticism: 78, Passing: 68, Rebounding: 66, Speed: 78, Finishing: 58}
  },
{
    id: 537,
    name: 'Max Strus',
    position: 'SF',
    age: 29,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 86, Dribbling: 75, Defense: 74, IQ: 82, Athleticism: 78, Passing: 74, Rebounding: 70, Speed: 76, Finishing: 58}
  },
{
    id: 538,
    name: 'Maxi Kleber',
    position: 'PF',
    age: 33,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 80, Dribbling: 64, Defense: 82, IQ: 84, Athleticism: 72, Passing: 68, Rebounding: 74, Speed: 68, Finishing: 62}
  },
{
    id: 539,
    name: 'Metta World Peace (Ron Artest)',
    position: 'SF',
    age: 46,
    isRetired: true,
    career: '1999-2017',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 98, IQ: 88, Athleticism: 84, Passing: 78, Rebounding: 82, Speed: 78, Finishing: 68}
  },
{
    id: 540,
    name: 'Mfiondu Kabengele',
    position: 'C',
    age: 28,
    isRetired: true,
    career: '2019-2023',
    attributes: {Shooting: 70, Dribbling: 62, Defense: 72, IQ: 68, Athleticism: 82, Passing: 60, Rebounding: 78, Speed: 70, Finishing: 64}
  },
{
    id: 541,
    name: 'Michael Adams',
    position: 'PG',
    age: 62,
    isRetired: true,
    career: '1985-1996',
    attributes: {Shooting: 84, Dribbling: 88, Defense: 75, IQ: 88, Athleticism: 82, Passing: 90, Rebounding: 64, Speed: 92, Finishing: 58}
  },
{
    id: 542,
    name: 'Michael Carter-Williams',
    position: 'PG',
    age: 34,
    isRetired: true,
    career: '2013-2023',
    attributes: {Shooting: 65, Dribbling: 80, Defense: 82, IQ: 78, Athleticism: 84, Passing: 84, Rebounding: 78, Speed: 85, Finishing: 58}
  },
{
    id: 543,
    name: 'Michael Cooper',
    position: 'SG',
    age: 69,
    isRetired: true,
    career: '1978-1990',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 98, IQ: 95, Athleticism: 90, Passing: 82, Rebounding: 72, Speed: 90, Finishing: 65}
  },
{
    id: 544,
    name: 'Michael Curry',
    position: 'SF',
    age: 57,
    isRetired: true,
    career: '1993-2005',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 82, IQ: 84, Athleticism: 74, Passing: 70, Rebounding: 68, Speed: 74, Finishing: 52}
  },
{
    id: 545,
    name: 'Michael Doleac',
    position: 'C',
    age: 48,
    isRetired: true,
    career: '1998-2008',
    attributes: {Shooting: 78, Dribbling: 55, Defense: 70, IQ: 78, Athleticism: 65, Passing: 66, Rebounding: 74, Speed: 60, Finishing: 58}
  },
{
    id: 546,
    name: 'Michael Finley',
    position: 'SF',
    age: 52,
    isRetired: true,
    career: '1995-2010',
    attributes: {Shooting: 86, Dribbling: 82, Defense: 80, IQ: 88, Athleticism: 90, Passing: 78, Rebounding: 75, Speed: 85, Finishing: 78}
  },
{
    id: 547,
    name: 'Michael Hawkins',
    position: 'PG',
    age: 53,
    isRetired: true,
    career: '1996-2001',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 70, IQ: 72, Athleticism: 76, Passing: 76, Rebounding: 60, Speed: 82, Finishing: 48}
  },
{
    id: 548,
    name: 'Michael Holton',
    position: 'PG',
    age: 64,
    isRetired: true,
    career: '1984-1992',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 72, IQ: 75, Athleticism: 74, Passing: 78, Rebounding: 60, Speed: 80, Finishing: 58}
  },
{
    id: 549,
    name: 'Michael Jackson',
    position: 'PG',
    age: 61,
    isRetired: true,
    career: '1987-1990',
    attributes: {Shooting: 72, Dribbling: 76, Defense: 70, IQ: 74, Athleticism: 74, Passing: 76, Rebounding: 58, Speed: 78, Finishing: 50}
  },
{
    id: 550,
    name: 'Michael Jordan',
    position: 'SG',
    age: 62,
    isRetired: true,
    career: '1984-2003',
    attributes: {Shooting: 92, Dribbling: 94, Defense: 98, IQ: 99, Athleticism: 98, Passing: 85, Rebounding: 78, Speed: 96, Finishing: 98}
  },
{
    id: 551,
    name: 'Michael Porter Jr.',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 92, Dribbling: 76, Defense: 74, IQ: 78, Athleticism: 84, Passing: 68, Rebounding: 84, Speed: 78, Finishing: 76}
  },
{
    id: 552,
    name: 'Mickey Johnson',
    position: 'PF',
    age: 73,
    isRetired: true,
    career: '1974-1986',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 75, IQ: 78, Athleticism: 78, Passing: 75, Rebounding: 86, Speed: 74, Finishing: 70}
  },
{
    id: 553,
    name: 'Mikal Bridges',
    position: 'SF',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 86, Dribbling: 82, Defense: 92, IQ: 90, Athleticism: 82, Passing: 78, Rebounding: 72, Speed: 82, Finishing: 76}
  },
{
    id: 554,
    name: 'Mike Bibby',
    position: 'PG',
    age: 47,
    isRetired: true,
    career: '1998-2012',
    attributes: {Shooting: 88, Dribbling: 88, Defense: 74, IQ: 92, Athleticism: 78, Passing: 90, Rebounding: 64, Speed: 84, Finishing: 64}
  },
{
    id: 555,
    name: 'Mike Conley Jr.',
    position: 'PG',
    age: 38,
    isRetired: false,
    career: '2007-present',
    attributes: {Shooting: 88, Dribbling: 86, Defense: 78, IQ: 96, Athleticism: 72, Passing: 90, Rebounding: 62, Speed: 78, Finishing: 74}
  },
{
    id: 556,
    name: 'Mike Dunleavy Jr.',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2002-2017',
    attributes: {Shooting: 86, Dribbling: 78, Defense: 74, IQ: 88, Athleticism: 70, Passing: 82, Rebounding: 72, Speed: 72, Finishing: 62}
  },
{
    id: 557,
    name: 'Mike Dunleavy Sr.',
    position: 'SG',
    age: 71,
    isRetired: true,
    career: '1976-1990',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 72, IQ: 92, Athleticism: 72, Passing: 84, Rebounding: 64, Speed: 74, Finishing: 64}
  },
{
    id: 558,
    name: 'Mike Gminski',
    position: 'C',
    age: 66,
    isRetired: true,
    career: '1980-1994',
    attributes: {Shooting: 82, Dribbling: 58, Defense: 76, IQ: 84, Athleticism: 68, Passing: 72, Rebounding: 88, Speed: 62, Finishing: 70}
  },
{
    id: 559,
    name: 'Mike Muscala',
    position: 'C',
    age: 34,
    isRetired: true,
    career: '2013-2024',
    attributes: {Shooting: 82, Dribbling: 62, Defense: 68, IQ: 80, Athleticism: 68, Passing: 70, Rebounding: 72, Speed: 64, Finishing: 58}
  },
{
    id: 560,
    name: 'Miles McBride',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 86, IQ: 82, Athleticism: 82, Passing: 74, Rebounding: 62, Speed: 85, Finishing: 56}
  },
{
    id: 561,
    name: 'Miloš Babić',
    position: 'C',
    age: 57,
    isRetired: true,
    career: '1990-1992',
    attributes: {Shooting: 65, Dribbling: 50, Defense: 66, IQ: 68, Athleticism: 72, Passing: 60, Rebounding: 74, Speed: 62, Finishing: 50}
  },
{
    id: 562,
    name: 'Mitchell Robinson',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 50, Dribbling: 52, Defense: 88, IQ: 78, Athleticism: 86, Passing: 60, Rebounding: 94, Speed: 74, Finishing: 82}
  },
{
    id: 563,
    name: 'Mo Bamba',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 82, IQ: 72, Athleticism: 82, Passing: 62, Rebounding: 82, Speed: 72, Finishing: 64}
  },
{
    id: 564,
    name: 'Monta Ellis',
    position: 'SG',
    age: 40,
    isRetired: true,
    career: '2005-2017',
    attributes: {Shooting: 80, Dribbling: 92, Defense: 72, IQ: 78, Athleticism: 94, Passing: 82, Rebounding: 64, Speed: 97, Finishing: 82}
  },
{
    id: 565,
    name: 'Montrezl Harrell',
    position: 'C',
    age: 31,
    isRetired: true,
    career: '2015-2023',
    attributes: {Shooting: 68, Dribbling: 72, Defense: 74, IQ: 78, Athleticism: 88, Passing: 68, Rebounding: 82, Speed: 78, Finishing: 81}
  },
{
    id: 566,
    name: 'Mookie Blaylock',
    position: 'PG',
    age: 58,
    isRetired: true,
    career: '1989-2002',
    attributes: {Shooting: 80, Dribbling: 86, Defense: 96, IQ: 94, Athleticism: 82, Passing: 88, Rebounding: 70, Speed: 88, Finishing: 58}
  },
{
    id: 567,
    name: 'Moritz Wagner',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 74, Defense: 72, IQ: 84, Athleticism: 76, Passing: 76, Rebounding: 78, Speed: 72, Finishing: 72}
  },
{
    id: 568,
    name: 'Moses Moody',
    position: 'SG',
    age: 23,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 80, Dribbling: 74, Defense: 78, IQ: 79, Athleticism: 78, Passing: 70, Rebounding: 70, Speed: 76, Finishing: 62}
  },
{
    id: 569,
    name: 'Myles Turner',
    position: 'C',
    age: 29,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 85, Dribbling: 65, Defense: 90, IQ: 84, Athleticism: 80, Passing: 68, Rebounding: 84, Speed: 72, Finishing: 72}
  },
{
    id: 570,
    name: 'Nassir Little',
    position: 'SF',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 76, IQ: 72, Athleticism: 88, Passing: 66, Rebounding: 72, Speed: 82, Finishing: 63}
  },
{
    id: 571,
    name: 'Nemanja Bjelica',
    position: 'PF',
    age: 37,
    isRetired: true,
    career: '2015-2022',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 72, IQ: 90, Athleticism: 68, Passing: 84, Rebounding: 78, Speed: 64, Finishing: 60}
  },
{
    id: 572,
    name: 'Nenê Hilário',
    position: 'C',
    age: 43,
    isRetired: true,
    career: '2002-2020',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 82, IQ: 85, Athleticism: 86, Passing: 78, Rebounding: 84, Speed: 75, Finishing: 80}
  },
{
    id: 573,
    name: 'Nick Anderson',
    position: 'SG',
    age: 57,
    isRetired: true,
    career: '1989-2002',
    attributes: {Shooting: 84, Dribbling: 80, Defense: 82, IQ: 84, Athleticism: 88, Passing: 76, Rebounding: 72, Speed: 84, Finishing: 72}
  },
{
    id: 574,
    name: 'Nick Collison',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '2004-2018',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 82, IQ: 94, Athleticism: 72, Passing: 78, Rebounding: 80, Speed: 66, Finishing: 68}
  },
{
    id: 575,
    name: 'Nick Fazekas',
    position: 'C',
    age: 40,
    isRetired: true,
    career: '2007-2008',
    attributes: {Shooting: 78, Dribbling: 60, Defense: 62, IQ: 75, Athleticism: 64, Passing: 68, Rebounding: 80, Speed: 58, Finishing: 48}
  },
{
    id: 576,
    name: 'Nick Richards',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 60, Dribbling: 54, Defense: 78, IQ: 74, Athleticism: 82, Passing: 60, Rebounding: 86, Speed: 68, Finishing: 74}
  },
{
    id: 577,
    name: 'Nickeil Alexander-Walker',
    position: 'SG',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 88, IQ: 84, Athleticism: 78, Passing: 78, Rebounding: 66, Speed: 82, Finishing: 60}
  },
{
    id: 578,
    name: 'Nicolas Batum',
    position: 'PF',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 84, Dribbling: 76, Defense: 85, IQ: 95, Athleticism: 70, Passing: 86, Rebounding: 74, Speed: 70, Finishing: 64}
  },
{
    id: 579,
    name: 'Nicolas Claxton',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 58, Dribbling: 68, Defense: 91, IQ: 82, Athleticism: 86, Passing: 68, Rebounding: 88, Speed: 78, Finishing: 78}
  },
{
    id: 580,
    name: 'Nikola Jokić',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 88, Dribbling: 85, Defense: 78, IQ: 99, Athleticism: 70, Passing: 99, Rebounding: 95, Speed: 68, Finishing: 93}
  },
{
    id: 581,
    name: 'Nikola Jović',
    position: 'PF',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 80, Dribbling: 82, Defense: 74, IQ: 80, Athleticism: 76, Passing: 82, Rebounding: 74, Speed: 75, Finishing: 64}
  },
{
    id: 582,
    name: 'Nikola Vučević',
    position: 'C',
    age: 35,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 84, Dribbling: 74, Defense: 72, IQ: 88, Athleticism: 68, Passing: 82, Rebounding: 94, Speed: 62, Finishing: 75}
  },
{
    id: 583,
    name: 'Noah Vonleh',
    position: 'PF',
    age: 30,
    isRetired: true,
    career: '2014-2023',
    attributes: {Shooting: 70, Dribbling: 65, Defense: 74, IQ: 70, Athleticism: 82, Passing: 64, Rebounding: 82, Speed: 72, Finishing: 62}
  },
{
    id: 584,
    name: 'Obi Toppin',
    position: 'PF',
    age: 27,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 68, IQ: 78, Athleticism: 94, Passing: 74, Rebounding: 72, Speed: 84, Finishing: 78}
  },
{
    id: 585,
    name: 'OG Anunoby',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 86, Dribbling: 76, Defense: 95, IQ: 88, Athleticism: 84, Passing: 72, Rebounding: 74, Speed: 80, Finishing: 74}
  },
{
    id: 586,
    name: 'Olivier Sarr',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 72, Dribbling: 60, Defense: 74, IQ: 72, Athleticism: 78, Passing: 64, Rebounding: 78, Speed: 68, Finishing: 60}
  },
{
    id: 587,
    name: 'Omer Yurtseven',
    position: 'C',
    age: 27,
    isRetired: true,
    career: '2021-2024',
    attributes: {Shooting: 70, Dribbling: 60, Defense: 70, IQ: 74, Athleticism: 74, Passing: 66, Rebounding: 85, Speed: 65, Finishing: 66}
  },
{
    id: 588,
    name: 'Omri Casspi',
    position: 'SF',
    age: 37,
    isRetired: true,
    career: '2009-2019',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 72, IQ: 80, Athleticism: 75, Passing: 76, Rebounding: 74, Speed: 74, Finishing: 64}
  },
{
    id: 589,
    name: 'Onyeka Okongwu',
    position: 'C',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 72, Dribbling: 65, Defense: 85, IQ: 82, Athleticism: 86, Passing: 68, Rebounding: 84, Speed: 76, Finishing: 76}
  },
{
    id: 590,
    name: 'Oshae Brissett',
    position: 'PF',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 76, Dribbling: 70, Defense: 78, IQ: 75, Athleticism: 84, Passing: 66, Rebounding: 74, Speed: 78, Finishing: 64}
  },
{
    id: 591,
    name: 'Othella Harrington',
    position: 'PF',
    age: 51,
    isRetired: true,
    career: '1996-2008',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 74, IQ: 76, Athleticism: 78, Passing: 64, Rebounding: 80, Speed: 68, Finishing: 68}
  },
{
    id: 592,
    name: 'Otto Porter Jr.',
    position: 'SF',
    age: 32,
    isRetired: true,
    career: '2013-2024',
    attributes: {Shooting: 85, Dribbling: 74, Defense: 84, IQ: 88, Athleticism: 72, Passing: 76, Rebounding: 76, Speed: 72, Finishing: 62}
  },
{
    id: 593,
    name: 'Ousmane Dieng',
    position: 'PF',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 74, Dribbling: 78, Defense: 76, IQ: 75, Athleticism: 82, Passing: 76, Rebounding: 72, Speed: 78, Finishing: 58}
  },
{
    id: 594,
    name: 'P.J. Tucker',
    position: 'PF',
    age: 40,
    isRetired: false,
    career: '2006-present',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 85, IQ: 92, Athleticism: 68, Passing: 68, Rebounding: 72, Speed: 65, Finishing: 52}
  },
{
    id: 595,
    name: 'P.J. Washington',
    position: 'PF',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 82, IQ: 84, Athleticism: 80, Passing: 74, Rebounding: 78, Speed: 76, Finishing: 68}
  },
{
    id: 596,
    name: 'Paolo Banchero',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 85, Dribbling: 90, Defense: 80, IQ: 92, Athleticism: 91, Passing: 88, Rebounding: 86, Speed: 84, Finishing: 78}
  },
{
    id: 597,
    name: 'Pascal Siakam',
    position: 'PF',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 84, Dribbling: 88, Defense: 84, IQ: 90, Athleticism: 86, Passing: 86, Rebounding: 82, Speed: 82, Finishing: 83}
  },
{
    id: 598,
    name: 'Pat Connaughton',
    position: 'SG',
    age: 32,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 82, Dribbling: 72, Defense: 74, IQ: 80, Athleticism: 90, Passing: 70, Rebounding: 74, Speed: 80, Finishing: 62}
  },
{
    id: 599,
    name: 'Pat Garrity',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1998-2008',
    attributes: {Shooting: 85, Dribbling: 64, Defense: 65, IQ: 82, Athleticism: 68, Passing: 72, Rebounding: 68, Speed: 66, Finishing: 46}
  },
{
    id: 600,
    name: 'Patrick Ewing',
    position: 'C',
    age: 63,
    isRetired: true,
    career: '1985-2002',
    attributes: {Shooting: 82, Dribbling: 65, Defense: 96, IQ: 94, Athleticism: 88, Passing: 70, Rebounding: 94, Speed: 72, Finishing: 88}
  },
{
    id: 601,
    name: 'Patrick Williams',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 78, Dribbling: 70, Defense: 82, IQ: 76, Athleticism: 85, Passing: 68, Rebounding: 75, Speed: 78, Finishing: 68}
  },
{
    id: 602,
    name: 'Pau Gasol',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '2001-2019',
    attributes: {Shooting: 84, Dribbling: 75, Defense: 88, IQ: 97, Athleticism: 78, Passing: 90, Rebounding: 92, Speed: 68, Finishing: 88}
  },
{
    id: 603,
    name: 'Paul George',
    position: 'SF',
    age: 35,
    isRetired: false,
    career: '2010-present',
    attributes: {Shooting: 91, Dribbling: 88, Defense: 88, IQ: 90, Athleticism: 84, Passing: 82, Rebounding: 78, Speed: 84, Finishing: 82}
  },
{
    id: 604,
    name: 'Paul Reed',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 78, IQ: 72, Athleticism: 84, Passing: 60, Rebounding: 82, Speed: 76, Finishing: 72}
  },
{
    id: 605,
    name: 'Payton Pritchard',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 86, Dribbling: 84, Defense: 72, IQ: 82, Athleticism: 75, Passing: 80, Rebounding: 64, Speed: 85, Finishing: 58}
  },
{
    id: 606,
    name: 'Perry Jones III',
    position: 'SF',
    age: 33,
    isRetired: true,
    career: '2012-2015',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 68, IQ: 66, Athleticism: 86, Passing: 65, Rebounding: 70, Speed: 80, Finishing: 65}
  },
{
    id: 607,
    name: 'Pervis Ellison',
    position: 'C',
    age: 58,
    isRetired: true,
    career: '1989-2000',
    attributes: {Shooting: 74, Dribbling: 60, Defense: 82, IQ: 78, Athleticism: 78, Passing: 72, Rebounding: 85, Speed: 68, Finishing: 75}
  },
{
    id: 608,
    name: 'Pete Chilcutt',
    position: 'PF',
    age: 56,
    isRetired: true,
    career: '1991-2000',
    attributes: {Shooting: 78, Dribbling: 55, Defense: 65, IQ: 74, Athleticism: 66, Passing: 68, Rebounding: 72, Speed: 60, Finishing: 55}
  },
{
    id: 609,
    name: 'Peyton Watson',
    position: 'SF',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 68, Dribbling: 72, Defense: 85, IQ: 75, Athleticism: 88, Passing: 70, Rebounding: 74, Speed: 84, Finishing: 72}
  },
{
    id: 610,
    name: 'Phil Chenier',
    position: 'SG',
    age: 75,
    isRetired: true,
    career: '1971-1981',
    attributes: {Shooting: 85, Dribbling: 84, Defense: 80, IQ: 85, Athleticism: 82, Passing: 78, Rebounding: 68, Speed: 84, Finishing: 76}
  },
{
    id: 611,
    name: 'Phil Jackson',
    position: 'PF',
    age: 80,
    isRetired: true,
    career: '1967-1980',
    attributes: {Shooting: 70, Dribbling: 62, Defense: 82, IQ: 98, Athleticism: 68, Passing: 78, Rebounding: 76, Speed: 60, Finishing: 64}
  },
{
    id: 612,
    name: 'Pierre Jackson',
    position: 'PG',
    age: 34,
    isRetired: true,
    career: '2016-2017',
    attributes: {Shooting: 76, Dribbling: 82, Defense: 60, IQ: 70, Athleticism: 80, Passing: 78, Rebounding: 55, Speed: 88, Finishing: 55}
  },
{
    id: 613,
    name: 'Popeye Jones',
    position: 'PF',
    age: 55,
    isRetired: true,
    career: '1993-2004',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 74, IQ: 80, Athleticism: 70, Passing: 66, Rebounding: 92, Speed: 58, Finishing: 68}
  },
{
    id: 614,
    name: 'Quentin Grimes',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 82, IQ: 78, Athleticism: 80, Passing: 70, Rebounding: 68, Speed: 82, Finishing: 65}
  },
{
    id: 615,
    name: 'Quincy Acy',
    position: 'PF',
    age: 35,
    isRetired: true,
    career: '2012-2019',
    attributes: {Shooting: 70, Dribbling: 60, Defense: 76, IQ: 72, Athleticism: 82, Passing: 62, Rebounding: 78, Speed: 70, Finishing: 72}
  },
{
    id: 616,
    name: 'Quinn Buckner',
    position: 'PG',
    age: 71,
    isRetired: true,
    career: '1976-1986',
    attributes: {Shooting: 68, Dribbling: 78, Defense: 88, IQ: 90, Athleticism: 75, Passing: 84, Rebounding: 65, Speed: 80, Finishing: 58}
  },
{
    id: 617,
    name: 'R.J. Hampton',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 70, Dribbling: 76, Defense: 65, IQ: 68, Athleticism: 85, Passing: 74, Rebounding: 62, Speed: 88, Finishing: 64}
  },
{
    id: 618,
    name: 'Randolph Childress',
    position: 'PG',
    age: 53,
    isRetired: true,
    career: '1995-1997',
    attributes: {Shooting: 76, Dribbling: 78, Defense: 62, IQ: 75, Athleticism: 72, Passing: 78, Rebounding: 58, Speed: 78, Finishing: 52}
  },
{
    id: 619,
    name: 'Randy Breuer',
    position: 'C',
    age: 65,
    isRetired: true,
    career: '1983-1994',
    attributes: {Shooting: 66, Dribbling: 50, Defense: 75, IQ: 72, Athleticism: 65, Passing: 60, Rebounding: 78, Speed: 55, Finishing: 68}
  },
{
    id: 620,
    name: 'Randy Foye',
    position: 'SG',
    age: 42,
    isRetired: true,
    career: '2006-2017',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 70, IQ: 76, Athleticism: 78, Passing: 76, Rebounding: 64, Speed: 80, Finishing: 62}
  },
{
    id: 621,
    name: 'Rastko Cvetković',
    position: 'C',
    age: 55,
    isRetired: true,
    career: '1995-1996',
    attributes: {Shooting: 60, Dribbling: 45, Defense: 62, IQ: 65, Athleticism: 60, Passing: 55, Rebounding: 68, Speed: 50, Finishing: 48}
  },
{
    id: 622,
    name: 'Rasual Butler',
    position: 'SF',
    age: 46,
    isRetired: true,
    career: '2002-2016',
    attributes: {Shooting: 80, Dribbling: 68, Defense: 74, IQ: 75, Athleticism: 75, Passing: 65, Rebounding: 68, Speed: 72, Finishing: 58}
  },
{
    id: 623,
    name: 'Raul Neto',
    position: 'PG',
    age: 33,
    isRetired: false,
    career: '2015-2023',
    attributes: {Shooting: 75, Dribbling: 78, Defense: 72, IQ: 82, Athleticism: 70, Passing: 78, Rebounding: 60, Speed: 78, Finishing: 64}
  },
{
    id: 624,
    name: 'Rawle Alkins',
    position: 'SG',
    age: 28,
    isRetired: true,
    career: '2018-2019',
    attributes: {Shooting: 68, Dribbling: 72, Defense: 70, IQ: 68, Athleticism: 82, Passing: 68, Rebounding: 70, Speed: 78, Finishing: 62}
  },
{
    id: 625,
    name: 'Ray Allen',
    position: 'SG',
    age: 50,
    isRetired: true,
    career: '1996-2014',
    attributes: {Shooting: 99, Dribbling: 84, Defense: 78, IQ: 95, Athleticism: 82, Passing: 80, Rebounding: 70, Speed: 84, Finishing: 78}
  },
{
    id: 626,
    name: 'Raymond Felton',
    position: 'PG',
    age: 41,
    isRetired: true,
    career: '2005-2019',
    attributes: {Shooting: 78, Dribbling: 84, Defense: 74, IQ: 80, Athleticism: 78, Passing: 85, Rebounding: 64, Speed: 82, Finishing: 68}
  },
{
    id: 627,
    name: 'Reggie Bullock',
    position: 'SF',
    age: 34,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 82, Dribbling: 65, Defense: 78, IQ: 78, Athleticism: 72, Passing: 68, Rebounding: 68, Speed: 74, Finishing: 48}
  },
{
    id: 628,
    name: 'Reggie Harding',
    position: 'C',
    age: 85,
    isRetired: true,
    career: '1963-1968',
    attributes: {Shooting: 64, Dribbling: 58, Defense: 78, IQ: 70, Athleticism: 75, Passing: 68, Rebounding: 84, Speed: 65, Finishing: 72}
  },
{
    id: 629,
    name: 'Reggie Jackson',
    position: 'PG',
    age: 35,
    isRetired: false,
    career: '2011-present',
    attributes: {Shooting: 80, Dribbling: 85, Defense: 68, IQ: 78, Athleticism: 78, Passing: 80, Rebounding: 62, Speed: 82, Finishing: 76}
  },
{
    id: 630,
    name: 'Reggie Johnson',
    position: 'PF',
    age: 68,
    isRetired: true,
    career: '1980-1984',
    attributes: {Shooting: 72, Dribbling: 60, Defense: 75, IQ: 74, Athleticism: 75, Passing: 64, Rebounding: 80, Speed: 68, Finishing: 74}
  },
{
    id: 631,
    name: 'Renaldo Balkman',
    position: 'PF',
    age: 41,
    isRetired: true,
    career: '2006-2012',
    attributes: {Shooting: 65, Dribbling: 68, Defense: 80, IQ: 72, Athleticism: 84, Passing: 66, Rebounding: 78, Speed: 76, Finishing: 70}
  },
{
    id: 632,
    name: 'Rex Chapman',
    position: 'SG',
    age: 58,
    isRetired: true,
    career: '1988-2000',
    attributes: {Shooting: 84, Dribbling: 80, Defense: 68, IQ: 78, Athleticism: 90, Passing: 76, Rebounding: 65, Speed: 86, Finishing: 75}
  },
{
    id: 633,
    name: 'Rich Johnson',
    position: 'C',
    age: 79,
    isRetired: true,
    career: '1968-1971',
    attributes: {Shooting: 62, Dribbling: 50, Defense: 72, IQ: 70, Athleticism: 70, Passing: 58, Rebounding: 76, Speed: 62, Finishing: 60}
  },
{
    id: 634,
    name: 'Richard Hamilton (Rip)',
    position: 'SG',
    age: 47,
    isRetired: true,
    career: '1999-2013',
    attributes: {Shooting: 88, Dribbling: 80, Defense: 78, IQ: 88, Athleticism: 78, Passing: 76, Rebounding: 68, Speed: 84, Finishing: 72}
  },
{
    id: 635,
    name: 'Richard Jefferson',
    position: 'SF',
    age: 45,
    isRetired: true,
    career: '2001-2018',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 80, IQ: 85, Athleticism: 90, Passing: 76, Rebounding: 75, Speed: 85, Finishing: 84}
  },
{
    id: 636,
    name: 'Richaun Holmes',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 75, Dribbling: 60, Defense: 76, IQ: 74, Athleticism: 82, Passing: 64, Rebounding: 80, Speed: 72, Finishing: 82}
  },
{
    id: 637,
    name: 'Rick Barry',
    position: 'SF',
    age: 81,
    isRetired: true,
    career: '1965-1980',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 85, IQ: 98, Athleticism: 82, Passing: 90, Rebounding: 84, Speed: 82, Finishing: 87}
  },
{
    id: 638,
    name: 'Rick Brunson',
    position: 'PG',
    age: 53,
    isRetired: true,
    career: '1997-2006',
    attributes: {Shooting: 70, Dribbling: 78, Defense: 78, IQ: 88, Athleticism: 70, Passing: 82, Rebounding: 60, Speed: 75, Finishing: 58}
  },
{
    id: 639,
    name: 'Rick Fox',
    position: 'SF',
    age: 56,
    isRetired: true,
    career: '1991-2004',
    attributes: {Shooting: 78, Dribbling: 74, Defense: 84, IQ: 90, Athleticism: 76, Passing: 78, Rebounding: 74, Speed: 74, Finishing: 70}
  },
{
    id: 640,
    name: 'Rickey Green',
    position: 'PG',
    age: 71,
    isRetired: true,
    career: '1977-1992',
    attributes: {Shooting: 78, Dribbling: 86, Defense: 82, IQ: 86, Athleticism: 84, Passing: 88, Rebounding: 62, Speed: 95, Finishing: 74}
  },
{
    id: 641,
    name: 'Ricky Rubio',
    position: 'PG',
    age: 35,
    isRetired: true,
    career: '2011-2024',
    attributes: {Shooting: 74, Dribbling: 88, Defense: 85, IQ: 96, Athleticism: 72, Passing: 96, Rebounding: 70, Speed: 78, Finishing: 54}
  },
{
    id: 642,
    name: 'RJ Barrett',
    position: 'SF',
    age: 25,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 80, Dribbling: 82, Defense: 75, IQ: 78, Athleticism: 84, Passing: 78, Rebounding: 74, Speed: 82, Finishing: 74}
  },
{
    id: 643,
    name: 'Robert Williams III',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 60, Dribbling: 58, Defense: 92, IQ: 85, Athleticism: 94, Passing: 78, Rebounding: 90, Speed: 78, Finishing: 86}
  },
{
    id: 644,
    name: 'Robin Jones',
    position: 'C',
    age: 71,
    isRetired: true,
    career: '1976-1977',
    attributes: {Shooting: 62, Dribbling: 48, Defense: 70, IQ: 68, Athleticism: 72, Passing: 55, Rebounding: 75, Speed: 60, Finishing: 62}
  },
{
    id: 645,
    name: 'Robin Lopez',
    position: 'C',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 72, Dribbling: 55, Defense: 78, IQ: 84, Athleticism: 65, Passing: 68, Rebounding: 78, Speed: 58, Finishing: 74}
  },
{
    id: 646,
    name: 'Rod Higgins',
    position: 'SF',
    age: 65,
    isRetired: true,
    career: '1982-1995',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 72, IQ: 80, Athleticism: 72, Passing: 70, Rebounding: 70, Speed: 72, Finishing: 60}
  },
{
    id: 647,
    name: 'Rodney Hood',
    position: 'SG',
    age: 33,
    isRetired: true,
    career: '2014-2023',
    attributes: {Shooting: 82, Dribbling: 76, Defense: 68, IQ: 74, Athleticism: 76, Passing: 70, Rebounding: 65, Speed: 78, Finishing: 63}
  },
{
    id: 648,
    name: 'Rodney McGruder',
    position: 'SG',
    age: 34,
    isRetired: false,
    career: '2016-2023',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 75, IQ: 78, Athleticism: 74, Passing: 66, Rebounding: 64, Speed: 74, Finishing: 58}
  },
{
    id: 649,
    name: 'Romeo Langford',
    position: 'SG',
    age: 26,
    isRetired: false,
    career: '2019-2023',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 78, IQ: 72, Athleticism: 78, Passing: 65, Rebounding: 65, Speed: 78, Finishing: 62}
  },
{
    id: 650,
    name: 'Ron Johnson',
    position: 'PF',
    age: 78,
    isRetired: true,
    career: '1968-1970',
    attributes: {Shooting: 65, Dribbling: 55, Defense: 70, IQ: 68, Athleticism: 72, Passing: 60, Rebounding: 76, Speed: 60, Finishing: 58}
  },
{
    id: 651,
    name: 'Rondae Hollis-Jefferson',
    position: 'SF',
    age: 31,
    isRetired: false,
    career: '2015-2021',
    attributes: {Shooting: 66, Dribbling: 74, Defense: 82, IQ: 76, Athleticism: 82, Passing: 72, Rebounding: 78, Speed: 78, Finishing: 68}
  },
{
    id: 652,
    name: 'Ronnie Brewer',
    position: 'SG',
    age: 40,
    isRetired: true,
    career: '2006-2014',
    attributes: {Shooting: 64, Dribbling: 70, Defense: 86, IQ: 78, Athleticism: 85, Passing: 72, Rebounding: 68, Speed: 82, Finishing: 74}
  },
{
    id: 653,
    name: 'Roy Hibbert',
    position: 'C',
    age: 39,
    isRetired: true,
    career: '2008-2017',
    attributes: {Shooting: 68, Dribbling: 45, Defense: 92, IQ: 84, Athleticism: 60, Passing: 64, Rebounding: 84, Speed: 45, Finishing: 72}
  },
{
    id: 654,
    name: 'Rudy Fernandez',
    position: 'SG',
    age: 40,
    isRetired: true,
    career: '2008-2012',
    attributes: {Shooting: 84, Dribbling: 80, Defense: 76, IQ: 90, Athleticism: 85, Passing: 82, Rebounding: 65, Speed: 82, Finishing: 68}
  },
{
    id: 655,
    name: 'Rudy Gay',
    position: 'SF',
    age: 39,
    isRetired: true,
    career: '2006-2023',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 78, IQ: 80, Athleticism: 88, Passing: 72, Rebounding: 78, Speed: 82, Finishing: 58}
  },
{
    id: 656,
    name: 'Rudy Gobert',
    position: 'C',
    age: 33,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 55, Dribbling: 48, Defense: 98, IQ: 92, Athleticism: 84, Passing: 68, Rebounding: 97, Speed: 68, Finishing: 78}
  },
{
    id: 657,
    name: 'Rui Hachimura',
    position: 'PF',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 74, IQ: 76, Athleticism: 82, Passing: 66, Rebounding: 75, Speed: 76, Finishing: 76}
  },
{
    id: 658,
    name: 'Russell Westbrook',
    position: 'PG',
    age: 37,
    isRetired: false,
    career: '2008-present',
    attributes: {Shooting: 72, Dribbling: 86, Defense: 75, IQ: 78, Athleticism: 90, Passing: 85, Rebounding: 84, Speed: 92, Finishing: 83}
  },
{
    id: 659,
    name: 'Ryan Anderson',
    position: 'PF',
    age: 37,
    isRetired: true,
    career: '2008-2020',
    attributes: {Shooting: 88, Dribbling: 62, Defense: 65, IQ: 80, Athleticism: 68, Passing: 68, Rebounding: 78, Speed: 64, Finishing: 52}
  },
{
    id: 660,
    name: 'Ryan Arcidiacono',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 75, Dribbling: 74, Defense: 70, IQ: 85, Athleticism: 68, Passing: 78, Rebounding: 58, Speed: 74, Finishing: 50}
  },
{
    id: 661,
    name: 'Ryan Bowen',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1999-2009',
    attributes: {Shooting: 62, Dribbling: 58, Defense: 82, IQ: 84, Athleticism: 76, Passing: 65, Rebounding: 72, Speed: 70, Finishing: 60}
  },
{
    id: 662,
    name: 'Saddiq Bey',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 74, IQ: 76, Athleticism: 78, Passing: 68, Rebounding: 75, Speed: 75, Finishing: 66}
  },
{
    id: 663,
    name: 'Sam Cassell',
    position: 'PG',
    age: 56,
    isRetired: true,
    career: '1993-2008',
    attributes: {Shooting: 85, Dribbling: 88, Defense: 78, IQ: 94, Athleticism: 75, Passing: 88, Rebounding: 68, Speed: 80, Finishing: 74}
  },
{
    id: 664,
    name: 'Sam Hauser',
    position: 'SF',
    age: 27,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 90, Dribbling: 65, Defense: 75, IQ: 80, Athleticism: 68, Passing: 70, Rebounding: 65, Speed: 70, Finishing: 46}
  },
{
    id: 665,
    name: 'Sam Jones',
    position: 'SG',
    age: 88,
    isRetired: true,
    career: '1957-1969',
    attributes: {Shooting: 90, Dribbling: 82, Defense: 84, IQ: 94, Athleticism: 85, Passing: 78, Rebounding: 74, Speed: 88, Finishing: 82}
  },
{
    id: 666,
    name: 'Samuel Dalembert',
    position: 'C',
    age: 44,
    isRetired: true,
    career: '2001-2015',
    attributes: {Shooting: 64, Dribbling: 50, Defense: 85, IQ: 72, Athleticism: 80, Passing: 58, Rebounding: 88, Speed: 65, Finishing: 72}
  },
{
    id: 667,
    name: 'Sandro Mamukelashvili',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 74, Dribbling: 75, Defense: 68, IQ: 82, Athleticism: 76, Passing: 78, Rebounding: 78, Speed: 72, Finishing: 66}
  },
{
    id: 668,
    name: 'Scooter Barry',
    position: 'PG',
    age: 59,
    isRetired: true,
    career: 'N/A',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 65, IQ: 78, Athleticism: 70, Passing: 75, Rebounding: 58, Speed: 75, Finishing: 52}
  },
{
    id: 669,
    name: 'Scottie Barnes',
    position: 'SF',
    age: 24,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 78, Dribbling: 84, Defense: 86, IQ: 90, Athleticism: 88, Passing: 88, Rebounding: 84, Speed: 82, Finishing: 81}
  },
{
    id: 670,
    name: 'Scotty Pippen Jr.',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 76, Dribbling: 80, Defense: 82, IQ: 84, Athleticism: 78, Passing: 82, Rebounding: 62, Speed: 82, Finishing: 65}
  },
{
    id: 671,
    name: 'Sean Elliott',
    position: 'SF',
    age: 57,
    isRetired: true,
    career: '1989-2001',
    attributes: {Shooting: 85, Dribbling: 78, Defense: 78, IQ: 86, Athleticism: 82, Passing: 78, Rebounding: 74, Speed: 80, Finishing: 77}
  },
{
    id: 672,
    name: 'Sean Higgins',
    position: 'SF',
    age: 57,
    isRetired: true,
    career: '1990-1997',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 65, IQ: 70, Athleticism: 76, Passing: 68, Rebounding: 68, Speed: 72, Finishing: 60}
  },
{
    id: 673,
    name: 'Serge Ibaka',
    position: 'C',
    age: 36,
    isRetired: true,
    career: '2009-2023',
    attributes: {Shooting: 82, Dribbling: 62, Defense: 90, IQ: 82, Athleticism: 85, Passing: 64, Rebounding: 88, Speed: 72, Finishing: 78}
  },
{
    id: 674,
    name: 'Sergey Karasev',
    position: 'SF',
    age: 32,
    isRetired: true,
    career: '2013-2016',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 64, IQ: 74, Athleticism: 70, Passing: 72, Rebounding: 62, Speed: 68, Finishing: 52}
  },
{
    id: 675,
    name: 'Seth Curry',
    position: 'SG',
    age: 35,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 95, Dribbling: 80, Defense: 68, IQ: 85, Athleticism: 72, Passing: 78, Rebounding: 60, Speed: 78, Finishing: 55}
  },
{
    id: 676,
    name: 'Shaedon Sharpe',
    position: 'SG',
    age: 22,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 74, IQ: 75, Athleticism: 95, Passing: 72, Rebounding: 70, Speed: 88, Finishing: 78}
  },
{
    id: 677,
    name: 'Shai Gilgeous-Alexander',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 88, Dribbling: 97, Defense: 88, IQ: 96, Athleticism: 86, Passing: 90, Rebounding: 76, Speed: 92, Finishing: 90}
  },
{
    id: 678,
    name: 'Shake Milton',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 78, Defense: 70, IQ: 76, Athleticism: 75, Passing: 76, Rebounding: 64, Speed: 78, Finishing: 67}
  },
{
    id: 679,
    name: 'Shandon Anderson',
    position: 'SF',
    age: 52,
    isRetired: true,
    career: '1996-2006',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 80, IQ: 78, Athleticism: 82, Passing: 70, Rebounding: 68, Speed: 80, Finishing: 72}
  },
{
    id: 680,
    name: 'Shane Battier',
    position: 'SF',
    age: 47,
    isRetired: true,
    career: '2001-2014',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 95, IQ: 98, Athleticism: 74, Passing: 76, Rebounding: 72, Speed: 72, Finishing: 58}
  },
{
    id: 681,
    name: 'Shareef Abdur-Rahim',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1996-2008',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 78, IQ: 84, Athleticism: 84, Passing: 75, Rebounding: 88, Speed: 76, Finishing: 83}
  },
{
    id: 682,
    name: 'Shawn Bradley',
    position: 'C',
    age: 53,
    isRetired: true,
    career: '1993-2005',
    attributes: {Shooting: 65, Dribbling: 48, Defense: 88, IQ: 74, Athleticism: 65, Passing: 60, Rebounding: 86, Speed: 50, Finishing: 70}
  },
{
    id: 683,
    name: 'Shelton Jones',
    position: 'SF',
    age: 61,
    isRetired: true,
    career: '1988-1989',
    attributes: {Shooting: 68, Dribbling: 70, Defense: 70, IQ: 68, Athleticism: 88, Passing: 65, Rebounding: 65, Speed: 80, Finishing: 65}
  },
{
    id: 684,
    name: 'Sherman Douglas',
    position: 'PG',
    age: 59,
    isRetired: true,
    career: '1989-2001',
    attributes: {Shooting: 76, Dribbling: 86, Defense: 70, IQ: 88, Athleticism: 78, Passing: 90, Rebounding: 60, Speed: 85, Finishing: 72}
  },
{
    id: 685,
    name: 'Sidney Green',
    position: 'PF',
    age: 65,
    isRetired: true,
    career: '1983-1993',
    attributes: {Shooting: 70, Dribbling: 62, Defense: 76, IQ: 75, Athleticism: 78, Passing: 66, Rebounding: 84, Speed: 68, Finishing: 68}
  },
{
    id: 686,
    name: 'Solomon Hill',
    position: 'SF',
    age: 34,
    isRetired: true,
    career: '2013-2022',
    attributes: {Shooting: 74, Dribbling: 68, Defense: 78, IQ: 80, Athleticism: 74, Passing: 70, Rebounding: 68, Speed: 72, Finishing: 58}
  },
{
    id: 687,
    name: 'Solomon Jones',
    position: 'C',
    age: 41,
    isRetired: true,
    career: '2006-2014',
    attributes: {Shooting: 62, Dribbling: 55, Defense: 74, IQ: 70, Athleticism: 78, Passing: 60, Rebounding: 76, Speed: 65, Finishing: 64}
  },
{
    id: 688,
    name: 'Speedy Claxton',
    position: 'PG',
    age: 47,
    isRetired: true,
    career: '2001-2009',
    attributes: {Shooting: 72, Dribbling: 84, Defense: 78, IQ: 80, Athleticism: 82, Passing: 82, Rebounding: 58, Speed: 95, Finishing: 66}
  },
{
    id: 689,
    name: 'Spencer Dinwiddie',
    position: 'PG',
    age: 32,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 80, Dribbling: 84, Defense: 70, IQ: 84, Athleticism: 78, Passing: 82, Rebounding: 64, Speed: 82, Finishing: 72}
  },
{
    id: 690,
    name: 'Spencer Hawes',
    position: 'C',
    age: 37,
    isRetired: true,
    career: '2007-2017',
    attributes: {Shooting: 78, Dribbling: 65, Defense: 70, IQ: 82, Athleticism: 68, Passing: 80, Rebounding: 78, Speed: 62, Finishing: 68}
  },
{
    id: 691,
    name: 'Spencer Haywood',
    position: 'PF',
    age: 76,
    isRetired: true,
    career: '1970-1983',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 85, IQ: 90, Athleticism: 92, Passing: 74, Rebounding: 94, Speed: 80, Finishing: 86}
  },
{
    id: 692,
    name: 'Stacey Augmon',
    position: 'SF',
    age: 57,
    isRetired: true,
    career: '1991-2006',
    attributes: {Shooting: 68, Dribbling: 74, Defense: 90, IQ: 84, Athleticism: 88, Passing: 72, Rebounding: 74, Speed: 82, Finishing: 78}
  },
{
    id: 693,
    name: 'Stanley Johnson',
    position: 'SF',
    age: 29,
    isRetired: false,
    career: '2015-2023',
    attributes: {Shooting: 70, Dribbling: 72, Defense: 82, IQ: 75, Athleticism: 82, Passing: 70, Rebounding: 72, Speed: 78, Finishing: 60}
  },
{
    id: 694,
    name: 'Stephen Curry',
    position: 'PG',
    age: 37,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 99, Dribbling: 96, Defense: 76, IQ: 98, Athleticism: 80, Passing: 92, Rebounding: 64, Speed: 84, Finishing: 75}
  },
{
    id: 695,
    name: 'Stephen Graham',
    position: 'SF',
    age: 43,
    isRetired: true,
    career: '2005-2011',
    attributes: {Shooting: 70, Dribbling: 68, Defense: 74, IQ: 72, Athleticism: 78, Passing: 65, Rebounding: 65, Speed: 74, Finishing: 62}
  },
{
    id: 696,
    name: 'Stephen Howard',
    position: 'PF',
    age: 55,
    isRetired: true,
    career: '1992-1998',
    attributes: {Shooting: 68, Dribbling: 60, Defense: 72, IQ: 74, Athleticism: 74, Passing: 62, Rebounding: 75, Speed: 65, Finishing: 60}
  },
{
    id: 697,
    name: 'Stephen Jackson',
    position: 'SF',
    age: 47,
    isRetired: true,
    career: '2000-2014',
    attributes: {Shooting: 82, Dribbling: 80, Defense: 82, IQ: 84, Athleticism: 80, Passing: 78, Rebounding: 74, Speed: 78, Finishing: 73}
  },
{
    id: 698,
    name: 'Steve Francis',
    position: 'PG',
    age: 48,
    isRetired: true,
    career: '1999-2008',
    attributes: {Shooting: 82, Dribbling: 92, Defense: 75, IQ: 82, Athleticism: 96, Passing: 84, Rebounding: 76, Speed: 92, Finishing: 80}
  },
{
    id: 699,
    name: 'Steve Johnson',
    position: 'C',
    age: 67,
    isRetired: true,
    career: '1981-1991',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 78, IQ: 76, Athleticism: 78, Passing: 65, Rebounding: 84, Speed: 68, Finishing: 85}
  },
{
    id: 700,
    name: 'Steven Adams',
    position: 'C',
    age: 32,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 55, Dribbling: 58, Defense: 82, IQ: 88, Athleticism: 80, Passing: 82, Rebounding: 96, Speed: 64, Finishing: 79}
  },
{
    id: 701,
    name: 'Stew Johnson',
    position: 'PF',
    age: 80,
    isRetired: true,
    career: '1968-1976',
    attributes: {Shooting: 82, Dribbling: 68, Defense: 65, IQ: 78, Athleticism: 72, Passing: 70, Rebounding: 76, Speed: 65, Finishing: 62}
  },
{
    id: 702,
    name: 'Svi Mykhailiuk',
    position: 'SF',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 82, Dribbling: 72, Defense: 68, IQ: 75, Athleticism: 75, Passing: 70, Rebounding: 62, Speed: 76, Finishing: 52}
  },
{
    id: 703,
    name: 'T.J. McConnell',
    position: 'PG',
    age: 33,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 78, Dribbling: 82, Defense: 85, IQ: 94, Athleticism: 68, Passing: 88, Rebounding: 64, Speed: 80, Finishing: 68}
  },
{
    id: 704,
    name: 'Tacko Fall',
    position: 'C',
    age: 29,
    isRetired: true,
    career: '2020-2022',
    attributes: {Shooting: 58, Dribbling: 45, Defense: 78, IQ: 68, Athleticism: 70, Passing: 58, Rebounding: 84, Speed: 40, Finishing: 72}
  },
{
    id: 705,
    name: 'Taj Gibson',
    position: 'PF',
    age: 40,
    isRetired: false,
    career: '2010-present',
    attributes: {Shooting: 74, Dribbling: 62, Defense: 82, IQ: 88, Athleticism: 74, Passing: 68, Rebounding: 80, Speed: 68, Finishing: 76}
  },
{
    id: 706,
    name: 'Tari Eason',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 88, IQ: 82, Athleticism: 86, Passing: 70, Rebounding: 85, Speed: 80, Finishing: 73}
  },
{
    id: 707,
    name: 'Tarik Black',
    position: 'C',
    age: 33,
    isRetired: true,
    career: '2015-2018',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 75, IQ: 72, Athleticism: 82, Passing: 62, Rebounding: 80, Speed: 68, Finishing: 74}
  },
{
    id: 708,
    name: 'Tariq Abdul-Wahad',
    position: 'SF',
    age: 50,
    isRetired: true,
    career: '1998-2003',
    attributes: {Shooting: 72, Dribbling: 72, Defense: 78, IQ: 74, Athleticism: 82, Passing: 68, Rebounding: 72, Speed: 78, Finishing: 68}
  },
{
    id: 709,
    name: 'Taurean Green',
    position: 'PG',
    age: 39,
    isRetired: true,
    career: '2008',
    attributes: {Shooting: 75, Dribbling: 76, Defense: 65, IQ: 72, Athleticism: 74, Passing: 78, Rebounding: 55, Speed: 80, Finishing: 52}
  },
{
    id: 710,
    name: 'Taylor Griffin',
    position: 'PF',
    age: 39,
    isRetired: true,
    career: '2010',
    attributes: {Shooting: 68, Dribbling: 62, Defense: 68, IQ: 70, Athleticism: 80, Passing: 64, Rebounding: 74, Speed: 70, Finishing: 58}
  },
{
    id: 711,
    name: 'Terence Davis',
    position: 'SG',
    age: 28,
    isRetired: false,
    career: '2020-2025',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 75, IQ: 74, Athleticism: 84, Passing: 68, Rebounding: 68, Speed: 82, Finishing: 68}
  },
{
    id: 712,
    name: 'Terrell Brandon',
    position: 'PG',
    age: 55,
    isRetired: true,
    career: '1992-2002',
    attributes: {Shooting: 85, Dribbling: 88, Defense: 84, IQ: 94, Athleticism: 78, Passing: 92, Rebounding: 64, Speed: 88, Finishing: 72}
  },
{
    id: 713,
    name: 'Terrence Jones',
    position: 'PF',
    age: 33,
    isRetired: true,
    career: '2013-2019',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 76, IQ: 74, Athleticism: 84, Passing: 70, Rebounding: 82, Speed: 75, Finishing: 78}
  },
{
    id: 714,
    name: 'Terrence Ross',
    position: 'SG',
    age: 34,
    isRetired: true,
    career: '2013-2023',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 70, IQ: 75, Athleticism: 94, Passing: 68, Rebounding: 65, Speed: 88, Finishing: 72}
  },
{
    id: 715,
    name: 'Terry Rozier',
    position: 'PG',
    age: 31,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 84, Dribbling: 86, Defense: 74, IQ: 80, Athleticism: 82, Passing: 80, Rebounding: 70, Speed: 85, Finishing: 68}
  },
{
    id: 716,
    name: 'Terry Taylor',
    position: 'PF',
    age: 26,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 70, Dribbling: 68, Defense: 72, IQ: 78, Athleticism: 76, Passing: 68, Rebounding: 84, Speed: 70, Finishing: 73}
  },
{
    id: 717,
    name: 'Thanasis Antetokounmpo',
    position: 'PF',
    age: 33,
    isRetired: false,
    career: '2016-present',
    attributes: {Shooting: 60, Dribbling: 62, Defense: 75, IQ: 68, Athleticism: 90, Passing: 60, Rebounding: 70, Speed: 78, Finishing: 65}
  },
{
    id: 718,
    name: 'Theo Pinson',
    position: 'SG',
    age: 29,
    isRetired: false,
    career: '2019-2023',
    attributes: {Shooting: 72, Dribbling: 74, Defense: 70, IQ: 82, Athleticism: 78, Passing: 75, Rebounding: 62, Speed: 76, Finishing: 55}
  },
{
    id: 719,
    name: 'Thomas Bryant',
    position: 'C',
    age: 28,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 62, Defense: 72, IQ: 76, Athleticism: 78, Passing: 68, Rebounding: 82, Speed: 68, Finishing: 82}
  },
{
    id: 720,
    name: 'Thomas Jordan',
    position: 'PF',
    age: 57,
    isRetired: true,
    career: '1993',
    attributes: {Shooting: 62, Dribbling: 58, Defense: 65, IQ: 68, Athleticism: 72, Passing: 60, Rebounding: 70, Speed: 65, Finishing: 55}
  },
{
    id: 721,
    name: 'Tim Duncan',
    position: 'PF',
    age: 49,
    isRetired: true,
    career: '1998-2016',
    attributes: {Shooting: 84, Dribbling: 78, Defense: 98, IQ: 99, Athleticism: 85, Passing: 88, Rebounding: 98, Speed: 72, Finishing: 93}
  },
{
    id: 722,
    name: 'Tim Hardaway Jr.',
    position: 'SG',
    age: 33,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 85, Dribbling: 78, Defense: 70, IQ: 78, Athleticism: 80, Passing: 72, Rebounding: 68, Speed: 80, Finishing: 58}
  },
{
    id: 723,
    name: 'Tim Hardaway Sr.',
    position: 'PG',
    age: 59,
    isRetired: true,
    career: '1990-2003',
    attributes: {Shooting: 85, Dribbling: 98, Defense: 82, IQ: 92, Athleticism: 85, Passing: 94, Rebounding: 62, Speed: 92, Finishing: 78}
  },
{
    id: 724,
    name: 'Tobias Harris',
    position: 'PF',
    age: 33,
    isRetired: false,
    career: '2012-present',
    attributes: {Shooting: 84, Dribbling: 80, Defense: 76, IQ: 82, Athleticism: 78, Passing: 78, Rebounding: 80, Speed: 75, Finishing: 77}
  },
{
    id: 725,
    name: 'Tom Chambers',
    position: 'PF',
    age: 66,
    isRetired: true,
    career: '1982-1998',
    attributes: {Shooting: 85, Dribbling: 78, Defense: 74, IQ: 84, Athleticism: 92, Passing: 76, Rebounding: 84, Speed: 82, Finishing: 84}
  },
{
    id: 726,
    name: 'Tom Copa',
    position: 'C',
    age: 61,
    isRetired: true,
    career: '1992',
    attributes: {Shooting: 60, Dribbling: 48, Defense: 65, IQ: 68, Athleticism: 65, Passing: 58, Rebounding: 74, Speed: 55, Finishing: 58}
  },
{
    id: 727,
    name: 'Tom Gugliotta',
    position: 'PF',
    age: 55,
    isRetired: true,
    career: '1993-2005',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 80, IQ: 86, Athleticism: 84, Passing: 85, Rebounding: 88, Speed: 76, Finishing: 78}
  },
{
    id: 728,
    name: 'Tom Henderson',
    position: 'PG',
    age: 73,
    isRetired: true,
    career: '1975-1983',
    attributes: {Shooting: 75, Dribbling: 82, Defense: 80, IQ: 84, Athleticism: 78, Passing: 85, Rebounding: 64, Speed: 82, Finishing: 66}
  },
{
    id: 729,
    name: 'Toney Douglas',
    position: 'PG',
    age: 39,
    isRetired: true,
    career: '2010-2017',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 82, IQ: 78, Athleticism: 78, Passing: 74, Rebounding: 62, Speed: 82, Finishing: 58}
  },
{
    id: 730,
    name: 'Tony Allen',
    position: 'SG',
    age: 43,
    isRetired: true,
    career: '2005-2018',
    attributes: {Shooting: 65, Dribbling: 72, Defense: 99, IQ: 92, Athleticism: 85, Passing: 68, Rebounding: 72, Speed: 84, Finishing: 65}
  },
{
    id: 731,
    name: 'Tony Battie',
    position: 'C',
    age: 49,
    isRetired: true,
    career: '1998-2012',
    attributes: {Shooting: 70, Dribbling: 58, Defense: 82, IQ: 80, Athleticism: 78, Passing: 62, Rebounding: 82, Speed: 68, Finishing: 68}
  },
{
    id: 732,
    name: 'Torrey Craig',
    position: 'SF',
    age: 34,
    isRetired: true,
    career: '2018-2025',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 82, IQ: 80, Athleticism: 78, Passing: 68, Rebounding: 74, Speed: 75, Finishing: 66}
  },
{
    id: 733,
    name: 'Tracy Jackson',
    position: 'SF',
    age: 66,
    isRetired: true,
    career: '1982-1984',
    attributes: {Shooting: 70, Dribbling: 68, Defense: 70, IQ: 72, Athleticism: 76, Passing: 68, Rebounding: 68, Speed: 74, Finishing: 62}
  },
{
    id: 734,
    name: 'Trae Young',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 88, Dribbling: 95, Defense: 62, IQ: 95, Athleticism: 74, Passing: 97, Rebounding: 60, Speed: 88, Finishing: 68}
  },
{
    id: 735,
    name: 'Trayce Jackson-Davis',
    position: 'C',
    age: 25,
    isRetired: false,
    career: '2024-present',
    attributes: {Shooting: 60, Dribbling: 65, Defense: 84, IQ: 88, Athleticism: 85, Passing: 82, Rebounding: 84, Speed: 76, Finishing: 79}
  },
{
    id: 736,
    name: 'Tre Jones',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 75, Dribbling: 82, Defense: 78, IQ: 88, Athleticism: 72, Passing: 86, Rebounding: 62, Speed: 82, Finishing: 68}
  },
{
    id: 737,
    name: 'Tre Mann',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 82, Dribbling: 88, Defense: 70, IQ: 78, Athleticism: 82, Passing: 78, Rebounding: 64, Speed: 85, Finishing: 64}
  },
{
    id: 738,
    name: 'Trendon Watford',
    position: 'PF',
    age: 25,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 72, IQ: 82, Athleticism: 78, Passing: 78, Rebounding: 75, Speed: 72, Finishing: 71}
  },
{
    id: 739,
    name: 'Trent Forrest',
    position: 'PG',
    age: 27,
    isRetired: false,
    career: '2021-2024',
    attributes: {Shooting: 68, Dribbling: 76, Defense: 78, IQ: 80, Athleticism: 76, Passing: 78, Rebounding: 62, Speed: 78, Finishing: 62}
  },
{
    id: 740,
    name: 'Trenton Hassell',
    position: 'SF',
    age: 46,
    isRetired: true,
    career: '2002-2010',
    attributes: {Shooting: 72, Dribbling: 68, Defense: 85, IQ: 80, Athleticism: 76, Passing: 70, Rebounding: 68, Speed: 75, Finishing: 58}
  },
{
    id: 741,
    name: 'Trevor Ariza',
    position: 'SF',
    age: 40,
    isRetired: true,
    career: '2005-2022',
    attributes: {Shooting: 80, Dribbling: 72, Defense: 88, IQ: 86, Athleticism: 82, Passing: 74, Rebounding: 76, Speed: 80, Finishing: 66}
  },
{
    id: 742,
    name: 'Trey Burke',
    position: 'PG',
    age: 33,
    isRetired: true,
    career: '2014-2022',
    attributes: {Shooting: 80, Dribbling: 85, Defense: 65, IQ: 78, Athleticism: 76, Passing: 80, Rebounding: 58, Speed: 84, Finishing: 62}
  },
{
    id: 743,
    name: 'Trey Johnson',
    position: 'SG',
    age: 41,
    isRetired: true,
    career: '2009-2012',
    attributes: {Shooting: 74, Dribbling: 74, Defense: 68, IQ: 70, Athleticism: 75, Passing: 72, Rebounding: 62, Speed: 76, Finishing: 55}
  },
{
    id: 744,
    name: 'Tristan Thompson',
    position: 'C',
    age: 34,
    isRetired: false,
    career: '2012-2025',
    attributes: {Shooting: 60, Dribbling: 58, Defense: 78, IQ: 84, Athleticism: 78, Passing: 66, Rebounding: 92, Speed: 68, Finishing: 74}
  },
{
    id: 745,
    name: 'Troy Brown Jr.',
    position: 'SF',
    age: 26,
    isRetired: false,
    career: '2019-2024',
    attributes: {Shooting: 78, Dribbling: 74, Defense: 75, IQ: 78, Athleticism: 76, Passing: 74, Rebounding: 74, Speed: 75, Finishing: 63}
  },
{
    id: 746,
    name: 'Ty Jerome',
    position: 'PG',
    age: 28,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 82, Dribbling: 78, Defense: 70, IQ: 88, Athleticism: 68, Passing: 82, Rebounding: 60, Speed: 74, Finishing: 60}
  },
{
    id: 747,
    name: 'Tyler Cook',
    position: 'PF',
    age: 28,
    isRetired: true,
    career: '2020-2022',
    attributes: {Shooting: 62, Dribbling: 65, Defense: 70, IQ: 68, Athleticism: 88, Passing: 64, Rebounding: 78, Speed: 76, Finishing: 72}
  },
{
    id: 748,
    name: 'Tyler Ennis',
    position: 'PG',
    age: 31,
    isRetired: true,
    career: '2015-2018',
    attributes: {Shooting: 74, Dribbling: 80, Defense: 68, IQ: 80, Athleticism: 74, Passing: 82, Rebounding: 60, Speed: 78, Finishing: 60}
  },
{
    id: 749,
    name: 'Tyler Herro',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 92, Dribbling: 88, Defense: 72, IQ: 84, Athleticism: 78, Passing: 82, Rebounding: 72, Speed: 82, Finishing: 68}
  },
{
    id: 750,
    name: 'Tyler Johnson',
    position: 'SG',
    age: 33,
    isRetired: true,
    career: '2015-2022',
    attributes: {Shooting: 78, Dribbling: 76, Defense: 72, IQ: 75, Athleticism: 78, Passing: 74, Rebounding: 64, Speed: 80, Finishing: 70}
  },
{
    id: 751,
    name: 'Tyrese Haliburton',
    position: 'PG',
    age: 25,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 92, Dribbling: 89, Defense: 74, IQ: 97, Athleticism: 78, Passing: 98, Rebounding: 66, Speed: 86, Finishing: 76}
  },
{
    id: 752,
    name: 'Tyrese Maxey',
    position: 'PG',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 90, Dribbling: 88, Defense: 75, IQ: 88, Athleticism: 92, Passing: 85, Rebounding: 62, Speed: 97, Finishing: 83}
  },
{
    id: 753,
    name: 'Tyrone Corbin',
    position: 'SF',
    age: 62,
    isRetired: true,
    career: '1985-2001',
    attributes: {Shooting: 74, Dribbling: 70, Defense: 82, IQ: 84, Athleticism: 76, Passing: 72, Rebounding: 77, Speed: 75, Finishing: 68}
  },
{
    id: 754,
    name: 'Tyrone Hill',
    position: 'PF',
    age: 57,
    isRetired: true,
    career: '1990-2003',
    attributes: {Shooting: 62, Dribbling: 60, Defense: 84, IQ: 78, Athleticism: 77, Passing: 64, Rebounding: 92, Speed: 68, Finishing: 72}
  },
{
    id: 755,
    name: 'Tyson Chandler',
    position: 'C',
    age: 42,
    isRetired: true,
    career: '2001-2020',
    attributes: {Shooting: 55, Dribbling: 50, Defense: 95, IQ: 92, Athleticism: 85, Passing: 65, Rebounding: 93, Speed: 72, Finishing: 81}
  },
{
    id: 756,
    name: 'TyTy Washington Jr.',
    position: 'PG',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 72, Dribbling: 78, Defense: 65, IQ: 74, Athleticism: 75, Passing: 77, Rebounding: 60, Speed: 82, Finishing: 58}
  },
{
    id: 757,
    name: 'Tyus Jones',
    position: 'PG',
    age: 29,
    isRetired: false,
    career: '2015-present',
    attributes: {Shooting: 82, Dribbling: 84, Defense: 74, IQ: 95, Athleticism: 70, Passing: 91, Rebounding: 58, Speed: 83, Finishing: 73}
  },
{
    id: 758,
    name: 'Udoka Azubuike',
    position: 'C',
    age: 25,
    isRetired: false,
    career: '2020-2024',
    attributes: {Shooting: 45, Dribbling: 42, Defense: 70, IQ: 64, Athleticism: 82, Passing: 52, Rebounding: 78, Speed: 60, Finishing: 71}
  },
{
    id: 759,
    name: 'Udonis Haslem',
    position: 'PF',
    age: 45,
    isRetired: true,
    career: '2003-2023',
    attributes: {Shooting: 72, Dribbling: 62, Defense: 82, IQ: 90, Athleticism: 68, Passing: 66, Rebounding: 84, Speed: 64, Finishing: 70}
  },
{
    id: 760,
    name: 'Usman Garuba',
    position: 'PF',
    age: 23,
    isRetired: false,
    career: '2021-2024',
    attributes: {Shooting: 65, Dribbling: 62, Defense: 85, IQ: 80, Athleticism: 78, Passing: 74, Rebounding: 80, Speed: 72, Finishing: 62}
  },
{
    id: 761,
    name: 'Victor Alexander',
    position: 'C',
    age: 55,
    isRetired: true,
    career: '1991-2002',
    attributes: {Shooting: 78, Dribbling: 65, Defense: 72, IQ: 76, Athleticism: 70, Passing: 68, Rebounding: 79, Speed: 62, Finishing: 74}
  },
{
    id: 762,
    name: 'Victor Oladipo',
    position: 'SG',
    age: 33,
    isRetired: false,
    career: '2013-present',
    attributes: {Shooting: 80, Dribbling: 84, Defense: 88, IQ: 85, Athleticism: 82, Passing: 81, Rebounding: 70, Speed: 85, Finishing: 76}
  },
{
    id: 763,
    name: 'Vince Carter',
    position: 'SF',
    age: 48,
    isRetired: true,
    career: '1998-2020',
    attributes: {Shooting: 88, Dribbling: 86, Defense: 78, IQ: 90, Athleticism: 98, Passing: 82, Rebounding: 75, Speed: 92, Finishing: 91}
  },
{
    id: 764,
    name: 'Vinnie Johnson',
    position: 'SG',
    age: 68,
    isRetired: true,
    career: '1979-1992',
    attributes: {Shooting: 84, Dribbling: 82, Defense: 74, IQ: 85, Athleticism: 80, Passing: 76, Rebounding: 68, Speed: 83, Finishing: 74}
  },
{
    id: 765,
    name: 'Vinny Del Negro',
    position: 'SG',
    age: 58,
    isRetired: true,
    career: '1988-2001',
    attributes: {Shooting: 86, Dribbling: 78, Defense: 70, IQ: 88, Athleticism: 68, Passing: 80, Rebounding: 60, Speed: 74, Finishing: 62}
  },
{
    id: 766,
    name: 'Vít Krejčí',
    position: 'SG',
    age: 25,
    isRetired: false,
    career: '2021-present',
    attributes: {Shooting: 76, Dribbling: 74, Defense: 72, IQ: 78, Athleticism: 74, Passing: 77, Rebounding: 65, Speed: 76, Finishing: 62}
  },
{
    id: 767,
    name: 'Vlade Divac',
    position: 'C',
    age: 57,
    isRetired: true,
    career: '1989-2005',
    attributes: {Shooting: 74, Dribbling: 72, Defense: 82, IQ: 98, Athleticism: 68, Passing: 95, Rebounding: 88, Speed: 60, Finishing: 76}
  },
{
    id: 768,
    name: 'Vlatko Čančar',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 75, Dribbling: 68, Defense: 70, IQ: 78, Athleticism: 72, Passing: 72, Rebounding: 70, Speed: 68, Finishing: 65}
  },
{
    id: 769,
    name: 'Walker Kessler',
    position: 'C',
    age: 23,
    isRetired: false,
    career: '2022-present',
    attributes: {Shooting: 58, Dribbling: 50, Defense: 92, IQ: 84, Athleticism: 80, Passing: 62, Rebounding: 89, Speed: 68, Finishing: 76}
  },
{
    id: 770,
    name: 'Wally Szczerbiak',
    position: 'SF',
    age: 48,
    isRetired: true,
    career: '1999-2009',
    attributes: {Shooting: 92, Dribbling: 74, Defense: 68, IQ: 85, Athleticism: 75, Passing: 76, Rebounding: 72, Speed: 72, Finishing: 74}
  },
{
    id: 771,
    name: 'Walt Davis',
    position: 'C',
    age: 94,
    isRetired: true,
    career: '1953-1958',
    attributes: {Shooting: 65, Dribbling: 58, Defense: 78, IQ: 75, Athleticism: 88, Passing: 60, Rebounding: 82, Speed: 74, Finishing: 65}
  },
{
    id: 772,
    name: 'Walt Frazier',
    position: 'PG',
    age: 80,
    isRetired: true,
    career: '1967-1980',
    attributes: {Shooting: 85, Dribbling: 92, Defense: 98, IQ: 99, Athleticism: 88, Passing: 94, Rebounding: 80, Speed: 90, Finishing: 86}
  },
{
    id: 773,
    name: 'Walt Hazzard',
    position: 'PG',
    age: 83,
    isRetired: true,
    career: '1964-1974',
    attributes: {Shooting: 80, Dribbling: 85, Defense: 75, IQ: 88, Athleticism: 78, Passing: 86, Rebounding: 64, Speed: 82, Finishing: 70}
  },
{
    id: 774,
    name: 'Walter Davis',
    position: 'SG',
    age: 70,
    isRetired: true,
    career: '1977-1992',
    attributes: {Shooting: 91, Dribbling: 85, Defense: 78, IQ: 88, Athleticism: 88, Passing: 82, Rebounding: 68, Speed: 92, Finishing: 82}
  },
{
    id: 775,
    name: 'Wayne Cooper',
    position: 'C',
    age: 68,
    isRetired: true,
    career: '1978-1992',
    attributes: {Shooting: 66, Dribbling: 55, Defense: 82, IQ: 78, Athleticism: 75, Passing: 60, Rebounding: 85, Speed: 64, Finishing: 68}
  },
{
    id: 776,
    name: 'Wayne Ellington',
    position: 'SG',
    age: 37,
    isRetired: true,
    career: '2009-2022',
    attributes: {Shooting: 88, Dribbling: 72, Defense: 65, IQ: 80, Athleticism: 70, Passing: 68, Rebounding: 60, Speed: 74, Finishing: 48}
  },
{
    id: 777,
    name: 'Wendell Carter Jr.',
    position: 'C',
    age: 26,
    isRetired: false,
    career: '2018-present',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 82, IQ: 85, Athleticism: 78, Passing: 74, Rebounding: 86, Speed: 68, Finishing: 74}
  },
{
    id: 778,
    name: 'Wenyen Gabriel',
    position: 'PF',
    age: 28,
    isRetired: false,
    career: '2018-2024',
    attributes: {Shooting: 68, Dribbling: 64, Defense: 74, IQ: 72, Athleticism: 82, Passing: 62, Rebounding: 80, Speed: 75, Finishing: 68}
  },
{
    id: 779,
    name: 'Wesley Johnson',
    position: 'SF',
    age: 37,
    isRetired: true,
    career: '2010-2019',
    attributes: {Shooting: 76, Dribbling: 70, Defense: 78, IQ: 72, Athleticism: 84, Passing: 66, Rebounding: 70, Speed: 78, Finishing: 64}
  },
{
    id: 780,
    name: 'Wesley Jones',
    position: 'PF',
    age: 72,
    isRetired: true,
    career: '1977-1977',
    attributes: {Shooting: 65, Dribbling: 62, Defense: 75, IQ: 74, Athleticism: 78, Passing: 64, Rebounding: 80, Speed: 70, Finishing: 55}
  },
{
    id: 781,
    name: 'Wesley Matthews',
    position: 'SG',
    age: 38,
    isRetired: false,
    career: '2009-present',
    attributes: {Shooting: 82, Dribbling: 74, Defense: 80, IQ: 85, Athleticism: 72, Passing: 72, Rebounding: 65, Speed: 74, Finishing: 62}
  },
{
    id: 782,
    name: 'Wil Jones',
    position: 'SF',
    age: 78,
    isRetired: true,
    career: '1976-1978',
    attributes: {Shooting: 74, Dribbling: 75, Defense: 80, IQ: 78, Athleticism: 82, Passing: 72, Rebounding: 84, Speed: 78, Finishing: 68}
  },
{
    id: 783,
    name: 'Will Barton',
    position: 'SG',
    age: 34,
    isRetired: false,
    career: '2012-2023',
    attributes: {Shooting: 80, Dribbling: 82, Defense: 70, IQ: 78, Athleticism: 80, Passing: 78, Rebounding: 72, Speed: 82, Finishing: 72}
  },
{
    id: 784,
    name: 'Will Bynum',
    position: 'PG',
    age: 42,
    isRetired: true,
    career: '2005-2015',
    attributes: {Shooting: 75, Dribbling: 84, Defense: 72, IQ: 76, Athleticism: 85, Passing: 78, Rebounding: 55, Speed: 92, Finishing: 72}
  },
{
    id: 785,
    name: 'Willie Anderson',
    position: 'SG',
    age: 58,
    isRetired: true,
    career: '1988-1997',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 82, IQ: 84, Athleticism: 82, Passing: 81, Rebounding: 72, Speed: 80, Finishing: 72}
  },
{
    id: 786,
    name: 'Willie Cauley-Stein',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2015-2022',
    attributes: {Shooting: 52, Dribbling: 64, Defense: 78, IQ: 70, Athleticism: 88, Passing: 65, Rebounding: 82, Speed: 84, Finishing: 72}
  },
{
    id: 787,
    name: 'Willie Green',
    position: 'SG',
    age: 43,
    isRetired: true,
    career: '2003-2015',
    attributes: {Shooting: 79, Dribbling: 76, Defense: 74, IQ: 86, Athleticism: 76, Passing: 75, Rebounding: 60, Speed: 78, Finishing: 64}
  },
{
    id: 788,
    name: 'Willy Hernangómez',
    position: 'C',
    age: 31,
    isRetired: false,
    career: '2016-2023',
    attributes: {Shooting: 74, Dribbling: 62, Defense: 65, IQ: 82, Athleticism: 68, Passing: 72, Rebounding: 90, Speed: 60, Finishing: 78}
  },
{
    id: 789,
    name: 'Wilson Chandler',
    position: 'SF',
    age: 38,
    isRetired: true,
    career: '2007-2020',
    attributes: {Shooting: 80, Dribbling: 78, Defense: 77, IQ: 80, Athleticism: 82, Passing: 72, Rebounding: 78, Speed: 76, Finishing: 74}
  },
{
    id: 790,
    name: 'Wilt Chamberlain',
    position: 'C',
    age: 88,
    isRetired: true,
    career: '1959-1973',
    attributes: {Shooting: 70, Dribbling: 78, Defense: 99, IQ: 97, Athleticism: 99, Passing: 88, Rebounding: 99, Speed: 92, Finishing: 99}
  },
{
    id: 791,
    name: 'Winston Garland',
    position: 'PG',
    age: 60,
    isRetired: true,
    career: '1987-1995',
    attributes: {Shooting: 77, Dribbling: 80, Defense: 75, IQ: 80, Athleticism: 78, Passing: 82, Rebounding: 65, Speed: 82, Finishing: 66}
  },
{
    id: 792,
    name: 'Xavier Henry',
    position: 'SF',
    age: 34,
    isRetired: true,
    career: '2010-2014',
    attributes: {Shooting: 74, Dribbling: 76, Defense: 68, IQ: 68, Athleticism: 82, Passing: 65, Rebounding: 68, Speed: 78, Finishing: 68}
  },
{
    id: 793,
    name: 'Yi Jianlian',
    position: 'PF',
    age: 37,
    isRetired: true,
    career: '2007-2012',
    attributes: {Shooting: 78, Dribbling: 68, Defense: 70, IQ: 72, Athleticism: 80, Passing: 62, Rebounding: 78, Speed: 72, Finishing: 68}
  },
{
    id: 794,
    name: 'Zach Collins',
    position: 'C',
    age: 27,
    isRetired: false,
    career: '2017-present',
    attributes: {Shooting: 76, Dribbling: 68, Defense: 80, IQ: 82, Athleticism: 75, Passing: 75, Rebounding: 82, Speed: 66, Finishing: 70}
  },
{
    id: 795,
    name: 'Zach LaVine',
    position: 'SG',
    age: 30,
    isRetired: false,
    career: '2014-present',
    attributes: {Shooting: 90, Dribbling: 86, Defense: 72, IQ: 82, Athleticism: 96, Passing: 80, Rebounding: 70, Speed: 92, Finishing: 86}
  },
{
    id: 796,
    name: 'Zeke Nnaji',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2020-present',
    attributes: {Shooting: 75, Dribbling: 62, Defense: 74, IQ: 74, Athleticism: 78, Passing: 60, Rebounding: 76, Speed: 72, Finishing: 68}
  },
{
    id: 797,
    name: 'Zendon Hamilton',
    position: 'C',
    age: 50,
    isRetired: true,
    career: '2000-2006',
    attributes: {Shooting: 60, Dribbling: 52, Defense: 68, IQ: 65, Athleticism: 72, Passing: 55, Rebounding: 80, Speed: 58, Finishing: 66}
  },
{
    id: 798,
    name: 'Zion Williamson',
    position: 'PF',
    age: 24,
    isRetired: false,
    career: '2019-present',
    attributes: {Shooting: 74, Dribbling: 85, Defense: 78, IQ: 88, Athleticism: 98, Passing: 86, Rebounding: 88, Speed: 88, Finishing: 89}
  },
{
    id: 799,
    name: 'Zoran Dragić',
    position: 'SG',
    age: 36,
    isRetired: true,
    career: '2014-2015',
    attributes: {Shooting: 74, Dribbling: 75, Defense: 72, IQ: 78, Athleticism: 76, Passing: 72, Rebounding: 62, Speed: 78, Finishing: 62}
  },
{
    id: 800,
    name: 'Victor Wembanyama',
    position: 'C',
    age: 22,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 86, Dribbling: 82, Defense: 99, IQ: 92, Athleticism: 91, Passing: 80, Rebounding: 95, Speed: 82, Finishing: 93}
  },
{
    id: 801,
    name: 'Amen Thompson',
    position: 'SF',
    age: 23,
    isRetired: false,
    career: '2023-present',
    attributes: {Shooting: 65, Dribbling: 88, Defense: 96, IQ: 87, Athleticism: 99, Passing: 88, Rebounding: 90, Speed: 97, Finishing: 94}
  },
{
    id: 802,
    name: 'Cooper Flagg',
    position: 'SF',
    age: 19,
    isRetired: false,
    career: '2025-present',
    attributes: {Shooting: 84, Dribbling: 86, Defense: 88, IQ: 88, Athleticism: 92, Passing: 85, Rebounding: 84, Speed: 89, Finishing: 89}
  }
];

const positions = ['PG', 'SG', 'SF', 'PF', 'C'] as const;

const fictionalFirstNames = [
  'Aiden', 'Brayden', 'Caden', 'Dylan', 'Ethan', 'Finn', 'Grayson', 'Hunter', 'Ian', 'Jackson',
  'Kaden', 'Liam', 'Mason', 'Noah', 'Oliver', 'Parker', 'Quinn', 'Riley', 'Samuel', 'Tyler',
  'Ulysses', 'Victor', 'Wyatt', 'Xavier', 'Zane', 'Aaron', 'Blake', 'Chase', 'Devin', 'Eli',
  'Gavin', 'Hayden', 'Jaden', 'Kyle', 'Logan', 'Miles', 'Nathan', 'Owen', 'Peyton', 'Reese',
  'Sawyer', 'Trent', 'Uriah', 'Vaughn', 'Wade', 'Zachary', 'Brett', 'Cole', 'Drew', 'Evan'
];
const fictionalLastNames = [
  'Anderson', 'Baker', 'Carter', 'Davis', 'Edwards', 'Fisher', 'Garcia', 'Harris', 'Irving',
  'Jones', 'Kelly', 'Lewis', 'Miller', 'Nelson', 'Owens', 'Parker', 'Quinn', 'Roberts',
  'Smith', 'Thomas', 'Upton', 'Vaughn', 'Walker', 'Young', 'Adams', 'Bell', 'Clark', 'Diaz',
  'Evans', 'Ford', 'Green', 'Hall', 'Jackson', 'King', 'Lopez', 'Martin', 'Nash', 'Ortiz',
  'Perez', 'Reyes', 'Stewart', 'Torres', 'Wright', 'Xu', 'Yates', 'Zhou', 'Bennett', 'Collins'
];

function generateAttributes(position: typeof positions[number]) {
  const base = {
    Shooting: 50 + Math.floor(Math.random() * 40),
    Dribbling: 50 + Math.floor(Math.random() * 40),
    Defense: 50 + Math.floor(Math.random() * 40),
    IQ: 50 + Math.floor(Math.random() * 40),
    Athleticism: 50 + Math.floor(Math.random() * 40),
    Passing: 50 + Math.floor(Math.random() * 40),
    Rebounding: 50 + Math.floor(Math.random() * 40),
    Speed: 50 + Math.floor(Math.random() * 40),
    Finishing: 50 + Math.floor(Math.random() * 40),
  };
  switch (position) {
    case 'PG':
      base.Dribbling = Math.min(99, base.Dribbling + 15);
      base.Passing = Math.min(99, base.Passing + 15);
      base.Speed = Math.min(99, base.Speed + 10);
      base.Rebounding = Math.max(20, base.Rebounding - 20);
      break;
    case 'SG':
      base.Shooting = Math.min(99, base.Shooting + 15);
      base.Speed = Math.min(99, base.Speed + 8);
      base.Rebounding = Math.max(30, base.Rebounding - 10);
      break;
    case 'SF':
      base.Athleticism = Math.min(99, base.Athleticism + 12);
      base.Defense = Math.min(99, base.Defense + 10);
      break;
    case 'PF':
      base.Rebounding = Math.min(99, base.Rebounding + 15);
      base.Defense = Math.min(99, base.Defense + 10);
      base.Speed = Math.max(30, base.Speed - 5);
      break;
    case 'C':
      base.Rebounding = Math.min(99, base.Rebounding + 20);
      base.Defense = Math.min(99, base.Defense + 15);
      base.Speed = Math.max(25, base.Speed - 10);
      base.Dribbling = Math.max(25, base.Dribbling - 10);
      base.Passing = Math.max(30, base.Passing - 5);
      break;
  }
  return base;
}

function generateFictionalPlayers(count: number): RealPlayer[] {
  const players: RealPlayer[] = [];
  let id = 1001; 
  for (let i = 0; i < count; i++) {
    const first = fictionalFirstNames[Math.floor(Math.random() * fictionalFirstNames.length)];
    const last = fictionalLastNames[Math.floor(Math.random() * fictionalLastNames.length)];
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const age = 19 + Math.floor(Math.random() * 20); // 19-38
    const isRetired = age > 35 ? Math.random() < 0.2 : false;
    players.push({
      id: id++,
      name: `${first} ${last}`,
      position: pos,
      age: age,
      isRetired: isRetired,
      attributes: generateAttributes(pos),
      career: `${2024 - age + 18}-${isRetired ? 2024 - Math.floor(Math.random() * 5) : 'present'}`,
    });
  }
  return players;
}

export const fictionalPlayers: RealPlayer[] = generateFictionalPlayers(500);
