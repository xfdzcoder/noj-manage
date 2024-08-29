import request from '@/utils/request.js'

export const baseUri = '/question/bank'

export const searchByName = (name) => {
  return request.get(`${ baseUri }/search/name/${ name }`)
}
