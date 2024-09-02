<template>
  <el-container class="page">
    <el-header class="header">
      <div class="title">
        <h1>NOJ——AI智能刷题社群群主管理平台&ensp;|&ensp;</h1>
        <h3>{{ $route.meta.title }}</h3>
      </div>
      <div class="top-menus">
        <el-menu mode="horizontal"
                 unique-opened
                 close-on-click-outside
                 :menu-trigger="'click'"
                 @open="onMenuOpen"
        >
          <el-sub-menu index="user-menu">
            <template #title>{{ user.nickname }}</template>
            <el-menu-item index="user-menu-1"
            >
              个人中心
            </el-menu-item>
            <el-menu-item index="user-menu-2"
                          @click="doLogout()"
            >
              退出登录
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="user-community">
            <template #title> {{ currentCommunity?.name }} </template>
            <el-menu-item v-for="(community, index) in communityList"
                          :index="`user-community-${index}`"
                          @click="changeCommunity(community.id)"
                          >
              {{ community.name }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
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
import { useUserInfoStore } from '@/store/userInfo.js'
import { storeToRefs } from 'pinia'
import { useCommunityInfoStore } from '@/store/community.js'

defineOptions({
  name: 'Layout'
})

const userInfoStore = useUserInfoStore()
const { doLogout } = userInfoStore
const { user } = storeToRefs(userInfoStore)

const communityInfoStore = useCommunityInfoStore()
const { changeCommunity, refresh } = communityInfoStore
const { currentCommunity, communityList } = storeToRefs(communityInfoStore)

const onMenuOpen = (index, indexPath) => {
  console.log(index, indexPath)
  if (index === 'user-community') {
    refresh()
  }
}

</script>

<style scoped>
.page {
  height: 100vh;
  width: 100vw;
}

.header {
  background-color: #3c3f41;
  color: #FFFFFF;
  display: flex;
  flex-wrap: nowrap;
  padding: 0 0 0 20px;
  justify-content: space-between;
}

.title {
  /* global 94%+ browsers support */
  height: 100%;
  width: 600px;
  display: flex;
  align-items: center;
  background: radial-gradient(circle, #18759b 0%, #3C3F41 100%);
}

.title h3 {
  margin: 0 0 15px 0;
  align-self: flex-end;
}

.aside {
  background-color: #2b2d30;
  min-width: 150px;
}

.main {
  background-color: #1e1f22;
}

.top-menus {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #FFFFFF;
  --el-menu-active-color: #FFFFFF;
  --el-menu-hover-bg-color: none;
  --el-menu-border-color: transparent;
  border: none;
  width: 300px;
}
.top-menus .el-menu {
  flex-direction: row-reverse;
}
</style>
