<template>
  <el-table-column label="操作" width="180">
    <template #header>
      <el-button @click="props.save()" text style="color: #57965c">
        <svg t="1724755666773" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="10791" width="24" height="24">
          <path
            d="M725.333333 682.666667v-85.333334h42.666667v85.333334h85.333333v42.666666h-85.333333v85.333334h-42.666667v-85.333334h-85.333333v-42.666666h85.333333zM170.666667 256h682.666666v42.666667H170.666667V256z m0 426.666667h426.666666v42.666666H170.666667v-42.666666z m0-213.333334h682.666666v42.666667H170.666667v-42.666667z"
            fill="#57965c" p-id="10792"></path>
        </svg>
        新增
      </el-button>
    </template>
    <template #default="scope">
      <el-button @click="props.edit(scope.row)" text circle>
        <svg t="1724755516117" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="8439" id="mx_n_1724755516118" width="16" height="16">
          <path
            d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
            p-id="8440" fill="#548af7"></path>
        </svg>
      </el-button>
      <el-popconfirm title="确定删除吗？" @confirm="props.del(scope.row)">
        <template #reference>
          <el-button text circle>
            <svg t="1724755601016" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="9556" width="16" height="16">
              <path
                d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
                fill="#c94f4f" p-id="9557"></path>
              <path
                d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
                fill="#c94f4f" p-id="9558"></path>
              <path
                d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
                fill="#c94f4f" p-id="9559"></path>
              <path
                d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
                fill="#c94f4f" p-id="9560"></path>
            </svg>
          </el-button>
        </template>
      </el-popconfirm>
    </template>
  </el-table-column>
</template>

<script setup>
defineOptions({
  name: 'BasicOperateColumn'
})

const props = defineProps({
  save: {
    type: Function,
    required: true
  },
  edit: {
    type: Function,
    required: true
  },
  del: {
    type: Function,
    required: true
  }
})

</script>

<style scoped>

</style>
