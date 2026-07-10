<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import { calculateGoatScore } from './utils/careerEvaluator';
import type { Position, AttributeKey } from './types';

const { 
  player, 
  history, 
  careerTotals, 
  initCareer, 
  simulateSeason, 
  exploreFreeAgency, 
  reSignWithTeam
} = useGameEngine();
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

type GamePhase = 'setup' | 'draft-steal' | 'draft-day' | 'playing' | 'retired';
const currentPhase = ref<GamePhase>('setup');

const inputName = ref('');
const inputPosition = ref<Position | ''>('');
const inputNationality = ref('');
const draftPickResult = ref(60);

const availableNationalities = ['USA', 'Brazil', 'France', 'Canada', 'Serbia', 'Slovenia', 'Spain', 'Australia'];
const flagMapping: Record<string, string> = {
  'USA': 'us',
  'Brazil': 'br',
  'France': 'fr',
  'Canada': 'ca',
  'Serbia': 'rs',
  'Slovenia': 'si',
  'Spain': 'es',
  'Australia': 'au'
};
const availablePositions: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];

const selectPosition = (pos: Position) => inputPosition.value = pos;
const selectNationality = (nat: string) => inputNationality.value = nat;

const startDraftSteal = () => {
  if (inputName.value.trim() === '' || inputPosition.value === '' || inputNationality.value === '') return;
  currentPhase.value = 'draft-steal';
  drawRandomPlayer();
};

const processDraftDay = () => {
  const peakAttributes = { ...myAttributes.value } as any;
  
  const rookieAttributes = generateRookieAttributes(peakAttributes);
  const initialOvr = calculateStartingOVR(rookieAttributes);
  
  const draftedTeam = getRandomTeam();
  draftPickResult.value = calculateDraftPick(initialOvr);
  
  initCareer(inputName.value, inputPosition.value as Position);
  player.nationality = inputNationality.value;
  player.teamId = draftedTeam;
  player.ovr = initialOvr;
  player.attributes = rookieAttributes;
  player.potentialAttributes = peakAttributes;
  
  currentPhase.value = 'draft-day';
};

const startCareer = () => {
  currentPhase.value = 'playing';
};

const resetGame = () => {
  resetDraft();
  inputName.value = '';
  inputPosition.value = '';
  inputNationality.value = '';
  currentPhase.value = 'setup';
};

const lastSeason = computed(() => {
  if (history.value.length === 0) return null;
  return history.value[history.value.length - 1];
});

const viewLegacy = () => {
  currentPhase.value = 'retired';
};

const goatEvaluation = computed(() => {
  return calculateGoatScore(careerTotals.value, detailedAwards.value);
});

const detailedAwards = computed(() => {
  const counts: Record<string, number> = {};
  history.value.forEach(season => {
    season.awards.forEach(award => {
      counts[award] = (counts[award] || 0) + 1;
    });
  });
  
  // Ordenar para exibir prêmios mais importantes primeiro (MVP, Ring, DPOY...)
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
});
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
    <div class="max-w-6xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-black uppercase tracking-widest text-white">The Goat Simulator</h1>
      </header>

      <!-- FASE 1: SETUP -->
      <section v-if="currentPhase === 'setup'" class="bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-4">Create Your Legacy</h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-gray-400 mb-2 uppercase">Player Name</label>
            <input v-model="inputName" type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-xl text-white font-bold focus:outline-none focus:border-blue-500" placeholder="Enter name..." />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-400 mb-2 uppercase">Nationality</label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="nat in availableNationalities" 
                :key="nat"
                @click="selectNationality(nat)"
                :title="nat"
                :class="inputNationality === nat ? 'bg-blue-600 border-blue-400' : 'bg-gray-900 border-gray-600 hover:border-gray-400'"
                class="border rounded-lg p-3 transition-colors flex items-center justify-center"
              >
                <span :class="['fi', `fi-${flagMapping[nat] || 'un'}`, 'shadow-sm']"></span>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-400 mb-2 uppercase">Position</label>
            <div class="grid grid-cols-5 gap-3">
              <button 
                v-for="pos in availablePositions" 
                :key="pos"
                @click="selectPosition(pos)"
                :class="inputPosition === pos ? 'bg-green-600 border-green-400 text-white' : 'bg-gray-900 border-gray-600 text-gray-400 hover:border-gray-400'"
                class="border rounded-lg py-3 text-lg font-black transition-colors"
              >
                {{ pos }}
              </button>
            </div>
          </div>

          <button 
            @click="startDraftSteal" 
            :disabled="!inputName || !inputPosition || !inputNationality"
            class="w-full mt-8 bg-white text-gray-900 font-black py-4 rounded-lg hover:bg-gray-200 uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enter DNA Draft
          </button>
        </div>
      </section>

      <!-- FASE 2: DRAFT -->
      <section v-if="currentPhase === 'draft-steal'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-blue-400">{{ currentDrawnPlayer?.name }}</h2>
            <button 
              @click="useReroll" 
              :disabled="!hasReroll"
              class="px-4 py-2 text-sm font-bold rounded bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reroll ({{ hasReroll ? '1' : '0' }})
            </button>
          </div>
          
          <p class="text-gray-400 mb-4 text-sm">Select an attribute to steal from this player:</p>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="(val, key) in currentDrawnPlayer?.attributes" 
              :key="key"
              @click="selectAttribute(key as AttributeKey)"
              :disabled="!availableSlots.includes(key as AttributeKey)"
              class="flex flex-col items-center p-3 rounded-lg border border-gray-600 hover:bg-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <span class="text-xs text-gray-400">{{ key }}</span>
              <span class="text-xl font-bold" :class="val >= 90 ? 'text-green-400' : 'text-white'">{{ val }}</span>
            </button>
          </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold mb-6">Your DNA (<span class="text-blue-400">{{ 9 - availableSlots.length }}/9</span>)</h2>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div v-for="slot in ['Arremesso', 'Drible', 'Defesa', 'IQ', 'Atletismo', 'Passe', 'Rebote', 'Velocidade', 'Mentalidade']" :key="slot" class="text-center">
                <p class="text-xs text-gray-500">{{ slot }}</p>
                <p class="font-bold text-lg">
                  {{ myAttributes[slot as AttributeKey] || '--' }}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            v-if="isDraftComplete"
            @click="processDraftDay"
            class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wide"
          >
            Start Career
          </button>
        </div>
      </section>
      <!-- FASE 3: DRAFT DAY REVEAL -->
      <section v-if="currentPhase === 'draft-day'" class="bg-gray-800 p-10 rounded-xl border border-gray-700 max-w-xl mx-auto text-center shadow-2xl relative overflow-hidden">
        <div class="absolute inset-0 bg-blue-900/10 blur-3xl z-0"></div>
        <div class="relative z-10">
          <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">With the Pick #{{ draftPickResult }} in the NBA Draft...</p>
          <h2 class="text-3xl font-black text-white mb-1">The <span class="text-blue-400">{{ player.teamId }}</span> select</h2>
          <h1 class="text-5xl font-black text-green-400 my-6 uppercase">{{ player.name }}</h1>
          
          <div class="flex justify-center gap-8 mb-8 border-y border-gray-700 py-6">
            <div>
              <p class="text-gray-500 text-xs uppercase font-bold">Starting OVR</p>
              <p class="text-4xl font-black">{{ player.ovr }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase font-bold">Position</p>
              <p class="text-4xl font-black">{{ player.position }}</p>
            </div>
          </div>

          <button 
            @click="startCareer"
            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-colors uppercase tracking-widest"
          >
            Sign Rookie Contract
          </button>
        </div>
      </section>
      <!-- FASE 4: SIMULAÇÃO -->
      <section v-if="currentPhase === 'playing'" class="max-w-5xl mx-auto">
         <!-- Header do Jogador -->
         <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
            <div class="text-center md:text-left">
              <h2 class="text-3xl font-black uppercase text-white">{{ player.name }}</h2>
              <p class="text-gray-400 font-bold tracking-widest text-sm">Year {{ history.length + 1 }} | Age: {{ player.age }}</p>
            </div>
            
            <div class="flex gap-8 items-center bg-gray-900 px-6 py-3 rounded-lg border border-gray-700">
              <div class="text-center">
                <p class="text-4xl font-black text-green-400">{{ player.ovr }}</p>
                <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">OVR</p>
              </div>
              <div class="w-px h-12 bg-gray-700"></div>
              <div class="text-center">
                <p class="text-4xl font-black text-blue-400">{{ player.teamId }}</p>
                <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Team</p>
              </div>
            </div>
         </div>

         <!-- Dashboard da Temporada -->
         <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg mb-6">
           <div class="bg-gray-900/50 p-4 border-b border-gray-700 flex justify-between items-center">
             <h3 class="font-black uppercase tracking-widest text-gray-300">
               {{ lastSeason ? `Season ${lastSeason.seasonNumber} Summary` : 'Rookie Season Awaiting' }}
             </h3>
             <span v-if="lastSeason" class="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-sm font-bold text-gray-300">
               Team Record: {{ lastSeason.teamWins }} - {{ lastSeason.teamLosses }}
             </span>
           </div>

           <div class="p-8">
             <div v-if="!lastSeason" class="text-center py-12">
               <p class="text-gray-500 text-lg italic mb-2">The journey begins now.</p>
               <p class="text-gray-600 text-sm">Click the button below to simulate your rookie season.</p>
             </div>

             <div v-else>
               <!-- Grid de Stats Base -->
               <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <div class="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-1">PPG</p>
                   <p class="text-2xl font-black text-white">{{ lastSeason.ppg }}</p>
                 </div>
                 <div class="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-1">RPG</p>
                   <p class="text-2xl font-black text-white">{{ lastSeason.rpg }}</p>
                 </div>
                 <div class="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-1">APG</p>
                   <p class="text-2xl font-black text-white">{{ lastSeason.apg }}</p>
                 </div>
                 <div class="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-1">MPG</p>
                   <p class="text-2xl font-black text-white">{{ lastSeason.mpg }}</p>
                 </div>
               </div>

               <!-- Novo Bloco: Resultado dos Playoffs e League Awards -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <!-- Playoff Status -->
                 <div class="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-3">Postseason Result</p>
                   <div v-if="!lastSeason.playoffs.madePlayoffs" class="text-red-400 font-bold">Missed Playoffs</div>
                   <div v-else-if="lastSeason.playoffs.wonRing" class="text-yellow-400 font-black text-xl uppercase tracking-widest flex items-center gap-2">
                     🏆 NBA Champions
                   </div>
                   <div v-else class="text-gray-300 font-bold">
                     Eliminated in: <span class="text-white">{{ lastSeason.playoffs.eliminatedIn }}</span>
                   </div>
                   
                   <div v-if="lastSeason.playoffs.overallAverages" class="mt-4 pt-4 border-t border-gray-700/50">
                     <p class="text-[10px] text-gray-500 uppercase font-bold mb-1">Playoff Averages ({{ lastSeason.playoffs.overallAverages.gamesPlayed }} Games)</p>
                     <p class="text-sm text-gray-300">{{ lastSeason.playoffs.overallAverages.points }} PTS | {{ lastSeason.playoffs.overallAverages.rebounds }} REB | {{ lastSeason.playoffs.overallAverages.assists }} AST</p>
                   </div>
                 </div>

                 <!-- Box Score das Finais (Renderiza apenas se chegou nas Finais) -->
               <div v-if="lastSeason.playoffs.finalsLog && lastSeason.playoffs.finalsLog.length > 0" class="mb-8 bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                 <p class="text-gray-500 text-xs font-bold uppercase mb-3">NBA Finals - Game by Game Box Score</p>
                 <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                   <div v-for="(game, index) in lastSeason.playoffs.finalsLog" :key="index" class="bg-gray-800 border border-gray-600 p-3 rounded-lg text-center shadow-inner">
                     <p class="text-[10px] text-gray-400 uppercase font-bold mb-2 border-b border-gray-700 pb-1">Game {{ index + 1 }}</p>
                     <p class="text-sm text-white font-black">{{ game.points }} <span class="text-[9px] text-gray-500 font-normal">PTS</span></p>
                     <p class="text-xs text-gray-300 font-bold">{{ game.rebounds }} <span class="text-[9px] text-gray-500 font-normal">REB</span></p>
                     <p class="text-xs text-gray-300 font-bold">{{ game.assists }} <span class="text-[9px] text-gray-500 font-normal">AST</span></p>
                     <p class="text-[10px] text-gray-400 mt-1 pt-1 border-t border-gray-700">{{ game.steals }} STL | {{ game.blocks }} BLK</p>
                   </div>
                 </div>
               </div>

                 <!-- League Awards (Mundo Vivo) -->
                 <div class="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                   <p class="text-gray-500 text-xs font-bold uppercase mb-3">League Awards</p>
                   <ul class="space-y-2 text-sm">
                     <li class="flex justify-between border-b border-gray-700/30 pb-1">
                       <span class="text-gray-400">MVP</span> 
                       <span :class="lastSeason.leagueAwards['MVP'] === player.name ? 'text-blue-400 font-black' : 'text-gray-300'">{{ lastSeason.leagueAwards['MVP'] }}</span>
                     </li>
                     <li class="flex justify-between border-b border-gray-700/30 pb-1">
                       <span class="text-gray-400">DPOY</span> 
                       <span :class="lastSeason.leagueAwards['DPOY'] === player.name ? 'text-blue-400 font-black' : 'text-gray-300'">{{ lastSeason.leagueAwards['DPOY'] }}</span>
                     </li>
                     <li class="flex justify-between pb-1">
                       <span class="text-gray-400">6MOTY</span> 
                       <span :class="lastSeason.leagueAwards['6MOTY'] === player.name ? 'text-blue-400 font-black' : 'text-gray-300'">{{ lastSeason.leagueAwards['6MOTY'] }}</span>
                     </li>
                   </ul>
                 </div>
               </div>

               <!-- Prêmios Conquistados pelo Jogador -->
               <div v-if="lastSeason.awards.length > 0" class="flex flex-wrap justify-center gap-3">
                 <div v-for="award in lastSeason.awards" :key="award" class="flex items-center gap-2 bg-blue-900/40 border border-blue-600 px-4 py-2 rounded-lg shadow-inner text-blue-400 font-black uppercase tracking-wide">
                   <span v-if="award === 'MVP' || award === 'ROTY' || award.includes('Finals MVP')">⭐</span>
                   <span v-else-if="award === 'DPOY'">🛡️</span>
                   {{ award }}
                 </div>
               </div>
             </div>
           </div>
         </div>

         <!-- Controles da Temporada e Free Agency -->
         <div v-if="!player.isRetired" class="mt-6">
           <div v-if="player.contractYearsLeft > 0" class="flex gap-4">
             <button 
               @click="simulateSeason"
               class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-xl transition-colors shadow-xl uppercase tracking-widest text-lg"
             >
               Simulate Next Season ({{ player.contractYearsLeft }} Years Left)
             </button>
           </div>
           
           <!-- Tela de Decisão de Free Agency -->
           <div v-else class="bg-gray-900 border border-yellow-600 p-6 rounded-xl shadow-2xl text-center animate-fade-in">
             <h3 class="text-2xl font-black uppercase text-yellow-500 mb-2">Free Agency</h3>
             <p class="text-gray-400 mb-6">Your contract expired. Do you want to stay or explore the market?</p>
             <div class="flex gap-4">
               <button 
                 @click="reSignWithTeam"
                 class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-black py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wide"
               >
                 Re-sign with {{ player.teamId }}
               </button>
               <button 
                 @click="exploreFreeAgency"
                 class="flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wide"
               >
                 Test Free Agency
               </button>
             </div>
           </div>
         </div>

         <div v-else class="mt-6">
           <button 
             @click="viewLegacy"
             class="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-black py-5 rounded-xl transition-colors shadow-xl uppercase tracking-widest text-lg animate-pulse"
           >
             View Career Legacy
           </button>
         </div>
      </section>

      <!-- FASE 5: CAREER LEGACY (APOSENTADORIA) -->
      <section v-if="currentPhase === 'retired'" class="max-w-6xl mx-auto space-y-6">
        
        <!-- Header: GOAT Score -->
        <div class="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-yellow-900/10 blur-3xl z-0"></div>
          <div class="relative z-10">
            <h2 class="text-4xl font-black uppercase text-white mb-2">Career Legacy</h2>
            <p class="text-gray-400 font-bold tracking-widest text-lg mb-8">{{ player.name }} | {{ player.position }}</p>
            
            <div class="inline-block bg-gray-900 border border-yellow-600/50 rounded-2xl p-6 shadow-inner">
              <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Goat Score</p>
              <p class="text-6xl font-black" :class="goatEvaluation.score >= 90 ? 'text-yellow-400' : 'text-blue-400'">
                {{ goatEvaluation.score }}<span class="text-2xl text-gray-600">/99</span>
              </p>
              <p class="mt-4 text-xl font-black uppercase tracking-wide text-white">{{ goatEvaluation.tier }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Totais da Carreira -->
          <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-700 pb-2">Career Totals</h3>
            <ul class="space-y-4 text-lg">
              <li class="flex justify-between items-center">
                <span class="text-gray-400">Points</span> <span class="font-black text-white">{{ careerTotals.totalPoints.toLocaleString() }}</span>
              </li>
              <li class="flex justify-between items-center">
                <span class="text-gray-400">Rebounds</span> <span class="font-black text-white">{{ careerTotals.totalRebounds.toLocaleString() }}</span>
              </li>
              <li class="flex justify-between items-center">
                <span class="text-gray-400">Assists</span> <span class="font-black text-white">{{ careerTotals.totalAssists.toLocaleString() }}</span>
              </li>
              <li class="flex justify-between items-center">
                <span class="text-gray-400">Steals</span> <span class="font-black text-white">{{ careerTotals.totalSteals.toLocaleString() }}</span>
              </li>
              <li class="flex justify-between items-center border-b border-gray-700 pb-4">
                <span class="text-gray-400">Blocks</span> <span class="font-black text-white">{{ careerTotals.totalBlocks.toLocaleString() }}</span>
              </li>
              <li class="flex justify-between items-center pt-2">
                <span class="text-yellow-500 font-bold uppercase">🏆 Rings</span> <span class="font-black text-yellow-400 text-2xl">{{ careerTotals.rings }}</span>
              </li>
              <li class="flex justify-between items-center">
                <span class="text-blue-400 font-bold uppercase">⭐ MVPs</span> <span class="font-black text-blue-400 text-2xl">{{ careerTotals.mvps }}</span>
              </li>
            </ul>
          </div>

          <!-- Prêmios Detalhados -->
          <div class="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-700 pb-2">Trophy Cabinet</h3>
            
            <div v-if="detailedAwards.length > 0" class="flex flex-wrap gap-3">
              <div 
                v-for="[award, count] in detailedAwards" 
                :key="award" 
                class="flex items-center gap-3 bg-gray-900 border border-gray-600 px-4 py-3 rounded-lg"
              >
                <span class="text-2xl font-black text-white">{{ count }}x</span>
                <span class="text-sm font-bold text-gray-400 uppercase tracking-wide">{{ award }}</span>
              </div>
            </div>
            <div v-else class="text-center py-12 text-gray-500 italic">
              No individual awards won.
            </div>
          </div>
        </div>

        <!-- Tabela Completa (Histórico) -->
        <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div class="bg-gray-900/50 p-4 border-b border-gray-700">
             <h3 class="font-black uppercase tracking-widest text-gray-300">Complete Season History</h3>
          </div>
          <div class="p-6 overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr class="text-gray-400 border-b border-gray-700 text-xs uppercase tracking-wider">
                  <th class="pb-3 px-2">Year</th>
                  <th class="pb-3 px-2">Age</th>
                  <th class="pb-3 px-2">Team</th>
                  <th class="pb-3 px-2">OVR</th>
                  <th class="pb-3 px-2">MPG</th>
                  <th class="pb-3 px-2">PPG</th>
                  <th class="pb-3 px-2">RPG</th>
                  <th class="pb-3 px-2">APG</th>
                  <th class="pb-3 px-2">SPG</th>
                  <th class="pb-3 px-2">BPG</th>
                  <th class="pb-3 px-2">FG%</th>
                  <th class="pb-3 px-2">3PT%</th>
                  <th class="pb-3 px-2 text-center">Playoffs</th>
                  <th class="pb-3 px-2 text-center">Awards</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="season in history" :key="season.seasonNumber" class="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td class="py-3 px-2 text-gray-400 font-bold">{{ season.seasonNumber }}</td>
                  <td class="py-3 px-2">{{ season.age }}</td>
                  <td class="py-3 px-2 font-black text-blue-400">{{ season.teamId }}</td>
                  <td class="py-3 px-2 font-bold text-green-400">{{ season.ovr }}</td>
                  <td class="py-3 px-2">{{ season.mpg }}</td>
                  <td class="py-3 px-2 font-bold text-white">{{ season.ppg }}</td>
                  <td class="py-3 px-2">{{ season.rpg }}</td>
                  <td class="py-3 px-2">{{ season.apg }}</td>
                  <td class="py-3 px-2">{{ season.spg }}</td>
                  <td class="py-3 px-2">{{ season.bpg }}</td>
                  <td class="py-3 px-2">{{ season.fgPct }}%</td>
                  <td class="py-3 px-2">{{ season.fg3Pct }}%</td>
                  <td class="py-3 px-2 text-center text-[11px] uppercase tracking-wide font-black" :class="season.wonRing ? 'text-yellow-400' : (season.playoffs.madePlayoffs ? 'text-gray-400' : 'text-red-900')">
                    {{ season.wonRing ? 'Champion' : (season.playoffs.madePlayoffs ? season.playoffs.eliminatedIn : 'Missed') }}
                  </td>
                  <td class="py-3 px-2 flex flex-wrap gap-1 justify-center max-w-[250px]">
                    <span v-if="season.wonRing" class="bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">🏆 Ring</span>
                    <span v-for="award in season.awards" :key="award" class="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{{ award }}</span>
                    <span v-if="!season.wonRing && season.awards.length === 0" class="text-gray-600">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button 
          @click="resetGame"
          class="w-full bg-gray-700 hover:bg-gray-600 text-white font-black py-5 rounded-xl transition-colors shadow-xl uppercase tracking-widest mt-8"
        >
          Start New Career
        </button>
      </section>

    </div>
  </main>
</template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />