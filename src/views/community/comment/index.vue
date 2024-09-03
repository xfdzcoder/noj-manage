<template>
  <div>
    <BasicManageView
      :base-uri="baseUri"
      :init-condition="{
        rootId: currentRootComment?.id,
        postInfoId: currentPost.id
      }"
    >
      <template #header="{list}">
        <div class="header" @click="showRoot()">
          <el-icon><ArrowLeft /></el-icon>
          <div v-if="currentRootComment" style="color: #FFFFFF">
            {{ currentRootComment.content }}
          </div>
          <div v-else>
            {{ currentPost.title }}
          </div>
        </div>
      </template>
      <template #table="{data, save, edit, del}">
        <el-table :data="data">
          <el-table-column prop="author" label="评论者" />
          <el-table-column prop="content" label="内容" />
          <el-table-column prop="goodCount" label="点赞量" />
          <el-table-column prop="commentCount" label="子评论量" />
          <BasicOperateColumn
            :del="del"
          >
            <template #before-default="{scope}">
              <el-button text
                         @click="showChild(scope.row)"
              >
                查看子评论
              </el-button>
            </template>
          </BasicOperateColumn>
        </el-table>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { baseUri } from '@/api/community/post-comment.js'
import { usePostInfoStore } from '@/store/post.js'
import { emitter, EventType } from '@/utils/eventBus.js'
import { ArrowLeft } from '@element-plus/icons-vue'

defineOptions({
  name: 'CommunityPostComment'
})
definePage({
  meta: {
    title: '评论管理',
    name: 'CommunityPostComment',
    sort: 3
  }
})

const router = useRouter()
const store = usePostInfoStore()
const { changeRootComment } = store
const { currentPost, currentRootComment } = storeToRefs(store)

const showChild = (comment) => {
  changeRootComment(comment)
  nextTick(() => {
    emitter.emit(EventType.REFRESH_TABLE)
  })
}
const showRoot = () => {
  if (currentRootComment.value) {
    showChild(null)
  } else {
    router.push({
      name: 'CommunityPost'
    })
  }
}



onMounted(_ => {
  if (!currentPost.value) {
    ElMessage.warning('请先选择帖子')
    router.replace({ name: 'CommunityPost' })
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 10px;
}
.header div {
  margin-left: 10px;
}
</style>
