import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 修改请求之前的配置
    return config
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
