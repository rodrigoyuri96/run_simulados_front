<template>
  <v-row align="center" justify="center">
    <v-dialog v-model="dialog">
      <exam-register></exam-register>
    </v-dialog>
    <v-card class="form-group mt-0" width="80%" height="95%">
      <v-card-title class="headline teal lighten-2 white--text">Cadastro de Vestibulares</v-card-title>

      <v-card-text class="mt-3">
        <v-row alignament="end" justify="end" no-gutters>
          <v-col align-self="end" class="ml-16" md="4">
            <v-btn class="white--text" color="primary" @click="addExam()">
              Cadastrar Vestibular
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table
          fixed-header
          height="250px"
        >
          <template v-slot:default>
            <thead class="mb-6">
            <tr>
              <th class="text-left">
                Vestibular
              </th>
            </tr>
            </thead>
            <tbody class="mt-6">
            <tr
              v-for="(exam,i) in exams"
              :key="i"
              class="text-center mt-1"
            >
              <td>{{ exam.title }}</td>
              <td class="ml-5">
                <v-btn text color="teal" @click="updateExam(i)" >
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
                <v-btn text color="deep-orange accent-4" @click="deleteExam(i)">
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
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { ExamModule } from '@/store/modules/ExamModule'
import ExamRegister from '@/pages/exam/ExamRegister.vue'
import { RegisterStatus } from '@/models/RegisterStatus'
import { mdiDelete, mdiPencil } from '@mdi/js'
import Exam from "@/models/Exam";

@Component({
  name: 'ExamList',
  components:{ ExamRegister }
})
export default class ExamList extends Vue {
  examModule = getModule(ExamModule, this.$store)

  icons = {
    mdiDelete,
    mdiPencil
  }

  get exams() {
    return this.examModule.exams
  }

  get dialog() {
    return this.examModule.dialog
  }

  set dialog(newValue) {
    this.examModule.setDialog(newValue)
  }

  updateExam(i: number) {
    console.log(this.examModule.exams[i])
    this.examModule.setExam(this.examModule.exams[i])
    this.examModule.setRegisterStatus(RegisterStatus.UPDATE)
    this.examModule.setDialog(true)
  }

  deleteExam(i: number) {
    this.examModule.exams.splice(i,1)
  }

  addExam() {
    this.examModule.setRegisterStatus(RegisterStatus.INSERT)
    this.examModule.setExam(new Exam())
    this.examModule.setDialog(true)

  }
}
</script>

<style scoped>

</style>
