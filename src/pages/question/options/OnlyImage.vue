<template>
  <v-dialog
    id="OnlyImage" 
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
        <v-card-title>Opção Somente Imagens</v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12">
            <v-checkbox
              label="Alternativa Correta"
              color="Green"
              hide-details
            ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
          <v-sheet class="pa-3">
            <v-skeleton-loader 
            class="mx-auto" 
            max-width="300" 
            type="card"
            ></v-skeleton-loader>
          </v-sheet>
            </v-col>
          </v-row>
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
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import {getModule} from 'vuex-module-decorators'
import {OptionModule} from '@/store/modules/OptionModule'
import Option from '@/models/Option'
import Options from './Options.vue'

@Component({  })

export default class OnlyText extends Vue {

  optionModule = getModule(OptionModule, this.$store)

  get dialog() {
    return this.optionModule.dialog
  }

  set dialog(newValue: Boolean) {
    this.optionModule.setDialog(newValue)
  }

};
</script>

<style>
</style>