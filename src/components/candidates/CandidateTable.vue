<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-slate-50 border-b border-slate-200">
          <th 
            v-for="column in columns" 
            :key="column.key"
            class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
            @click="$emit('sort', column.key)"
          >
            <div class="flex items-center space-x-1">
              <span>{{ column.label }}</span>
              <ArrowUpDown v-if="column.sortable" class="w-3 h-3 text-slate-400" />
            </div>
          </th>
          <th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr 
          v-for="candidate in candidates" 
          :key="candidate.id"
          class="hover:bg-primary-50/30 transition-colors group cursor-pointer"
          @click="$emit('view', candidate)"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center text-slate-900">
              <div class="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs mr-3">
                {{ candidate.nom.charAt(0) }}
              </div>
              <span class="font-medium">{{ candidate.nom }}</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            {{ candidate.poste }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <Badge :variant="getStatusVariant(candidate.statut)">
              {{ candidate.statut }}
            </Badge>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ formatDate(candidate.dateCandidature) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <button 
              class="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all opacity-0 group-hover:opacity-100"
              @click.stop="$emit('view', candidate)"
            >
              <Eye class="w-4 h-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Empty State -->
    <div v-if="candidates.length === 0" class="py-20 flex flex-col items-center justify-center text-slate-400 bg-white">
      <Users class="w-12 h-12 text-slate-200 mb-4" />
      <p class="text-sm">Aucun candidat trouvé pour cette recherche.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpDown, Eye, Users } from 'lucide-vue-next'
import type { Candidature } from '@/services/candidateService'
import { formatDate } from '@/utils'
import Badge from '@/components/ui/Badge.vue'

defineProps<{
  candidates: Candidature[]
}>()

defineEmits(['sort', 'view'])

const columns = [
  { key: 'nom', label: 'Candidat', sortable: true },
  { key: 'poste', label: 'Poste', sortable: true },
  { key: 'statut', label: 'Statut', sortable: true },
  { key: 'dateCandidature', label: 'Date', sortable: true },
]

function getStatusVariant(statut: string) {
  switch (statut) {
    case 'Accepté': return 'success'
    case 'Refusé': return 'danger'
    case 'Entretien':
    case 'Entretien RH':
    case 'Entretien technique': return 'warning'
    case 'En attente': return 'info'
    default: return 'default'
  }
}
</script>
