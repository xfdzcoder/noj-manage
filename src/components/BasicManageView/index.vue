<template>
  <div class="page">
    <slot name="header"
          :list="header.list"
    />

    <slot name="table"
          :data="table.data"
          :del="del"
          :edit="table.showEdit"
          :save="table.showSave"
    />

    <slot name="page">
      <!-- TODO 2024/8/25 22:36 on dev-xfdzcoder: hide-on-single-page 改成 false，设为 true 便于测试  -->
      <el-pagination
        :layout="props.pageLayout"
        :page-sizes="props.pageSizes"
        :page-size="page.size"
        :default-page-size="props.pageSizes[0]"
        :total="page.total"
        :pager-count="5"
        :current-page="page.current"
        :popper-class="props.pagePopperClass"
        :disabled="props.pageDisabled"
        :hide-on-single-page="true"
        @size-change="page.sizeChange"
        @current-change="page.currentChange"
      />
    </slot>

    <el-dialog
      v-model="dialog.visible"
      :before-close="dialog.handleClose"
      :class="props.dialogClass"
      :title="dialog.title"
      :width="props.dialogWidth"
    >
      <slot name="dialog-form"
            :form="dialog.form"

      >
      </slot>
      <div class="dialog-footer">
        <slot name="dialog-footer"
              :submit="dialog.submit"
              :cancel="dialog.cancel"
        >
          <el-button type="primary" @click="dialog.submit()">OK</el-button>
          <el-button @click="dialog.cancel()">Cancel</el-button>
        </slot>
      </div>

    </el-dialog>
  </div>
</template>

<script setup>
import { delById, edit, list, save } from '@/components/BasicManageView/utils/api.js'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'BasicManageView'
})
const props = defineProps({
  dialogWidth: {
    type: Number,
    default: 800
  },
  saveTitle: {
    type: String,
    default: '保存数据'
  },
  editTitle: {
    type: String,
    default: '修改数据'
  },
  baseUri: {
    type: String,
    required: true
  },
  save: Function,
  edit: Function,
  list: Function,
  del: Function,
  beforeSave: Function,
  beforeEdit: Function,
  beforeDel: Function,
  beforeClose: Function,
  beforeShow: Function,
  afterSave: Function,
  afterEdit: Function,
  afterDel: Function,
  afterClose: Function,
  afterShow: Function,
  dialogClass: String,
  pageLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array,
    default(rawProps) {
      return [ 10, 20, 30, 40, 50 ]
    }
  },
  pagePopperClass: String,
  pageDisabled: Boolean,
  initCondition: Object,
  condition: Object
})

const FormType = {
  SAVE: 'SAVE',
  EDIT: 'EDIT'
}

const header = ref({
  condition: null,
  list: (condition) => {
    header.value.condition = condition
    condition.current = page.value.current
    condition.size = page.value.size
    return doList(condition)
  }
})
const table = ref({
  dataList: [],
  showSave: () => {
    dialog.value.show(FormType.SAVE, null)
  },
  showEdit: (item) => {
    dialog.value.show(FormType.EDIT, item)
  }
})
const dialog = ref({
  mode: '',
  title: '',
  visible: false,
  form: {},
  show: (mode, item) => {
    if (props.beforeShow) {
      if (!props.beforeShow(mode, item)) {
        return
      }
    }
    dialog.value.mode = mode
    if (mode === FormType.SAVE) {
      dialog.value.title = props.saveTitle
    } else if (mode === FormType.EDIT) {
      dialog.value.form = item
      dialog.value.title = props.editTitle
    }
    dialog.value.visible = true
    if (props.afterShow) {
      props.afterShow(mode, item)
    }
  },
  handleClose: () => {
    if (props.beforeClose) {
      if (!props.beforeClose()) {
        return
      }
    }
    dialog.value.form = {}
    dialog.value.title = ''
    dialog.value.mode = ''
    dialog.value.visible = false
    if (props.afterClose) {
      props.afterClose()
    }
  },
  submit: () => {
    if (dialog.value.mode === FormType.SAVE) {
      if (props.beforeSave) {
        if (!props.beforeSave(dialog.value.form)) {
          return
        }
      }
      doSave()
        .then(res => {
          init()
          dialog.value.handleClose()
          ElMessage.success('添加成功')
          if (props.afterSave) {
            props.afterSave()
          }
        })
    } else if (dialog.value.mode === FormType.EDIT) {
      if (props.beforeEdit) {
        if (!props.beforeEdit(dialog.value.form)) {
          return
        }
      }
      doEdit()
        .then(res => {
          init()
          dialog.value.handleClose()
          ElMessage.success('修改成功')
          if (props.afterEdit) {
            props.afterEdit()
          }
        })
    }
  },
  cancel: () => {
    dialog.value.handleClose()
  }
})
const page = ref({
  total: 0,
  current: 1,
  size: props.pageSizes[0],
  condition: null,
  sizeChange: (newPageSize) => {
    const condition = {
      ...header.value.condition,
      current: page.value.current,
      size: newPageSize
    }
    doList(condition)
  },
  currentChange: (newCurrentPage) => {
    const condition = {
      ...header.value.condition,
      current: newCurrentPage,
      size: page.value.size
    }
    doList(condition)
  }
})

const doSave = () => {
  if (props.save) {
    return props.save(dialog.value.form)
  } else {
    return save(props.baseUri, dialog.value.form)
  }
}
const doEdit = () => {
  if (props.edit) {
    return props.edit(dialog.value.form)
  } else {
    return edit(props.baseUri, dialog.value.form)
  }
}
const doList = (condition) => {
  if (props.list) {
    return props.list(condition)
  } else {
    return list(props.baseUri, condition)
  }
}
const doDel = (item) => {
  if (props.del) {
    return props.del(item.id)
  } else {
    return delById(props.baseUri, item.id)
  }
}

const del = (item) => {
  if (props.beforeDel) {
    if (!props.beforeDel(item)) {
      return
    }
  }
  console.log('del: ', item)
  doDel(item)
    .then(res => {
      init()
      ElMessage.success('删除成功')
      if (props.afterDel) {
        props.afterDel()
      }
    })
}

const init = () => {
  const condition = {
    current: 1,
    size: props.pageSizes[0],
    ...props.initCondition
  }
  doList(condition)
    .then(res => {
      const resPage = res.data
      table.value.data = resPage.records
      page.value.total = resPage.total
    })
}

onMounted(() => {
  init()
})


defineExpose({
  table,
  dialog,
  init,
  del
})

</script>

<style scoped>
:deep(.el-dialog__title) {
  color: #ffffff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.dialog-footer .el-button {
  width: 80px;
  font-family: "Microsoft YaHei", serif;
}
:deep(.dialog-footer .el-button:first-child) {
  --el-button-bg-color: #3574f0;
  font-weight: bold;
}
:deep(.dialog-footer .el-button:last-child) {
  --el-button-bg-color: none;
  --el-button-border-color: var(--noj-border-color);
  --el-button-text-color: #ffffff;
}
</style>
