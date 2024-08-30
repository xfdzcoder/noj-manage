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

    const isCodeQuestion = (questionType) => {
      return questionType === 4
    }

    const getQuestionTypeTitle = (questionType) => {
      switch (questionType) {
        case 0:
          return '单选题'
        case 1:
          return '多选题'
        case 2:
          return '填空题'
        case 3:
          return '主观题'
        case 4:
          return '编程题'
        default:
          return '未知'
      }
    }

    return {
      currentBank,
      changeBank,
      currentInfo,
      changeInfo,
      isCodeQuestion,
      getQuestionTypeTitle
    }
  },
  {
    persist: true
  }
)
