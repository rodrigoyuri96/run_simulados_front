export default [{
  path: '/cadastro-vestibular',
  name: 'cadastro-vestibular',
  meta:{
    profile: 'CLIENT'
  },
  component: () => import('@/pages/exam/ExamList.vue'),
},
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/components/run/editor/RunEditor.vue'),
  },
  {
    path: '/cadastro-evento',
    name: 'cadastro-evento',
    component: () => import('@/pages/events/EventList.vue'),
  },
  {
    path: '/cadastro-questao',
    name: 'cadastro-questao',
    component: () => import('@/pages/question/QuestionList.vue'),

  },
  {
    path: '/detalhe-questao',
    name: 'detalhe-questao',
    component: () => import('@/pages/question/QuestionDetail.vue')
  },
  {
    path: '/opcoes',
    name: 'opcoes',
    component: () => import('@/components/run/question/options_old/Options.vue')
  }

]
