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
        <v-simple-table fixed-header height="250px">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Questão</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(question, i) in questions"
              :key="i"
              class="text-center"
            >
              <td>{{ question.numberQuestion}}</td>
              <td class="ml-5">
                <v-btn @click="updateQuestion(i)" text color="teal">
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteQuestion(i)"
                  text
                  color="deep-orange accent-4"
                >
                  <v-icon>
                    {{ icons.mdiDelete }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { QuestionRegisterModule } from "@/store/modules/QuestionRegisterModule";
import Question from "../../models/question/Question";
import RunQuestionRegister from "@/pages/question/QuestionRegister.vue";
import { RegisterStatus } from "@/models/RegisterStatus";
import { mdiDelete, mdiPencil } from "@mdi/js";

@Component({
  name: "QuestionList",
  components: {RunQuestionRegister},
})
export default class QuestionList extends Vue {
  questionRegisterModule = getModule(QuestionRegisterModule, this.$store);

  icons = {
    mdiDelete,
    mdiPencil,
  };

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question(){
    return new Question()
    //return this.questionRegiterModule.question
  }

  get dialog() {
    return this.questionRegisterModule.dialog;
  }

  set dialog(newValue) {
    this.questionRegisterModule.setDialog(newValue);
  }

  set question(newValue: Question){
    this.questionRegisterModule.setQuestion(newValue)
  }

  updateQuestion(i: number) {
    this.questionRegisterModule.setQuestion(this.questionRegisterModule.questions[i])
    this.questionRegisterModule.setRegisterStatus(RegisterStatus.UPDATE)
    this.questionRegisterModule.setDialog(true)
    this.questionRegisterModule.setValidUpdate(true)
    console.log(this.questionRegisterModule.validUpdate)
  }

  deleteQuestion(i: number) {
    this.questionRegisterModule.questions.splice(i, 1);
  }

  addQuestion() {
    this.questionRegisterModule.setValidUpdate(false)
    this.questionRegisterModule.setQuestion(new Question())
    this.questionRegisterModule.setDialog(true);
    console.log(this.questionRegisterModule.validUpdate)
    console.log(this.questionRegisterModule._question)
  }
}
</script>

<style scoped>
</style>
