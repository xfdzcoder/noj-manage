import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// Pinia Plugins
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// Router
import router from '@/router/index.js'
app.use(router)


app.mount('#app')
