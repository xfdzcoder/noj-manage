import { defineStore } from 'pinia'

export const usePostInfoStore = defineStore(
  'post-info',
  () => {

    const currentPost = ref()
    const changePost = (post) => {
      currentPost.value = post
    }


    const currentRootComment = ref()
    const changeRootComment = (comment) => {
      currentRootComment.value = comment
    }


    return {
      currentPost,
      changePost,
      currentRootComment,
      changeRootComment
    }

  },
  {
    persist: true
  }
)
