<template>
  <v-list nav dense>
    <div v-for="(item, index) in menu" :key="index">
     
      <nav-menu :menu="item.user" />

      <nav-menu :menu="item.developer" 
        v-if="user.profile !== profile.CLIENT && user.profile !== profile.ADMIN"  />

      <nav-menu :menu="item.admin" v-if="user.profile !== profile.CLIENT"  />

    </div>
  </v-list>
</template>

<script>

import NavMenu from './NavMenu'
import { User } from '@/models/user/user.model'
import { Profile } from '@/models/user/profile.enum'

export default {

  components: {
    NavMenu
  },

  props: {
    menu: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      user: new User(),
      profile: Profile
    }
  },
}
</script>
