import { createRouter, createWebHistory } from 'vue-router'
import { guard } from './guard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/goods',
          name: 'goods',
          meta: {
            isMenu: true,
            title: '商品列表'
          },
          component: () => import('../views/GoodsView.vue')
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            isMenu: true,
            title: '用户列表'
          },
          component: () => import('../views/UserView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dirll',
      name: 'dirll',
      component: () => import('../views/dirll/TestIndex.vue')
    },
    ...routes
  ]
})

guard(router)

export default router
