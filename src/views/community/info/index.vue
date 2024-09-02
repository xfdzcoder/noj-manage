<template>
  <div>
    <BasicManageView :base-uri="baseUri"
    >
      <template #table="{data, save, edit, del}">
        <el-table :data="data">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="description" label="简介" />
          <el-table-column prop="starCount" label="关注人数" />
          <el-table-column prop="postCount" label="帖子数量" />
          <BasicOperateColumn
            :save="save"
            :edit="edit"
            :del="del"
            :width="200"
          />
        </el-table>
      </template>
      <template #dialog-form="{form}">
        <el-form :model="form">
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.description" />
          </el-form-item>
          <!-- TODO 2024/9/2 14:39 on dev-xfdzcoder: 删除下面两个属性，管理员不应该能够修改这些参数 -->
          <el-form-item label="关注人数">
            <el-input-number v-model="form.starCount" />
          </el-form-item>
          <el-form-item label="帖子数量">
            <el-input-number v-model="form.postCount" />
          </el-form-item>
        </el-form>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>

import { baseUri } from '@/api/community/info.js'

defineOptions({
  name: 'CommunityInfo'
})

definePage({
  meta: {
    title: '社群管理',
    name: 'CommunityInfo',
    sort: 1
  }
})


</script>

<style scoped>

</style>
