<template>
<v-container class="mb-6">
  <v-card>
   <v-card-title>Tipos de Opção</v-card-title>
   <v-card-text>
    <v-divider></v-divider>
    <v-row justify="center">
        <v-radio-group v-model="optionType" row>
            <v-col cols="4">
                <v-radio
                value="onlyText"
                color="teal darken-1"
                label="Somente Texto"></v-radio>
            </v-col>
            <v-col cols="4">
                <v-radio
                value="onlyImage"
                color="teal darken-1"
                label="Somente Imagens"></v-radio>
            </v-col>
            <v-col cols="4">
                <v-radio
                class="mt-1"
                color="teal darken-1"
                label="Tipo Tabela"></v-radio>
            </v-col>
        </v-radio-group>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="end">
       <v-btn
      class="mr-2 mt-6 mb-3"
      style="color: white"
      color="primary"
      @click="addOption()"
      >Adicionar Opção
      <v-icon class="ml-2">mdi-plus</v-icon>
      </v-btn>
      <OnlyText v-if="optionType == 'onlyText'"></OnlyText>
      <OnlyImage v-if="optionType == 'onlyImage'"></OnlyImage>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Descrição
          </th>
          <th class="text-center">
            alternativa correta
          </th>
          <th class="text-center">
              Editar
          </th>
          <th class="text-center">
              Excluir
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, i) in options" :key="i">
          <td>{{option.description}}</td>
          <td class="text-center">
            <v-icon
            :color="option.isCorrectAnswer ? 'green darken-1' : 'red darken-1'" >
              {{option.isCorrectAnswer ? 'mdi-check' : 'mdi-cancel'}}
            </v-icon>
          </td>
          <td class="text-center">
            <v-btn elevation="0" icon>
              <v-icon @click="updateOption(i)">mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td class="text-center">
            <v-btn @click="removeOption(i)" elevation="0" icon>
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
</v-container>
</template>

<script lang="ts">

import OnlyImage from "@/pages/question/options_old/OnlyImage.vue"
import OnlyText from "@/pages/question/options_old/OnlyText.vue"
import {Component,  Vue} from 'vue-property-decorator'
import {getModule} from 'vuex-module-decorators'
import {OptionModule} from '@/store/modules/option.module'
import OptionModel from '@/models/question/option.model'

@Component({
  components: { OnlyText, OnlyImage }
})

export default class Options extends Vue {

  private optionStore = getModule(OptionModule, this.$store)
  optionType: String = "onlyText"

 get options() {
   return this.optionStore.options
 }

 get option() {
   return this.optionStore.option
 }

 set option(newOption: OptionModel) {
   this.optionStore.setOption(newOption)
 }

 get dialog() {
   return this.optionStore.dialog
 }

 removeOption(i: number){
    this.optionStore.removeOption(i)
 }

 updateOption(i: number) {
   this.optionStore.setOption(this.options[i])
   this.optionStore.validUpdateOption(true)
   this.optionStore.openDialog(true)
   console.log('OPTION:', this.optionStore.option)
 }

 addOption() {
   this.optionStore.setOption(new OptionModel())
   this.optionStore.validUpdateOption(false)
   this.optionStore.openDialog(true)
 }


  created() {
    this.optionStore.findAll()

  }
}

</script>

<style>

</style>
