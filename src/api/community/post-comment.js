import request from '@/utils/request.js'

export const baseUri = '/community/post/comment'


export const listChild = (id, lastId) => {
  return request.get(`${baseUri}/list/${id}`, {
    params: {
      lastId: lastId
    }
  })
}
