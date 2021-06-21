<template>
  <v-container fluid>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#teachers">Professor</v-tab>
      <v-tab to="#teams">Turma</v-tab>
    </v-tabs>

    <v-tabs-items  v-model="tab">
      <v-tab-item value="teachers">
        <schedule-teacher ref="schedule-teacher" :user="user"></schedule-teacher>
      </v-tab-item>

      <v-tab-item value="teams">
        <scheduler-team ref="scheduler-team" :user="user"></scheduler-team>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SchedulerTeam from '@/pages/pedagogue/scheduler/SchedulerTeam.vue'
import ScheduleTeacher from '@/pages/pedagogue/scheduler/ScheduleTeacher.vue'

@Component({
  name: 'SchedulerList',
  components: { SchedulerTeam, ScheduleTeacher }
})
export default class SchedulerList extends Vue {

  tab = ""

}
</script>

<style scoped>

</style>
