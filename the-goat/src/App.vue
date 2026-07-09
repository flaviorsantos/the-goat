<script setup lang="ts">
import { ref } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import type { Position, AttributeKey } from './types';
import { ATTRIBUTES_LIST } from './types';

const { player, history, careerTotals, initCareer, simulateSeason } = useGameEngine();
const { 
  currentDrawnPlayer, myAttributes, availableSlots, hasReroll, isDraftComplete, 
  drawRandomPlayer, useReroll, selectAttribute, calculateStartingOVR, getRandomTeam 
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
  player.team = draftedTeam;
  player.ovr = initialOvr;
  player.attributes = { ...myAttributes.value };
  
  currentPhase.value = 'playing';
};

const handleSimulateSeason = () => {
  simulateSeason();
};

/** Check if a numeric value is 90+ for green highlight. */
const isElite = (val: number | undefined): boolean => val !== undefined && val >= 90;

/** Reload the page to start a completely new game. */
const restartGame = () => {
  window.location.reload();
};
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
    <div class="max-w-5xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-black uppercase tracking-widest text-white">The Goat Simulator</h1>
      </header>

      <!-- FASE 1: SETUP -->
      <section v-if="currentPhase === 'setup'" class="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto border border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-center">Create Your Player</h2>
        <div class="space-y-4">
          <input v-model="inputName" type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white" placeholder="Name" />
          <input v-model="inputNationality" type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white" placeholder="Nationality (e.g. Brazil)" />
          <select v-model="inputPosition" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white">
            <option value="PG">Point Guard (PG)</option>
            <option value="SG">Shooting Guard (SG)</option>
            <option value="SF">Small Forward (SF)</option>
            <option value="PF">Power Forward (PF)</option>
            <option value="C">Center (C)</option>
          </select>
          <button @click="startDraft" class="w-full mt-6 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 uppercase">
            Go to Draft
          </button>
        </div>
      </section>

      <!-- FASE 2: DRAFT (STEAL ATTRIBUTES) -->
      <section v-if="currentPhase === 'draft'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Jogador Sorteado -->
        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-blue-400">{{ currentDrawnPlayer?.name }}</h2>
            <button 
              @click="useReroll" 
              :disabled="!hasReroll"
              class="px-4 py-2 text-sm font-bold rounded bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              class="flex flex-col items-center p-3 rounded-lg border border-gray-600 hover:bg-gray-700 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <span class="text-xs text-gray-400">{{ key }}</span>
              <span class="text-xl font-bold" :class="isElite(val) ? 'text-green-400' : 'text-white'">{{ val }}</span>
            </button>
          </div>
        </div>

        <!-- Seus Atributos (Progresso) -->
        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold mb-6">Your DNA (<span class="text-blue-400">{{ 9 - availableSlots.length }}/9</span>)</h2>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div v-for="slot in ATTRIBUTES_LIST" :key="slot" class="text-center">
                <p class="text-xs text-gray-500">{{ slot }}</p>
                <p class="font-bold text-lg">
                  {{ myAttributes[slot] || '--' }}
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
      <section v-if="currentPhase === 'playing'" class="space-y-6">
        <!-- Player Info Card -->
        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div class="text-center">
            <h2 class="text-3xl font-bold">{{ player.name }} <span class="text-yellow-400">— {{ player.ovr }} OVR</span></h2>
            <p class="text-gray-400 mt-1">
              {{ player.position }} | {{ player.nationality }} | Drafted by: {{ player.team }}
              <span v-if="player.isRetired" class="ml-3 text-red-400 font-bold">[RETIRED]</span>
            </p>
          </div>

          <!-- Attributes Display -->
          <div class="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
            <div v-for="slot in ATTRIBUTES_LIST" :key="slot" class="text-center bg-gray-900 rounded-lg p-2">
              <p class="text-xs text-gray-500">{{ slot }}</p>
              <p class="font-bold" :class="isElite(player.attributes[slot]) ? 'text-green-400' : 'text-white'">
                {{ player.attributes[slot] ?? '--' }}
              </p>
            </div>
          </div>

          <!-- Career Totals -->
          <div class="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center border-t border-gray-700 pt-4">
            <div>
              <p class="text-2xl font-bold text-orange-400">{{ careerTotals.totalPoints.toLocaleString() }}</p>
              <p class="text-xs text-gray-400">Total PTS</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-orange-400">{{ careerTotals.totalRebounds.toLocaleString() }}</p>
              <p class="text-xs text-gray-400">Total REB</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-orange-400">{{ careerTotals.totalAssists.toLocaleString() }}</p>
              <p class="text-xs text-gray-400">Total AST</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-yellow-400">{{ careerTotals.rings }}</p>
              <p class="text-xs text-gray-400">Rings</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-yellow-400">{{ careerTotals.mvps }}</p>
              <p class="text-xs text-gray-400">MVPs</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-300">{{ careerTotals.seasonsPlayed }}</p>
              <p class="text-xs text-gray-400">Seasons</p>
            </div>
          </div>
        </div>

        <!-- Simulate Button -->
        <div v-if="!player.isRetired" class="text-center">
          <button 
            @click="handleSimulateSeason"
            class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-colors shadow-lg uppercase tracking-wide text-xl"
          >
            Simulate Season
          </button>
        </div>
        <div v-else class="text-center">
          <p class="text-2xl text-red-400 font-bold mb-4">Career Over!</p>
          <button 
            @click="restartGame"
            class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-xl transition-colors uppercase tracking-wide"
          >
            Start New Game
          </button>
        </div>

        <!-- Season History -->
        <div v-if="history.length > 0" class="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 class="text-xl font-bold mb-4">Season History</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead>
                <tr class="text-gray-400 border-b border-gray-700">
                  <th class="pb-2 pr-4">#</th>
                  <th class="pb-2 pr-4">Age</th>
                  <th class="pb-2 pr-4">OVR</th>
                  <th class="pb-2 pr-4">PPG</th>
                  <th class="pb-2 pr-4">RPG</th>
                  <th class="pb-2 pr-4">APG</th>
                  <th class="pb-2 pr-4">MVP</th>
                  <th class="pb-2 pr-4">Ring</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="season in [...history].reverse()" :key="season.seasonNumber" class="border-b border-gray-700/50">
                  <td class="py-2 pr-4">{{ season.seasonNumber }}</td>
                  <td class="py-2 pr-4">{{ season.age }}</td>
                  <td class="py-2 pr-4">{{ season.ovr }}</td>
                  <td class="py-2 pr-4">{{ season.ppg }}</td>
                  <td class="py-2 pr-4">{{ season.rpg }}</td>
                  <td class="py-2 pr-4">{{ season.apg }}</td>
                  <td class="py-2 pr-4">{{ season.wonMVP ? '🏆' : '—' }}</td>
                  <td class="py-2 pr-4">{{ season.wonRing ? '💍' : '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>