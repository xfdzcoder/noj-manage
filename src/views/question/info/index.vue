<template>
  <BasicManageView :base-uri="baseUri">
    <template #table="{data, save, edit, del}">
      <!-- Question Info Table -->
      <el-table :data="data" stripe style="width: 100%">
        <el-table-column prop="question_bank_id" label="所属题库 ID" width="180"/>
        <el-table-column prop="question_type_id" label="题目类型 ID" width="180"/>
        <el-table-column prop="group_name" label="分组名称" width="150"/>
        <el-table-column prop="title" label="一句话名称" width="150"/>
        <el-table-column prop="description" label="题目描述" width="300"/>
        <el-table-column prop="tags" label="题目标签" width="200"/>
        <el-table-column prop="difficulty" label="难度" width="100"/>
        <el-table-column prop="pass_count" label="通过次数" width="100"/>
        <el-table-column prop="submit_count" label="提交次数" width="100"/>
        <el-table-column prop="comment_count" label="评论数量" width="100"/>
        <el-table-column prop="sort" label="排序" width="100"/>
        <el-table-column prop="timeout" label="时间限制 (毫秒)" width="150"/>
        <el-table-column prop="memory" label="内存限制 (byte)" width="150"/>
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
        <el-form-item label="所属题库 ID">
          <el-input v-model="form.question_bank_id" />
        </el-form-item>
        <el-form-item label="题目类型 ID">
          <el-input v-model="form.question_type_id" />
        </el-form-item>
        <el-form-item label="分组名称">
          <el-input v-model="form.group_name" />
        </el-form-item>
        <el-form-item label="一句话名称">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="题目描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="题目标签">
          <el-input v-model="form.tags" />
        </el-form-item>
        <el-form-item label="难度">
          <el-input-number v-model="form.difficulty" :min="1" :max="5" />
        </el-form-item>
        <el-form-item label="通过次数">
          <el-input-number v-model="form.pass_count" />
        </el-form-item>
        <el-form-item label="提交次数">
          <el-input-number v-model="form.submit_count" />
        </el-form-item>
        <el-form-item label="评论数量">
          <el-input-number v-model="form.comment_count" />
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
  },
})
</script>

<style scoped>

</style>
