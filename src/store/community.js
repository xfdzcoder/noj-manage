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
          // TODO 2024/9/3 14:59 on dev-xfdzcoder: 还要通知questionStore更新
          emitter.emit(EventType.REFRESH_TABLE)
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
