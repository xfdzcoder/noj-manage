<template>
  <el-container class="page">
    <el-header>

    </el-header>
    <el-container>
      <el-aside width="12vw" class="aside">
        <AsideMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AsideMenu from '@/components/Layout/components/AsideMenu.vue'

defineOptions({
  name: 'Layout'
})
</script>

<style scoped>
.page {
  height: 100vh;
  width: 100vw;
}
.aside{
  background-color: #1e1f22;
  min-width: 150px;
}
</style>
