import { createRouter, createWebHistory } from 'vue-router'
import DisplayStudentListings from '@/views/DisplayStudentListings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name : 'DisplayStudentListings',
      component : DisplayStudentListings
    }
  ]
})

export default router
