<template>
  <div>
    <v-container
      class="px-4"
      fluid
    >

      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left" v-for="(col,i) in header">
              <v-row >
                <v-col v-if="headerImageFlag" cols="4" align-self="center" >
                  <v-img contain max-width="70" max-height="70" :src="col" />
                  <v-btn text color="red darken-1">
                    <v-icon>{{deleteIcon}}</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="4" v-else >
                  {{col}}
                  <v-btn text color="red darken-1">
                    <v-icon>{{deleteIcon}}</v-icon>
                  </v-btn>
                </v-col>

              </v-row>

            </th>
            <th>
              <v-btn small>Remover Cabeçalho <v-icon small color="red darken-1">{{deleteIcon}}</v-icon></v-btn>
            </th>
            <th>
              <v-btn small @click="dialog = true">Adicionar Linha <v-icon color="blue darken-1">{{"mdi-plus"}}</v-icon></v-btn>
            </th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="(option,i) in options" :key="i">
                <td v-for="col in option.row">{{col}}</td>
                <td>
                  <v-btn text>
                    <v-icon color="red darken-1">
                      {{"mdi-delete"}}
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title>
          Adicionar Linha à tabela
        </v-card-title>
        <v-card-text>
          <div v-if="!imageFlag" >
            <v-text-field v-model="descriptions[i]" v-for="(col,i) in header" outlined :label="`Adicione o conteúdo da coluna ${i + 1}`"/>
          </div>
          <div v-else>
            <v-file-input v-model="descriptions[i]"  append-icon="mdi-camera" prepend-icon v-for="(col,i) in header" outlined :label="`Adicione o conteúdo da coluna ${i + 1}`"/>
          </div>
          <br>
          <v-checkbox v-model="isCorrectAnswer" label="Alternativa Correta"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addRow">Adicionar linha</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script lang="ts">


import {Component, Prop, Vue} from "vue-property-decorator";

import Option from "@/models/question/Option";
import axios from "@/plugins/Axios"
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import {getModule} from "vuex-module-decorators";
import ValidationMessage from "@/models/validation/ValidationMessage";
import {TypeMessage} from "@/models/validation/TypeMessage";

@Component({
  name: "teste"
})
export default class Teste extends Vue{
  @Prop({type:Boolean, default:true}) headerImageFlag: Boolean
  @Prop({type:Boolean, default: false}) imageFlag: Boolean
  messageModule = getModule(ValidationMessageModule, this.$store)
  dialog: Boolean = false
  // @Prop({type:Array}) header: []
  // @Prop({type:Array}) options: Option[]
  header: string[] = ["http://plataformasessa.com.br/img/tests.png", "http://plataformasessa.com.br/img/tests.png"]
  options: Option[] = []
  deleteIcon = "mdi-delete"
  insertIcon = "mdi-plus"
  event: any = {}
  descriptions: [] = []
  isCorrectAnswer: boolean = false


  addRow(){

    if(!this.imageFlag){
      const option = new Option()
      option.row = this.descriptions
      option.isCorrectAnswer = this.isCorrectAnswer
      this.options.push(option)
      this.descriptions = []
    }
    console.log("OPCOES", this.options)

  }
}
</script>

<style scoped>

</style>
