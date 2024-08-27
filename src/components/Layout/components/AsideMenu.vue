<template>
  <el-menu
    default-active="/dashboard/index"
    class="menu"
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
.menu {
  --el-menu-bg-color: #2b2d30;
  --el-menu-text-color: #FFFFFF;
  --el-menu-active-color: #FFFFFF;
  --el-menu-hover-bg-color: none;
  border: none;
}
.menu .el-menu-item.is-active {
  background-color: #1e1f22!important;
}
</style>
