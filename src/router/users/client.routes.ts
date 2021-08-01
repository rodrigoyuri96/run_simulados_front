import Home from "@/pages/client/Home.vue";
import ClientHome from "@/pages/client/ClientHome.vue";
import Dashboard from "@/pages/client/Dashboard.vue";
import Simulated from "@/pages/client/simulated/Simulated.vue";
import SimulatedRegister from "@/pages/client/simulated/SimulatedRegister.vue";
import SimulatedDetail from "@/pages/client/simulated/SimulatedDetail.vue";
import UserModel from "@/models/user/user.model";
import store from "@/store";
import UserCommons from "@/commons/user.commons";
import {Profile} from "@/models/user/profile.enum";
import Classroom from "@/pages/client/classrooms/Classroom.vue"
import ClassroomList from "@/pages/client/classrooms/ClassroomList.vue"
import ScheduleClasses from "@/pages/client/classrooms/ScheduleClasses.vue"
import Event from "@/pages/client/events/Events.vue"
import EventList from "@/pages/client/events/EventList.vue"
import EventDetail from "@/pages/client/events/EventDetail.vue"
import Monitoring from "@/pages/client/monitoring/Monitoring.vue"
import MonitoringList from "@/pages/client/monitoring/MonitoringList.vue"
import MonitoringDetail from "@/pages/client/monitoring/MonitoringDetail.vue"

export default [
  {
    path: '/student',
    component: Home,
    beforeEnter: (to, from, next) => {
      /*
      let user: UserModel = store.state.UserModule._user
      let clientRole = UserCommons.hasPermission(user, Profile.CLIENT)
      if(clientRole){
        next()
      }else{
        next('/')
      }
      */
     next()

    },
    children:[
      {
        path: ':id',
        component: ClientHome
      },
      {
        path: 'run/simulated',
        component: Simulated,
        children: [
          {
            path: ':id',
            component: SimulatedRegister
          },
          {
            path: '',
            component: SimulatedDetail
          }
        ]
      },
      {
        path: 'run/dashboard',
        component: Dashboard
      },
      {
        path: 'run/events',
        component: Event,
        children: [
          {
            path: ':id',
            component: EventDetail
          },
          {
            path: '',
            component: EventList
          }
        ]
      },
      {
        path:'run/monitoring',
        component: Monitoring,
        children: [
          {
            path: ':id',
            component: MonitoringDetail
          },
          {
            path: '',
            component: MonitoringList
          }
        ]
      },
      {
        path: 'run/classroom',
        component: Classroom,
        children: [
          {
            path: '',
            component: ScheduleClasses
          },
          {
            path: ':id',
            component: ClassroomList
          }
        ]
      }
    ]
  }
]
