import { createRouter, createWebHistory } from 'vue-router'
import LookForStudent from '@/views/LookForStudent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LookForStudent',
      component: LookForStudent
    }
  ]
})

export default router
