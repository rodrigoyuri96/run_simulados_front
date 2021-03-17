<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row class="flex-grow-0" dense>
      <v-col>
        <v-btn @click="dialog = true">Adicionar Opção</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card height="100%">
        <v-card-title>Cadastro de Opções</v-card-title>
        <v-card-text>
          <v-row >
            <v-col cols="2">
              <v-switch
                v-model="question.tableFlag"
                label="Formato Tabela"
                @change="verifyTableFlag"
              />
            </v-col>
            <v-col cols="4">
              <v-switch
                v-model="question.imageFlag"
                label="Adicionar Imagem nas opções (obs: Limpa os campos abaixo)"
              />
            </v-col>
            <v-col v-if="question.tableFlag" cols="3">
              <v-switch
                v-model="question.headerImageFlag"
                label="Adicionar Imagem no cabeçalho"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <run-simple-option v-if="!question.tableFlag" :image-flag="question.imageFlag"></run-simple-option>
              <run-option-table v-else :image-header-flag="question.headerImageFlag"></run-option-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {QuestionModule} from "@/store/modules/QuestionModule";
import RunSimpleOption from "@/components/run/question/options/SimpleOption.vue";
import RunOptionTable from "@/components/run/question/options/OptionTable.vue";


@Component({
  name:'Options',
  components: {RunSimpleOption, RunOptionTable}
})
export default class Options extends Vue {
  @Prop({type: String}) content: string | "";
  questionModule = getModule(QuestionModule, this.$store)
  dialog = false
  get question(){
    return this.questionModule.question
  }

  set question(newValue){
    this.questionModule.setQuestion(newValue)
  }

  verifyTableFlag(){
    if(this.question.imageFlag){
      this.question.headerImageFlag = false
    }
  }

}
</script>


<style scoped>

</style>
