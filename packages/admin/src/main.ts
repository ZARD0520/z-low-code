import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import ComponentLib from 'component-repo-vue'
import {
  ElButton
} from 'element-plus'
import router from '@/router/index'

const app = createApp(App)

app.use(router)
app.use(ElButton)
app.use(ComponentLib).mount('#app')