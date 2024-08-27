import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import { useUserInfoStore } from '@/store/userInfo.js'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
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
        component: () => import('@/views/question-bank/index.vue'),
        meta: {
          title: '题库管理'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const whiteList = [
  '/login',
  '/register'
]
router.beforeEach((to, from) => {
  if (to.meta?.title) {
    document.title = to.meta.title
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
