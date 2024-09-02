import request from '@/utils/request.js'

export const baseUri = '/user'

export const login = (data) => {
  return request.post(`${baseUri}/auth/login`, data)
}

export const logout = () => {
  return request.get(`${baseUri}/auth/logout`)
}
