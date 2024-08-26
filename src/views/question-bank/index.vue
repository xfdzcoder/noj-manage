<template>
  <div>
    <BasicManageView :base-uri="baseUri">
      <template #table="{data, save, edit, del}">
        <!-- 数据表格 -->
        <el-table :data="data" style="width: 100%">
          <el-table-column prop="communityId" label="题圈 ID" width="120"></el-table-column>
          <el-table-column prop="identifier" label="唯一编号" width="150"></el-table-column>
          <el-table-column prop="name" label="名称" width="120"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="questionCount" label="题目数量" width="120"></el-table-column>
          <el-table-column prop="goodCount" label="好评数量" width="120"></el-table-column>
          <el-table-column prop="commentCount" label="评论数量" width="120"></el-table-column>
          <el-table-column prop="studyCount" label="学习过人数" width="120"></el-table-column>
          <el-table-column label="操作" width="180">
            <template #header>
              <el-button @click="save()" type="primary" size="large">新增</el-button>
            </template>
            <template #default="scope">
              <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-popconfirm title="确定删除吗？" @confirm="del(scope.row)">
                <template #reference>
                  <el-button text type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #dialog-form="{form}">
        <el-form :model="form" label-width="120px">
          <el-form-item label="唯一编号">
            <el-input v-model="form.identifier"></el-input>
          </el-form-item>
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
      <template #dialog-footer="{submit, cancel}">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submit()">保存</el-button>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { baseUri } from '@/api/question/bank.js'

defineOptions({
  name: 'QuestionBank'
})
</script>

<style scoped>

</style>
