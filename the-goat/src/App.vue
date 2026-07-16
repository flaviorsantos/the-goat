<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import { calculateGoatScore } from './utils/careerEvaluator';
import { compareCareer } from './utils/careerComparison';
import { calculateOverall } from './utils/statsCalculator';
import type { Difficulty, PlayerAttributes, Position } from './types';

// Motor do Jogo
const { 
  player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones, 
  initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
  loadPastCareer, simulateRemainingCareer
} = useGameEngine();

// Motor de Draft
const { 
  currentDrawnPlayer, 
  myAttributes, 
  hasReroll, 
  isDraftComplete, 
  drawRandomPlayer, 
  useReroll, 
  selectAttribute, 
  getRandomTeam,
  generateRookieAttributes,
  calculateDraftPick,
  resetDraft,
  attributeSources
} = useDraft();

const availableSlots = computed(() => Object.keys(myAttributes.value) as Array<keyof typeof myAttributes.value>);

// Utilitários de Dev/Teste
const executeStressTest = async () => {
  if (!import.meta.env.DEV) return;

  const { runStressTest } = await import('./utils/stressTest');
  const attributeValues = [85, 90, 95, 99];

  for (const fixedAttributeValue of attributeValues) {
    await runStressTest({
      iterationsPerPosition: 50,
      fixedAttributeValue,
    });
  }
};

// Estados do Formulário e do Jogo
type GamePhase = 'setup' | 'draft-steal' | 'draft-day' | 'playing' | 'retired';
type PastCareer = Parameters<typeof loadPastCareer>[0];
type LastSetup = {
  name?: string;
  position?: Position;
  nationality?: string;
  jersey?: number;
};

const currentPhase = ref<GamePhase>('setup');
const isDev = import.meta.env.DEV;

const inputName = ref('');
const inputPosition = ref<Position | ''>('');
const inputNationality = ref('');
const inputJersey = ref<number | ''>('');
const selectedDifficulty = ref<Difficulty>('amateur');
const draftPickResult = ref(60);
const pastCareers = ref<PastCareer[]>([]);
const milestoneButton = ref<HTMLButtonElement | null>(null);

const viewPastCareer = (career: PastCareer) => {
  loadPastCareer(career);
  currentPhase.value = 'retired';
};

// --- PROPRIEDADES COMPUTADAS (Dashboard e OVR) ---

// Declarado antes do newsFeed para evitar erros de inicialização
const lastSeason = computed(() => history.value.length === 0 ? null : history.value[history.value.length - 1]);

// Correção: player.value utilizado em todos os acessos
const isFreeAgent = computed(() => player.value.contractYearsLeft === 0 && !player.value.isRetired);

const newsFeed = computed(() => {
  if (!lastSeason.value) return ['The rookie is ready. The world is watching.'];
  const news = [];
  
  // Segurança com "?." caso playoffs não tenha sido gerado
  if (lastSeason.value.playoffs?.wonRing) {
    news.push(`${player.value.name} leads the ${player.value.teamId} to the NBA Championship!`);
  } else if (!lastSeason.value.playoffs?.madePlayoffs) {
    news.push(`Disaster! ${player.value.teamId} misses the playoffs.`);
  } else {
    news.push(`${player.value.teamId} eliminated in ${lastSeason.value.playoffs?.eliminatedIn}.`);
  }

  if (lastSeason.value.ppg > 30) news.push(`${player.value.name} has a historic scoring season averaging ${lastSeason.value.ppg} PPG.`);
  if (lastSeason.value.awards?.includes('MVP')) news.push(`${player.value.name} named the Most Valuable Player!`);
  
  return news;
});

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

const refreshPastCareerScores = (careers: PastCareer[]) =>
  careers.map(career => {
    const counts: Record<string, number> = {};
    career.history.forEach(season => {
      season.awards?.forEach(award => {
        counts[award] = (counts[award] ?? 0) + 1;
      });
    });
    const evaluation = calculateGoatScore(
      career.careerTotals,
      Object.entries(counts),
    );

    return {
      ...career,
      goatScore: evaluation.score,
      goatTier: evaluation.tier,
    };
  });

const formattedTimeline = computed(() => {
  if (!player.value.careerTimeline) return [];
  return player.value.careerTimeline.map((entry, index) => {
    const isLast = index === player.value.careerTimeline.length - 1;
    const end = entry.endYear !== null ? entry.endYear : history.value.length;
    const startAge = 19 + entry.startYear - 1;
    const endAge = 19 + end - 1;
    return {
      teamId: entry.teamId,
      period: startAge === endAge ? `${startAge}` : `${startAge}-${endAge}`,
      isLast
    };
  });
});

const trophyCabinet = computed(() => {
  const counts: Record<string, number> = {};
  history.value.forEach(season => {
    if (season.playoffs?.wonRing) counts['Rings'] = (counts['Rings'] || 0) + 1;
    season.awards?.forEach((award: string) => counts[award] = (counts[award] || 0) + 1);
  });
  return counts;
});

const sortedAwards = computed(() => {
  return Object.entries(trophyCabinet.value)
    .filter(([award]) => !['Rings', 'MVP', 'Finals MVP', 'DPOY'].includes(award))
    .sort((a, b) => b[1] - a[1]);
});

const detailedAwards = computed(() => {
  const counts: Record<string, number> = {};
  history.value.forEach(season => season.awards?.forEach((award: string) => counts[award] = (counts[award] || 0) + 1));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
});

const goatEvaluation = computed(() => calculateGoatScore(careerTotals.value, detailedAwards.value));
const careerComparisons = computed(() => compareCareer({
  position: player.value.position,
  totals: careerTotals.value,
  awards: trophyCabinet.value,
}));

const getRecordPercentage = (current: number, record: number) => {
  return Math.min(100, (current / record) * 100).toFixed(1);
};

const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;


// --- CONSTANTES E OPÇÕES ---

const nbaRecords = {
  points: 40474, assists: 15806, rebounds: 23924,
  steals: 3265, blocks: 3830, rings: 11, mvps: 6
};

const nationalities = [
  { code: 'US', name: 'USA' }, { code: 'RS', name: 'Serbia' },
  { code: 'SI', name: 'Slovenia' }, { code: 'FR', name: 'France' },
  { code: 'CA', name: 'Canada' }, { code: 'AU', name: 'Australia' },
  { code: 'ES', name: 'Spain' }, { code: 'GR', name: 'Greece' },
  { code: 'DE', name: 'Germany' }, { code: 'BR', name: 'Brazil' },
  { code: 'IT', name: 'Italy' }, { code: 'HR', name: 'Croatia' },
  { code: 'LT', name: 'Lithuania' }, { code: 'AR', name: 'Argentina' }
];

const positions = [
  { code: 'PG', name: 'Point Guard' }, { code: 'SG', name: 'Shooting Guard' },
  { code: 'SF', name: 'Small Forward' }, { code: 'PF', name: 'Power Forward' },
  { code: 'C', name: 'Center' }
];

const easternTeams = computed(() => {
  if (!leagueTeams.value) return [];
  const eastIds = ['BOS','NYK','PHI','MIL','CLE','IND','MIA','ORL','CHI','ATL','BKN','TOR','CHA','WAS','DET'];
  return leagueTeams.value
    .filter(team => eastIds.includes(team.id))
    .sort((a, b) => (b.wins || 0) - (a.wins || 0));
});

const westernTeams = computed(() => {
  if (!leagueTeams.value) return [];
  const westIds = ['DEN','OKC','MIN','LAC','DAL','PHX','LAL','NOP','SAC','GSW','HOU','UTA','MEM','SAS','POR'];
  return leagueTeams.value
    .filter(team => westIds.includes(team.id))
    .sort((a, b) => (b.wins || 0) - (a.wins || 0));
});

// --- AÇÕES DO JOGO ---

const startDraftSteal = () => {
  if (!inputName.value || !inputPosition.value || !inputNationality.value || inputJersey.value === '') return;
  
  localStorage.setItem('the_goat_last_setup', JSON.stringify({
    name: inputName.value,
    position: inputPosition.value,
    nationality: inputNationality.value,
    jersey: inputJersey.value
  }));
  
  currentPhase.value = 'draft-steal';
  drawRandomPlayer();
};

const bestSeasonNumber = computed(() => {
  if (history.value.length === 0) return -1;
  let best = history.value[0];
  let maxScore = 0;
  history.value.forEach(s => {
    const score = s.ppg + s.apg + s.rpg + (s.playoffs?.wonRing ? 10 : 0) + (s.awards?.includes('MVP') ? 15 : 0);
    if (score > maxScore) { maxScore = score; best = s; }
  });
  return best.seasonNumber;
});

const processDraftDay = () => {
  const peakAttributes: PlayerAttributes = { ...myAttributes.value };
  const rookieAttributes = generateRookieAttributes(peakAttributes);
  const initialOvr = calculateOverall(
    rookieAttributes,
    inputPosition.value as Position,
  );
  const draftedTeam = getRandomTeam();
  
  draftPickResult.value = calculateDraftPick(initialOvr);
  
  initCareer(
    inputName.value, 
    inputPosition.value as Position, 
    inputNationality.value, 
    inputJersey.value as number, 
    selectedDifficulty.value,
    attributeSources.value
  );
  
  // Correção: Atualização das propriedades da ref `player` usando `.value`
  player.value.teamId = draftedTeam;
  player.value.ovr = initialOvr;
  player.value.attributes = rookieAttributes;
  player.value.potentialAttributes = peakAttributes;
  player.value.age = 19;
  
  player.value.careerTimeline.push({
    teamId: draftedTeam,
    startYear: 1,
    endYear: null
  });
  
  currentPhase.value = 'draft-day';
};

const startCareer = () => { 
  player.value.originalDNA = JSON.parse(JSON.stringify(attributeSources.value));
  currentPhase.value = 'playing';
};
const viewLegacy = () => { currentPhase.value = 'retired'; };

const resetGame = () => {
  pastCareers.value = refreshPastCareerScores(
    readStorage<PastCareer[]>('the_goat_past_careers', []),
  );
  resetDraft();
  currentPhase.value = 'setup';
};

const dismissMilestone = () => pendingMilestones.value.shift();

const retireManual = () => {
  if (confirm("Are you sure you want to end your career? This action cannot be undone.")) {
    forceRetirement();
  }
};

onMounted(() => {
  pastCareers.value = refreshPastCareerScores(
    readStorage<PastCareer[]>('the_goat_past_careers', []),
  );
  const lastSetup = readStorage<LastSetup>('the_goat_last_setup', {});
  if (lastSetup.name) {
    inputName.value = lastSetup.name;
    inputPosition.value = lastSetup.position ?? '';
    inputNationality.value = lastSetup.nationality ?? '';
    inputJersey.value = lastSetup.jersey ?? '';
  }
});

let draftTimer: ReturnType<typeof setTimeout> | undefined;

watch(() => isDraftComplete.value, (newVal) => {
  if (newVal) {
    draftTimer = setTimeout(processDraftDay, 600);
  }
});

watch(
  () => pendingMilestones.value.length,
  async length => {
    if (length > 0) {
      await nextTick();
      milestoneButton.value?.focus();
    }
  },
);

onBeforeUnmount(() => {
  if (draftTimer) clearTimeout(draftTimer);
});
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
    <div class="max-w-6xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-black uppercase tracking-widest text-white">The Goat Simulator</h1>
      </header>

      <!-- FASE 1: SETUP (Estilo Dark/Grids) -->
      <section v-if="currentPhase === 'setup'" class="max-w-3xl mx-auto pb-12">
        <div class="mb-12 border-b border-gray-800 pb-8">
          <p class="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2">How it works</p>
          <h2 class="text-4xl font-black text-white uppercase leading-tight">Steal attributes from legends. Live a career. Discover if you are the Goat.</h2>
        </div>
        
        <div class="space-y-10">
          
          <!-- Nome -->
          <div>
            <label for="player-name" class="block text-xl font-black text-white mb-4 uppercase">Your Name</label>
            <input
              id="player-name"
              v-model.trim="inputName"
              type="text"
              autocomplete="name"
              class="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-6 py-5 text-xl text-white font-bold transition-colors focus-visible:outline-none focus-visible:border-yellow-500 focus-visible:ring-2 focus-visible:ring-yellow-500"
              placeholder="How will the world call you?"
            />
          </div>

          <!-- Nacionalidade -->
          <fieldset>
            <legend class="block text-xl font-black text-white mb-4 uppercase">Nationality</legend>
            <div class="grid grid-cols-7 gap-2">
              <button 
                v-for="nat in nationalities" 
                :key="nat.code"
                type="button"
                @click="inputNationality = nat.code"
                :class="inputNationality === nat.code ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500'"
                class="border rounded py-2 flex flex-col items-center justify-center transition-colors"
                :aria-pressed="inputNationality === nat.code"
                :aria-label="`Select nationality: ${nat.name}`"
              >
                <span class="font-black text-sm">{{ nat.code }}</span>
              </button>
            </div>
          </fieldset>

          <!-- Posição -->
          <fieldset>
            <legend class="block text-xl font-black text-white mb-4 uppercase">Choose your Position</legend>
            <div class="grid grid-cols-5 gap-3">
              <button 
                v-for="pos in positions" 
                :key="pos.code"
                type="button"
                @click="inputPosition = pos.code as Position"
                :class="inputPosition === pos.code ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500'"
                class="border rounded-lg py-4 flex flex-col items-center justify-center transition-colors"
                :aria-pressed="inputPosition === pos.code"
                :aria-label="`Select position: ${pos.name}`"
              >
                <span class="font-black text-xl">{{ pos.code }}</span>
                <span class="text-[9px] uppercase font-bold opacity-80 mt-1">{{ pos.name }}</span>
              </button>
            </div>
          </fieldset>

          <!-- Número da Camisa -->
          <div>
            <label for="jersey-number" class="block text-xl font-black text-white mb-4 uppercase">Jersey Number</label>
            <input
              id="jersey-number"
              v-model.number="inputJersey"
              type="number"
              min="0"
              max="99"
              inputmode="numeric"
              class="w-32 bg-[#0a0a0a] border border-gray-800 rounded-lg px-6 py-4 text-2xl text-center text-white font-black transition-colors focus-visible:outline-none focus-visible:border-yellow-500 focus-visible:ring-2 focus-visible:ring-yellow-500"
              placeholder="0-99"
            />
          </div>

          <!-- Modos de Jogo e Dificuldade -->
          <div class="space-y-6 pt-6 border-t border-gray-800">
            <fieldset>
              <legend class="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">Difficulty</legend>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  @click="selectedDifficulty = 'amateur'"
                  :class="selectedDifficulty === 'amateur' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors"
                  :aria-pressed="selectedDifficulty === 'amateur'"
                  aria-label="Select difficulty: Amateur"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'amateur' ? 'text-yellow-500' : ''">Amateur <span v-if="selectedDifficulty === 'amateur'" class="text-yellow-500 text-xs ml-1">●</span></p>
                  <p class="text-xs text-gray-400 font-bold">See legends' exact numbers. 1 blind reroll.</p>
                </button>
                <button 
                  type="button"
                  @click="selectedDifficulty = 'pro'"
                  :class="selectedDifficulty === 'pro' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors"
                  :aria-pressed="selectedDifficulty === 'pro'"
                  aria-label="Select difficulty: Pro"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'pro' ? 'text-yellow-500' : ''">Pro</p>
                  <p class="text-xs text-gray-400 font-bold">No numbers. No rerolls. For purists.</p>
                </button>
              </div>
            </fieldset>
          </div>

          <div class="text-center mt-12">
            <button 
              type="button"
              @click="startDraftSteal" 
              :disabled="!inputName || !inputPosition || !inputNationality || inputJersey === ''"
              class="mx-auto bg-yellow-500 text-black font-black py-5 px-16 rounded-full hover:bg-yellow-400 uppercase tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl shadow-lg"
            >
              Start Draft
            </button>
          </div>

          <!-- Debug Button (Posicionado discretamente no canto) -->
          <button
            v-if="isDev"
            type="button"
            class="fixed bottom-4 right-4 bg-red-900/50 hover:bg-red-600 text-white p-2 rounded text-[9px] uppercase font-black tracking-widest opacity-30 hover:opacity-100 transition-opacity z-50"
            @click="executeStressTest"
          >
            Run Stress Test
          </button>
        </div>
      <!-- NOVO: Histórico de Carreiras Aposentadas -->
        <div v-if="pastCareers.length > 0" class="mt-20 pt-10 border-t border-gray-800">
          <p class="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">Your Recent Careers</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <button 
                v-for="car in pastCareers" 
                :key="car.id" 
                @click="viewPastCareer(car)" 
                class="bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500 p-6 rounded-xl text-left transition-colors group relative overflow-hidden"
             >
                <div class="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex justify-between items-start mb-3">
                   <span class="text-3xl font-black text-yellow-500">{{ car.goatScore }}</span>
                   <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{{ car.player.position }} · {{ car.player.nationality }}</span>
                </div>
                <h4 class="relative z-10 text-white font-black uppercase text-lg mb-1">{{ car.player.name }}</h4>
                <p class="relative z-10 text-yellow-600 text-[10px] font-bold uppercase tracking-widest mb-3">{{ car.goatTier }}</p>
                <div class="relative z-10 text-gray-400 text-xs font-bold border-t border-gray-800 pt-3 mt-3 flex justify-between">
                   <span>{{ car.careerTotals.totalPoints }} PTS</span>
                   <span class="text-yellow-500">{{ car.rings }} 🏆</span>
                </div>
             </button>
          </div>
        </div>
      </section>

      <!-- FASE 2: DRAFT STEAL -->
      <section v-if="currentPhase === 'draft-steal'" class="max-w-4xl mx-auto pb-12">
        <!-- Status Bar -->
        <div class="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <div class="text-gray-500 text-xs font-bold uppercase tracking-widest">
            <span>Filled Slots {{ Object.values(myAttributes).filter(v => v > 0).length }}/9</span>
            <span class="text-yellow-500 ml-2">{{ inputPosition }} · {{ selectedDifficulty }}</span>
          </div>
          
          <button 
            v-if="selectedDifficulty === 'amateur'"
            @click="useReroll"
            :disabled="!hasReroll"
            class="border border-yellow-500 text-yellow-500 font-black py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black uppercase text-[10px] tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Blind Reroll ({{ hasReroll ? '1' : '0' }})
          </button>
          <div v-else class="text-gray-600 text-[10px] uppercase font-black tracking-widest px-4 py-2 bg-gray-900 rounded-full">
            Pro Mode: No rerolls
          </div>
        </div>

        <!-- Banner da Lenda Atual -->
        <div v-if="currentDrawnPlayer" class="relative z-10 flex flex-col items-center justify-center min-h-40">
    
          <h2 class="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-2 text-center">
            {{ selectedDifficulty === 'pro' ? 'Mystery Player' : currentDrawnPlayer.name }}
          </h2>
          
          <p class="text-gray-500 font-bold uppercase tracking-widest text-sm md:text-lg text-center flex items-center justify-center gap-2">
            {{ currentDrawnPlayer.position }} 
            <span class="text-yellow-500">|</span> 
            Era: {{ currentDrawnPlayer.career }} 
          </p>
          
        </div>

        <!-- Grid de Atributos -->
        <div class="grid grid-cols-3 gap-2 mb-6">
          <button 
            v-for="slot in availableSlots" 
            :key="slot"
            @click="selectAttribute(slot)"
            :disabled="myAttributes[slot] > 0"
            :class="myAttributes[slot] > 0 ? 'opacity-20 cursor-not-allowed border-gray-900' : 'hover:border-yellow-500'"
            class="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center transition-all group"
          >
            <span :class="myAttributes[slot] > 0 ? 'line-through text-gray-700' : 'text-gray-500 group-hover:text-yellow-500'" class="text-[9px] font-bold uppercase tracking-widest mb-1 transition-colors">
              {{ slot }}
            </span>
            <template v-if="myAttributes[slot] === 0">
              <span v-if="selectedDifficulty === 'amateur'" class="text-xl font-black text-white">{{ currentDrawnPlayer?.attributes[slot] }}</span>
              <span v-else class="text-xl font-black text-gray-700 tracking-widest">???</span>
            </template>
            <span v-else class="text-[10px] font-black text-yellow-500 mt-1">SELECTED</span>
          </button>
        </div>

          <!-- Painel: Seu Jogador (Slots Fixos) -->
          <div class="mt-12 border-t border-gray-800 pt-8">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Seu Jogador</p>
            
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <!-- Itera sobre todas as chaves de atributos base (Shooting, Speed, etc) -->
              <div 
                v-for="(val, key) in myAttributes" 
                :key="key"
                class="flex flex-col items-center justify-center p-4 border rounded-xl h-28 transition-all duration-300"
                :class="val > 0 ? 'bg-gray-950 border-gray-700 shadow-lg' : 'bg-transparent border-gray-800 border-dashed opacity-40'"
              >
                <!-- Estado: Preenchido -->
                <template v-if="val > 0">
                  <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{{ key }}</span>
                  <span class="text-2xl font-black text-white" :class="val >= 90 ? 'text-yellow-500' : ''">{{ val }}</span>
                  <span class="text-[9px] text-gray-400 mt-2 truncate w-full text-center">
                     {{ attributeSources[key].player }}
                  </span>
                </template>
                
                <!-- Estado: Vazio (Aguardando Escolha) -->
                <template v-else>
                  <span class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{{ key }}</span>
                </template>
              </div>
            </div>
          </div>
      </section>

      <!-- FASE 3: DRAFT DAY REVEAL (Adaptado ao Dark Mode) -->
      <section v-if="currentPhase === 'draft-day'" class="bg-[#0a0a0a] p-10 rounded-xl border border-gray-800 max-w-xl mx-auto text-center shadow-2xl relative overflow-hidden mt-12">
        <div class="absolute inset-0 bg-yellow-900/10 blur-3xl z-0"></div>
        <div class="relative z-10">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">With the Pick #{{ draftPickResult }} in the NBA Draft...</p>
          <h2 class="text-3xl font-black text-white mb-2">The <span class="text-yellow-500">{{ player.teamId }}</span> select</h2>
          <h1 class="text-5xl font-black text-white my-8 uppercase tracking-tighter">{{ player.name }}</h1>
          
          <div class="flex justify-center gap-12 mb-10 border-y border-gray-800 py-8 bg-[#12120a]/50 rounded-lg">
            <div>
              <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Starting OVR</p>
              <p class="text-5xl font-black text-yellow-500">{{ player.ovr }}</p>
            </div>
            <div class="w-px bg-gray-800"></div>
            <div>
              <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Position</p>
              <p class="text-5xl font-black text-white">{{ player.position }}</p>
            </div>
          </div>

          <button 
            @click="startCareer"
            class="w-full bg-white hover:bg-gray-200 text-black font-black py-5 rounded-full transition-colors uppercase tracking-widest text-lg"
          >
            Sign Rookie Contract
          </button>
        </div>
      </section>
      <!-- FASE 4: SIMULAÇÃO -->
      <!-- FASE 4: O JOGO (HUB DA CARREIRA) -->
      <section v-if="currentPhase === 'playing'" class="max-w-7xl mx-auto pb-12 animate-fade-in">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- COLUNA ESQUERDA: Card do Jogador -->
          <div class="lg:col-span-3 space-y-6">
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10">
                <span class="text-6xl font-black">{{ player.jerseyNumber }}</span>
              </div>
              
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-black text-white text-xl">
                  {{ player.teamId }}
                </div>
                <div>
                  <h3 class="text-white font-black uppercase text-xl">{{ player.name }}</h3>
                  <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">{{ player.position }} · {{ player.nationality }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-y border-gray-800 py-4 mb-4">
                <div>
                  <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">OVR</p>
                  <p class="text-3xl font-black text-yellow-500">{{ player.ovr }}</p>
                </div>
                <div>
                  <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Age</p>
                  <p class="text-3xl font-black text-white">{{ player.age }}</p>
                </div>
              </div>

              <!-- Médias da Última Temporada -->
              <div>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                  {{ lastSeason ? `Season ${lastSeason.seasonNumber} Stats` : 'Rookie Season' }}
                </p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">MPG</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.mpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">PTS</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.ppg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">REB</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.rpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">AST</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.apg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">STL</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.spg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">BLK</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.bpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">FG%</span>
                    <span class="text-white font-black">{{ lastSeason ? (lastSeason.fgPct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">3P%</span>
                    <span class="text-white font-black">{{ lastSeason ? (lastSeason.fg3Pct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">FT%</span>
                    <span class="text-white font-black">{{ lastSeason ? (lastSeason.ftPct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">+/-</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.plusMinus.toFixed(1) : '0.0' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUNA CENTRAL: Ação e Imprensa -->
          <div class="lg:col-span-6 space-y-6">
            
            <!-- Janela de Ação (Contrato ou Simulação) -->
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
              <div v-if="player.isRetired">
                <h3 class="text-2xl font-black text-white uppercase text-center mb-4">Career Ended</h3>
                <button @click="viewLegacy" class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg transition-colors uppercase tracking-widest">View Legacy</button>
              </div>
              
              <div v-else-if="isFreeAgent">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-yellow-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span> Transfer Window
                  </p>
                  <p class="text-gray-500 text-[10px] font-bold uppercase">{{ player.age }} Years Old</p>
                </div>
                
                <h3 class="text-2xl font-black text-white uppercase mb-6 leading-none">Your contract expired</h3>
                
                <div v-if="freeAgencyOffers.length === 0" class="text-center">
                  <button @click="generateOffers" class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg transition-colors uppercase tracking-widest text-sm">
                    Listen to Offers
                  </button>
                </div>
                
                <div v-else class="space-y-3">
                  <button 
                    v-for="(offer, idx) in freeAgencyOffers" 
                    :key="idx"
                    @click="acceptOffer(offer)"
                    class="w-full bg-[#12120a] border border-gray-800 hover:border-yellow-500 rounded-lg p-4 flex justify-between items-center transition-all group"
                  >
                    <div class="text-left flex items-center gap-4">
                      <div class="w-10 h-10 bg-black border border-gray-800 rounded-full flex items-center justify-center text-xs font-black text-white group-hover:border-yellow-500 transition-colors">
                        {{ offer.teamId }}
                      </div>
                      <div>
                        <p class="text-white font-black uppercase text-lg group-hover:text-yellow-500 transition-colors leading-none mb-1">{{ offer.teamId === player.teamId ? 'Stay at ' + offer.teamId : offer.teamId }}</p>
                        <p class="text-gray-500 text-[9px] uppercase font-bold tracking-widest">{{ offer.role }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-yellow-500 font-black text-lg leading-none mb-1">${{ offer.salary }}M <span class="text-gray-500 text-[10px] font-normal">/yr</span></p>
                      <p class="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{{ offer.years }} {{ offer.years === 1 ? 'Year' : 'Years' }}</p>
                    </div>
                  </button>
                </div>
              </div>

              <div v-else class="text-center">
                <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                  Contract: {{ player.contractYearsLeft }} Years Left
                </p>
                <button @click="simulateSeason" class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 rounded-lg transition-colors uppercase tracking-widest text-lg">
                  {{ player.gameMode === 'fast' ? 'Simulate Season' : 'Advance Week' }}
                </button>
                <button 
                  @click="simulateRemainingCareer" 
                  :disabled="player.contractYearsLeft === 0"
                  class="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded shadow-lg transition-all"
                >
                  Simulate Career to End
                </button>
                <button v-if="player.age >= 32" @click="retireManual" class="w-full mt-4 bg-transparent border border-gray-800 hover:border-red-900 hover:bg-red-900/10 text-gray-600 hover:text-red-500 font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">
                  Announce Retirement
                </button>
              </div>
            </div>

            <!-- Feed de Imprensa -->
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
              <h4 class="text-white font-black uppercase tracking-widest text-sm mb-4 border-b border-gray-800 pb-2">The Press</h4>
              <ul class="space-y-4">
                <li v-for="(news, index) in newsFeed" :key="index" class="flex gap-4 text-sm">
                  <span class="text-yellow-500 font-bold opacity-80">{{ player.age + (lastSeason ? 0 : 0) }} yo</span>
                  <span class="text-gray-300">{{ news }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Últimos Prêmios -->
            <div v-if="lastSeason && lastSeason.awards.length > 0" class="flex flex-wrap gap-2">
              <div v-for="award in lastSeason.awards" :key="award" class="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded">
                {{ award }}
              </div>
            </div>

          </div>

          <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 h-full flex flex-col">
            <h4 class="text-white font-black uppercase tracking-widest text-sm mb-4 border-b border-gray-800 pb-2">League Standings</h4>
            
            <!-- Correção visual: Substituição do grid-cols-2 por empilhamento vertical (space-y-4) -->
            <div class="space-y-4 flex-1">
              <div>
                <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-3">Eastern</p>
                <div v-for="(team, idx) in easternTeams" :key="team.id" class="flex justify-between items-center text-[10px] mb-1.5">
                  <span class="flex gap-2"><span class="text-gray-600 font-bold w-3">{{ (idx as number) + 1 }}</span><span :class="team.id === player.teamId ? 'text-yellow-500 font-black' : 'text-gray-300'">{{ team.id }}</span></span>
                  <span class="text-gray-500 font-mono">{{ team.wins }}-{{ team.losses }}</span>
                </div>
              </div>
              
              <div class="pt-2 border-t border-gray-800/50">
                <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-3">Western</p>
                <div v-for="(team, idx) in westernTeams" :key="team.id" class="flex justify-between items-center text-[10px] mb-1.5">
                  <span class="flex gap-2"><span class="text-gray-600 font-bold w-3">{{ (idx as number) + 1 }}</span><span :class="team.id === player.teamId ? 'text-yellow-500 font-black' : 'text-gray-300'">{{ team.id }}</span></span>
                  <span class="text-gray-500 font-mono">{{ team.wins }}-{{ team.losses }}</span>
                </div>
              </div>
            </div>
            
            <!-- Active League Awards -->
            <div v-if="lastSeason && lastSeason.leagueAwards" class="mt-4 border-t border-gray-800 pt-4">
              <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-2">Season Leaders</p>
              <div class="space-y-1.5 text-[10px]">
                <div class="flex justify-between"><span class="text-gray-400 font-bold">MVP</span> <span class="text-yellow-500 font-black">{{ lastSeason.leagueAwards.MVP }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400 font-bold">DPOY</span> <span class="text-white font-black">{{ lastSeason.leagueAwards.DPOY }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400 font-bold">SMOTY</span> <span class="text-white font-black">{{ lastSeason.leagueAwards.SMOTY }}</span></div>
                <div v-if="lastSeason.playoffs?.wonRing" class="flex justify-between"><span class="text-gray-400 font-bold">FMVP</span> <span class="text-white font-black">{{ lastSeason.leagueAwards.FMVP }}</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- FASE 5: O LEGADO (APOSENTADORIA) -->
      <section v-if="currentPhase === 'retired'" class="max-w-5xl mx-auto pb-12 animate-fade-in">
        
        <!-- Cabeçalho do Legado -->
        <div class="flex items-end gap-6 mb-10 border-b border-gray-800 pb-8">
          <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl text-center min-w-30">
            <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">GOAT Score</p>
            <p class="text-5xl font-black text-yellow-500">{{ goatEvaluation.score }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Career Ended</p>
            <h1 class="text-4xl font-black text-white uppercase tracking-tight">{{ goatEvaluation.tier }}</h1>
            <p class="text-gray-400 text-sm mt-2 font-bold">{{ player.position }} · {{ history.length }} Seasons</p>
          </div>
        </div>

        <div class="space-y-6">
          
          <!-- Números da Carreira (Totais) -->
          <div>
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Career Numbers</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-[#0a0a0a] border border-yellow-500/30 p-6 rounded-lg text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-yellow-500/5"></div>
                <p class="text-yellow-600 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">Points</p>
                <p class="text-3xl font-black text-yellow-500 relative z-10">{{ careerTotals.totalPoints }}</p>
              </div>
              <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Rebounds</p>
                <p class="text-3xl font-black text-white">{{ careerTotals.totalRebounds }}</p>
              </div>
              <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Assists</p>
                <p class="text-3xl font-black text-white">{{ careerTotals.totalAssists }}</p>
              </div>
              <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Games</p>
                <p class="text-3xl font-black text-white">{{ careerTotals.gamesPlayed }}</p>
              </div>
            </div>
          </div>

          <!-- Comparações com carreiras reais -->
          <div class="mt-8">
            <div class="flex justify-between items-end mb-3">
              <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">NBA Career Comparisons</p>
              <p class="text-yellow-500 text-[10px] font-black uppercase tracking-widest">Closest historical profiles</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article
                v-for="(comparison, index) in careerComparisons"
                :key="comparison.player.id"
                class="bg-[#0a0a0a] border rounded-xl p-5"
                :class="index === 0 ? 'border-yellow-500/60' : 'border-gray-800'"
              >
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                      {{ index === 0 ? 'Closest Career' : `Alternative #${index + 1}` }}
                    </p>
                    <h2 class="text-white text-lg font-black uppercase mt-1">{{ comparison.player.name }}</h2>
                    <p class="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                      {{ comparison.player.positions.join('/') }} · {{ comparison.player.era }}
                    </p>
                  </div>
                  <span class="text-yellow-500 text-2xl font-black">{{ comparison.similarity }}%</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed mb-4">{{ comparison.player.summary }}</p>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  Similar: <span class="text-gray-300">{{ comparison.sharedTraits.join(' · ') }}</span>
                </p>
                <p class="text-gray-600 text-[10px] mt-2">{{ comparison.mainDifference }}</p>
              </article>
            </div>
          </div>

          <!-- Linha do Tempo de Clubes -->
          <div class="mt-8">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Career Path</p>
            <div class="bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg flex flex-wrap items-center gap-3">
              <template v-for="(stop, index) in formattedTimeline" :key="index">
                <div class="flex items-center gap-2">
                  <span class="text-white font-black uppercase text-sm">{{ stop.teamId }}</span>
                  <span class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">({{ stop.period }})</span>
                </div>
                <span v-if="!stop.isLast" class="text-yellow-500 text-xs font-black">→</span>
              </template>
            </div>
          </div>

          <!-- Armário de Troféus -->
          <div>
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 mt-8">Trophy Cabinet</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Rings -->
              <div class="bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <span class="text-white text-sm font-black uppercase tracking-widest">🏆 Rings</span>
                <span class="text-yellow-500 font-black">x{{ trophyCabinet['Rings'] || 0 }}</span>
              </div>
              <!-- MVP -->
              <div class="bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <span class="text-white text-sm font-black uppercase tracking-widest">⭐ MVP</span>
                <span class="text-yellow-500 font-black">x{{ trophyCabinet['MVP'] || 0 }}</span>
              </div>
              <!-- Finals MVP -->
              <div class="bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <span class="text-white text-sm font-black uppercase tracking-widest">🎖️ FMVP</span>
                <span class="text-yellow-500 font-black">x{{ trophyCabinet['Finals MVP'] || 0 }}</span>
              </div>
              <!-- DPOY -->
              <div class="bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg flex items-center justify-between">
                <span class="text-white text-sm font-black uppercase tracking-widest">🛡️ DPOY</span>
                <span class="text-yellow-500 font-black">x{{ trophyCabinet['DPOY'] || 0 }}</span>
              </div>
            </div>
            
            <!-- Outros Prêmios -->
            <div class="flex flex-wrap gap-2 mt-4">
              <div 
                v-for="[award, count] in sortedAwards" 
                :key="award" 
                class="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest text-gray-400"
              >
                {{ award }} <span class="text-white ml-1">x{{ count }}</span>
              </div>
            </div>
          </div>

          <!-- Recordes e Comparação Histórica -->
          <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mt-8">
            <div class="flex justify-between items-end mb-6 border-b border-gray-800 pb-3">
              <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">Records & Legacy</p>
              <p class="text-yellow-500 text-[10px] font-black uppercase tracking-widest">All-Time NBA Leaderboard</p>
            </div>

            <div class="space-y-5">
              <!-- Barra de Pontos -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Points</span>
                  <span class="text-gray-500"><span class="text-yellow-500">{{ careerTotals.totalPoints }}</span> / {{ nbaRecords.points }} (LeBron James)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-yellow-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalPoints, nbaRecords.points)}%`"></div>
                </div>
              </div>

              <!-- Barra de Assistências -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Assists</span>
                  <span class="text-gray-500"><span class="text-green-500">{{ careerTotals.totalAssists }}</span> / {{ nbaRecords.assists }} (John Stockton)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalAssists, nbaRecords.assists)}%`"></div>
                </div>
              </div>

              <!-- Barra de Rebotes -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Rebounds</span>
                  <span class="text-gray-500"><span class="text-blue-500">{{ careerTotals.totalRebounds }}</span> / {{ nbaRecords.rebounds }} (Wilt Chamberlain)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-blue-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalRebounds, nbaRecords.rebounds)}%`"></div>
                </div>
              </div>

              <!-- Barra de Steals -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Steals</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ careerTotals.totalSteals || 0 }}</span> / {{ nbaRecords.steals }} (John Stockton)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5"><div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalSteals || 0, nbaRecords.steals)}%`"></div></div>
              </div>

              <!-- Barra de Blocks -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Blocks</span>
                  <span class="text-gray-500"><span class="text-red-500">{{ careerTotals.totalBlocks || 0 }}</span> / {{ nbaRecords.blocks }} (Hakeem Olajuwon)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5"><div class="bg-red-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalBlocks || 0, nbaRecords.blocks)}%`"></div></div>
              </div>

              <!-- Barra de MVPs -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">MVP Awards</span>
                  <span class="text-gray-500"><span class="text-yellow-500">{{ trophyCabinet['MVP'] || 0 }}</span> / {{ nbaRecords.mvps }} (Kareem Abdul-Jabbar)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5"><div class="bg-yellow-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['MVP'] || 0, nbaRecords.mvps)}%`"></div></div>
              </div>

              <!-- Barra de Títulos -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Championships</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ trophyCabinet['Rings'] || 0 }}</span> / {{ nbaRecords.rings }} (Bill Russell)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['Rings'] || 0, nbaRecords.rings)}%`"></div>
                </div>
              </div>

              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">DPOY Awards</span>
                  <span class="text-gray-500"><span class="text-blue-500">{{ trophyCabinet['DPOY'] || 0 }}</span> / 4 (Mutombo/Wallace/Gobert)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5"><div class="bg-blue-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['DPOY'] || 0, 4)}%`"></div></div>
              </div>
            </div>
          </div>

          <!-- Tabela de Histórico (Year-by-Year) -->
          <div class="mt-8 mb-12">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Year-by-Year Stats</p>
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-x-auto">
              <table class="w-full text-left border-collapse table-fixed whitespace-nowrap">
                <caption class="sr-only">Season-by-season career statistics</caption>
                <thead>
                  <tr class="bg-gray-900/50 border-b border-gray-800 text-[9px] text-gray-500 uppercase tracking-widest font-black">
                    <th class="py-2 px-2 w-8 text-center">Yr</th>
                    <th class="py-2 px-2 w-10 text-center">Tm</th>
                    <th class="py-2 px-2 w-8 text-center">Ag</th>
                    <th class="py-2 px-2 w-8 text-center">OV</th>
                    <th class="py-2 px-2 w-8 text-center">G</th>
                    <th class="py-2 px-2 w-10 text-center">PTS</th>
                    <th class="py-2 px-2 w-10 text-center">REB</th>
                    <th class="py-2 px-2 w-10 text-center">AST</th>
                    <th class="py-2 px-2 w-10 text-center">STL</th>
                    <th class="py-2 px-2 w-10 text-center">BLK</th>
                    <th class="py-2 px-2 w-10 text-center">TOV</th>
                    <th class="py-2 px-2 w-10 text-center">FG%</th>
                    <th class="py-2 px-2 w-10 text-center">3P%</th>
                    <th class="py-2 px-2 w-10 text-center">FT%</th>
                    <th class="py-2 px-2 w-10 text-center">+/-</th>
                    <th class="py-2 px-2 text-left">AWARDS & NOTES</th>
                  </tr>
                </thead>
                <tbody class="text-[10px] font-bold text-gray-300 font-mono">
                  <tr v-for="season in history" :key="season.seasonNumber" 
                      :class="season.seasonNumber === bestSeasonNumber ? 'bg-yellow-500/10 border-l-2 border-yellow-500' : 'border-b border-gray-800/50 hover:bg-gray-900/20'"
                      class="transition-colors h-8">
                    <td class="py-1 px-2 text-center text-gray-500">{{ season.seasonNumber }}</td>
                    <td class="py-1 px-2 text-center text-white font-black font-sans">{{ season.teamId }}</td>
                    <td class="py-1 px-2 text-center">{{ season.age }}</td>
                    <td class="py-1 px-2 text-center text-yellow-500">{{ season.ovr }}</td>
                    <td class="py-1 px-2 text-center">{{ season.gamesPlayed ?? 82 }}</td>
                    <td class="py-1 px-2 text-center text-white">{{ season.ppg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.rpg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.apg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.spg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.bpg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.tov.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.fgPct) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.fg3Pct) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.ftPct) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.plusMinus.toFixed(1) }}</td>
                    <td class="py-1 px-2 truncate text-yellow-600 font-sans tracking-widest text-[8px] uppercase">
                      {{ season.playoffs?.wonRing ? '🏆 RING ' : '' }} {{ season.awards.join(' ') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Atributos Originais e Botão -->
          <div class="pt-4 text-center">
            <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8 inline-block max-w-3xl w-full text-left">
              <div class="flex justify-between items-center mb-4">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Original DNA</p>
                <p class="text-green-500 text-sm font-black uppercase tracking-widest">Career Earnings: ${{ careerTotals.totalEarnings || 0 }}M</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <div v-for="(data, attr) in player.originalDNA" :key="attr" class="border border-gray-800 bg-[#111] p-3 rounded-lg flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
    
                <span class="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1">{{ attr }}</span>
                
                <span class= "text-gray-400 text-sm font-bold truncate w-full z-10">{{ data.player }}</span>
                
                <span class=" text-white text-xs font-mono mt-1 font-bold z-10">
                  {{ data.value ? data.value : '?' }}
                </span>
                
              </div>
              </div>
            </div>
            
            <br/>
            <button @click="resetGame" class="bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500 text-white font-black py-4 px-12 rounded-full transition-colors uppercase tracking-widest text-sm mb-12">
              New Career
            </button>
          </div>
        </div>
      </section>

    </div>
  </main>

  <!-- OVERLAY DE MILESTONES (POP-UP) -->
  <div
    v-if="pendingMilestones.length > 0"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="milestone-title"
    aria-describedby="milestone-description"
    @keydown.esc="dismissMilestone"
  >
    <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-10 max-w-md w-full text-center shadow-2xl animate-fade-in relative overflow-hidden">
      <div class="absolute inset-0 bg-yellow-500/5 blur-3xl z-0 pointer-events-none"></div>

      <div class="relative z-10">
        <div class="flex justify-between items-center mb-8 border-b border-gray-800 pb-3">
          <p class="text-yellow-500 text-[10px] font-black uppercase tracking-widest">Breaking News</p>
          <p class="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Season {{ history.length }}</p>
        </div>

        <div class="text-6xl mb-6" aria-hidden="true">{{ pendingMilestones[0].icon }}</div>
        <h2 id="milestone-title" class="text-2xl font-black text-white uppercase mb-3 leading-tight">
          {{ pendingMilestones[0].title }}
        </h2>
        <p id="milestone-description" class="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">
          {{ pendingMilestones[0].subtitle }}
        </p>

        <button
          ref="milestoneButton"
          type="button"
          class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-12 rounded-lg transition-colors uppercase tracking-widest text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          @click="dismissMilestone"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
