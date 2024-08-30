<template>
  <div>
    <BasicManageView :base-uri="baseUri"
                     :before-show="beforeShow"
                     :init-condition="{questionInfoId: currentInfo?.id}"
    >
      <template #header="{list}">
        <div class="info-title">
          题目：{{ currentInfo?.title }}
          <hr>
        </div>
      </template>
      <template #table="{data, save, edit, del}">
        <el-table :data="data" stripe>
          <el-table-column prop="sort" width="50" label="排序" />
          <el-table-column prop="input" label="输入" />
          <el-table-column prop="output" label="期望输入" />
          <BasicOperateColumn
            :save="save"
            :edit="edit"
            :del="del"
            :width="250"
          />
        </el-table>
      </template>
      <template #dialog-form="{form}">
        <el-form :model="form">
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" />
          </el-form-item>
          <el-form-item label="输入参数" />
          <d-code-editor v-model="form.input"
                         :options="{
                            language: 'json'
                         }"
                         theme="dark"
                         style="height: 250px"
          />
          <el-form-item label="期望输出" />
          <d-code-editor v-model="form.output"
                         :options="{
            language: 'json'
                         }"
                         theme="dark"
                         style="height: 250px;margin-bottom: 20px"
          />
        </el-form>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { baseUri } from '@/api/question/case.js'
import { FormType } from '@/components/BasicManageView/utils/util.js'
import { useQuestionBankStore } from '@/store/question.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'TestCase'
})
definePage({
  meta: {
    title: '测试用例',
    name: 'TestCase',
    sort: 3,
    // visible: false
  }
})
const router = useRouter()

const store = useQuestionBankStore()
const { isCodeQuestion } = store
const { currentInfo } = storeToRefs(store)

const beforeShow = async (mode, item) => {
  if (mode === FormType.SAVE) {
    item = {
      questionInfoId: currentInfo.value.id
    }
  } else if (mode === FormType.EDIT) {
    delete item.questionInfoId
  }
  return item
}

onMounted(_ => {
  if (!currentInfo.value) {
    ElMessage.warning('请先选择题目')
    router.replace({ name: 'QuestionInfo' })
  }
  if (!isCodeQuestion(currentInfo.value.questionType)) {
    ElMessage.warning('该题不是编程题')
    router.replace({ name: 'Answer' })
  }
})
</script>

<style scoped>
.info-title {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-family: "Microsoft YaHei UI", serif;
  font-weight: bold;
}
</style>
