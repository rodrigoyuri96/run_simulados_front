import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'
import LandingRoutes from './landing.routes'
import PedagogueRoutes from './users/pedagogue.routes'
import AdminRoutes from './users/admin.routes'
import UserCommons from "@/commons/user.commons";
import {Profile} from "@/models/user/profile.enum";
import UserModel from "@/models/user/user.model";
import ClientRoutes from "./users/client.routes";
import FirebaseService from "@/service/firebase.service";


Vue.use(Router)

export const routes = [{
    path: '/',
    beforeEnter: (to, from, next) => {
      const user:UserModel = JSON.parse(sessionStorage.getItem('user'))
      console.log('user: ', store.state.UserModule._user)
      let adminRole = UserCommons.hasPermission(user, Profile.ADMIN)
      let clientRole = UserCommons.hasPermission(user, Profile.CLIENT)
      let pedagogueRole = UserCommons.hasPermission(user, Profile.PEDAGOGUE)
      console.log("admin role", adminRole)
      console.log("client role", clientRole)
      console.log("pedagogue role", pedagogueRole)

      if(user == null){
        next('/run/')
      }else if(adminRole){
        next(`/admin/${user.uid}`)
      }else if(clientRole){
        console.log("client role")
        next(`/student/${user.uid}`)
      }else if(pedagogueRole){
        next(`/pedagogue/${user.uid}`)
      }else{
        next(false)
      }

    }
  },

//...RunPages,
...PedagogueRoutes,
...PagesRoutes,
...UsersRoutes,
...LandingRoutes,
...AdminRoutes,
...ClientRoutes,
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
  // console.log(store.state.UserModule)
  // sessionStorage.setItem('user', store.state.UserModule.user)
  // return next()
   FirebaseService.getUser().then(isAuthenticated=>{
      const user:UserModel = JSON.parse(sessionStorage.getItem('user'))
      store.commit('UserModule/setUser', user)
      if(isAuthenticated && !to.meta.public || to.meta.public == undefined){
        next()
      }else{
        next('/')
      }
   }).catch(()=>{
     if(to.meta.public || to.meta.public == undefined){
       next()
     }else{
       next('/auth/signin')
     }
   })
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
