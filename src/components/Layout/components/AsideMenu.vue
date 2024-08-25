<template>
  <el-menu
    default-active="/dashboard/index"
    router
  >
    <el-menu-item index="/dashboard/index">
      <el-icon></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/question/bank/index">
      <el-icon></el-icon>
      <template #title>题库管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
defineOptions({
  name: 'AsideMenu'
})
</script>

<style scoped>

</style>
