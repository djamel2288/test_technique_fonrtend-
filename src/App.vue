<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <WelcomeModal />
    <!-- Header -->
    <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center space-x-3">
            <img src="/src/assets/logo.svg" alt="SIG Service" class="h-10 w-auto" />
            <span class="text-xl font-bold text-white">Recruit<span class="text-primary-400">Admin</span></span>
          </div>
          <nav class="flex space-x-8">
            <router-link 
              to="/" 
              class="text-sm font-medium transition-colors hover:text-primary-400 px-1 py-4 border-b-2"
              :class="[$route.name === 'dashboard' ? 'border-primary-500 text-primary-400' : 'border-transparent text-slate-400']"
            >
              Tableau de Bord
            </router-link>
            <router-link 
              to="/candidates" 
              class="text-sm font-medium transition-colors hover:text-primary-400 px-1 py-4 border-b-2"
              :class="[$route.name === 'candidates' ? 'border-primary-500 text-primary-400' : 'border-transparent text-slate-400']"
            >
              Candidats
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
          >
            <div :key="$route.path">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-4 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
        © 2026 Test Technique Recruit Admin
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import WelcomeModal from './components/common/WelcomeModal.vue'
const route = useRoute()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
