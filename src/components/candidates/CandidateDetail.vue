<template>
  <div class="space-y-6">
    <!-- Quick Actions -->
    <div class="flex items-center space-x-2">
      <select 
        :value="candidate.statut"
        @change="handleStatusChange"
        class="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option v-for="s in statuts" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <!-- Personal Info -->
    <section class="space-y-4">
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Informations Personnelles</h3>
      <div class="grid grid-cols-1 gap-4">
        <div class="flex items-start space-x-3">
          <Mail class="w-4 h-4 text-slate-400 mt-0.5" />
          <div>
            <p class="text-xs text-slate-500">Email</p>
            <a :href="`mailto:${candidate.email}`" class="text-sm text-primary-600 hover:underline">{{ candidate.email }}</a>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <Phone class="w-4 h-4 text-slate-400 mt-0.5" />
          <div>
            <p class="text-xs text-slate-500">Téléphone</p>
            <p class="text-sm text-slate-900">{{ candidate.telephone }}</p>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <MapPin class="w-4 h-4 text-slate-400 mt-0.5" />
          <div>
            <p class="text-xs text-slate-500">Localisation</p>
            <p class="text-sm text-slate-900">{{ candidate.localisation }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience & Skills -->
    <section class="space-y-4">
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Profil Professionnel</h3>
      <div>
        <p class="text-xs text-slate-500 mb-1">Expérience</p>
        <p class="text-sm text-slate-900 leading-relaxed">{{ candidate.experience }}</p>
      </div>
      <div>
        <p class="text-xs text-slate-500 mb-2">Compétences</p>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="skill in candidate.competences" :key="skill" variant="outline">
            {{ skill }}
          </Badge>
        </div>
      </div>
    </section>

    <!-- Documents -->
    <section class="space-y-4">
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Documents</h3>
      <div class="flex space-x-3">
        <a :href="candidate.cv" target="_blank" class="flex-1 flex items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <FileText class="w-4 h-4 text-primary-600 mr-2" />
          <span class="text-sm font-medium text-slate-700">Consulter le CV</span>
        </a>
      </div>
    </section>

    <!-- Motivation -->
    <section class="space-y-4">
      <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Lettre de Motivation</h3>
      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-sm text-slate-600 leading-relaxed italic">"{{ candidate.lettreMotivation }}"</p>
      </div>
    </section>

    <!-- Comments -->
    <section class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Commentaires</h3>
        <span class="text-xs font-medium text-slate-400">{{ candidate.commentaires?.length || 0 }}</span>
      </div>
      
      <div class="space-y-3">
        <div v-for="comment in candidate.commentaires" :key="comment.id" class="p-3 bg-white border border-slate-100 rounded-xl space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-slate-700">{{ comment.auteur }}</span>
            <span class="text-[10px] text-slate-400">{{ new Date(comment.date).toLocaleDateString() }}</span>
          </div>
          <p class="text-sm text-slate-600">{{ comment.contenu }}</p>
        </div>

        <div v-if="!candidate.commentaires?.length" class="text-center py-4 border-2 border-dashed border-slate-100 rounded-xl">
          <p class="text-xs text-slate-400">Aucun commentaire pour le moment.</p>
        </div>
      </div>

      <!-- Add Comment Form -->
      <div class="pt-2">
        <div class="flex space-x-2">
          <input 
            v-model="newComment"
            type="text" 
            placeholder="Ajouter un commentaire..." 
            @keyup.enter="handleAddComment"
            class="flex-grow text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button 
            @click="handleAddComment"
            :disabled="!newComment.trim() || isSubmitting"
            class="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <Send class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Phone, MapPin, FileText, Send } from 'lucide-vue-next'
import type { Candidature } from '@/services/candidateService'
import { useCandidateStore } from '@/stores/useCandidateStore'
import Badge from '@/components/ui/Badge.vue'

const props = defineProps<{
  candidate: Candidature
  statuts: string[]
}>()

const emit = defineEmits(['status-change'])
const store = useCandidateStore()

const newComment = ref('')
const isSubmitting = ref(false)

async function handleAddComment() {
  if (!newComment.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  try {
    await store.addComment(props.candidate.id, newComment.value)
    newComment.value = ''
  } catch (err) {
    // Error handled by store
  } finally {
    isSubmitting.value = false
  }
}

function handleStatusChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('status-change', props.candidate.id, target.value)
}
</script>
