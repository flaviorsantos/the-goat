import { ref } from 'vue';
import { nbaPlayers } from '../data/players';
import { nbaTeams } from '../data/teams';
import type { PlayerAttributes, RealPlayer } from '../types';

type AttributeKey = keyof PlayerAttributes;

type AttributeSource = {
  attribute: AttributeKey;
  player: string;
  value: number;
};

const ATTRIBUTE_KEYS: AttributeKey[] = [
  'Shooting',
  'Dribbling',
  'Defense',
  'IQ',
  'Athleticism',
  'Passing',
  'Rebounding',
  'Speed',
  'Finishing',
];

const emptyAttributes = (): PlayerAttributes => ({
  Shooting: 0,
  Dribbling: 0,
  Defense: 0,
  IQ: 0,
  Athleticism: 0,
  Passing: 0,
  Rebounding: 0,
  Speed: 0,
  Finishing: 0,
});

export function useDraft() {
  const currentDrawnPlayer = ref<RealPlayer | null>(null);
  const attributeSources = ref<Record<string, AttributeSource>>({});
  const myAttributes = ref<PlayerAttributes>(emptyAttributes());
  const hasReroll = ref(true);
  const isDraftComplete = ref(false);

  const drawRandomPlayer = () => {
    const candidates = nbaPlayers.length > 1 && currentDrawnPlayer.value
      ? nbaPlayers.filter(player => player.id !== currentDrawnPlayer.value?.id)
      : nbaPlayers;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    currentDrawnPlayer.value = candidates[randomIndex] ?? null;
    return currentDrawnPlayer.value;
  };

  const useReroll = () => {
    if (!hasReroll.value || isDraftComplete.value) return false;
    drawRandomPlayer();
    hasReroll.value = false;
    return true;
  };

  const selectAttribute = (key: AttributeKey) => {
    const drawnPlayer = currentDrawnPlayer.value;
    if (!drawnPlayer || isDraftComplete.value || myAttributes.value[key] > 0) {
      return false;
    }

    const value = drawnPlayer.attributes[key];
    myAttributes.value[key] = value;
    attributeSources.value[key] = {
      attribute: key,
      player: drawnPlayer.name,
      value,
    };

    isDraftComplete.value = ATTRIBUTE_KEYS.every(
      attribute => myAttributes.value[attribute] > 0,
    );
    if (!isDraftComplete.value) drawRandomPlayer();
    return true;
  };

  const getRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * nbaTeams.length);
    return nbaTeams[randomIndex].id;
  };

  const generateRookieAttributes = (peakAttributes: PlayerAttributes) => {
    const rookie = emptyAttributes();
    ATTRIBUTE_KEYS.forEach(key => {
      const reduction = Math.floor(Math.random() * 11) + 8;
      rookie[key] = Math.max(40, peakAttributes[key] - reduction);
    });
    return rookie;
  };

  const calculateDraftPick = (ovr: number) => {
    if (ovr >= 82) return Math.floor(Math.random() * 3) + 1;
    if (ovr >= 78) return Math.floor(Math.random() * 7) + 4;
    if (ovr >= 74) return Math.floor(Math.random() * 10) + 11;
    if (ovr >= 68) return Math.floor(Math.random() * 10) + 21;
    return Math.floor(Math.random() * 30) + 31;
  };

  const resetDraft = () => {
    myAttributes.value = emptyAttributes();
    attributeSources.value = {};
    hasReroll.value = true;
    isDraftComplete.value = false;
    currentDrawnPlayer.value = null;
  };

  return {
    currentDrawnPlayer,
    myAttributes,
    attributeSources,
    hasReroll,
    isDraftComplete,
    drawRandomPlayer,
    useReroll,
    selectAttribute,
    getRandomTeam,
    generateRookieAttributes,
    calculateDraftPick,
    resetDraft,
  };
}
