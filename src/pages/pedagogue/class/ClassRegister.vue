<template>
  <v-dialog v-model="dialog" width="900">
    <v-card>
      <v-toolbar color="primary">
      <v-card-title class="white--text">
          Registro de Aulas
      </v-card-title>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-row no-gutters>
          <v-col class="mr-2">
            <run-disciplines />
            <run-teams />
            <run-time @valid="validWatch = $event" label="Horário inicio aula"/>
            <v-checkbox label="Evento recorrente"></v-checkbox>
          </v-col>
          <v-col>
            <v-autocomplete dense outlined label="Professor" />
            <run-date label="Data Inicio da Aula"></run-date>
            <run-time label="Horário fim aula"/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="save()" color="primary" class="white--text">Salvar</v-btn>
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

@Component({
  name:'ClassRegister',
  components: {RunDate, RunTime, RunDisciplines, RunTeams}
})
export default class ClassRegister extends Vue{
  @VModel() dialog: boolean | false

  cancel(){
    this.dialog = false
  }

  save(){
    this.dialog = false
  }
}
</script>

<style scoped>

</style>
