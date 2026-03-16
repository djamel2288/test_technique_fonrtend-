import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/pages/Dashboard.vue')
    },
    {
      path: '/candidates',
      name: 'candidates',
      component: () => import('@/pages/Candidates.vue')
    }
  ]
})

export default router
