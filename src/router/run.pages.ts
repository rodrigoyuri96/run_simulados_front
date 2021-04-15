export default [{
  path: '/cadastro-vestibular',
  name: 'cadastro-vestibular',
  meta:{
    profile: 'ADMIN'
  },
  component: () => import('@/pages/exam/ExamList.vue'),
},
  {
    path: '/cadastro-evento',
    name: 'cadastro-evento',
    meta:{
      profile: 'ADMIN'
    },
    component: () => import('@/pages/events/EventList.vue'),
  },
  {
    path: '/cadastro-questao',
    name: 'cadastro-questao',
    meta:{
      profile: 'ADMIN'
    },
    component: () => import('@/pages/question/QuestionList.vue'),

  },
  {
    path: '/detalhe-questao',
    name: 'detalhe-questao',
    meta:{
      profile: 'ADMIN'
    },
    component: () => import('@/pages/question/QuestionDetail.vue')
  },
]
