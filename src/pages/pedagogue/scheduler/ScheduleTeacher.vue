<template>
  <div style="width: 100%; height: 100%">
    <v-card height="64" class="ml-2 mr-2 mt-1">
    </v-card>
    <run-calendar v-model="registerFlag" :profile="user.authorities" :schedule-type="scheduleType" ></run-calendar>
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
  private scheduleType = "TEACHER"
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
    this.teamModule.findAll().then(res=>{
      console.log("RESPOSTA TURMAS::::::::", res.data)
      this.teamModule._setTeams(res.data)
    })
  }
}
</script>

<style scoped>

</style>
