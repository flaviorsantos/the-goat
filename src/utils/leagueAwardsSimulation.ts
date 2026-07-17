type Standing = { id: string; wins: number };

type AwardCandidate = {
  name: string;
  teamId: string;
  rating: number;
};

const MVP_CANDIDATES: AwardCandidate[] = [
  { name: 'S. Gilgeous-Alexander', teamId: 'OKC', rating: 98 },
  { name: 'N. Jokic', teamId: 'DEN', rating: 98 },
  { name: 'L. Doncic', teamId: 'DAL', rating: 97 },
  { name: 'G. Antetokounmpo', teamId: 'MIL', rating: 97 },
  { name: 'J. Tatum', teamId: 'BOS', rating: 94 },
  { name: 'V. Wembanyama', teamId: 'SAS', rating: 94 },
  { name: 'A. Edwards', teamId: 'MIN', rating: 93 },
];

const DPOY_CANDIDATES: AwardCandidate[] = [
  { name: 'V. Wembanyama', teamId: 'SAS', rating: 99 },
  { name: 'R. Gobert', teamId: 'MIN', rating: 96 },
  { name: 'B. Adebayo', teamId: 'MIA', rating: 94 },
  { name: 'E. Mobley', teamId: 'CLE', rating: 94 },
  { name: 'J. Jackson Jr.', teamId: 'MEM', rating: 93 },
  { name: 'A. Davis', teamId: 'LAL', rating: 95 },
];

const SMOTY_CANDIDATES: AwardCandidate[] = [
  { name: 'P. Pritchard', teamId: 'BOS', rating: 92 },
  { name: 'N. Reid', teamId: 'MIN', rating: 91 },
  { name: 'M. Monk', teamId: 'SAC', rating: 90 },
  { name: 'B. Portis', teamId: 'MIL', rating: 88 },
  { name: 'T. Mann', teamId: 'LAC', rating: 86 },
  { name: 'D. Hunter', teamId: 'ATL', rating: 88 },
];

const TEAM_STARS: Record<string, string> = {
  BOS: 'J. Tatum', NYK: 'J. Brunson', PHI: 'J. Embiid', MIL: 'G. Antetokounmpo',
  CLE: 'D. Mitchell', IND: 'T. Haliburton', MIA: 'B. Adebayo', ORL: 'P. Banchero',
  CHI: 'C. White', ATL: 'T. Young', BKN: 'C. Thomas', TOR: 'S. Barnes',
  CHA: 'L. Ball', WAS: 'A. Sarr', DET: 'C. Cunningham', DEN: 'N. Jokic',
  OKC: 'S. Gilgeous-Alexander', MIN: 'A. Edwards', LAC: 'K. Leonard', DAL: 'L. Doncic',
  PHX: 'D. Booker', LAL: 'L. James', NOP: 'Z. Williamson', SAC: 'D. Sabonis',
  GSW: 'S. Curry', HOU: 'A. Sengun', UTA: 'L. Markkanen', MEM: 'J. Morant',
  SAS: 'V. Wembanyama', POR: 'D. Avdija',
};

const selectWinner = (candidates: AwardCandidate[], standings: Standing[]) =>
  candidates
    .map(candidate => ({
      ...candidate,
      score:
        candidate.rating +
        (standings.find(team => team.id === candidate.teamId)?.wins ?? 41) * 0.22 +
        Math.random() * 8,
    }))
    .sort((left, right) => right.score - left.score)[0].name;

export function simulateLeagueAwards({
  playerName,
  playerAwards,
  playerWonFinalsMvp,
  championTeamId,
  standings,
}: {
  playerName: string;
  playerAwards: string[];
  playerWonFinalsMvp: boolean;
  championTeamId: string;
  standings: Standing[];
}) {
  return {
    MVP: playerAwards.includes('MVP')
      ? playerName
      : selectWinner(MVP_CANDIDATES, standings),
    DPOY: playerAwards.includes('DPOY')
      ? playerName
      : selectWinner(DPOY_CANDIDATES, standings),
    SMOTY: playerAwards.includes('SMOTY')
      ? playerName
      : selectWinner(SMOTY_CANDIDATES, standings),
    FMVP: playerWonFinalsMvp
      ? playerName
      : TEAM_STARS[championTeamId] ?? `${championTeamId} star`,
  };
}
