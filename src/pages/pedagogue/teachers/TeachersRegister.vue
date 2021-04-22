<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-toolbar color="primary" class="white--text">
        <v-card-title>
          Detalhes do Funcionário
          <v-spacer></v-spacer>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="mt-3">
        <v-row no-gutters>
          <v-col cols="12" class="mr-1">
            <v-text-field outlined label="Nome do professor"></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete outlined label="Disciplinas Lecionadas" full-width ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete outlined label="Monitores" full-width ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="save()" color="primary" class="white--text">Salvar</v-btn>
        <v-btn @click="cancel()" color="secondary" class="white--text">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, VModel, Vue} from "vue-property-decorator";
@Component({
  name: 'TeacherRegister'
})
export default class TeachersRegister extends Vue{
  @VModel() dialog: boolean
  save(){
  }
  cancel(){
    this.dialog = false
  }
}
</script>

<style scoped>
</style>