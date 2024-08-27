import axios from 'axios'
import { useUserInfoStore } from '@/store/userInfo.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_bASE_URL,
  timeout: 10000
})

const whiteList = [
  '/user/auth/login',
  '/user/auth/register'
]

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 修改请求之前的配置
    const { isLogin, token } = useUserInfoStore()
    if (isLogin()) {
      config.headers.set('satoken', token)
      return config
    }
    console.log('request config: ', config)
    if (whiteList.includes(config.url)) {
      return config
    }
    // 非法请求
    ElMessage.warning('登录状态已失效，请重新登录')
    router.push({ path: '/login' })
    return Promise.reject(config)
  },
  error => {
    // 请求错误的处理逻辑
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 统一处理响应数据
    return response.data
  },
  error => {
    // 统一处理响应错误
    return Promise.reject(error)
  }
)

export default instance
