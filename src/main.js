import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/saga_blue/theme.css' // 修改为你需要的主题
// import 'primevue/resources/themes/vela_blue/theme.css' // 尝试不同的主题文件

// import 'primevue/resources/primevue.min.css' // PrimeVue 的基本样式文件
// import 'primeicons/primeicons.css' // 引入 PrimeVue 图标

import Aura from '@primevue/themes/aura'
import { initializeApp } from 'firebase/app'
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// createApp(App).mount('#app')
// create application
const app = createApp(App)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQXZnj73E0QPwdsLTSHUzYILQ9m_94A_w',
  authDomain: 'assessment-c3dee.firebaseapp.com',
  projectId: 'assessment-c3dee',
  storageBucket: 'assessment-c3dee.appspot.com',
  messagingSenderId: '846845079130',
  appId: '1:846845079130:web:c52239377510d16bc5b263'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
// use router
app.use(router)
//挂载application到app
app.mount('#app')
export { firebaseApp }
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
