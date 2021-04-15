import menuPages from './menus/pages.menu'

export default {
  
  menu: [
    {
      user: [
        {icon: 'mdi-view-dashboard-outline', key: 'Painel de Controle', text: 'Dashboard', link: '/dashboard/analytics'},
      ]
    },
    
    {
      developer: menuPages
    },
    
    {
      admin: [
        {icon: 'mdi-file-cog-outline', key: 'Cadastro de Vestibulares', text: 'Cadastro Vestibular', link: '/register/exams'},
        {icon: 'mdi-file-cog-outline', key: 'Cadastro de Questão', text: 'Cadastro Questão', link: '/register/questions'},
        {icon: 'mdi-file-cog-outline', key: 'Cadastro de Eventos', text: 'Cadastro Evento', link: '/register/events'}
      ]
    },
  ],

  footer: [
    { text: 'Docs', key: 'menu.docs', href: 'https://vuetifyjs.com', target: '_blank' }
  ]
}
