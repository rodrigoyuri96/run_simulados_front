<template>
  <v-container>
    <run-question-register v-model="openQuestionRegister" />
    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >Cadastro de Questões</v-card-title>
      <v-card-text>
        <v-card-actions class="mt-3 mb-3">
          <v-card-title class="ml-n1">Lista de Questões Cadastradas</v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="white--text ml-n1" color="primary" @click="addQuestion()">Cadastrar Questão</v-btn>
        </v-card-actions>

        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Vestibular</th>
                    <th>Ano Vestibular</th>
                    <th class="text-cenet">Disciplina</th>
                    <th class="text-center">Questão</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(question, i) in questions" :key="i">
                    <td>{{question.exam.title}}</td>
                    <td>{{question.exam.year}}</td>
                    <td>{{question.discipline.name}}</td>
                    <td class="text-center">{{question.numberOfQuestion}}</td>
                    <td class="text-center">
                      <v-btn elevation="0" icon>
                        <v-icon @click="updateQuestion(i)">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn @click="removeDialog(i)" elevation="0" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn icon @click="openQuestion = true">
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
    <run-question
      v-model="openQuestion"
      :card="false"
      :content="content" />
    <run-remove-dialog
      :method="deleteQuestion"
      v-model="openRemoveDialog" />
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
import QuestionRegister from "../../models/QuestionRegister";
import RunQuestion from "@/components/run/question/Question.vue";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";
import Question from '@/models/question/Question';

@Component({
  name: "QuestionList",
  components: { RunQuestionRegister, RunQuestion, RunRemoveDialog }
})
export default class QuestionList extends Vue {
  questionRegisterModule = getModule(QuestionModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  openRemoveDialog = false;
  index = 0;
  openQuestionRegister = false;
  openQuestion = false

  private modal: boolean = false;
  content: String = "";

  icons = {
    mdiDelete,
    mdiPencil
  };

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question() {
    return this.questionRegisterModule.question;
  }

  get snack() {
    return this.validationMessageModule.snack;
  }

  set snack(newValue: boolean) {
    this.validationMessageModule.setSnack(newValue);
  }

  get dialog() {
    return this.questionRegisterModule.dialog;
  }

  set dialog(newValue) {
    this.questionRegisterModule.setDialog(newValue);
  }

  set question(newValue: QuestionRegister) {
    this.questionRegisterModule.setQuestion(newValue);
  }

  removeDialog(i) {
    this.index = i;
    this.openRemoveDialog = true;
  }

  updateQuestion(i: number) {
    this.questionRegisterModule.setQuestion( this.questionRegisterModule.questions[i]);
    this.questionRegisterModule.setRegisterStatus(RegisterStatus.UPDATE);
    this.questionRegisterModule.setValidUpdate(true);
    this.openQuestionRegister = true
  }

  deleteQuestion() {
    const question = this.questionRegisterModule.questions[this.index];
    let message = null;
    this.questionRegisterModule.deleteQuestion(question.id).then(res=>{
      if(res.status == 200){
        this.openRemoveDialog = false;
        this.validationMessageModule.setSnack(true);
         message = new ValidationMessage(
          "Questão removida com sucesso",
          TypeMessage.SUCCESS,
          true,
          "",
          3000
        );
        this.questionRegisterModule.questions.splice(this.index, 1)
      }
    }).catch(()=>{
      message = new ValidationMessage(
        "Erro ao remover questão",
        TypeMessage.ERROR,
        true,
        "",
        3000
      );
    })
    this.validationMessageModule.setValidation(message);
  }

  addQuestion() {
    this.questionRegisterModule.setRegisterStatus(RegisterStatus.INSERT);
    this.questionRegisterModule.setValidUpdate(false);
    this.questionRegisterModule.setQuestion(new QuestionRegister());
    this.openQuestionRegister = true;
    //this.questionRegisterModule.setDialog(true)
  }

  openDialog() {
    this.modal = true;
  }

  created() {
    this.questionRegisterModule.findAll();
  }
}
</script>

<style scoped>
</style>
