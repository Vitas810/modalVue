import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vMaska } from "maska"
import { vue3Debounce } from 'vue-debounce'
import './style.css'

createApp(App)
    .use(createPinia())
    .directive("maska", vMaska)
    .directive('debounce', vue3Debounce({ lock: true }))
    .mount('#app')

