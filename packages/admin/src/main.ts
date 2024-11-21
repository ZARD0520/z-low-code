import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import ComponentLib from 'component-repo-vue'
// import ComponentLib from '../../component-repository/vue/dist'

createApp(App)
    .use(ComponentLib)
    .mount('#app')
