<script setup lang="ts">
import { ref } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import type { Position, AttributeKey } from './types';

const { player, history, careerTotals, initCareer, simulateSeason } = useGameEngine();
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
  getRandomTeam 
} = useDraft();

type GamePhase = 'setup' | 'draft' | 'playing';
const currentPhase = ref<GamePhase>('setup');

const inputName = ref('');
const inputPosition = ref<Position>('SF');
const inputNationality = ref('USA');

const startDraft = () => {
  if (inputName.value.trim() === '') return;
  currentPhase.value = 'draft';
  drawRandomPlayer();
};

const finishDraftAndStart = () => {
  const initialOvr = calculateStartingOVR();
  const draftedTeam = getRandomTeam();
  
  initCareer(inputName.value, inputPosition.value);
  player.nationality = inputNationality.value;
  player.teamId = draftedTeam;
  player.ovr = initialOvr;
  player.attributes = { ...myAttributes.value } as any;
  
  currentPhase.value = 'playing';
};

const resetGame = () => {
  currentPhase.value = 'setup';
  inputName.value = '';
};
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
    <div class="max-w-6xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-black uppercase tracking-widest text-white">The Goat Simulator</h1>
      </header>

      <!-- FASE 1: SETUP -->
      <section v-if="currentPhase === 'setup'" class="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto border border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-center">Create Your Player</h2>
        <div class="space-y-4">
          <input v-model="inputName" type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Name" />
          <input v-model="inputNationality" type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Nationality (e.g. Brazil)" />
          <select v-model="inputPosition" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
            <option value="PG">Point Guard (PG)</option>
            <option value="SG">Shooting Guard (SG)</option>
            <option value="SF">Small Forward (SF)</option>
            <option value="PF">Power Forward (PF)</option>
            <option value="C">Center (C)</option>
          </select>
          <button @click="startDraft" class="w-full mt-6 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 uppercase transition-colors">
            Go to Draft
          </button>
        </div>
      </section>

      <!-- FASE 2: DRAFT -->
      <section v-if="currentPhase === 'draft'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            @click="finishDraftAndStart"
            class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wide"
          >
            Start Career
          </button>
        </div>
      </section>

      <!-- FASE 3: SIMULAÇÃO -->
      <section v-if="currentPhase === 'playing'">
         <div class="text-center bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6 flex justify-between items-center px-8">
            <div class="text-left">
              <h2 class="text-2xl font-bold">{{ player.name }}</h2>
              <p class="text-gray-400">{{ player.position }} | {{ player.nationality }}</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-black text-green-400">{{ player.ovr }}</p>
              <p class="text-xs text-gray-400 uppercase tracking-widest">OVR</p>
            </div>
            <div class="text-right">
              <h2 class="text-xl font-bold text-blue-400">{{ player.teamId }}</h2>
              <p class="text-gray-400">Current Team</p>
            </div>
         </div>

         <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <!-- Painel Lateral: Totais da Carreira -->
           <aside class="space-y-6 lg:col-span-1">
             <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
               <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">Career Totals</h3>
               <ul class="space-y-3">
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Points</span> <span class="font-bold">{{ careerTotals.totalPoints }}</span>
                 </li>
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Rebounds</span> <span class="font-bold">{{ careerTotals.totalRebounds }}</span>
                 </li>
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Assists</span> <span class="font-bold">{{ careerTotals.totalAssists }}</span>
                 </li>
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Steals</span> <span class="font-bold">{{ careerTotals.totalSteals }}</span>
                 </li>
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Blocks</span> <span class="font-bold">{{ careerTotals.totalBlocks }}</span>
                 </li>
                 <li class="flex justify-between border-b border-gray-700 pb-2">
                   <span>Rings 🏆</span> <span class="font-bold text-yellow-400">{{ careerTotals.rings }}</span>
                 </li>
                 <li class="flex justify-between">
                   <span>MVPs ⭐</span> <span class="font-bold text-yellow-400">{{ careerTotals.mvps }}</span>
                 </li>
               </ul>
             </div>

             <button 
               v-if="!player.isRetired"
               @click="simulateSeason"
               class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wide"
             >
               Simulate Season
             </button>
             
             <div v-else class="space-y-4">
               <div class="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-xl text-center font-bold uppercase tracking-wide">
                 Career Retired
               </div>
               <button 
                 @click="resetGame"
                 class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-colors"
               >
                 Start New Career
               </button>
             </div>
           </aside>

           <!-- Painel Principal: Histórico de Temporadas -->
           <div class="lg:col-span-3 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
             <div class="p-6 border-b border-gray-700 bg-gray-800/50">
               <h3 class="text-lg font-bold uppercase">Season History</h3>
             </div>
             
             <div class="p-6 overflow-x-auto">
               <table class="w-full text-left text-sm whitespace-nowrap">
                 <thead>
                   <tr class="text-gray-400 border-b border-gray-700 text-xs">
                     <th class="pb-3 px-2">Year</th>
                     <th class="pb-3 px-2">Age</th>
                     <th class="pb-3 px-2">Team</th>
                     <th class="pb-3 px-2">W-L</th>
                     <th class="pb-3 px-2">OVR</th>
                     <th class="pb-3 px-2">PPG</th>
                     <th class="pb-3 px-2">RPG</th>
                     <th class="pb-3 px-2">APG</th>
                     <th class="pb-3 px-2">SPG</th>
                     <th class="pb-3 px-2">BPG</th>
                     <th class="pb-3 px-2">FG%</th>
                     <th class="pb-3 px-2">+/-</th>
                     <th class="pb-3 px-2 text-center">Awards & Rings</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="season in history" :key="season.seasonNumber" class="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                     <td class="py-3 px-2 text-gray-400">{{ season.seasonNumber }}</td>
                     <td class="py-3 px-2">{{ season.age }}</td>
                     <td class="py-3 px-2 font-bold">{{ season.teamId }}</td>
                     <td class="py-3 px-2 text-gray-300">{{ season.teamWins }}-{{ season.teamLosses }}</td>
                     <td class="py-3 px-2 text-green-400 font-bold">{{ season.ovr }}</td>
                     <td class="py-3 px-2">{{ season.ppg }}</td>
                     <td class="py-3 px-2">{{ season.rpg }}</td>
                     <td class="py-3 px-2">{{ season.apg }}</td>
                     <td class="py-3 px-2">{{ season.spg }}</td>
                     <td class="py-3 px-2">{{ season.bpg }}</td>
                     <td class="py-3 px-2">{{ season.fgPct }}%</td>
                     <td class="py-3 px-2" :class="season.plusMinus > 0 ? 'text-green-400' : 'text-red-400'">
                       {{ season.plusMinus > 0 ? '+' : '' }}{{ season.plusMinus }}
                     </td>
                     <td class="py-3 px-2 flex flex-wrap gap-1 justify-center max-w-[220px]">
                       <span v-if="season.wonRing" class="bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase" title="Championship Ring">
                         🏆 Ring
                       </span>
                       <span 
                         v-for="award in season.awards" 
                         :key="award" 
                         class="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
                       >
                         {{ award }}
                       </span>
                       <span v-if="!season.wonRing && (!season.awards || season.awards.length === 0)" class="text-gray-600">-</span>
                     </td>
                   </tr>
                   <tr v-if="history.length === 0">
                     <td colspan="13" class="py-8 text-center text-gray-500 italic">No seasons played yet. Click simulate to start your legacy.</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>
         </div>
      </section>

    </div>
  </main>
</template>