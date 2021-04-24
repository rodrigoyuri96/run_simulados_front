<template>
  <v-container>
    <run-team-detail v-model="openDialog" :is-update="isUpdate" />

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
          <v-btn class="white--text ml-n1" color="primary" @click="openRegisterModal()"
          >Cadastrar turma</v-btn
          >
        </v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-simple-table >
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
                  <td>{{ team.name }}</td>
                  <td>{{ team.members.length }}</td>
                  <td>{{ team.teachers.length }}</td>
                  <td class="text-center">
                    <v-btn elevation="0" icon>
                      <v-icon color="teal darken-1" @click="updateTeam(i)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="removeDialog(team.id)" elevation="0" icon>
                      <v-icon color="red darken-1">mdi-delete</v-icon>
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
    <run-remove-dialog :method="deleteHandler" v-model="openRemoveDialog" />
  </v-container>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";
import RunTeamDetail from "@/pages/pedagogue/teams/TeamDetail.vue";
import {getModule} from "vuex-module-decorators";
import {TeamModule} from "@/store/modules/team.module";
import {TeamModel} from "@/models/team.model";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import {TypeMessage} from "@/models/validation/TypeMessage";


@Component({
  name:'TeamList',
  components: { RunTeamDetail, RunRemoveDialog },
})
export default class TeamList extends Vue{
  openDialog = false
  teamModule = getModule(TeamModule, this.$store)
  validationModule = getModule(ValidationMessageModule, this.$store)
  openRemoveDialog = false
  isUpdate = false
  id = ""

  get teams(){
    return this.teamModule.teams
  }

  set teams(value){
    this.teamModule._setTeams(value)
  }

  updateTeam(i){
    let team = Object.assign({},this.teams[i])
    this.teamModule.setTeam(team)
    this.openDialog = true
    this.isUpdate = true
  }

  removeDialog(id){
    this.id = id
    this.openRemoveDialog = true

  }

  deleteHandler(){
    this.teamModule.delete(this.id).then(res=>{
      if(res.status == 204){
        this.validationModule.setValidation(new ValidationMessage('Turma deletada com sucesso.', TypeMessage.SUCCESS ))
      }
    }).catch(error=>{
      console.log(error)
      this.validationModule.setValidation(new ValidationMessage('Erro ao deletar turma.', TypeMessage.ERROR))
    }).finally(()=>{
      this.teamModule.removeFromTeam(this.id)
      this.openRemoveDialog = false
    })
  }

  openRegisterModal(){
    this.isUpdate = false
    this.openDialog = true
    this.teamModule.setTeam(new TeamModel())
  }

  created(){
     this.teamModule.findAll().then(res=>{
       this.teamModule._setTeams(res.data)
     })
  }

}
</script>

<style scoped>

</style>
