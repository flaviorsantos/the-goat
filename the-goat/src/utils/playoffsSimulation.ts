import type { TeamStanding, PlayerProfile } from '../types';

export function simulatePlayoffs(
  player: PlayerProfile, 
  standings: TeamStanding[]
): boolean {
  const myTeam = standings.find(t => t.id === player.teamId);
  if (!myTeam) return false;

  const isPlayoffTeam = standings.indexOf(myTeam) < 16;
  if (!isPlayoffTeam) return false;

  // Bônus reduzido para evitar que o jogador "carregue" um time horrível sozinho
  const mentalBonus = (player.attributes.Mentalidade || 50) * 0.08; 
  let teamPower = myTeam.effectivePower + mentalBonus;

  for (let round = 1; round <= 4; round++) {
    // Escala brutal de dificuldade:
    // Round 1: 255 (Equipe de Playoffs padrão)
    // Round 2: 265 (Contender de 2ª rodada)
    // Round 3: 275 (Finalista de Conferência - ~55 vitórias)
    // Round 4: 290 (Equipe Nível Campeonato/Dinastia - ~60+ vitórias)
    const opponentPower = 245 + (round * 15); 
    
    const winProbability = teamPower / (teamPower + opponentPower);
    
    if (Math.random() > winProbability) {
      return false; 
    }
  }

  return true; 
}