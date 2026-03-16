<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Tableau de Bord</h1>
        <p class="text-sm text-slate-500 mt-1">Aperçu de la performance du recrutement.</p>
      </div>
      <div class="text-xs font-medium text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
        Mise à jour: {{ lastUpdate }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading && store.dashboardCandidates.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      <div v-for="i in 4" :key="i" class="h-32 bg-slate-100 rounded-2xl border border-slate-200"></div>
    </div>

    <!-- KPI Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in computedStats" :key="stat.label" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-3 rounded-xl transition-colors', stat.color]">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div class="text-right">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tendance</span>
            <div class="text-sm font-bold text-emerald-600 flex items-center justify-end">
              <TrendingUp class="w-3 h-3 mr-1" />
              +{{ stat.growth }}%
            </div>
          </div>
        </div>
        <div class="text-3xl font-bold text-slate-900 mb-1">{{ stat.value }}</div>
        <div class="text-sm font-medium text-slate-500">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Insights Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <BarChart3 class="w-5 h-5 mr-3 text-primary-600" />
          Répartition par Poste
        </h3>
        <div class="space-y-4">
          <div v-for="(count, poste) in posteDistribution" :key="poste" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-slate-700">{{ poste }}</span>
              <span class="text-slate-500 font-bold">{{ count }}</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                class="bg-primary-500 h-full rounded-full transition-all duration-1000" 
                :style="{ width: `${(count / store.candidates.length) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-primary-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden group">
        <div class="relative z-10">
          <h3 class="text-lg font-bold mb-4 opacity-90">Analyse du Pipeline</h3>
          <div class="space-y-6">
            <div v-for="stat in pipelineStats" :key="stat.label" class="flex items-center space-x-4">
              <div class="p-2 bg-white/10 rounded-lg">
                <component :is="stat.icon" class="w-5 h-5 text-primary-200" />
              </div>
              <div>
                <p class="text-xs text-primary-300 font-medium">{{ stat.label }}</p>
                <p class="text-xl font-bold">{{ stat.value }}</p>
              </div>
            </div>
          </div>
          <button class="w-full mt-8 py-3 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors text-sm">
            Générer un rapport PDF
          </button>
        </div>
        <!-- Decorative element -->
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-800 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Users, FileText, CheckCircle, Clock, TrendingUp, BarChart3, Briefcase, UserPlus } from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/useCandidateStore'

const store = useCandidateStore()
const lastUpdate = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

onMounted(() => {
  store.fetchDashboardData() // Fetch all specifically for stats
})

const computedStats = computed(() => [
  { 
    label: 'Candidatures Totales', 
    value: store.dashboardCandidates.length || '0', 
    growth: '12', 
    icon: Users, 
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
  },
  { 
    label: 'En attente', 
    value: store.dashboardCandidates.filter(c => c.statut === 'En attente').length || '0', 
    growth: '5', 
    icon: Clock, 
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' 
  },
  { 
    label: 'En cours', 
    value: store.dashboardCandidates.filter(c => ['Entretiens', 'Entretien RH', 'Entretien technique'].includes(c.statut)).length || '0', 
    growth: '18', 
    icon: Briefcase, 
    color: 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white' 
  },
  { 
    label: 'Recrutements', 
    value: store.dashboardCandidates.filter(c => c.statut === 'Accepté').length || '0', 
    growth: '8', 
    icon: CheckCircle, 
    color: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white' 
  },
])

const posteDistribution = computed(() => {
  const dist: Record<string, number> = {}
  store.dashboardCandidates.forEach(c => {
    dist[c.poste] = (dist[c.poste] || 0) + 1
  })
  return dist
})

const pipelineStats = computed(() => [
  { label: 'Taux de conversion', value: '4.2%', icon: TrendingUp },
  { label: 'Nouveaux ce mois', value: '18', icon: UserPlus },
  { label: 'Temps moyen de recrutement', value: '14j', icon: Clock },
])
</script>
