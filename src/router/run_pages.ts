export default [{
  path: '/cadastro-vestibular',
  name: 'cadastro-vestibular',
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
    path: '/options',
    name: 'options',
    component: () => import('@/components/run/question/options/Options.vue')
  }

]
