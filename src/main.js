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

import DevUI from 'vue-devui'
import 'vue-devui/style.css'
import '@devui-design/icons/icomoon/devui-icon.css'
import { infinityTheme, ThemeServiceInit } from 'devui-theme'
// 最后导入
import './style.css'

ThemeServiceInit({ infinityTheme }, 'infinityTheme')

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
app.use(DevUI)

app.mount('#app')
