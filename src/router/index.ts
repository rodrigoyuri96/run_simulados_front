import Vue from 'vue'
import Router from 'vue-router'

import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'
import LandingRoutes from './landing.routes'
import RunPages from './run.pages'
import FirebaseService from "@/service/firebase.service";
import store from "@/store";
Vue.use(Router)

export const routes = [{
  path: '/',
  redirect: '/dashboard/analytics',
  meta: {
    public: false
  }
}, {
  path: '/dashboard/analytics',
  name: 'dashboard-analytics',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue'),
  meta: {
    public: false
  }
},
...RunPages,
...PagesRoutes,
...UsersRoutes,
...LandingRoutes,
{
  path: '*',
  name: 'error',
  component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  console.log(to)
  if(!to.meta.public){
    FirebaseService.getUser().then(isAuthenticated=>{
      if(isAuthenticated){
        store.commit('UserModule/setUser', JSON.parse(sessionStorage.getItem('user')))
        return next()
      }else{
        return next('/auth/signin')
      }
    }).catch(()=>{
      return next('/auth/signin')
    })
  } else{next()}

})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
