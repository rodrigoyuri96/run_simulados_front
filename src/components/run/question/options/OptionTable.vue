<template>
  <div>
    <v-dialog
      id="OnlyTable"
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            style="color: white"
          >

            <v-card-title>Opção Tabela</v-card-title>

          </v-toolbar>
          <v-card-text>
            <v-card-subtitle class="mb-2">
              {{ dialogType == 'COL'? 'Adicionar Cabeçalho': 'Adicionar à linha' }}
            </v-card-subtitle>
            <v-card-text>
              <div v-if="dialogType == 'CONTENT'" v-for="(header,i) in option.table.header">
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
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              color="green"
            >Salvar</v-btn>
            <v-btn
              text
              color="primary"
              @click="dialog.value = false"
            >Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-divider class="mt-5 mb-4"></v-divider>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Prop} from 'vue-property-decorator'
import {getModule} from 'vuex-module-decorators'
import {OptionModule} from '@/store/modules/OptionModule'


@Component({ name: "OptionTable" })
export default class OptionTable extends Vue {
  optionModule = getModule(OptionModule, this.$store)
  nrColsAux = 0
  rows: [] = []
  content: string = ''
  modal: boolean = false

  get dialogType(){
    return this.optionModule.dialogOptionTableType
  }

  set dialogType(newValue){
    this.optionModule.setDialogOptionTableType(newValue)
  }

  get dialog(){
    return this.optionModule.dialog
  }

  set dialog(val){
    this.optionModule.setDialog(val)
  }

  get option(){
   return this.optionModule.option
  }

  set option(newVal){
    this.optionModule.setOption(newVal)
  }

  addRow(){
    this.option.table.rows.push(this.rows)
    this.rows = []
  }

  addHeader(){
    this.option.table.header.push(this.content)
    console.log("inseriu header: ", this.option)
  }

  mounted(){
    console.log("opcao: ", this.option)

    console.log(this.option.table)

  }
};
</script>

<style>
</style>
