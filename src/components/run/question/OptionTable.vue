<template>
  <div class="ml-5">
    <v-container class="ml-10">
      <v-row no-gutters>
        <v-col>
          <v-btn @click="dialog = true, dialogType='COL'">Adicionar Cabeçalho</v-btn>
        </v-col>
      </v-row>

      <br>
    </v-container>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" v-for="(header,i) in option.header" :key="i">
              {{header}}
              <v-btn color="red darken-1" small text @click="removeCol(i)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </th>
            <th>
              <v-btn color="blue darken-1" small text @click="dialogType='CONTENT', dialog = true">
                <v-icon small>mdi-plus</v-icon> Linha
              </v-btn>
            </th>
          </tr>
        </thead>
      <tbody>
          <tr v-for="(rows,i) in option.rows" :key="i">
            <td v-for="row in rows" > {{row}} </td>
            <td>
              <v-btn color="red darken-1" small text @click="removeRow(i)">
                <v-icon small>mdi-delete</v-icon>Linha
              </v-btn>
            </td>
          </tr>
      </tbody>
      </template>

    </v-simple-table>

    <v-dialog
      width="400"
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          {{ dialogType == 'COL'? 'Adicionar Cabeçalho': 'Adicionar à linha' }}
        </v-card-title>
        <v-card-text>
            <div v-if="dialogType == 'CONTENT'" v-for="(header,i) in option.header">
              <v-text-field outlined :label="`insira o conteúdo da coluna ${header}`" v-model="rows[i]" />
            </div>
          <v-btn v-if="dialogType == 'CONTENT'"  @click="addRow">
            Inserir
          </v-btn>

          <div v-else>
            <v-text-field outlined label="insira o conteúdo da coluna" v-model="content" />
            <v-btn @click="addHeader" >
              Inserir
            </v-btn>
          </div>

        </v-card-text>
      </v-card>


    </v-dialog>
    <v-divider class="mt-5 mb-4"></v-divider>
    <h2>Pré visualização</h2>
  <v-radio-group v-model="radio">
    <template v-slot:label>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th></th>
            <th v-for="header in option.header" class="text-left">
              {{header}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(rows,i) in option.rows">
            <td><v-radio :value="i" /></td>
            <td v-for="row in rows"> {{row}}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>

  </v-radio-group>

  </div>



</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Option from "@/models/question/OptionTable";

@Component({
  name: 'OptionTable'
})
export default class OptionTable extends Vue {
  dialogType = "COL" // COL // CONTENT
  nrColsAux = 0
  example ={}
  option: Option = new Option();
  rows: [] = []
  content: string = ''
  dialog: boolean = false
  radio: string = ""

  addHeader(){
    this.option.header.push(this.content)
  }

  removeCol(index: number){
    this.option.header.splice(index, 1)
    this.option.rows.forEach((rows: [])=>{
        rows.splice(index, 1)
    })
  }

  addRow(){
    this.option.rows.push(this.rows)
    this.rows = []
  }

  removeRow(index){
    this.option.rows.splice(index, 1)
  }

}
</script>

<style scoped>

</style>
