// create a router and export
import { createRouter, createWebHistory } from 'vue-router'
import AcitivityView from '@/views/AcitivityView.vue'
import ServiceView from '@/views/ServiceView.vue'
import VolunteerView from '@/views/VolunteerView.vue'
import HomePage from '@/views/HomePage.vue'
import RegistionForm from '@/views/RegistionForm.vue'
import RatePage from '@/views/RatePage.vue'

const routes = [
  {
    path: '/rate',
    name: 'Ratepage',
    component: RatePage
  },
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
    component: VolunteerView,
    beforeEnter: (to, from, next) => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      if (loggedInUser && loggedInUser.isVolunteer) {
        next()
      } else {
        alert('Only volunteers can access this page')
        next('/')
      }
    }
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
