<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="headline teal lighten-2 white--text">
        Regras de Disciplina
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <run-discipline
            v-model="selectedDiscipline"
            :rules="requiredField"
            class="mt-5"
          />
          <v-text-field
            v-model="disciplineRule.numberOfQuestions"
            outlined
            dense
            :rules="requiredField"
            label="Número de Questões"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" outlined :disabled="!valid" @click="commit()"> Ok </v-btn>
        <v-btn color="secondary" outlined @click="dialog = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import RunDiscipline from "@/components/run/Disciplines.vue";
import { ExamModule } from "@/store/modules/exam.module";
import { getModule } from "vuex-module-decorators";
import DisciplineModel from "@/models/discipline.model";

@Component({
  name: "DisciplineRulesDialog",
  components: { RunDiscipline },
})
export default class DisciplineRulesDialog extends Vue {
  private requiredField = [(v) => !!v || "Campo obrigatório"];
  valid: boolean = false
  private selectedDiscipline: DisciplineModel = null

  examModule = getModule(ExamModule, this.$store);

  get disciplineRule() {
    return this.examModule.disciplineRule;
  }

  set disciplineRule(newValue) {
    this.examModule.setDisciplineRule(newValue);
  }

  get dialog() {
    return this.examModule.disciplineRulesDialog;
  }

  set dialog(newValue) {
    this.examModule.setDisciplineRulesDialog(newValue);
  }

  commit() {
    this.disciplineRule.discipline = this.selectedDiscipline

    if (!this.examModule.isUpdate) {
      this.examModule.exam.disciplinesRules.push(this.disciplineRule);
    }
    this.examModule.setDisciplineRulesDialog(false);
  }
}
</script>

<style scoped>
</style>
