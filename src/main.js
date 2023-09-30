import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import './style.css'
import App from './App.vue'
import Icon from './components/Icon.vue'

const pinia = createPinia()
const app = createApp(App)
app.component('Icon', Icon)

app.use(pinia)
app.use(router)
app.use(VueApexCharts)
app.mount('#app')
