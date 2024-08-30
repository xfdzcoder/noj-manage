import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { DevUiResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: ['.vue'],
      routesFolder: [
        'src/views'
      ],
      exclude: [
        'src/views/portal/**'
      ],
      extendRoute(route) {
        if (route.node.value.overrides?.meta?.remove) {
          route.parent.addToMeta(route.node.value.overrides.meta)
          route.delete()
        }
      }
    }),
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [ 'vue' ],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: [ 'ep' ]
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册 DevUI 组件
        DevUiResolver()
      ],

      dts: path.resolve(pathSrc, 'components.d.ts')
    }),

    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  }
})
