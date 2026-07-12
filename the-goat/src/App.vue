<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import { calculateGoatScore } from './utils/careerEvaluator';
import { runStressTest } from './utils/stressTest';
import type { Position, Difficulty, GameMode } from './types';

// Motor do Jogo
const { 
  player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones, 
  initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
  loadPastCareer 
} = useGameEngine();

// Motor de Draft
const { 
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
} = useDraft();

// Utilitários de Dev/Teste
const executeStressTest = () => {
  console.log("Iniciando bateria de testes...");
  runStressTest(50);
};

// Estados do Formulário e do Jogo
type GamePhase = 'setup' | 'draft-steal' | 'draft-day' | 'playing' | 'retired';
const currentPhase = ref<GamePhase>('setup');

const inputName = ref('');
const inputPosition = ref<Position | ''>('');
const inputNationality = ref('');
const inputJersey = ref<number | ''>('');
const selectedDifficulty = ref<Difficulty>('amateur');
const selectedMode = ref<GameMode>('fast');
const draftPickResult = ref(60);
const pastCareers = ref<any[]>([]);

// Carregamento de Legados Antigos
onMounted(() => {
  pastCareers.value = JSON.parse(localStorage.getItem('the_goat_past_careers') || '[]');
});

const viewPastCareer = (career: any) => {
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

const sortedStandings = computed(() => {
  if (!leagueTeams.value) return [];
  return [...leagueTeams.value].sort((a, b) => (b.baseOvr + (b.momentum || 0)) - (a.baseOvr + (a.momentum || 0))).slice(0, 15);
});

const formattedTimeline = computed(() => {
  if (!player.value.careerTimeline) return [];
  return player.value.careerTimeline.map((entry: any, index: number) => {
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

const currentOVR = computed(() => {
  if (!currentDrawnPlayer.value) return 0;
  return calculateStartingOVR(currentDrawnPlayer.value.attributes); 
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

const getRecordPercentage = (current: number, record: number) => {
  return Math.min(100, (current / record) * 100).toFixed(1);
};


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
  { code: 'DE', name: 'Germany' }, { code: 'BR', name: 'Brazil' }
];

const positions = [
  { code: 'PG', name: 'Point Guard' }, { code: 'SG', name: 'Shooting Guard' },
  { code: 'SF', name: 'Small Forward' }, { code: 'PF', name: 'Power Forward' },
  { code: 'C', name: 'Center' }
];

// Otimizado: Gera automaticamente o array de números das camisas (0 a 99)
const jerseyOptions = Array.from({ length: 100 }, (_, i) => i);


// --- AÇÕES DO JOGO ---

const startDraftSteal = () => {
  if (!inputName.value || !inputPosition.value || !inputNationality.value || inputJersey.value === '') return;
  currentPhase.value = 'draft-steal';
  drawRandomPlayer();
};

const processDraftDay = () => {
  const peakAttributes = { ...myAttributes.value } as any;
  const rookieAttributes = generateRookieAttributes(peakAttributes);
  const initialOvr = calculateStartingOVR(rookieAttributes);
  const draftedTeam = getRandomTeam();
  
  draftPickResult.value = calculateDraftPick(initialOvr);
  
  initCareer(
    inputName.value, 
    inputPosition.value as Position, 
    inputNationality.value, 
    inputJersey.value as number, 
    selectedDifficulty.value, 
    selectedMode.value
  );
  
  // Correção: Atualização das propriedades da ref `player` usando `.value`
  player.value.teamId = draftedTeam;
  player.value.ovr = initialOvr;
  player.value.attributes = rookieAttributes;
  player.value.potentialAttributes = peakAttributes;
  
  player.value.careerTimeline.push({
    teamId: draftedTeam,
    startYear: 1,
    endYear: null
  });
  
  currentPhase.value = 'draft-day';
};

const startCareer = () => { currentPhase.value = 'playing'; };
const viewLegacy = () => { currentPhase.value = 'retired'; };

const resetGame = () => {
  pastCareers.value = JSON.parse(localStorage.getItem('the_goat_past_careers') || '[]');
  resetDraft();
  inputName.value = '';
  inputPosition.value = '';
  inputNationality.value = '';
  inputJersey.value = '';
  currentPhase.value = 'setup';
};

const dismissMilestone = () => pendingMilestones.value.shift();

const retireManual = () => {
  if (confirm("Are you sure you want to end your career? This action cannot be undone.")) {
    forceRetirement();
  }
};
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
          <h1 class="text-4xl font-black text-white uppercase leading-tight">Steal attributes from legends. Live a career. Discover if you are the Goat.</h1>
        </div>
        
        <div class="space-y-10">
          
          <!-- Nome -->
          <div>
            <label class="block text-xl font-black text-white mb-4 uppercase">Your Name</label>
            <input v-model="inputName" type="text" class="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-6 py-5 text-xl text-white font-bold focus:outline-none focus:border-yellow-500 transition-colors" placeholder="How will the world call you?" />
          </div>

          <!-- Nacionalidade -->
          <div>
            <label class="block text-xl font-black text-white mb-4 uppercase">Nationality</label>
            <div class="grid grid-cols-5 gap-3">
              <button 
                v-for="nat in nationalities" 
                :key="nat.code"
                @click="inputNationality = nat.code"
                :class="inputNationality === nat.code ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500'"
                class="border rounded-lg py-4 flex flex-col items-center justify-center transition-colors"
              >
                <span class="font-black text-lg">{{ nat.code }}</span>
                <span class="text-[10px] uppercase font-bold opacity-80">{{ nat.name }}</span>
              </button>
            </div>
          </div>

          <!-- Posição -->
          <div>
            <label class="block text-xl font-black text-white mb-4 uppercase">Choose your Position</label>
            <div class="grid grid-cols-5 gap-3">
              <button 
                v-for="pos in positions" 
                :key="pos.code"
                @click="inputPosition = pos.code as Position"
                :class="inputPosition === pos.code ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500'"
                class="border rounded-lg py-4 flex flex-col items-center justify-center transition-colors"
              >
                <span class="font-black text-xl">{{ pos.code }}</span>
                <span class="text-[9px] uppercase font-bold opacity-80 mt-1">{{ pos.name }}</span>
              </button>
            </div>
          </div>

          <!-- Número da Camisa -->
          <div>
            <label class="block text-xl font-black text-white mb-4 uppercase">Jersey Number</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="num in jerseyOptions" 
                :key="num"
                @click="inputJersey = num"
                :class="inputJersey === num ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500'"
                class="border rounded-lg w-12 h-12 flex items-center justify-center font-black text-lg transition-colors"
              >
                {{ num }}
              </button>
            </div>
          </div>

          <!-- Modos de Jogo e Dificuldade -->
          <div class="space-y-6 pt-6 border-t border-gray-800">
            <div>
              <label class="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">Pacing Mode</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  @click="selectedMode = 'fast'"
                  :class="selectedMode === 'fast' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedMode === 'fast' ? 'text-yellow-500' : ''">Fast Mode <span v-if="selectedMode === 'fast'" class="text-yellow-500 text-xs ml-1">●</span></p>
                  <p class="text-xs text-gray-400 font-bold">Simulates the entire season with one click. The classic flow.</p>
                </button>
                <button 
                  @click="selectedMode = 'full'"
                  :class="selectedMode === 'full' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors relative overflow-hidden"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedMode === 'full' ? 'text-yellow-500' : ''">Full Simulation <span class="bg-yellow-500/20 text-yellow-500 text-[9px] px-2 py-0.5 rounded ml-2">BETA</span></p>
                  <p class="text-xs text-gray-400 font-bold">Live week by week. Playoff games simulated one by one.</p>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">Difficulty</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  @click="selectedDifficulty = 'amateur'"
                  :class="selectedDifficulty === 'amateur' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'amateur' ? 'text-yellow-500' : ''">Amateur <span v-if="selectedDifficulty === 'amateur'" class="text-yellow-500 text-xs ml-1">●</span></p>
                  <p class="text-xs text-gray-400 font-bold">See legends' exact numbers. 1 blind reroll.</p>
                </button>
                <button 
                  @click="selectedDifficulty = 'pro'"
                  :class="selectedDifficulty === 'pro' ? 'border-yellow-500 bg-[#12120a]' : 'border-gray-800 bg-[#0a0a0a]'"
                  class="border p-5 rounded-lg text-left transition-colors"
                >
                  <p class="font-black text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'pro' ? 'text-yellow-500' : ''">Pro</p>
                  <p class="text-xs text-gray-400 font-bold">No numbers. No rerolls. For purists.</p>
                </button>
              </div>
            </div>
          </div>

          <button 
            @click="startDraftSteal" 
            :disabled="!inputName || !inputPosition || !inputNationality || inputJersey === ''"
            class="w-full lg:w-auto bg-yellow-500 text-black font-black py-5 px-12 rounded-full hover:bg-yellow-400 uppercase tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-8 text-xl"
          >
            Start Draft
          </button>

          <!-- Debug Button (Posicionado discretamente no canto) -->
          <button 
            @click="executeStressTest" 
            class="fixed bottom-4 right-4 bg-red-900/50 hover:bg-red-600 text-white p-2 rounded text-[9px] uppercase font-black tracking-widest opacity-30 hover:opacity-100 transition-opacity z-50"
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
        <div class="flex justify-between items-center mb-6 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-800 pb-4">
          <span>Filled Slots {{ Object.keys(myAttributes).length }}/9</span>
          <span class="text-yellow-500">{{ inputPosition }} · {{ selectedDifficulty }}</span>
        </div>

        <!-- Banner da Lenda Atual -->
        <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-10 mb-8 text-center relative overflow-hidden shadow-2xl">
          <div class="absolute inset-0 bg-yellow-900/5 blur-3xl z-0"></div>
          <div class="relative z-10">
            <p class="text-yellow-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3">Current Legend</p>
            <h2 class="text-5xl font-black text-white uppercase tracking-tight">{{ currentDrawnPlayer?.name }}</h2>
            <p class="text-gray-500 text-sm mt-3 font-bold uppercase tracking-widest">{{ currentDrawnPlayer?.position }} · {{ currentOVR }} OVR</p>
          </div>
        </div>

        <!-- Grid de Atributos -->
        <div v-if="!isDraftComplete">
          <div class="mb-4 flex justify-between items-end">
            <p class="text-white font-black uppercase text-sm tracking-wide">Choose 1 attribute to steal</p>
            <p class="text-gray-500 font-bold text-xs uppercase">Remaining: {{ 9 - Object.keys(myAttributes).length }}</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <button 
              v-for="slot in availableSlots" 
              :key="slot"
              @click="selectAttribute(slot)"
              class="bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500 rounded-lg p-6 flex flex-col items-center justify-center transition-all group"
            >
              <span class="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2 group-hover:text-yellow-500 transition-colors">{{ slot }}</span>
              <!-- Condição de Dificuldade -->
              <span v-if="selectedDifficulty === 'amateur'" class="text-3xl font-black text-white">{{ currentDrawnPlayer?.attributes[slot] }}</span>
              <span v-else class="text-3xl font-black text-gray-700 tracking-widest">???</span>
            </button>
          </div>

          <!-- Controles Inferiores (Reroll) -->
          <div class="flex justify-between items-center border-t border-gray-800 pt-6">
            <button 
              v-if="selectedDifficulty === 'amateur'"
              @click="useReroll"
              :disabled="!hasReroll"
              class="border border-yellow-500 text-yellow-500 font-black py-3 px-8 rounded-full hover:bg-yellow-500 hover:text-black uppercase text-[10px] tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-yellow-500"
            >
              Blind Reroll ({{ hasReroll ? '1' : '0' }})
            </button>
            <div v-else class="text-gray-600 text-[10px] uppercase font-black tracking-widest px-4 py-2 bg-gray-900 rounded-full">
              Pro Mode: No rerolls
            </div>
          </div>
        </div>

        <!-- Botão de Avanço (Aparece ao terminar) -->
        <div v-else class="mt-12 text-center animate-fade-in">
          <button 
            @click="processDraftDay"
            class="bg-yellow-500 text-black font-black py-5 px-12 rounded-full hover:bg-yellow-400 uppercase tracking-widest transition-colors text-xl w-full"
          >
            Enter The League
          </button>
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
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.mpg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">PTS</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.ppg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">REB</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.rpg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">AST</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.apg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">STL</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.spg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">BLK</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.bpg : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">FG%</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.fgPct : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">3P%</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.fg3Pct : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400 font-bold">FT%</span>
                    <span class="text-white font-black">{{ lastSeason ? lastSeason.ftPct : '0.0' }}%</span>
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

          <!-- COLUNA DIREITA: Standings -->
          <div class="lg:col-span-3">
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 h-full">
              <h4 class="text-white font-black uppercase tracking-widest text-sm mb-4 border-b border-gray-800 pb-2">League Power Ranking</h4>
              <div class="space-y-3">
                <div v-for="(team, index) in sortedStandings" :key="team.id" class="flex justify-between items-center text-sm">
                  <div class="flex items-center gap-3">
                    <span class="text-gray-600 font-bold text-xs w-4">{{ index + 1 }}</span>
                    <span :class="team.id === player.teamId ? 'text-yellow-500 font-black' : 'text-gray-300 font-bold'">{{ team.id }}</span>
                  </div>
                  <span class="text-gray-500 text-xs">{{ team.baseOvr + (team.momentum || 0) }} OVR</span>
                </div>
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
            <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Final OVR</p>
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
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Games</p>
                <p class="text-3xl font-black text-white">{{ history.length > 0 ? history.length : 0 }}</p>
              </div>
              <div class="bg-[#0a0a0a] border border-yellow-500/30 p-6 rounded-lg text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-yellow-500/5"></div>
                <p class="text-yellow-600 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">Points</p>
                <p class="text-3xl font-black text-yellow-500 relative z-10">{{ careerTotals.totalPoints }}</p>
              </div>
              <div class="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Assists</p>
                <p class="text-3xl font-black text-white">{{ careerTotals.totalAssists }}</p>
              </div>
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
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Points</span>
                  <span class="text-gray-500"><span class="text-yellow-500">{{ careerTotals.totalPoints }}</span> / {{ nbaRecords.points }} (LeBron)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-yellow-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalPoints, nbaRecords.points)}%`"></div>
                </div>
              </div>

              <!-- Barra de Assistências -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Assists</span>
                  <span class="text-gray-500"><span class="text-green-500">{{ careerTotals.totalAssists }}</span> / {{ nbaRecords.assists }} (Stockton)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalAssists, nbaRecords.assists)}%`"></div>
                </div>
              </div>

              <!-- Barra de Rebotes -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Rebounds</span>
                  <span class="text-gray-500"><span class="text-blue-500">{{ careerTotals.totalRebounds }}</span> / {{ nbaRecords.rebounds }} (Wilt)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-blue-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalRebounds, nbaRecords.rebounds)}%`"></div>
                </div>
              </div>

              <!-- Barra de Steals -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Steals</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ careerTotals.totalSteals }}</span> / {{ nbaRecords.steals }} (Harden)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalSteals, nbaRecords.steals)}%`"></div>
                </div>
              </div>

              <!-- Barra de Blocks -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Career Blocks</span>
                  <span class="text-gray-500"><span class="text-red-500">{{ careerTotals.totalBlocks }}</span> / {{ nbaRecords.blocks }} (Hakeem)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-red-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalBlocks, nbaRecords.blocks)}%`"></div>
                </div>
              </div>

              <!-- Barra de MVPs -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">MVP Awards</span>
                  <span class="text-gray-500"><span class="text-yellow-500">{{ trophyCabinet['MVP'] || 0 }}</span> / {{ nbaRecords.mvps }} (Russell)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-yellow-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['MVP'] || 0, nbaRecords.mvps)}%`"></div>
                </div>
              </div>
              
              <!-- Barra de Títulos -->
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-white">Championships</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ trophyCabinet['Rings'] || 0 }}</span> / {{ nbaRecords.rings }} (Russell)</span>
                </div>
                <div class="w-full bg-gray-900 rounded-full h-1.5">
                  <div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['Rings'] || 0, nbaRecords.rings)}%`"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabela de Histórico (Year-by-Year) -->
          <div class="mt-8 mb-12">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Year-by-Year Stats</p>
            <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-250">
                <thead>
                  <tr class="bg-gray-900/50 border-b border-gray-800 text-[10px] text-gray-500 uppercase tracking-widest font-black">
                    <th class="p-4">Season</th>
                    <th class="p-4">Team</th>
                    <th class="p-4">Age</th>
                    <th class="p-4">OVR</th>
                    <th class="p-4">MPG</th>
                    <th class="p-4">PTS</th>
                    <th class="p-4">REB</th>
                    <th class="p-4">AST</th>
                    <th class="p-4">STL</th>
                    <th class="p-4">BLK</th>
                    <th class="p-4">TOV</th>
                    <th class="p-4">FG%</th>
                    <th class="p-4">3P%</th>
                    <th class="p-4">FT%</th>
                    <th class="p-4">+/-</th>
                    <th class="p-4 text-center">Playoffs</th>
                    <th class="p-4">Awards</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-bold text-gray-300">
                  <tr v-for="season in history" :key="season.seasonNumber" class="border-b border-gray-800/50 hover:bg-gray-900/20 transition-colors">
                    <td class="p-4 text-gray-500">{{ season.seasonNumber }}</td>
                    <td class="p-4 text-white font-black">{{ season.teamId }}</td>
                    <td class="p-4">{{ season.age }}</td>
                    <td class="p-4 text-yellow-500">{{ season.ovr }}</td>
                    <td class="p-4 text-gray-400">{{ season.mpg }}</td>
                    <td class="p-4 text-white">{{ season.ppg }}</td>
                    <td class="p-4">{{ season.rpg }}</td>
                    <td class="p-4">{{ season.apg }}</td>
                    <td class="p-4">{{ season.spg }}</td>
                    <td class="p-4">{{ season.bpg }}</td>
                    <td class="p-4">{{ season.tov }}</td>
                    <td class="p-4 text-gray-500">{{ season.fgPct }}%</td>
                    <td class="p-4 text-gray-500">{{ season.fg3Pct }}%</td>
                    <td class="p-4 text-gray-500">{{ season.ftPct }}%</td>
                    <td class="p-4" :class="season.plusMinus > 0 ? 'text-green-500' : 'text-red-500'">{{ season.plusMinus > 0 ? '+' : '' }}{{ season.plusMinus }}</td>
                    <td class="p-4 text-center text-[10px] uppercase tracking-widest font-black" :class="season.wonRing ? 'text-yellow-500' : (season.playoffs.madePlayoffs ? 'text-gray-500' : 'text-red-900/50')">
                      {{ season.wonRing ? '🏆 Champion' : (season.playoffs.madePlayoffs ? season.playoffs.eliminatedIn : 'Missed') }}
                    </td>
                    <td class="p-4 text-[10px] text-yellow-600 uppercase tracking-widest font-black">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="award in season.awards" :key="award" class="bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded">
                          {{ award }}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Ações Finais -->
          <div class="pt-8 text-center flex justify-center gap-4">
            <button @click="resetGame" class="bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500 text-white font-black py-4 px-8 rounded-full transition-colors uppercase tracking-widest text-sm">
              New Career
            </button>
          </div>

        </div>
      </section>

    </div>
  </main>

  <!-- OVERLAY DE MILESTONES (POP-UP) -->
    <div v-if="pendingMilestones.length > 0" class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-10 max-w-md w-full text-center shadow-2xl animate-fade-in relative overflow-hidden">
        
        <!-- Efeito de Fundo -->
        <div class="absolute inset-0 bg-yellow-500/5 blur-3xl z-0 pointer-events-none"></div>
        
        <div class="relative z-10">
          <div class="flex justify-between items-center mb-8 border-b border-gray-800 pb-3">
            <p class="text-yellow-500 text-[10px] font-black uppercase tracking-widest">Breaking News</p>
            <p class="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Season {{ history.length }}</p>
          </div>
          
          <div class="text-6xl mb-6">{{ pendingMilestones[0].icon }}</div>
          
          <h2 class="text-2xl font-black text-white uppercase mb-3 leading-tight">{{ pendingMilestones[0].title }}</h2>
          <p class="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">{{ pendingMilestones[0].subtitle }}</p>
          
          <button @click="dismissMilestone" class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-12 rounded-lg transition-colors uppercase tracking-widest text-sm">
            Continue
          </button>
        </div>
        
      </div>
    </div>
</template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />