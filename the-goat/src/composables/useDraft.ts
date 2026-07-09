// src/composables/useDraft.ts
import { ref, computed } from 'vue';
import type { AttributeKey, RealPlayer, PlayerAttributes } from '../types';
import { nbaPlayers } from '../data/players';

const ATTRIBUTES_LIST: AttributeKey[] = ['Arremesso', 'Drible', 'Defesa', 'IQ', 'Atletismo', 'Passe', 'Rebote', 'Velocidade', 'Mentalidade'];

export function useDraft() {
  const currentDrawnPlayer = ref<RealPlayer | null>(null);
  const myAttributes = ref<Partial<PlayerAttributes>>({});
  const availableSlots = ref<AttributeKey[]>([...ATTRIBUTES_LIST]);
  const hasReroll = ref(true);
  
  const isDraftComplete = computed(() => availableSlots.value.length === 0);

  const drawRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * nbaPlayers.length);
    currentDrawnPlayer.value = nbaPlayers[randomIndex];
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

  const getRandomTeam = () => {
    const teams = ['Bulls', 'Lakers', 'Warriors', 'Celtics', 'Heat', 'Knicks'];
    return teams[Math.floor(Math.random() * teams.length)];
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