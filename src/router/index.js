// create a router and export
import { createRouter, createWebHistory } from 'vue-router'
import AcitivityView from '@/views/AcitivityView.vue'
import ServiceView from '@/views/ServiceView.vue'
import VolunteerView from '@/views/VolunteerView.vue'
import HomePage from '@/views/HomePage.vue'
import RegistionForm from '@/views/RegistionForm.vue'
import RatePage from '@/views/RatePage.vue'
import FirebaseSignin from '@/views/FirebaseSignin.vue'
import FirebaseRegistion from '@/views/FirebaseRegistion.vue'
import Logout from '@/views/Logout.vue'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import EmailView from '@/views/EmailView.vue'

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
      // 获取 Firebase Auth 实例
      const auth = getAuth()
      const db = getFirestore()

      // 获取当前用户并验证是否具有 isVolunteer 权限
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // 获取当前用户的 UID
          const userId = user.uid

          try {
            // 获取 Firestore 中用户文档
            const userRef = doc(db, 'users', userId)
            const userDoc = await getDoc(userRef)

            if (userDoc.exists()) {
              const userData = userDoc.data()

              // 检查用户是否是志愿者
              if (userData.isVolunteer) {
                next() // 如果是志愿者，则允许访问
              } else {
                alert('Only volunteers can access this page')
                next('/') // 否则重定向到首页
              }
            } else {
              alert('User data not found. Please register first.')
              next('/')
            }
          } catch (error) {
            console.error('Error fetching user data:', error)
            next('/')
          }
        } else {
          alert('You need to be logged in to access this page')
          next('/fireLogin')
        }
      })
    }
  },
  // {
  //   path: '/volunteer',
  //   name: 'Volunteer',
  //   component: VolunteerView,
  //   beforeEnter: (to, from, next) => {
  //     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  //     if (loggedInUser && loggedInUser.isVolunteer) {
  //       next()
  //     } else {
  //       alert('Only volunteers can access this page')
  //       next('/')
  //     }
  //   }
  // },
  {
    path: '/activity',
    name: 'Acitivity',
    component: AcitivityView
  },
  {
    path: '/fireLogin',
    name: 'FireLogin',
    component: FirebaseSignin
  },
  {
    path: '/fireRegister',
    name: 'FireRegister',
    component: FirebaseRegistion
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/sendEmail',
    name: 'SendemailView',
    component: EmailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
