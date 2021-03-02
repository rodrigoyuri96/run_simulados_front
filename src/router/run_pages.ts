export default [{
  path: '/cadastro-vestibular',
  name: 'cadastro-vestibular',
  component: () => import('@/pages/exam/ExamList.vue'),
},
{
  path: '/cadastro-questao',
  name: 'cadastro-questao',
  component: () => import('@/components/run/question/OptionTable.vue'),

},
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/components/run/editor/RunEditor.vue'),

  },
  {
    path: '/detalhe-questao',
    name: 'detalhe-questao',
    component: () => import('@/pages/question/QuestionDetail.vue')
  },
  {
    path: '/options',
    name: 'options',
    component: () => import('@/pages/question/options/Options.vue')
  }

]
