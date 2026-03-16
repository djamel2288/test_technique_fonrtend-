<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 text-slate-900">
      <div>
        <h1 class="text-2xl font-bold">Candidatures</h1>
        <p class="text-sm text-slate-500 mt-1">Gérez et suivez le parcours de vos candidats.</p>
      </div>
      <button 
        @click="isAddDrawerOpen = true"
        class="btn btn-primary shadow-lg shadow-primary-200"
      >
        <Plus class="w-4 h-4 mr-2" />
        Ajouter un candidat
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
      <!-- Toolbar -->
      <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div class="relative w-full sm:w-96">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Rechercher un nom, une compétence..." 
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
          />
        </div>
        <div class="flex items-center space-x-3 w-full sm:w-auto">
          <button 
            @click="isFilterDrawerOpen = true"
            class="flex-1 sm:flex-none btn bg-white border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2.5"
          >
            <Filter class="w-4 h-4 mr-2" />
            Filtres
            <span v-if="activeFilterCount > 0" class="ml-2 px-2 py-0.5 bg-primary-100 text-primary-600 rounded-full text-[10px] font-bold">
              {{ activeFilterCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="relative flex-grow">
        <div v-if="store.loading" class="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-primary-600 mb-4"></div>
            <p class="text-sm text-slate-500 font-medium tracking-wide">Mise à jour...</p>
          </div>
        </div>

        <CandidateTable 
          :candidates="store.candidates" 
          @view="viewCandidate"
          @sort="handleSort"
        />
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <span class="text-xs text-slate-500">
          Page <strong>{{ store.filters._page }}</strong>
        </span>
        <div class="flex space-x-2">
          <button 
            class="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="store.filters._page === 1"
            @click="store.setFilter('_page', store.filters._page - 1)"
          >
            <ChevronLeft class="w-4 h-4 text-slate-600" />
          </button>
          <button 
            class="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="store.candidates.length < store.filters._per_page"
            @click="store.setFilter('_page', store.filters._page + 1)"
          >
            <ChevronRight class="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Drawer -->
    <Drawer 
      :isOpen="isFilterDrawerOpen" 
      title="Filtres Avancés"
      @close="isFilterDrawerOpen = false"
    >
      <FilterDrawer 
        :statuts="store.statuts"
        :postes="store.postes"
        @close="isFilterDrawerOpen = false"
      />
    </Drawer>

    <!-- Add Candidate Drawer -->
    <Drawer 
      :isOpen="isAddDrawerOpen" 
      title="Nouveau Candidat"
      @close="isAddDrawerOpen = false"
    >
      <CandidateForm 
        :statuts="store.statuts"
        :postes="store.postes"
        @submit="handleAddSubmit"
        @cancel="isAddDrawerOpen = false"
      />
    </Drawer>

    <!-- Detail Drawer -->
    <Drawer 
      :isOpen="!!selectedCandidate" 
      :title="selectedCandidate?.nom || 'Détails'"
      @close="selectedCandidate = null"
    >
      <CandidateDetail 
        v-if="selectedCandidate"
        :candidate="selectedCandidate"
        :statuts="store.statuts"
        @status-change="handleStatusUpdate"
      />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/useCandidateStore'
import type { Candidature } from '@/services/candidateService'
import CandidateTable from '@/components/candidates/CandidateTable.vue'
import CandidateDetail from '@/components/candidates/CandidateDetail.vue'
import FilterDrawer from '@/components/candidates/FilterDrawer.vue'
import CandidateForm from '@/components/candidates/CandidateForm.vue'
import Drawer from '@/components/ui/Drawer.vue'

const store = useCandidateStore()
const isFilterDrawerOpen = ref(false)
const isAddDrawerOpen = ref(false)
const selectedCandidate = ref<Candidature | null>(null)
const searchQuery = ref('')
let searchTimeout: any = null

onMounted(() => {
  store.fetchCandidates()
  store.fetchMetadata()
})

async function handleAddSubmit(candidate: any) {
  try {
    await store.createCandidate(candidate)
    isAddDrawerOpen.value = false
  } catch (err) {
    // Error handled by store
  }
}

const activeFilterCount = computed(() => {
  let count = 0
  if (store.filters.statut) count++
  if (store.filters.poste) count++
  if (store.filters.dateCandidature_gte || store.filters.dateCandidature_lte) count++
  return count
})

function viewCandidate(candidate: Candidature) {
  selectedCandidate.value = candidate
}

function handleSort(key: any) {
  const currentSort = store.filters._sort
  const isDescending = currentSort === `-${key}`
  const newSort = isDescending ? key : `-${key}`
  store.setFilter('_sort', newSort)
}

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.setFilter('nom:contains', searchQuery.value)
  }, 400) // Debounce search
}

async function handleStatusUpdate(id: number, newStatut: string) {
  await store.updateStatus(id, newStatut)
  // Reflect changes in detail view if it's the same candidate
  if (selectedCandidate.value?.id === id) {
    selectedCandidate.value = { ...selectedCandidate.value, statut: newStatut }
  }
}
</script>
