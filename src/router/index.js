// create a router and export
import { createRouter, createWebHistory } from 'vue-router'
import AcitivityView from '@/views/AcitivityView.vue'
import ServiceView from '@/views/ServiceView.vue'
import VolunteerView from '@/views/VolunteerView.vue'
import HomePage from '@/views/HomePage.vue'
import RegistionForm from '@/views/RegistionForm.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: HomePage
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceView
  },
  {
    path: '/volunteer',
    name: 'Volunteer',
    component: VolunteerView
  },
  {
    path: '/activity',
    name: 'Acitivity',
    component: AcitivityView
  },
  {
    path: '/registion',
    name: 'Registion',
    component: RegistionForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
