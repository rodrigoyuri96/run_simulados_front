<template>
  <v-container>
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
                  v-model="question.numberOfQuestion"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <run-exams
                  :rules="requiredField"
                  v-model="selectedExam" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <run-disciplines
                  :rules="requiredField"
                  v-model="selectedDisciplines" />
              </v-col>
              <v-col cols="6">
                <run-subjects
                  :rules="requiredField"
                  v-model="selectedSubjects" />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <run-editor
                  v-model="question.content"
                  :exam="question.exam"
                  :numberQuestion="question.numberQuestion"
                  :discipline="question.discipline"
                  @dialog-status-change="dialog = $event"
                ></run-editor>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-btn @click="optionDialog = true" block color="primary" class="white--text">{{ optionButton }}</v-btn>
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
              <v-col cols="4">
                <v-btn
                  block
                    color="primary"
                  :disabled="!valid"
                  class="white--text"
                  @click="save()">
                  {{ isInsert ? 'Salvar' : 'Atualizar' }}
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn @click="openQuestion = true" color="yellow" class="black--text" block>
                  Pré-visualização
                </v-btn>
              </v-col>
              <v-col cols="4">
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
      <run-question v-model="openQuestion" :content=" question.content" />
    </v-dialog>

    <run-option-register v-model="optionDialog" :is-insert="isInsert"></run-option-register>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { QuestionModule } from "@/store/modules/question.module";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { RegisterStatusEnum } from '@/models/register.status.enum'
import QuestionRegisterModel from "@/models/question.register.model";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunExams from "@/components/run/exam/Exams.vue";
import RunSubjects from "@/components/run/Subjects.vue"
import ValidationMessage from "@/models/validation/ValidationMessage";
import RunEditor from "@/components/run/editor/RunEditor.vue"
import RunQuestion from "@/components/run/question/Question.vue";
import RunOptionRegister from "@/pages/admin/question/options/OptionRegister.vue";
import ExamModel from "@/models/exam.model";
import DisciplineModel from "@/models/discipline.model";
import SubjectsModel from "@/models/subjects.model";


@Component({

  name: "QuestionRegisters",

  components: {
    RunDisciplines,
    RunExams, RunEditor,
    RunQuestion,
    RunOptionRegister,
    RunSubjects,
  }

})

export default class QuestionRegisters extends Vue {
  @VModel({ type: Boolean }) dialog: boolean | false

  questionRegisterModule = getModule(QuestionModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);

  private requiredField = [ v=> !!v || 'Campo obrigatório']
  private questionRegisterModel = new QuestionRegisterModel()
  private selectedExam: ExamModel = null
  private selectedDisciplines: DisciplineModel = null
  private selectedSubjects: SubjectsModel = null
  valid: boolean = false
  openQuestion: boolean = false
  optionDialog: boolean = false

  get optionButton(): String{
    return this.question.options.length == 0 ? 'Adicionar Opções' : 'Editar Opções'
  }

  get questions() {
    return this.questionRegisterModule.questions;
  }

  get question() {
    return this.questionRegisterModule.question;
  }

  get isInsert() {
    return this.questionRegisterModule.registerStatus === RegisterStatusEnum.INSERT
  }

  set question(question: QuestionRegisterModel) {
    this.questionRegisterModule.setQuestion(question);
  }

  created() {
    this.questionRegisterModule.findAll();
  }

  save() {
    this.questionRegisterModel.exam = this.selectedExam
    this.questionRegisterModel.discipline = this.selectedDisciplines
    this.questionRegisterModel.subject = this.selectedSubjects

    if (this.questionRegisterModule.validUpdate == true) {
      this.dialog = false
      const v = new ValidationMessage("Questão editada com sucesso", TypeMessage.SUCCESS);
      this.validationMessageModule.setValidation(v);
    } else {
      this.questionRegisterModule.save().then(res=>{
        const v = new ValidationMessage("Questão salva com sucesso", TypeMessage.SUCCESS);
        this.validationMessageModule.setValidation(v);
        this.dialog = false
        console.log("questao", res)
      }).catch(error=>{
        const v = new ValidationMessage("Erro ao salvar questão", TypeMessage.ERROR);
        console.log("Erro ao salvar questão", error)
      });
    }
  }

  reset() {
    this.question = new QuestionRegisterModel();
    this.dialog = false
  }

}
</script>

<style>
</style>
