import developerPages from './menus/developer.menu'
import adminPages from './menus/admin.menu'
import clientPages from './menus/client.menu'
import pedagoguePages from './menus/pedagogue.menu'


export default {

  menu: [
    {
      developer: developerPages
    },
    {
      pedagogue: pedagoguePages
    },
    {
      client: clientPages
    },

    {
      admin: adminPages
    },
  ],

  footer: [
    { text: 'Docs', key: 'menu.docs', href: '/', target: '_blank' }
  ]
}
