import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

// createApp(App).mount('#app')
// create application
const app = createApp(App)
// use router
app.use(router)
//挂载application到app
app.mount('#app')
