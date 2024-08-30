import { createApp } from 'vue'
import App from './App.vue'
// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Pinia
import { createPinia } from 'pinia'
// Pinia Plugins
import { createPersistedState } from 'pinia-plugin-persistedstate'
// Router
import router from '@/router/index.js'

// 最后导入
import './style.css'

const app = createApp(App)

for (const [ key, component ] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
const pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage
}))
app.use(pinia)
app.use(router)

app.mount('#app')
