<template>
  <v-container>
    <v-card class="form-group">
      <v-card-title>Cadastro de questões</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row class="mt-5">
            <v-col>
              <v-text-field
                :rules="[
                (v) => !!v || 'Campo obrigatório',
                (v) =>
                (v && v <= 180 && v >= 1) ||
                'O número da questão deve ser entre 1 a 180',
                ]"
                outlined
                dense
                required
                label="Número da Questão do Caderno"
                v-model="question.numberQuestion"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <run-exams v-model="question.exam"> </run-exams>
            </v-col>
            <v-col cols="6">
              <run-disciplines v-model="question.discipline"> </run-disciplines>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <strong>Titulo</strong>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <run-editor v-model="content" @dialog-status-change="dialog = $event"></run-editor>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="dialog=true, imprime()">
                Pré-visualização
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self="center"></v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12">
              <run-option></run-option>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="white--text"
                @click="save"
                :disabled="!validForm"
                dark
                block
                color="green"
              >Salvar</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn class="white--text" dark block color="secondary" @click="reset">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog">
      <run-question :content="content" />
    </v-dialog>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { QuestionRegisterModule } from "@/store/modules/QuestionRegisterModule";
import QuestionRegister from "../../models/QuestionRegister";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunExams from "@/components/run/exam/Exams.vue";
import { ExamModule } from "@/store/modules/ExamModule";
import { DisciplineModule } from "@/store/modules/DisciplineModule";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import RunEditor from "@/components/run/editor/RunEditor.vue"
import RunQuestion from "@/components/run/question/Question.vue";
import RunOption from "@/components/run/question/options/Options.vue";


@Component({
  name: "QuestionRegisters",
  components: {
    RunDisciplines, RunExams, RunEditor, RunQuestion, RunOption
  }})
export default class QuestionRegisters extends Vue {
  questionRegisterModule = getModule(QuestionRegisterModule, this.$store);
  examModule = getModule(ExamModule, this.$store);
  disciplineModule = getModule(DisciplineModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  content: String = ""
  dialog: Boolean = false

  private valid: boolean = false;

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question() {
    return this.questionRegisterModule.question;
  }

  get validForm(): boolean {
    return true
  }

  set question(question: QuestionRegister) {
    this.questionRegisterModule.setQuestion(question);
  }

  created() {
    this.questionRegisterModule.findAll();
  }

  save() {
    if (this.questionRegisterModule.validUpdate == true) {
      return this.questionRegisterModule.setDialog(false);
    } else {
      this.questionRegisterModule.save(this.question);
      const v = new ValidationMessage(
        "Questão salva com sucesso",
        TypeMessage.SUCCESS,
        true,
        "",
        3000
      );
      this.validationMessageModule.setValidation(v);
      return this.questionRegisterModule.setDialog(false);
    }
  }

  reset() {
    this.question = new QuestionRegister();
    return this.questionRegisterModule.setDialog(false);
  }


  imprime(){
    console.log("IMPRIMINDO: ", this.content)
  }
}
</script>

<style>
</style>
