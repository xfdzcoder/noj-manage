import { defineStore } from 'pinia'
import { change, list } from '@/api/community/info.js'
import { emitter, EventType } from '@/utils/eventBus.js'

export const useCommunityInfoStore = defineStore(
  'community-info',
  () => {

    const communityList = ref()
    const currentCommunity = ref()

    const refresh = async () => {
      list()
        .then(res => {
          communityList.value = res.data.records
          currentCommunity.value = communityList.value[0]
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
      refresh
    }
  },
  {
    persist: true
  }
)
