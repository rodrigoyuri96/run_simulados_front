<template>
  <v-dialog v-model="dialog" width="1200px" scrollable >

    <v-card class="form-group">

      <v-card-title 
        class="headline teal lighten-2 white--text font-weight-regular">
        {{ isInsert? 'Cadastro de Questão' : 'Atualização Questão' }}
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = !dialog" >
          <v-icon class="white--text" >mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row class="mt-5">
            <v-col cols="6">
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
            <v-col cols="6">
              <run-exams
                @valid="isValidExam = $event"
                v-model="question.exam" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <run-subjects
                @valid="isValidSubject = $event"
                v-model="question.subjects" />
            </v-col>
            <v-col cols="6">
              <run-disciplines
                @valid="isValidDiscipline = $event"
                v-model="question.discipline" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-editor
                v-model="content"
                :exam="question.exam"
                :numberQuestion="question.numberQuestion"
                :discipline="question.discipline"
                @dialog-status-change="dialog = $event"
              ></run-editor>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="openQuestion = true" color="primary" class="white--text" >
                Pré-visualização
              </v-btn>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col align-self="center"></v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12">
             <!-- <run-option></run-option> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-btn 
                block 
                color="primary"
                :disabled="!valid" 
                class="white--text"
                @click="save()">
                {{ isInsert ? 'Salvar' : 'Atualizar' }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn 
                class="white--text" 
                dark 
                block 
                color="secondary" 
                @click="reset()">
                Cancelar
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>
    </v-card>
    <run-question v-model="openQuestion" :content="content" />
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Emit, VModel } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { QuestionModule } from "@/store/modules/QuestionModule";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { RegisterStatus } from '@/models/RegisterStatus'
import QuestionRegister from "../../models/QuestionRegister";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunExams from "@/components/run/exam/Exams.vue";
import RunSubjects from "@/components/run/Subjects.vue"
import ValidationMessage from "@/models/validation/ValidationMessage";
import RunEditor from "@/components/run/editor/RunEditor.vue"
import RunQuestion from "@/components/run/question/Question.vue";
import RunOption from "@/components/run/question/options/Options.vue";


@Component({

  name: "QuestionRegisters",

  components: {
    RunDisciplines, 
    RunExams, RunEditor, 
    RunQuestion, 
    RunOption, 
    RunSubjects
  }

})

export default class QuestionRegisters extends Vue {

  questionRegisterModule = getModule(QuestionModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);

  @VModel({ type: Boolean }) dialog: boolean | false

  content: String = ""
  isValidDiscipline: boolean = false
  isValidExam: boolean = false
  isValidSubject: boolean = false
  valid: boolean = false
  openQuestion: boolean = false

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question() {
    return this.questionRegisterModule.question;
  }

  get validForm(): boolean {
    return this.valid && this.isValidDiscipline && this.isValidExam && this.isValidSubject
  }

  get isInsert() {
    return this.questionRegisterModule.registerStatus === RegisterStatus.INSERT
  }

  set question(question: QuestionRegister) {
    this.questionRegisterModule.setQuestion(question);
  }

  created() {
    this.questionRegisterModule.findAll();
  }

  save() {
    if (this.questionRegisterModule.validUpdate == true) {
      this.dialog = false
      const v = new ValidationMessage("Questão editada com sucesso", TypeMessage.SUCCESS, true, "", 3000);
      this.validationMessageModule.setValidation(v);
    } else {
      this.questionRegisterModule.save(this.question);
      const v = new ValidationMessage("Questão salva com sucesso", TypeMessage.SUCCESS, true, "", 3000);
      this.validationMessageModule.setValidation(v);
      this.dialog = false
    }
  }

  reset() {
    this.question = new QuestionRegister();
    this.dialog = false
  }

}
</script>

<style>
</style>
