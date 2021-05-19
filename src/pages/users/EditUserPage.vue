<template>
  <div class="flex-grow-1 ml-5 mr-5">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Atualizar Perfil</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
    </div>

    <div
      v-if="user.role === 'ADMIN'"
      class="d-flex align-center font-weight-bold primary--text my-2"
    >
      <v-icon small color="primary">mdi-security</v-icon>
      <span class="ma-1">Administrator</span>
    </div>


    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Conta</v-tab>
      <v-tab to="#tabs-information">Informações do Plano</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <account-tab ref="tabs-account" :user="user"></account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab ref="tabs-information" :user="user"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import CopyLabel from '../../components/common/CopyLabel.vue'
import AccountTab from './EditUser/AccountTab.vue'
import InformationTab from './EditUser/InformationTab.vue'
import {Component, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {UserModule} from "../../store/modules/user.module";
import UserModel from "../../models/user/user.model";

@Component({
  name: 'EditUserPage',
  components: {
    CopyLabel,
    AccountTab,
    InformationTab
  }
})
export default class EditUserPage extends Vue {
  tab = ""
  userModule = getModule(UserModule, this.$store)

  get user(){
    return this.userModule.user
  }

  set user(newValue: UserModel){
    this.userModule.setUser(newValue)
  }


  get breadcrumbs(){
    return [
      {
        text: 'Users',
        to: '/users/list',
        exact: true
      },
      {
        text: 'Edit User'
      }
    ]
  }

  // data() {
  //   return {
  //     // user: {
  //     //   'id':32,
  //     //   'email':'bfitchew0@ezinearticles.com',
  //     //   'name':'Bartel Fitchew',
  //     //   'verified':false,
  //     //   'created':'2019-08-09T03:14:12Z',
  //     //   'lastSignIn':'2019-08-14T20:00:53Z',
  //     //   'disabled':true,
  //     //   'role':'ADMIN',
  //     //   'avatar':'/images/avatars/avatar1.svg'
  //     // },
  //     tab: null,
  //   }
  // }
}
</script>
