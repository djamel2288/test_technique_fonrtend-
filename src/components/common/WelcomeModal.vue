<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all border border-slate-100">
        <div class="bg-primary-600 p-8 text-white relative overflow-hidden">
          <div class="relative z-10 flex flex-col items-center text-center">
            <div class="bg-white/20 p-4 rounded-2xl mb-4 backdrop-blur-md">
              <UserCheck class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-2xl font-bold">Hello Recruteur !</h2>
          </div>
          <!-- Decorative circle -->
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="p-8 space-y-4">
          <p class="text-slate-600 leading-relaxed text-sm">
            Je suis développeur <strong>Fullstack (4+ ans d'expérience)</strong>, principalement sur Angular/springboot. 
            Vue.js n'est pas ma stack habituelle, donc pour gagner du temps, j'ai utilisé des outils d'<strong>IA</strong> pour m'aider à réaliser ce test rapidement.
          </p>
          <p class="text-slate-600 leading-relaxed text-sm italic border-l-4 border-primary-100 pl-4">
            "Prioriser l'architecture et l'expérience utilisateur, malgré un délai très court."
          </p>
          
          <div class="pt-6">
            <button 
              @click="close"
              class="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 flex items-center justify-center space-x-2"
            >
              <span>Découvrir le projet</span>
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserCheck, ArrowRight } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  const hasSeen = localStorage.getItem('welcome_seen')
  if (!hasSeen) {
    setTimeout(() => {
      isVisible.value = true
    }, 500)
  }
})

const close = () => {
  isVisible.value = false
  localStorage.setItem('welcome_seen', 'true')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
