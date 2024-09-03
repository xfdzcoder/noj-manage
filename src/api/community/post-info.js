import request from '@/utils/request.js'

export const baseUri = '/community/post/info'


export const getContentById = (id) => {
  return request.get(`${ baseUri }/content/${ id }`)
}

export const status = (id, status) => {
  return request.get(`${ baseUri }/status/${ id }/${status}`)
}
