import { ref, computed, reactive } from 'vue';
import type { AttributeKey, RealPlayer, PlayerAttributes } from '../types';
import { nbaPlayers } from '../data/players';
import { nbaTeams } from '../data/teams';

const ATTRIBUTES_LIST: AttributeKey[] = ['Shooting', 'Dribbling', 'Defense', 'IQ', 'Athleticism', 'Passing', 'Rebounding', 'Speed', 'Mentality'];

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

  const calculateDraftPick = (rookieOvr: number): number => {
    let pick = 60;
    const rng = Math.floor(Math.random() * 5); // Fator de imprevisibilidade (0 a 4)

    if (rookieOvr >= 80) pick = 1 + rng; // Top 5
    else if (rookieOvr >= 75) pick = 5 + Math.floor(Math.random() * 6); // Lottery (5 a 10)
    else if (rookieOvr >= 70) pick = 11 + Math.floor(Math.random() * 9); // Mid 1st Round (11 a 19)
    else if (rookieOvr >= 65) pick = 20 + Math.floor(Math.random() * 11); // Late 1st Round (20 a 30)
    else if (rookieOvr >= 60) pick = 31 + Math.floor(Math.random() * 15); // Early 2nd Round (31 a 45)
    else pick = 46 + Math.floor(Math.random() * 15); // Late 2nd Round (46 a 60)

    return Math.min(60, Math.max(1, pick));
  };

  const selectAttribute = (attr: AttributeKey) => {
    if (!currentDrawnPlayer.value || !availableSlots.value.includes(attr)) return;

    myAttributes.value[attr] = currentDrawnPlayer.value.attributes[attr];
    availableSlots.value = availableSlots.value.filter(a => a !== attr);
    
    if (!isDraftComplete.value) {
      drawRandomPlayer();
    }
  };

  const calculateStartingOVR = (rookieAttributes: PlayerAttributes): number => {
    const values = Object.values(rookieAttributes);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.floor(sum / values.length);
  };

  const getRandomTeam = (): string => {
    const randomIndex = Math.floor(Math.random() * nbaTeams.length);
    return nbaTeams[randomIndex].id;
  };

  const generateRookieAttributes = (peakAttributes: PlayerAttributes): PlayerAttributes => {
    const rookie = {} as PlayerAttributes;
    for (const key in peakAttributes) {
      const attr = key as AttributeKey;
      const nerf = Math.floor(Math.random() * 6) + 10; 
      rookie[attr] = Math.max(25, peakAttributes[attr] - nerf);
    }
    return rookie;
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
    resetDraft,
    calculateDraftPick
  };
}