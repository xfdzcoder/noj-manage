import { defineStore } from 'pinia'
import { logout } from '@/api/manage-user/index.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserInfoStore = defineStore(
  'user-info',
  () => {
    const token = ref()
    const user = ref()
    const community = ref()


    const resolveLoginRes = (res) => {
      const data = res.data
      token.value = data.token
      user.value = data.manageUser
      community.value = data.community
    }

    const isLogin = () => {
      return token.value && user.value && community.value
    }

    const doLogout = () => {
      logout()
        .then(res => {
          ElMessage.warning('登录状态已失效，请重新登录')
          router.push({
            name: 'Login'
          })
        })
    }

    return {
      token,
      user,
      community,
      resolveLoginRes,
      isLogin,
      doLogout
    }
  },
  {
    persist: true
  }
)
