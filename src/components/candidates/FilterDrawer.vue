<template>
  <div class="space-y-6">
    <!-- Statut Filter -->
    <div>
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Statut</h3>
      <div class="space-y-2">
        <label 
          v-for="s in statuts" 
          :key="s"
          class="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
          :class="{ 'bg-primary-50 border-primary-200': store.filters.statut === s }"
        >
          <input 
            type="radio" 
            name="statut" 
            :value="s" 
            :checked="store.filters.statut === s"
            @change="store.setFilter('statut', s)"
            class="text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-slate-700">{{ s }}</span>
        </label>
        <button 
          v-if="store.filters.statut"
          @click="store.setFilter('statut', '')"
          class="text-xs text-primary-600 hover:underline pt-1"
        >
          Effacer le filtre
        </button>
      </div>
    </div>

    <!-- Poste Filter -->
    <div>
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Poste</h3>
      <select 
        :value="store.filters.poste"
        @change="(e) => store.setFilter('poste', (e.target as HTMLSelectElement).value)"
        class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">Tous les postes</option>
        <option v-for="p in postes" :key="p" :value="p">{{ p }}</option>
      </select>
    </div>

    <!-- Date Range Filter -->
    <div>
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Période</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="text-[10px] text-slate-500 uppercase font-bold">Du</label>
          <input 
            type="date"
            :value="store.filters.dateCandidature_gte"
            @change="(e) => store.setFilter('dateCandidature_gte', (e.target as HTMLInputElement).value)"
            class="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div class="space-y-1">
          <label class="text-[10px] text-slate-500 uppercase font-bold">Au</label>
          <input 
            type="date"
            :value="store.filters.dateCandidature_lte"
            @change="(e) => store.setFilter('dateCandidature_lte', (e.target as HTMLInputElement).value)"
            class="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>

    <!-- Skills Filter -->
    <div>
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Compétences</h3>
      <input 
        type="text" 
        :value="store.filters.competences_like"
        @input="(e) => store.setFilter('competences_like', (e.target as HTMLInputElement).value)"
        placeholder="Rechercher une compétence..." 
        class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>

    <div class="pt-6">
      <button 
        @click="$emit('close')"
        class="w-full btn btn-primary py-3"
      >
        Voir les résultats
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCandidateStore } from '@/stores/useCandidateStore'

defineProps<{
  statuts: string[]
  postes: string[]
}>()

defineEmits(['close'])

const store = useCandidateStore()
</script>
