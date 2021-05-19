<template>
  <v-container>
    <run-exam-register v-model="openExamRegister" />

    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        Cadastro de Vestibulares
      </v-card-title>
      <v-card-text class="mt-3">
        <v-card-actions class="mt-3 mb-3">
          <v-card-title class="ml-n1"
            >Lista de Vestibulares Cadastrados</v-card-title
          >
          <v-spacer></v-spacer>
          <v-btn class="white--text ml-n1" color="primary" @click="addExam()"
            >Cadastrar Vestibular</v-btn
          >
        </v-card-actions>

        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Vestibular</th>
                    <th>Ano</th>
                    <th class="text-center">Semestre</th>
                    <th class="text-center">Fase</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(exam, i) in exams" :key="i">
                    <td>{{ exam.title }}</td>
                    <td>{{ exam.year }}</td>
                    <td class="text-center">{{ exam.semester }}</td>
                    <td class="text-center">{{ exam.phase }}</td>
                    <td class="text-center">
                      <v-btn elevation="0" icon>
                        <v-icon @click="updateExam(i)">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn @click="removeDialog(i)" elevation="0" icon>
                        <v-icon>mdi-delete</v-icon>
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
    <run-remove-dialog :method="deleteExam" v-model="openRemoveDialog" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { ExamModule } from "@/store/modules/exam.module";
import RunExamRegister from "@/pages/admin/exam/ExamRegister.vue";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import { mdiDelete, mdiPencil } from "@mdi/js";
import ExamModel from "@/models/exam.model";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";

@Component({
  name: "ExamList",
  components: { RunExamRegister, RunRemoveDialog },
})
export default class ExamList extends Vue {
  examModule = getModule(ExamModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  page = 0;
  index = 0;
  openRemoveDialog = false;
  openExamRegister = false;
  icons = {
    mdiDelete,
    mdiPencil,
  };

  get exams() {
    return this.examModule.exams;
  }

  get snack() {
    return this.validationMessageModule.snack;
  }

  set snack(newValue: boolean) {
    this.validationMessageModule.setSnack(newValue);
  }

  get dialog() {
    return this.examModule.dialog;
  }

  set dialog(newValue) {
    this.examModule.setDialog(newValue);
  }

  removeDialog(i) {
    this.index = i;
    this.openRemoveDialog = true;
  }

  updateExam(i: number) {
    this.examModule.setExam(this.examModule.exams[i]);
    this.examModule.setRegisterStatus(RegisterStatusEnum.UPDATE);
    this.openExamRegister = true;
  }

  deleteExam() {
    const exam = this.examModule.exams[this.index];
    this.examModule
      .delete(exam.id)
      .then((res) => {
        if (res.status == 200) {
          this.openRemoveDialog = false;
          this.validationMessageModule.setSnack(true);
          const v = new ValidationMessage(
            "Vetibular excluído com sucesso",
            TypeMessage.SUCCESS,
          );
          this.validationMessageModule.setValidation(v);
          this.examModule.exams.splice(this.index, 1);
        }
      })
      .catch(() => {
        const v = new ValidationMessage(
          "Erro ao remover vestibular",
          TypeMessage.SUCCESS,
        );
        this.validationMessageModule.setValidation(v);
      });
  }

  addExam() {
    this.examModule.setRegisterStatus(RegisterStatusEnum.INSERT);
    this.examModule.setExam(new ExamModel());
    this.openExamRegister = true;
  }

  created() {
    this.examModule.findAll();
  }
}
</script>

<style scoped>
</style>
