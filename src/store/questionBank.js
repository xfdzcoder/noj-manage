import { defineStore } from 'pinia'

export const useQuestionBankStore = defineStore(
  'question-bank',
  () => {
    const currentBank = ref()

    const changeBank = (bank) => {
      currentBank.value = bank
    }

    return {
      currentBank,
      changeBank
    }
  },
  {
    persist: true
  }
)
