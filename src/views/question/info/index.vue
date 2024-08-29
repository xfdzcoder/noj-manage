<template>
  <div>
    <BasicManageView :base-uri="baseUri"
                     :before-save="beforeSave"
                     :before-edit="beforeEdit"
                     :after-list="afterList"
    >
      <template #table="{data, save, edit, del}">
        <!-- Question Info Table -->
        <el-table :data="data" stripe style="width: 100%">
          <el-table-column prop="questionType" label="题目类型 ID">
            <template #default="scope">
              {{ viewData.questionType(scope.row.questionType) }}
            </template>
          </el-table-column>
          <el-table-column prop="groupName" label="分组名称" />
          <el-table-column prop="title" label="一句话名称" />
          <el-table-column prop="description" label="题目描述" />
          <el-table-column prop="tags" label="题目标签">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.tags" type="info" style="margin-right: 5px">{{ tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度">
            <template #default="scope">
              <el-tag :type="viewData.difficultyType(scope.row.difficulty)">
                {{ viewData.difficulty(scope.row.difficulty) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="passCount" label="通过次数" />
          <el-table-column prop="submitCount" label="提交次数" />
          <el-table-column prop="commentCount" label="评论数量" />
          <el-table-column prop="sort" label="排序" />
          <el-table-column prop="timeout" label="时间限制 (毫秒)" />
          <el-table-column prop="memory" label="内存限制 (byte)" />
          <BasicOperateColumn
            :save="save"
            :edit="edit"
            :del="del"
          />
        </el-table>
      </template>

      <template #dialog-form="{form}">
        <!-- Question Info Form -->
        <el-form :model="form" label-width="120px">
          <el-form-item label="题目类型 ID">
            <template #default>
              <el-select v-model="form.questionType">
                <el-option :value="0" :label="'选择题'" />
                <el-option :value="1" :label="'多选题'" />
                <el-option :value="2" :label="'填空题'" />
                <el-option :value="3" :label="'主观题'" />
                <el-option :value="-1" :label="'未知'" />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="分组名称">
            <el-input v-model="form.groupName" />
          </el-form-item>
          <el-form-item label="一句话名称">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="题目描述">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item label="题目标签">
            <el-select
              v-model="form.tags"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="Choose tags for your article"
              style="width: 240px"
            >
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-select v-model="form.difficulty">
              <el-option :value="0" :label="'简单'" />
              <el-option :value="1" :label="'中等'" />
              <el-option :value="2" :label="'困难'" />
              <el-option :value="-1" :label="'未知'" />
            </el-select>
          </el-form-item>
          <el-form-item label="通过次数">
            <el-input-number v-model="form.passCount" />
          </el-form-item>
          <el-form-item label="提交次数">
            <el-input-number v-model="form.submitCount" />
          </el-form-item>
          <el-form-item label="评论数量">
            <el-input-number v-model="form.commentCount" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" />
          </el-form-item>
          <el-form-item label="时间限制 (毫秒)">
            <el-input-number v-model="form.timeout" />
          </el-form-item>
          <el-form-item label="内存限制 (byte)">
            <el-input-number v-model="form.memory" />
          </el-form-item>
        </el-form>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { baseUri } from '@/api/question/info.js'

defineOptions({
  name: 'QuestionInfo'
})
definePage({
  meta: {
    title: '题目管理',
    name: 'QuestionInfo'
  }
})


const viewData = ref({
  questionType: (questionType) => {
    switch (questionType) {
      case 0: return '单选题'
      case 1: return '多选题'
      case 2: return '填空题'
      case 3: return '主观题'
      default: return '未知'
    }
  },
  difficultyType: (difficulty) => {
    switch (difficulty) {
      case 0: return 'success'
      case 1: return 'primary'
      case 2: return 'danger'
      default: return 'info'
    }
  },
  difficulty: (difficulty) => {
    switch (difficulty) {
      case 0: return '简单'
      case 1: return '中等'
      case 2: return '困难'
      default: return '未知'
    }
  }
})

const afterList = (respPage) => {
  respPage.records = respPage.records.map(info => {
    info.tags = info.tags.split(',')
    return info
  })
  return respPage
}
const beforeSave = (item) => {
  item.tags = item.tags.join(',')
  return true
}
const beforeEdit = (item) => {
  item.tags = item.tags.join(',')
  return true
}
</script>

<style scoped>

</style>
