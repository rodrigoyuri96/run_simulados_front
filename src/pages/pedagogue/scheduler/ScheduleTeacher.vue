<template>
  <div style="width: 100%; height: 100%">
    <run-calendar v-model="registerFlag" :profile="user.authorities" :events="teams[0].events"></run-calendar>
    <run-class-register v-model="registerFlag" />
  </div>
</template>

<script lang="ts">

import {getModule} from "vuex-module-decorators";
import {Component, Vue} from "vue-property-decorator";
import {TeamModule} from "@/store/modules/team.module";
import {UserModule} from "@/store/modules/user.module";
import RunCalendar from "@/components/run/calendar/Calendar.vue";
import RunClassRegister from "@/pages/pedagogue/class/ClassRegister.vue";


@Component({
  name: 'SchedulerTeacher',
  components: {RunCalendar, RunClassRegister}
})
export default class ScheduleTeacher extends Vue{
  private registerFlag = false
  private teamModule = getModule(TeamModule, this.$store)
  private userModule = getModule(UserModule, this.$store)

  get teams(){
    let teams = this.teamModule.teams
    console.log("teams", teams)
    return teams
  }

  get user(){
    console.log("User", this.userModule.user)
    return this.userModule.user
  }

  created() {
    this.teamModule.findAll()
    console.log("TURMAS::::", this.teamModule.teams)
  }
}
</script>

<style scoped>

</style>
