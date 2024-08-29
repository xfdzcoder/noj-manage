<template>
  <el-menu
    :default-active="$route.name"
    class="menu"
    router
  >
    <template v-for="(route, index) in flatRoute">
      <el-sub-menu v-if="route.children"
                   :index="route.name"
      >
        <template #title>
          <el-icon></el-icon>
          <span>{{ route.meta?.title ?? route.path }}</span>
        </template>
        <template #default>
          <template v-for="childRoute in route.children">
            <el-menu-item v-if="childRoute.meta.visible !== false"
                          :index="childRoute.name"
            >
              <el-icon></el-icon>
              <template #title>
                {{ childRoute.meta?.title ?? childRoute.name }}
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-sub-menu>
      <el-menu-item v-else
                    :index="route.name"
      >
        <el-icon></el-icon>
        <template #title>
          {{ route.meta?.title ?? route.name }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AsideMenu'
})

const router = useRouter()

const flatRoute = ref([])

onMounted(_ => {
  flatRoute.value = router.getRoutes().filter(r => r.path === '/').pop().children
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
  background-color: #1e1f22 !important;
}
</style>
