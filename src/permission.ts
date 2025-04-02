import router from './router'
import {getToken} from '@/utils/auth'
import {isHttp} from '@/utils/validate'
import authStore from '@/store/modules/auth'
import settingsStore from '@/store/modules/settings'
import {pathIndexOf} from "@/utils/wrblog";
import permissionStore from "@/store/modules/permission";

const whiteList = ['/login', '/register'];

router.beforeEach((to: any, from: any, next: any) => {
  const auth = authStore()
  const settings = settingsStore()
  if (getToken()) {
    to.meta.title && settings.setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({path: '/home'})
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (auth.userId.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        auth.getInfo().then(() => {
          permissionStore().generateRoutes().then((accessRoutes: any) => {
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach((route: any) => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            next({...to, replace: true}) // hack方法 确保addRoutes已完成
          })
        }).catch((err: any) => {
          auth.logout().then(() => {
            if (pathIndexOf(to.path)) {
              next()
            } else {
              next({path: '/home'})
            }
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1 || pathIndexOf(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      if (to.redirectedFrom){
        next(`/login?redirect=${to.redirectedFrom.fullPath}`) // 否则全部重定向到登录页
      }else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      }
    }
  }
})

router.afterEach(() => {
})
