import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import { useUserInfoStore } from '@/store/userInfo.js'
import { ElMessage } from 'element-plus'
import { routes } from 'vue-router/auto-routes'

console.dir(routes)
const flatRoute = []

const processRoute = (route) => {
  if (route.component) {
    console.log(route)
    route.path = route.name
    // console.log(route.component())
    route.name = route.meta.name
    delete route.meta.name
    return route
  }
  if (route.children.length === 1) {
    return processRoute(route.children[0])
  }
  const children = route.children;
  for (let i = 0; i < children.length; i++) {
    children[i] = processRoute(children[i])
  }
  return route
}
for (const route of routes) {
  flatRoute.push(processRoute(route))
}
console.log(flatRoute)

const total = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/portal/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/question/info',
    children: flatRoute
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: total,
})

const whiteList = [
  '/login',
  '/register'
]
router.beforeEach((to, from) => {
  if (to.meta?.title) {
    document.title = `NOJ | ${to.meta.title}`
  }
  const { isLogin } = useUserInfoStore()
  if (isLogin()) {
    return
  }
  // 没有登录
  if (whiteList.includes(to.path)) {
    return
  }
  // 需要重定向到登录页面
  ElMessage.warning('登录失效，请重新登录')
  return { path: '/login' }
})

export default router

/*
,
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        name: 'Dashboard',
        path: 'index',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/bank/index',
    children: [
      {
        name: 'QuestionBank',
        path: 'bank/index',
        component: () => import('@/views/question/bank/index.vue'),
        meta: {
          title: '题库管理'
        }
      }
    ]
  }
 */
