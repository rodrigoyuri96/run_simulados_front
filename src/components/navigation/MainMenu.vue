<template>
  <v-list nav dense>
    <div v-for="(item, index) in menu" :key="index">
      <nav-menu :menu="item.client" v-if="hasPermission(profile.client)" />
      <nav-menu :menu="item.developer" v-if="hasPermission(profile.developer)" />
      <nav-menu :menu="item.admin" v-if="hasPermission(profile.admin)" />
      <nav-menu :menu="item.pedagogue" v-if="hasPermission(profile.pedagogue)" />
    </div>
  </v-list>
</template>

<script lang="ts">

import { Profile } from '@/models/user/profile.enum'
import {Component, Prop, Vue} from "vue-property-decorator";
import NavMenu from "@/components/navigation/NavMenu.vue";
import {getModule} from "vuex-module-decorators";
import {UserModule} from "@/store/modules/user.module";
import UserCommons from "@/commons/user.commons";

@Component({
  name:'MainMenu',
  components: {
    NavMenu
  }
})
export default class MainMenu extends Vue{
  @Prop({type: Array, default:[]}) menu
  userModule = getModule(UserModule, this.$store)
  profile = {
    client: Profile.CLIENT,
    admin: Profile.ADMIN,
    developer: Profile.DEVELOPER,
    teacher: Profile.TEACHER,
    pedagogue: Profile.PEDAGOGUE
  }

  get user(){
    return this.userModule.user
  }

  hasPermission(profile: Profile): boolean{
    return UserCommons.hasPermission(this.user, profile)
  }

}
</script>
