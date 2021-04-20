<template>
  <v-container>
    <run-team-detail v-model="openDialog" />

    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        Gestão de Turmas
      </v-card-title>
      <v-card-text class="mt-3">
        <v-card-actions class="mt-3 mb-3">
          <v-card-title class="ml-n1">Turmas Cadastradas</v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="white--text ml-n1" color="primary" @click="openDialog = true"
          >Cadastrar turma</v-btn
          >
        </v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th>Nome da turma</th>
                  <th>Número de Alunos</th>
                  <th>Número de Professores</th>
                  <th class="text-center">Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(team, i) in teams" :key="i">
                  <td>{{ team.title }}</td>
                  <td>{{ team.students.length }}</td>
                  <td>{{ team.teachers.length }}</td>
                  <td class="text-center">
                    <v-btn elevation="0" icon>
                      <v-icon @click="updateEvent(i)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="removeDialog(i)" elevation="0" icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <run-remove-dialog :method="deleteHandle" v-model="openRemoveDialog" />
  </v-container>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";
import RunTeamDetail from "@/pages/pedagogue/teams/TeamDetail.vue";
import {getModule} from "vuex-module-decorators";
import {TeamModule} from "@/store/modules/team.module";

@Component({
  name:'TeamList',
  components: { RunTeamDetail, RunRemoveDialog },
})
export default class TeamList extends Vue{
  openDialog = false
  teamModule = getModule(TeamModule, this.$store)
  openRemoveDialog = false

  get teams(){
    return this.teamModule.teams
  }

  updateEvent(i){
    console.log(i)
  }

  removeDialog(i){
    this.openRemoveDialog = true
    console.log(i)
  }

  deleteHandle(){
    console.log("delete")
  }

  created(){
     this.teamModule.findAll()
  }

}
</script>

<style scoped>

</style>
