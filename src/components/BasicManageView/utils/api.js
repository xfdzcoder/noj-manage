import request from '@/utils/request.js'

export const list = (baseUri, data) => {
  return request.post(`${ baseUri }/list`, data)
}

export const save = (baseUri, data) => {
  return request.post(`${ baseUri }`, data)
}

export const delById = (baseUri, id) => {
  return request.delete(`${ baseUri }/${ id }`)
}

export const edit = (baseUri, data) => {
  return request.put(`${ baseUri }`, data)
}

export const get = (baseUri, id) => {
  return request.get(`${ baseUri }/${ id }`)
}
