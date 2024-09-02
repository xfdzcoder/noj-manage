<template>
  <div>
    <BasicManageView :base-uri="baseUri"
                     :before-show="beforeShow"
                     :before-save="beforeSave"
                     :init-condition="{questionInfoId: currentInfo?.id}"
    >
      <template #table="{data, save, edit, del}">
        <el-table :data="data">
          <el-table-column prop="optionIdentifier" label="序号">
            <template #default="scope">
              {{ resolveOptionIdentifier(scope.row.optionIdentifier) }}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" />
          <el-table-column property="correct" label="是否是正确答案">
            <template #default="scope">
              <el-tag v-if="scope.row.correct"
                      type="success"
              >
                正确答案
              </el-tag>
              <el-tag v-else
                      type="danger"
              >
                错误答案
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" />
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
          <el-form-item label="序号">
            <el-input-number v-model="form.optionIdentifier" :min="1" :max="26"/>
            <span style="color: white;margin-left: 10px">
              {{ resolveOptionIdentifier(form.optionIdentifier) }}
            </span>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.content" />
          </el-form-item>
          <el-form-item label="是否正确">
            <el-switch v-model="form.correct" />
          </el-form-item>
        </el-form>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { definePage } from 'unplugin-vue-router/runtime'
import { baseUri } from '@/api/question/answer.js'
import { useQuestionBankStore } from '@/store/question.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { FormType } from '@/components/BasicManageView/utils/util.js'

defineOptions({
  name: 'Answer'
})
definePage({
  meta: {
    title: '答案管理',
    name: 'Answer',
    sort: 4,
    // visible: false
  }
})

const router = useRouter()
const { currentInfo } = storeToRefs(useQuestionBankStore())


const resolveOptionIdentifier = (option) => {
  if (!option) {
    return ''
  }
  switch (currentInfo.value.questionType) {
    case 0:
      return String.fromCharCode(64 + option)
    case 1:
      return String.fromCharCode(64 + option)
    case 2:
      return `(${option + 1})`
    case 3:
      return `(${option + 1})`
    default:
      return '未知'
  }
}


const beforeSave = (item) => {
  item.questionInfoId = currentInfo.value.id
  item.correct = Boolean(item.correct)
  return true
}
const beforeShow = (mode, item) => {
  if (mode === FormType.EDIT) {
    delete item.questionInfoId
  }
  return true
}

onMounted(_ => {
  if (!currentInfo.value) {
    ElMessage.warning('请先选择题目')
    router.replace({ name: 'QuestionInfo' })
  }
})
</script>

<style scoped>

</style>
