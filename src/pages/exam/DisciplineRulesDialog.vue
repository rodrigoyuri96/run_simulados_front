<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title class="headline teal lighten-2 white--text">
         Regras de Disciplina
      </v-card-title>

      <v-card-text>
        <run-discipline v-model="disciplineRule.discipline" class="mt-5"/>
        <v-text-field v-model="disciplineRule.numberOfQuestions" outlined dense label="Número de Questões"/>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          outlined
          @click="commit()"
        >
          Ok
        </v-btn>
        <v-btn
          color="secondary"
          outlined
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import RunDiscipline from '@/components/run/Disciplines'
import { ExamModule } from '@/store/modules/ExamModule'
import { getModule } from 'vuex-module-decorators'

@Component({
  name: 'DisciplineRulesDialog',
  components: { RunDiscipline }
})
export default class DisciplineRulesDialog extends Vue {
    examModule = getModule(ExamModule, this.$store)

    get disciplineRule() {
      return this.examModule.disciplineRule
    }

    set disciplineRule(newValue) {
      this.examModule.setDisciplineRule(newValue)
    }

    get dialog() {
      return this.examModule.disciplineRulesDialog
    }

    set dialog(newValue) {
      this.examModule.setDisciplineRulesDialog(newValue)
    }

    commit() {
      if (!this.examModule.isUpdate) {
        this.examModule.exam.disciplinesRules.push(this.disciplineRule)
      }
      this.examModule.setDisciplineRulesDialog(false)
    }

}
</script>

<style scoped>

</style>
