import request from '@/utils/request.js'

export const baseUri = '/community/info'

export const change = (id) => {
  return request.get(`${baseUri}/change/${id}`)
}

export const changeDefault = () => {
  return request.get(`${baseUri}/change`)
}

export const list = () => {
  return request.post(`${baseUri}/list`, {
    current: 1,
    size: 10
  })
}
