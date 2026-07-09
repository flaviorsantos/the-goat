// src/composables/useDraft.ts
import { ref, computed, reactive } from 'vue';
import type { AttributeKey, RealPlayer, PlayerAttributes } from '../types';
import { nbaPlayers } from '../data/players';
import { nbaTeams } from '../data/teams';

// Adicione esta linha:
const ATTRIBUTES_LIST: AttributeKey[] = ['Arremesso', 'Drible', 'Defesa', 'IQ', 'Atletismo', 'Passe', 'Rebote', 'Velocidade', 'Mentalidade'];
/**
 * Returns a random player whose ID hasn't been drawn yet.
 * If all players have been seen, resets the pool.
 */
function pickRandomPlayer(drawnIds: Set<number>): RealPlayer {
  const available = nbaPlayers.filter(p => !drawnIds.has(p.id));
  const pool = available.length > 0 ? available : nbaPlayers;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function useDraft() {
  const currentDrawnPlayer = ref<RealPlayer | null>(null);
  const myAttributes = ref<Partial<PlayerAttributes>>({});
  const availableSlots = ref<AttributeKey[]>([...ATTRIBUTES_LIST]);
  const hasReroll = ref(true);
  /** Track which player IDs have already been shown to avoid repeats. */
  const drawnPlayerIds = reactive(new Set<number>());
  
  const isDraftComplete = computed(() => availableSlots.value.length === 0);

  const drawRandomPlayer = () => {
    const player = pickRandomPlayer(drawnPlayerIds);
    drawnPlayerIds.add(player.id);
    currentDrawnPlayer.value = player;
  };

  const useReroll = () => {
    if (hasReroll.value) {
      hasReroll.value = false;
      drawRandomPlayer();
    }
  };

  const selectAttribute = (attr: AttributeKey) => {
    if (!currentDrawnPlayer.value || !availableSlots.value.includes(attr)) return;

    myAttributes.value[attr] = currentDrawnPlayer.value.attributes[attr];
    availableSlots.value = availableSlots.value.filter(a => a !== attr);
    
    if (!isDraftComplete.value) {
      drawRandomPlayer();
    }
  };

  const calculateStartingOVR = (): number => {
    const values = Object.values(myAttributes.value) as number[];
    if (values.length === 0) return 60;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    // Diminui um pouco a média crua para simular que o jogador começa como novato, 
    // mas o "teto" de desenvolvimento é baseado nessas notas.
    const average = Math.floor(sum / values.length);
    return Math.max(65, average - 10); 
  };

  const getRandomTeam = (): string => {
    const randomIndex = Math.floor(Math.random() * nbaTeams.length);
    return nbaTeams[randomIndex].id;
  };

  return {
    currentDrawnPlayer,
    myAttributes,
    availableSlots,
    hasReroll,
    isDraftComplete,
    drawRandomPlayer,
    useReroll,
    selectAttribute,
    calculateStartingOVR,
    getRandomTeam
  };
}