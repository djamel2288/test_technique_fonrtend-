<template>
  <span :class="cn(
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border',
    variants[variant] || variants.default,
    className
  )">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { cn } from '@/utils'

interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  className?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variants = {
  default: 'bg-slate-100 text-slate-800 border-slate-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  warning: 'bg-amber-50 text-amber-700 border-amber-100',
  danger: 'bg-rose-50 text-rose-700 border-rose-100',
  info: 'bg-blue-50 text-blue-700 border-blue-100',
  outline: 'bg-transparent text-slate-600 border-slate-200'
}
</script>
