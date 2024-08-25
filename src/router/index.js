import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

const routes = [
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

router.beforeEach((to, from) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
