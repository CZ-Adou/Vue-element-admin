import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const whiteList = ['/login', '/404']// 白名单
// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      console.log(111)
      if (!store.getters.name) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
// 全局后置路由守卫
router.afterEach((to, from) => {
  NProgress.done()
})
