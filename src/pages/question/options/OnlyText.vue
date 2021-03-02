<template>
  <v-dialog
    id="onlyText" 
    v-model="openDialog"
    transition="dialog-bottom-transition" 
    max-width="600">
    <template >
      <v-card>
        <v-toolbar 
        color="primary" 
        style="color: white"
        >
        <v-card-title>Opção Somente Texto</v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12">
            <v-checkbox
              label="Alternativa Correta"
              color="Green"
              hide-details
              v-model="option.isCorrectAnswer"
            >
            </v-checkbox>
            </v-col>
          </v-row>
            <v-row>
            <v-col cols="12">
              <v-form 
              class="form-group"
              v-model="valid"
              >
              <v-textarea 
              v-model="option.description" 
              outlined
              :rules="[e => !!e || 'Campo Obrigatório'  ]" 
              label="Descrição"
              >
              </v-textarea>
              </v-form>
            </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn 
          text
          color="green"
          :disabled="!valid"
          @click="saveOption()"
          >Salvar</v-btn>
          <v-btn 
          text 
          color="primary" 
          @click="cancel()"
          >Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import {getModule} from 'vuex-module-decorators'
import {OptionModule} from '@/store/modules/OptionModule'
import Option from '@/models/Option'
import Options from './Options.vue'

@Component({  })

export default class OnlyText extends Vue {

 private optionStore = getModule( OptionModule, this.$store )
 private valid: Boolean = false

 get option() {
   return this.optionStore.option
 }

 get openDialog() {
   return this.optionStore.dialog
 }

 set option(newValue: Option) {
   this.optionStore.setOption(newValue)
 }

 set openDialog(newValue: Boolean) {
   this.optionStore.openDialog(newValue)
 }

 saveOption() {
   if(this.optionStore.validUpdate == true) {
     return this.optionStore.openDialog(false)
   } else {
     this.optionStore.saveOption()
     this.optionStore.openDialog(false)
   }
  
 }

 cancel() {
   this.optionStore.openDialog(false)
 }


 
}

</script>

<style>
</style>