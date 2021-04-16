export default [{
  path: '/register/exams',
  name: 'exam-register',
  meta:{
    public: false,
    profile: 'ADMIN'
  },
  component: () => import('@/pages/exam/ExamList.vue'),
},
  {
    path: '/home',
    name: 'home',
    meta:{
      public: false
    },
    component: () => import('@/pages/home/Home.vue')
  },
  {
    path: '/register/events',
    name: 'events-register',
    component: () => import('@/pages/events/EventList.vue'),
    meta: {
      profile: 'ADMIN',
      public: false
    }
  },
  {
    path: '/register/questions',
    name: 'questions-register',
    component: () => import('@/pages/question/QuestionList.vue'),
    meta: {
      profile: 'ADMIN',
      public: false
    }

  }

]
