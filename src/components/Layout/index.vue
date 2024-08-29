<template>
  <el-container class="page">
    <el-header class="header">
      <div class="title">
        <h1>NOJ——AI智能刷题社群群主管理平台&ensp;|&ensp;</h1>
        <h2>{{ $route.meta.title }}</h2>
      </div>
    </el-header>
    <el-container>
      <el-aside width="12vw" class="aside">
        <AsideMenu />
      </el-aside>
      <el-main class="main">
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

.header {
  background-color: #3c3f41;
  color: #FFFFFF;
}

.title {
  /* global 94%+ browsers support */
  height: 100%;
  width: 600px;
  display: flex;
  align-items: center;
  background: radial-gradient(circle, #18759b 0%,#3C3F41 100%);
}

.aside{
  background-color: #2b2d30;
  min-width: 150px;
}

.main {
  background-color: #1e1f22;
}
</style>
