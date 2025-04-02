/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

export const constantRoutes = [
//重定向--一般设置为首页
  {
    path: '',
    hidden: true,
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/pages/register.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/pages/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/pages/error/401.vue'),
    hidden: true
  },
  {
    path: '/backend',
    component: Layout,
    redirect: '/backend',
    children: [
      {
        path: '/backend',
        name: 'Backend',
        component: () => import('@/pages/backend/index.vue'),
        meta: {title: '首页', icon: 'mdi-home', affix: true}
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    hidden: true,
    component: () => import('@/pages/home/index.vue')
  }
]

export const dynamicRoutes = [
  {
    path: '/sys/user-auth',
    component: Layout,
    hidden: true,
    // permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/pages/backend/sys/user/authRole.vue'),
        name: 'AuthRole',
        meta: {title: '分配角色', activeMenu: '/sys/user'}
      }
    ]
  },
  {
    path: '/sys/role-auth',
    component: Layout,
    hidden: true,
    // permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/pages/backend/sys/role/authUser.vue'),
        name: 'AuthUser',
        meta: {title: '分配用户', activeMenu: '/sys/role'}
      }
    ]
  },
  {
    path: '/sys/dict-data',
    component: Layout,
    hidden: true,
    // permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/pages/backend/sys/dict/data.vue'),
        name: 'Data',
        meta: {title: '字典数据', activeMenu: '/sys/dict'}
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
