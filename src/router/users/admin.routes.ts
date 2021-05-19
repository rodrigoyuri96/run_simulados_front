import Home from "@/pages/admin/Home.vue";
import AdminHome from "@/pages/admin/AdminHome.vue";
import CommunityList from "@/pages/admin/community/CommunityList.vue";
import ExamList from "@/pages/admin/exam/ExamList.vue";
import QuestionList from "@/pages/admin/question/QuestionList.vue";
import EventList from "@/pages/admin/events/EventList.vue";
import UserModel from "@/models/user/user.model";
import store from "@/store";
import UserCommons from "@/commons/user.commons";
import {Profile} from "@/models/user/profile.enum";


export default [
  {
    path: '/admin',
    component: Home,
    beforeEnter: (to, from, next) => {
      let user: UserModel = store.state.UserModule._user
      let adminRole = UserCommons.hasPermission(user, Profile.ADMIN)
      if(adminRole){
        next()
      }else{
        next('/')
      }

    },
    children:[
      {
        path: ':id',
        component: AdminHome
      },
      {
        path: 'register/events',
        component: EventList
      },
      {
        path: 'register/communities',
        component: CommunityList
      },
      {
        path: 'register/exams',
        component: ExamList
      },
      {
        path:'register/questions',
        component: QuestionList
      },
      {
        path: 'dashboard/analytics',
        name: 'dashboard-analytics',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue'),
        meta: {
          public: false,
          profile: 'ADMIN'
        }
      },
    ]
  }
]
