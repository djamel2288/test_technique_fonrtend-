<template>
  <Teleport to="body">
    <transition name="drawer-fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
          @click="$emit('close')"
        ></div>

        <!-- Panel -->
        <transition name="drawer-slide">
          <div 
            class="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-200"
            @click.stop
          >
            <!-- Header -->
            <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 class="text-lg font-semibold text-slate-900">{{ title }}</h2>
              <button 
                @click="$emit('close')"
                class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="flex-grow overflow-y-auto p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  title: string
}>()

defineEmits(['close'])
</script>

<style scoped>
.drawer-fade-enter-active, .drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from, .drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active {
  transition: transform 0.3s ease-out;
}
.drawer-slide-leave-active {
  transition: transform 0.2s ease-in;
}
.drawer-slide-enter-from, .drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
