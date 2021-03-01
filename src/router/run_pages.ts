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

]
