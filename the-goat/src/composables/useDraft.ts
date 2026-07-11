import { ref, computed } from 'vue';
import { nbaPlayers } from '../data/players';
import { nbaTeams } from '../data/teams';
import type { AttributeKey, PlayerAttributes, Position } from '../types';

// Interface local para tipar o jogador sorteado garantindo que o OVR exista
interface DraftedLegend {
  id?: number | string;
  name: string;
  position: Position;
  ovr: number;
  attributes: PlayerAttributes;
}

const ATTRIBUTES_LIST: AttributeKey[] = [
  'Shooting', 'Dribbling', 'Defense', 'IQ', 'Athleticism', 
  'Passing', 'Rebounding', 'Speed', 'Mentality'
];

export function useDraft() {
  const currentDrawnPlayer = ref<DraftedLegend | null>(null);
  const myAttributes = ref<Partial<PlayerAttributes>>({});
  const availableSlots = ref<AttributeKey[]>([...ATTRIBUTES_LIST]);
  const hasReroll = ref(true);

  const isDraftComplete = computed(() => availableSlots.value.length === 0);

  // Calcula um OVR base se o jogador da base de dados não tiver
  const calculateStartingOVR = (attrs: PlayerAttributes): number => {
    const sum = (attrs.Shooting * 0.15) + (attrs.Dribbling * 0.1) +
                (attrs.Defense * 0.15) + (attrs.IQ * 0.1) +
                (attrs.Athleticism * 0.15) + (attrs.Passing * 0.1) +
                (attrs.Rebounding * 0.1) + (attrs.Speed * 0.1) +
                (attrs.Mentality * 0.05);
    return Math.floor(sum);
  };

  const drawRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * nbaPlayers.length);
    const p = nbaPlayers[randomIndex] as any;
    
    currentDrawnPlayer.value = {
      id: p.id || randomIndex,
      name: p.name,
      position: p.position as Position,
      ovr: p.ovr || calculateStartingOVR(p.attributes),
      attributes: p.attributes
    };
  };

  const useReroll = () => {
    if (hasReroll.value) {
      hasReroll.value = false;
      drawRandomPlayer();
    }
  };

  const selectAttribute = (key: AttributeKey) => {
    if (currentDrawnPlayer.value && availableSlots.value.includes(key)) {
      myAttributes.value[key] = currentDrawnPlayer.value.attributes[key];
      availableSlots.value = availableSlots.value.filter(slot => slot !== key);
      
      if (!isDraftComplete.value) {
        drawRandomPlayer();
      }
    }
  };

  const generateRookieAttributes = (peak: PlayerAttributes): PlayerAttributes => {
    const rookie = {} as PlayerAttributes;
    const rng = (min = 0.65, max = 0.85) => (Math.random() * (max - min)) + min;
    
    for (const key of Object.keys(peak) as AttributeKey[]) {
      let multiplier = rng();
      // Físicos começam mais altos, atributos mentais começam mais baixos
      if (key === 'Speed' || key === 'Athleticism') multiplier = rng(0.8, 0.95);
      if (key === 'IQ' || key === 'Mentality') multiplier = rng(0.5, 0.75);
      
      rookie[key] = Math.max(40, Math.floor(peak[key] * multiplier));
    }
    return rookie;
  };

  const calculateDraftPick = (ovr: number): number => {
    if (ovr >= 80) return Math.floor(Math.random() * 3) + 1; // Top 3 Pick
    if (ovr >= 75) return Math.floor(Math.random() * 7) + 4; // Pick 4-10
    if (ovr >= 70) return Math.floor(Math.random() * 10) + 11; // Pick 11-20
    if (ovr >= 65) return Math.floor(Math.random() * 10) + 21; // Pick 21-30
    return Math.floor(Math.random() * 30) + 31; // 2nd Round Pick
  };

  const getRandomTeam = (): string => {
    const randomIndex = Math.floor(Math.random() * nbaTeams.length);
    return nbaTeams[randomIndex].id;
  };

  const resetDraft = () => {
    myAttributes.value = {};
    availableSlots.value = [...ATTRIBUTES_LIST];
    hasReroll.value = true;
    currentDrawnPlayer.value = null;
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
    getRandomTeam,
    generateRookieAttributes,
    calculateDraftPick,
    resetDraft
  };
}