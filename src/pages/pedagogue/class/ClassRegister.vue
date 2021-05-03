<template>
  <v-dialog v-model="dialog" width="900">
    <v-card>
      <v-toolbar color="primary">
      <v-card-title class="white--text">
          Registro de Aulas
      </v-card-title>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-form v-model="valid">
          <v-row>
            <v-col cols="8">
              <run-teams
                v-model="selectedTeam"
                :multiple="false"
                :rules="requiredField"/>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="mr-2" >
                <v-select
                  v-model="type"
                  outlined
                  :items="eventType"
                  dense
                  label="tipo do evento"
                  item-text="name"
                  item-value="value"
                  :rules="requiredField"
                />
            </v-col>
            <v-col>
                <v-select
                  v-model="category"
                  outlined
                  :items="categories"
                  dense
                  label="Categoria do evento"
                  item-text="name"
                  item-value="value"
                  :rules="requiredField"
                />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="mr-2">
              <run-teachers v-model="selectedTeacher" :multiple="false" :rules="requiredField"/>
              <run-time
                v-model="startTime"
                :rules="[v=> !!v || 'Campo obrigatório']"
                label="Horário inicio aula"/>
              <v-checkbox v-model="classModel.recurrent" label="Evento recorrente" ></v-checkbox>
            </v-col>
            <v-col>
              <run-date v-model="start" label="Data Inicio da Aula" :rules="requiredField"></run-date>
              <run-time v-model="endTime" label="Horário fim aula" :rules="requiredField"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="save()" :disabled="!valid" color="primary" class="white--text">Salvar</v-btn>
        <v-btn @click="cancel()" color="secondary" class="white--text">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import {Component, VModel, Vue} from "vue-property-decorator";
import RunDate from "@/components/run/Date.vue"
import RunTime from "@/components/run/Watch.vue"
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunTeams from "@/components/run/Teams.vue";
import RunTeachers from "@/components/run/Teachers.vue";
import {getModule} from "vuex-module-decorators";
import {TeamModule} from "@/store/modules/team.module";
import {ClassModel} from "@/models/teacher/class.model";
import DisciplineModel from "@/models/discipline.model";
import {TeamModel} from "@/models/team.model";
import {TeacherModel} from "@/models/teacher/teacher.model";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import {TypeMessage} from "@/models/validation/TypeMessage";
import {events} from "@/models/constants/event.type.constants"
import {classes} from "@/models/constants/class.categories.constants";
import {simulated} from "@/models/constants/simulated.categories.constants";


@Component({
  name:'ClassRegister',
  components: {RunDate, RunTime, RunDisciplines, RunTeams, RunTeachers}
})
export default class ClassRegister extends Vue{
  private category: string = null
  private type: string = null
  private eventType = events
  private requiredField = [ v=> !!v || 'Campo obrigatório']
  private selectedTeam: TeamModel = null
  private selectedTeacher: TeacherModel = null
  private start= ""
  private startTime=""
  private endTime=""
  private classModel = new ClassModel()
  @VModel() dialog: boolean | false
  teamModule = getModule(TeamModule, this.$store)
  validationModule = getModule(ValidationMessageModule, this.$store)
  valid = false

  get categories(){
    return this.type == 'CLASS' ?  classes : simulated
  }

  get team(){
    return this.teamModule.team
  }

  set team(value){
    this.teamModule.setTeam(value)
  }

  cancel(){
    this.dialog = false
  }

  save(){
    this.classModel.start = this.formatDate(this.start, this.startTime)
    this.classModel.end = this.formatDate(this.start, this.endTime)
    this.classModel.teacher = this.selectedTeacher
    this.classModel.team.id = this.selectedTeam.id,
    this.classModel.team.name = this.selectedTeam.name
    this.classModel.type = this.type
    this.classModel.category = this.category

    let message = null
    this.teamModule.saveEvent(this.classModel).then(res=>{
      if(res.status == 200){
        this.teamModule.team.events.push(res.data)
       message = new ValidationMessage('Evento cadastrado com sucesso.',
          TypeMessage.SUCCESS)

      }
    }).catch(error=>{
      message = new ValidationMessage('Erro ao cadastrar evento.',
        TypeMessage.ERROR)
      console.log(error)
    }).finally(()=>{
      this.validationModule
        .setValidation(message)
      this.dialog = false
    })
  }


  formatDate(date, time){
    return date + "T" + time + ":00"
  }
}
</script>

<style scoped>

</style>
