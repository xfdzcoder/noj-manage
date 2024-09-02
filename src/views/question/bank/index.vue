<template>
  <div>
    <BasicManageView :base-uri="baseUri" refresh-on-community-change>
      <template #table="{data, save, edit, del}">
        <!-- 数据表格 -->
        <el-table :data="data" style="width: 100%">
          <el-table-column prop="identifier" label="唯一编号1" width="150"></el-table-column>
          <el-table-column prop="name" label="名称" width="120"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="questionCount" label="题目数量" width="120"></el-table-column>
          <el-table-column prop="goodCount" label="好评数量" width="120"></el-table-column>
          <el-table-column prop="commentCount" label="评论数量" width="120"></el-table-column>
          <el-table-column prop="studyCount" label="学习过人数" width="120"></el-table-column>
          <BasicOperateColumn
            :save="save"
            :edit="edit"
            :del="del"
            :width="'220'"
          >
            <template #before-default="{ scope }">
              <el-button class="show-question-btn"
                         text
                         :icon="Tickets"
                         @click="toQuestionInfoView(scope)"
              >
                查看题目
              </el-button>
            </template>
          </BasicOperateColumn>
        </el-table>
      </template>
      <template #dialog-form="{form}">
        <el-form :model="form" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="题目数量">
            <el-input-number v-model="form.questionCount" :min="0" style="width: 100%;"></el-input-number>
          </el-form-item>
          <el-form-item label="好评数量">
            <el-input-number v-model="form.goodCount" :min="0" style="width: 100%;"></el-input-number>
          </el-form-item>
          <el-form-item label="评论数量">
            <el-input-number v-model="form.commentCount" :min="0" style="width: 100%;"></el-input-number>
          </el-form-item>
          <el-form-item label="学习过人数">
            <el-input-number v-model="form.studyCount" :min="0" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-form>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { baseUri } from '@/api/question/bank.js'
import { useRouter } from 'vue-router'
import { useQuestionBankStore } from '@/store/question.js'
import { Tickets } from '@element-plus/icons-vue'

defineOptions({
  name: 'QuestionBank'
})
definePage({
  meta: {
    title: '题库管理',
    name: 'QuestionBank',
    sort: 1
  },
})

const router = useRouter()
const { changeBank } = useQuestionBankStore()

const toQuestionInfoView = (scope) => {
  changeBank(scope.row)
  router.push({
    name: 'QuestionInfo'
  })
}

</script>

<style scoped>
.show-question-btn {
  color: #FFFFFF;
}
</style>
