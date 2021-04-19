import Home from "@/pages/pedagogue/Home.vue";
import TeamList from "@/pages/pedagogue/teams/TeamList.vue";
import Team from "@/pages/pedagogue/teams/Team.vue";
import TeamDetail from "@/pages/pedagogue/teams/TeamDetail.vue";
import Schedule from "@/pages/pedagogue/scheduler/Schedule.vue";
import ScheduleList from "@/pages/pedagogue/scheduler/ScheduleList.vue";
import ScheduleTeacher from "@/pages/pedagogue/scheduler/ScheduleTeacher.vue";
import ScheduleEvents from "@/pages/pedagogue/scheduler/ScheduleEvents.vue";
import ScheduleTeam from "@/pages/pedagogue/scheduler/SchedulerTeam.vue";
import PedagogueHome from "@/pages/pedagogue/PedagogueHome.vue";
import UserModel from "@/models/user/user.model";
import store from "@/store";
import UserCommons from "@/commons/user.commons";
import {Profile} from "@/models/user/profile.enum";

export default [
  {
    path: '/pedagogue',
    component: Home,
    beforeEnter: (to, from, next) => {
      let user: UserModel = store.state.UserModule._user
      let pedagogueRole = UserCommons.hasPermission(user, Profile.PEDAGOGUE)

      if(pedagogueRole){
        next()
      }else{
        next('/')
      }

    },
    children:[
      {
        path: ':id',
        component: PedagogueHome
      },
      {
        path: 'manage/schedule',
        component: Schedule,
        children: [
          {
            path: '',
            component: ScheduleList
          },
          {
            path: 'teachers',
            component: ScheduleTeacher
          },
          {
            path: 'teams',
            component: ScheduleTeam
          },
          {
            path: 'events',
            component: ScheduleEvents
          }
        ]
      },
      {
        path: 'manage/teams',
        component: Team,
        children:[
          {
            path: '',
            component: TeamList
          },
          {
            path: ':id',
            component: TeamDetail
          }
        ]

      },

    ]
  }
]
