<script setup lang="ts">
import { ref } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import type { Position, AttributeKey } from './types';

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
  
  // Atualiza o player no game engine (necessita ajustar initCareer para aceitar mais parametros)
  initCareer(inputName.value, inputPosition.value);
  player.nationality = inputNationality.value;
  player.team = draftedTeam;
  player.ovr = initialOvr;
  player.attributes = { ...myAttributes.value };
  
  currentPhase.value = 'playing';
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
              <span class="text-xl font-bold" :class="val >= 90 ? 'text-green-400' : 'text-white'">{{ val }}</span>
            </button>
          </div>
        </div>

        <!-- Seus Atributos (Progresso) -->
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

      <!-- FASE 3: SIMULAÇÃO (Mantido do código anterior, ajustado para exibir nacionalidade/time) -->
      <section v-if="currentPhase === 'playing'">
         <!-- Cole aqui o código da <section v-else> do App.vue da Fase 3 gerado anteriormente -->
         <div class="text-center bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
            <h2 class="text-2xl font-bold">{{ player.name }} - {{ player.ovr }} OVR</h2>
            <p class="text-gray-400">{{ player.position }} | {{ player.nationality }} | Drafted by: {{ player.team }}</p>
         </div>
      </section>

    </div>
  </main>
</template>