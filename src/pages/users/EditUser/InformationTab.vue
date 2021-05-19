<template>
  <v-card class="my-2">
    <v-card-title>Detalhes do Plano</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col>
            <v-text-field label="Plano Atual" :value="plan" disabled outlined />
          </v-col>
          <v-col>
            <v-btn class="mt-1" color="pink" outlined>Upgrade da conta</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Data criação da conta" :value="initialDate"  disabled outlined  />
          </v-col>
          <v-col>
            <v-text-field label="Data expiração" :value="endDate" disabled outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Status da Conta" :value="isActive" outlined disabled/>
          </v-col>
        </v-row>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="primary" class="white--text">Atualizar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {UserModule} from "@/store/modules/user.module";
import UserCommons from "@/commons/user.commons";
import {DateUtil} from "@/commons/date.commons";

@Component({
  name: 'InformationTab'
})
export default class InformationTab extends Vue{
  userModule = getModule(UserModule, this.$store)

  get user(){
    return this.userModule.user
  }

  get plan(){
    return UserCommons.getPlan(this.user.accountSettings.accountPlan)
  }

  get initialDate(){
    return DateUtil.parseDateBR(this.user.accountSettings.createdAt)
  }

  get endDate(){
    return DateUtil.parseDateBR(this.user.accountSettings.expiredAt)
  }

  get isActive(){
    return this.user.accountSettings.active == 'SIM' ? 'Conta Ativa' : 'Conta Inativa'
  }

  get isBlocked(){
    return this.user.accountSettings.blocked
  }

}
</script>
