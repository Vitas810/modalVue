import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

createApp(App)
    .use(createPinia())
    .mount('#app')

