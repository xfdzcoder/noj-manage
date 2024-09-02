import { defineStore } from 'pinia'
import { change, changeDefault, list } from '@/api/community/info.js'
import { emitter, EventType } from '@/utils/eventBus.js'

export const useCommunityInfoStore = defineStore(
  'community-info',
  () => {

    const communityList = ref()
    const currentCommunity = ref()

    const refresh = () => {
      list()
        .then(res => {
          communityList.value = res.data.records
        })
    }

    const init = async () => {
      return changeDefault()
        .then(res => {
          currentCommunity.value = res.data
          return Promise.resolve()
        })
    }

    const changeCommunity = (id) => {
      change(id)
        .then(res => {
          emitter.emit(EventType.COMMUNITY_CHANGE)
          currentCommunity.value = res.data
        })
    }

    return {
      communityList,
      currentCommunity,
      changeCommunity,
      init,
      refresh
    }
  },
  {
    persist: true
  }
)
