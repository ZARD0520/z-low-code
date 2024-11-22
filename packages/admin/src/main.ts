import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ComponentLib from 'component-repo-vue'

createApp(App)
    .use(ComponentLib)
    .mount('#app')
