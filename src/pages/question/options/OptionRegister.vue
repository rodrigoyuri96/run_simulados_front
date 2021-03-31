<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-dialog v-model="dialog" scrollable max-width="800">
      <v-card>
        <v-card-title
          class="headline teal lighten-2 white--text font-weight-regular">
          {{ isInsert? 'Registro de Opções' : 'Atualização de Opções' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = !dialog" >
            <v-icon class="white--text" >mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row >
            <v-col cols="3">
              <v-switch
                v-model="question.tableFlag"
                label="Formato Tabela"
                @change="verifyTableFlag"
              />
            </v-col>
            <v-col cols="5">
              <v-switch
                v-model="question.imageFlag"
                label="Adicionar Imagem nas opções (obs: Limpa os campos abaixo)"
              />
            </v-col>
            <v-col v-if="question.tableFlag" cols="4">
              <v-switch
                v-model="question.headerImageFlag"
                label="Adicionar Imagem no cabeçalho"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <run-simple-option v-model="options" v-if="!question.tableFlag" :image-flag="question.imageFlag"></run-simple-option>
              <run-option-table v-model="options" v-else :image-header-flag="question.headerImageFlag"></run-option-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters class="ml-0 mr-0">
            <v-col class="mr-1">
              <v-btn :disabled="!(options.length >= 4 && options.length <= 5)" @click="save()" class="white--text" block color="primary">Salvar</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" block color="grey lighten-2">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {QuestionModule} from "@/store/modules/QuestionModule";
import RunSimpleOption from "@/components/run/question/options/SimpleOption.vue";
import RunOptionTable from "@/components/run/question/options_old/OptionTable.vue";
import Option from "@/models/question/Option";
import {OptionModule} from "@/store/modules/OptionModule";


@Component({
  name:'Options',
  components: {RunSimpleOption, RunOptionTable}
})
export default class Options extends Vue {
  @Prop({type: String}) content: string | "";
  @VModel({type:Boolean}) dialog: Boolean | false;
  @Prop({type: Boolean}) isInsert: Boolean | false;
  questionModule = getModule(QuestionModule, this.$store)
  optionsModule = getModule(OptionModule, this.$store)

  get question(){
    return this.questionModule.question
  }

  set question(newValue){
    this.questionModule.setQuestion(newValue)
  }

  get options(){
    return this.optionsModule.options
  }

  set options(newValue){
    this.optionsModule.setOptions(newValue)
  }

  verifyTableFlag(){
    if(this.question.imageFlag){
      this.question.headerImageFlag = false
    }
  }

  cancel(){
    this.options = []
    this.question.options = []
    this.dialog = false
  }

  save(){
    this.question.options = this.options
    this.dialog = false
  }

}
</script>


<style scoped>

</style>
