import { defineStore } from 'pinia'

export const useQuestionBankStore = defineStore(
  'question',
  () => {
    const currentBank = ref()
    const currentInfo = ref()

    const changeBank = (bank) => {
      currentBank.value = bank
      currentInfo.value = undefined
    }

    const changeInfo = (info) => {
      currentInfo.value = info
    }

    return {
      currentBank,
      changeBank,
      currentInfo,
      changeInfo
    }
  },
  {
    persist: true
  }
)
