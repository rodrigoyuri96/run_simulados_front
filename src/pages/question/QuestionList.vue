<template>
  <v-container>
    <v-dialog v-model="dialog">
      <run-question-register></run-question-register>
    </v-dialog>
    <v-card class="form-group">
      <v-card-title>Cadastro de Questões</v-card-title>
      <v-row alignament="center" justify="start" no-gutters>
        <v-col align-self="start">
          <v-card-title>Questões</v-card-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align-self="end" class="ml-12" md="4">
          <v-btn class="white--text" color="primary" @click="addQuestion()">
            Cadastrar Questão
          </v-btn>
        </v-col>
      </v-row>
      <v-card-text>
         <v-row>
        <v-col cols="12">
            <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            Vestibular
          </th>
          <th class="text-cenet">
            Disciplina
          </th>
          <th class="text-center" >
            Questão
          </th>
          <th class="text-center" >
              Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, i) in questions" :key="i">
          <td>{{question.exam.title}}</td>
          <td>{{question.discipline.name}}</td>
          <td class="text-center" >{{question.numberQuestion}}</td>
          <td class="text-center">
            <v-btn elevation="0" icon>
              <v-icon @click="updateQuestion(i)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="removeDialog(i)" elevation="0" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="openDialog(true)" >
              <v-icon>mdi-clipboard-text</v-icon>
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
    <div class="text-center">

    <v-dialog v-model="modal">
      <run-question :card="false" :content="content" />
    </v-dialog>

    </div>
    <run-remove-dialog 
      :method="deleteQuestion" 
      v-model="openRemoveDialog"  />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { QuestionModule } from "@/store/modules/QuestionModule";
import { RegisterStatus } from "@/models/RegisterStatus";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import { TypeMessage } from "@/models/validation/TypeMessage";
import ValidationMessage from "@/models/validation/ValidationMessage";
import RunQuestionRegister from "@/pages/question/QuestionRegister.vue";
import QuestionRegister from '../../models/QuestionRegister';
import RunQuestion from '@/components/run/question/Question.vue'
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue"


@Component({
  name: "QuestionList",
  components: { RunQuestionRegister, RunQuestion, RunRemoveDialog }
})
export default class QuestionList extends Vue {

  questionRegisterModule = getModule(QuestionModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  openRemoveDialog = false
  index = 0

  private modal: boolean = false
  content: String = ""

  icons = {
    mdiDelete,
    mdiPencil,
  };

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question(){
    return this.questionRegisterModule.question
  }

  get snack() {
    return this.validationMessageModule.snack
  }

  set snack(newValue: boolean) {
    this.validationMessageModule.setSnack(newValue)
  }

  get dialog() {
    return this.questionRegisterModule.dialog;
  }

  set dialog(newValue) {
    this.questionRegisterModule.setDialog(newValue);
  }

  set question(newValue: QuestionRegister){
    this.questionRegisterModule.setQuestion(newValue)
  }

  removeDialog(i) {
    this.index = i
    this.openRemoveDialog = true
  }

  updateQuestion(i: number) {
    this.questionRegisterModule.setQuestion(this.questionRegisterModule.questions[i])
    this.questionRegisterModule.setRegisterStatus(RegisterStatus.UPDATE)
    this.questionRegisterModule.setDialog(true)
    this.questionRegisterModule.setValidUpdate(true)
    console.log(this.questionRegisterModule.validUpdate)
  }

  deleteQuestion() {
    this.questionRegisterModule.questions.splice(this.index, 1);
    this.openRemoveDialog = false
    this.validationMessageModule.setSnack(true)
    const v = new ValidationMessage("Questão removida com sucesso", TypeMessage.SUCCESS, true, "", 3000);
    this.validationMessageModule.setValidation(v);
  }

  addQuestion() {
    this.questionRegisterModule.setValidUpdate(false)
    this.questionRegisterModule.setQuestion(new QuestionRegister())
    this.questionRegisterModule.setDialog(true)
  }

  openDialog() {
    this.modal = true
  }

  created() {
    this.questionRegisterModule.findAll()

  }
}
</script>

<style scoped>
</style>
