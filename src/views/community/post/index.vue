<template>
  <div>
    <BasicManageView :base-uri="baseUri"
                     :before-show="beforeShow"
                     :before-save="beforeSave"
                     :before-edit="beforeEdit"
                     :after-list="afterList"
                     :dialog-width="1000"
                     fullscreen
    >
      <template #table="{data, save, edit, del}">
        <el-table :data="data">
          <el-table-column prop="author" label="作者" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="summary" label="摘要" />
          <el-table-column prop="tags" label="标签">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.tags"
                      type="info"
                      style="margin-right: 5px"
              >
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型">
            <template #default="scope">
              <el-tag :type="'info'">
                {{ viewData.type(scope.row.type) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="goodCount" label="好评量" />
          <el-table-column prop="commentCount" label="评论量" />
          <el-table-column prop="topped" label="是否置顶">
            <template #default="scope">
              <el-tag v-if="scope.row.topped" type="primary">
                置顶
              </el-tag>
              <el-tag v-else type="info">
                -
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              {{ viewData.status(scope.row.status) }}
            </template>
          </el-table-column>
          <BasicOperateColumn
            :del="del"
            :width="180"
          >
            <template #before-default="{scope}">
              <el-button text
                         :color="'#1e1f22'"
                         :icon="Tickets"
                         @click="edit(scope.row)"
              >
                详情
              </el-button>
            </template>
          </BasicOperateColumn>
        </el-table>
      </template>
      <template #dialog-form="{form}">
        <el-descriptions title="帖子详情"
                         :column="2"
                         border
        >
          <el-descriptions-item label="作者">{{ form.author }}</el-descriptions-item>
          <el-descriptions-item label="标题">{{ form.title }}</el-descriptions-item>
          <el-descriptions-item
            label-class-name="post-description-content"
            label="内容"
            :span="3">

            <d-editor-md
              style="height: 100%"
              v-model="form.content"
              :mode="'readonly'"
              :md-rules="{
                linkify: {
                  fuzzyLink: false,
                },
              }"
              :toolbar-config="[]"
            ></d-editor-md>
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template #dialog-footer="{mode, submit, cancel}">
        <el-button v-if="mode === FormType.SAVE" type="primary" @click="submit()">OK</el-button>
        <el-button v-if="mode === FormType.SAVE" @click="cancel()">Cancel</el-button>
      </template>
    </BasicManageView>
  </div>
</template>

<script setup>
import { definePage } from 'unplugin-vue-router/runtime'
import { baseUri, getContentById } from '@/api/community/post-info.js'
import { useCommunityInfoStore } from '@/store/community.js'
import { storeToRefs } from 'pinia'
import { FormType } from '@/components/BasicManageView/utils/util.js'
import { Tickets } from '@element-plus/icons-vue'

defineOptions({
  name: 'CommunityPost'
})
definePage({
  meta: {
    title: '帖子管理',
    name: 'CommunityPost',
    sort: 2
  }
})

const store = useCommunityInfoStore()
const { currentCommunity } = storeToRefs(store)

const viewData = {
  type: (type) => {
    switch (type) {
      case 0:
        return '普通帖子'
      case 1:
        return '错题反馈'
      case 2:
        return '新题建议'
      default:
        return '-'
    }
  },
  status: (status) => {
    switch (status) {
      case 0:
        return '草稿'
      case 1:
        return '已发布'
      case 2:
        return '已封禁'
      default:
        return '-'
    }
  }
}

const afterList = (respPage) => {
  respPage.records = respPage.records.map(info => {
    info.tags = info.tags.split(',')
    return info
  })
  return respPage
}
const beforeShow = (mode, item) => {
  if (mode === FormType.EDIT) {
    if (item.content) {
      return true
    }
    getContentById(item.id)
      .then(res => {
        item.content = res.data
      })
  }
  return true
}
const beforeSave = (item) => {
  item.communityInfoId = currentCommunity.value.id
  item.tags = item.tags.join(',')
  return true
}
const beforeEdit = (item) => {
  item.tags = item.tags.join(',')
  return true
}

</script>

<style scoped>
:deep(.post-description-content) {
  width: 100px;
  height: 100%;
}

:deep(.dp-md-container.dp-md-readonly .dp-md-toolbar-container) {
  display: none;
}

:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container::-webkit-scrollbar) {
  width: 16px;
  height: 16px;
  background-color: var(--noj-dialog-bg-color);
}

:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container::-webkit-scrollbar-track) {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container::-webkit-scrollbar-thumb) {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color:#555;
}
:deep(.el-descriptions__body .el-descriptions__table) {
  height: 85vh;
}
:deep(.dp-md-container .dp-md-content-container) {
  height: 100%;
}

/*
{

}
 */
</style>
