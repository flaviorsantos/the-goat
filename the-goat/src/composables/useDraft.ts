import { ref } from 'vue';
import { nbaPlayers } from '../data/players';
import { nbaTeams } from '../data/teams';

export function useDraft() {
  const currentDrawnPlayer = ref<any>(null);
  const attributeSources = ref<Record<string, { attribute: string; player: string; value: string }>>({});
  
  const myAttributes = ref({
    Shooting: 0,
    Dribbling: 0,
    Defense: 0,
    IQ: 0,
    Athleticism: 0,
    Passing: 0,
    Rebounding: 0,
    Speed: 0,
    Finishing: 0
  });
  
  const availableSlots = ref(Object.keys(myAttributes.value).length);
  const hasReroll = ref(true);
  const isDraftComplete = ref(false);

  const drawRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * nbaPlayers.length);
    currentDrawnPlayer.value = nbaPlayers[randomIndex];
  };

  const useReroll = () => {
    if (hasReroll.value) {
      drawRandomPlayer();
      hasReroll.value = false;
    }
  };
/*
  const selectAttribute = (key: keyof typeof myAttributes.value) => {
    if (currentDrawnPlayer.value && myAttributes.value[key] === 0) {
      myAttributes.value[key] = currentDrawnPlayer.value.attributes[key];
      attributeSources.value[key] = {
        attribute: key,
        player: currentDrawnPlayer.value.name
      };
      
      availableSlots.value--;
      
      if (availableSlots.value > 0) {
        drawRandomPlayer();
      } else {
        isDraftComplete.value = true;
      }
    }
  };*/

  const selectAttribute = (key: keyof typeof myAttributes.value) => {
    if (currentDrawnPlayer.value && myAttributes.value[key] === 0) {
      myAttributes.value[key] = currentDrawnPlayer.value.attributes[key];
      
      attributeSources.value[key] = {
        attribute: key,
        player: currentDrawnPlayer.value.name,
        value: currentDrawnPlayer.value.attributes[key] 
      };
      
      drawRandomPlayer();
      
      if (Object.values(myAttributes.value).every(val => val > 0)) {
        isDraftComplete.value = true;
      }
    }
  };

  const calculateStartingOVR = (attributes: Record<string, number>) => {
    const sum = (attributes.Shooting * 0.15) + (attributes.Dribbling * 0.1) +
                (attributes.Defense * 0.15) + (attributes.IQ * 0.1) +
                (attributes.Athleticism * 0.15) + (attributes.Passing * 0.1) +
                (attributes.Rebounding * 0.1) + (attributes.Speed * 0.1) +
                (attributes.Finishing * 0.05);
    return Math.floor(sum);
  };

  const getRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * nbaTeams.length);
    return nbaTeams[randomIndex].id;
  };

  const generateRookieAttributes = (peakAttributes: Record<string, number>) => {
    const rookie: Record<string, number> = {};
    for (const key in peakAttributes) {
      const reduction = Math.floor(Math.random() * 11) + 8; // Redução entre 8 e 18 pontos do potencial máximo
      rookie[key] = Math.max(40, peakAttributes[key] - reduction);
    }
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
    for (const key in myAttributes.value) {
      myAttributes.value[key as keyof typeof myAttributes.value] = 0;
    }
    attributeSources.value = {};
    availableSlots.value = Object.keys(myAttributes.value).length;
    hasReroll.value = true;
    isDraftComplete.value = false;
    currentDrawnPlayer.value = null;
  };

  return {
    currentDrawnPlayer,
    myAttributes,
    attributeSources,
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