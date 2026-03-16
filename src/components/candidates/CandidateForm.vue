<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <!-- Nom -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Nom Complet</label>
        <input 
          v-model="form.nom" 
          type="text" 
          required
          placeholder="ex: Jean Dupont"
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
      </div>

      <!-- Poste -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Poste Visé</label>
        <select 
          v-model="form.poste" 
          required
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        >
          <option value="" disabled>Sélectionner un poste</option>
          <option v-for="p in postes" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>

      <!-- Statut -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Statut Initial</label>
        <select 
          v-model="form.statut" 
          required
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        >
          <option v-for="s in statuts" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          placeholder="jean.dupont@email.com"
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
      </div>

      <!-- Experience -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Expérience</label>
        <input 
          v-model="form.experience" 
          type="text" 
          placeholder="ex: 3 ans"
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
      </div>

      <!-- Localisation -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Localisation</label>
        <input 
          v-model="form.localisation" 
          type="text" 
          placeholder="ex: Paris, France"
          class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
      </div>
    </div>

    <div class="pt-6 border-t border-slate-100 flex space-x-3">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
      >
        Annuler
      </button>
      <button 
        type="submit" 
        :disabled="loading"
        class="flex-1 btn btn-primary py-2.5 shadow-lg shadow-primary-200"
      >
        <span v-if="loading">Création...</span>
        <span v-else>Enregistrer</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps<{
  statuts: string[]
  postes: string[]
}>()

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)

const form = reactive({
  nom: '',
  poste: '',
  statut: props.statuts[0] || 'En attente',
  email: '',
  experience: '',
  localisation: '',
  dateCandidature: new Date().toISOString(),
  competences: [],
  commentaires: [],
  telephone: '',
  cv: '',
  lettreMotivation: '',
  salaireSouhaite: 0,
  disponibilite: 'Immédiate'
})

async function handleSubmit() {
  loading.value = true
  try {
    emit('submit', { ...form })
  } finally {
    loading.value = false
  }
}
</script>
