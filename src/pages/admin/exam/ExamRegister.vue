<template>
  <v-dialog v-model="dialog" width="1500px" scrollable>
    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        {{ isInsert ? "Cadastro de Vestibular" : "Atualização do vestibular" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = !dialog">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form v-model="validExam">
          <v-row class="mt-5">
            <v-col>
              <v-text-field
                v-model="exam.title"
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e.length <= 40) ||
                    'O título do vestibular deve ter até 40 caracteres',
                ]"
                counter="40"
                outlined
                dense
                label="Título do vestibular"
              />
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="exam.year"
                :items="years"
                :rules="[(e) => !!e || 'Campo obrigatório']"
                label="Ano do vestibular"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <run-institution
                v-model="exam.institution"
                @valid="validInstitution = $event"
                :rules="[(i) => !!i || 'Campo obrigatório']"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="exam.book"
                label="Caderno(Opcional)"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="exam.semester"
                :items="items"
                :rules="[(e) => !!e || 'Campo obrigatório']"
                outlined
                dense
                label="Semestre do vestibular"
              >
                <template v-slot:selection="{}">
                  <span class="pink--text">
                    {{ exam.semester }}º Semestre
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="exam.phase"
                :items="items"
                :rules="[(e) => !!e || 'Campo obrigatório']"
                outlined
                dense
                label="Fase vestibular"
              >
                <template v-slot:selection="{}">
                  <span class="pink--text"> {{ exam.phase }}º Fase </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-textarea
                v-model="exam.obs"
                outlined
                dense
                label="Observação (Opcional)"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col align-self="start">
            <v-card-title>Cadastro de regras</v-card-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col align-self="end" class="ml-16">
            <v-btn color="primary" class="white--text" @click="addRule()">
              Adicionar Regra Disciplina
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Disciplina</th>
                <th class="text-center">Número de Questões</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(rule, i) in exam.disciplinesRules"
                :key="i"
                class="text-center"
              >
                <td>{{ rule.discipline.name }}</td>
                <td>{{ rule.numberOfQuestions }}</td>
                <td class="ml-5">
                  <v-btn text color="teal" @click="updateRule(i)">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    color="deep-orange accent-4"
                    @click="deleteRule(i)"
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
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="4" align-self="end">
              <v-btn
                block
                color="primary"
                class="white--text"
                :disabled="!isValid"
                @click="save"
              >
                {{ isInsert ? "Salvar" : "Atualizar" }}
              </v-btn>
            </v-col>

            <v-col cols="4" align-self="start">
              <v-btn
                :disabled="!validateUpdateAction"
                block
                color="secondary"
                class="white--text"
                @click="cancel()"
              >
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <discipline-rules-dialog
      :dialog="dialogDisciplineRules"
    ></discipline-rules-dialog>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, VModel } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { ExamModule } from "@/store/modules/exam.module";
import { InstitutionModule } from "../../../store/modules/institution.module";
import ExamModel from "@/models/exam.model";
import RunInstitution from "@/components/run/Institutions.vue";
import DisciplineRulesDialog from "@/pages/admin/exam/DisciplineRulesDialog.vue";
import { mdiDelete, mdiPencil } from "@mdi/js";
import DisciplineRulesModel from "@/models/discipline.rules.model";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { RegisterStatusEnum } from "@/models/register.status.enum";

@Component({
  name: "ExamRegister",
  components: { RunInstitution, DisciplineRulesDialog },
})
export default class ExamRegister extends Vue {
  @VModel({ type: Boolean }) dialog: boolean | false;

  examModule = getModule(ExamModule, this.$store);
  institutionModule = getModule(InstitutionModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  items = [1, 2];
  validInstitution: boolean = false;
  validExam = false;

  icons = {
    mdiDelete,
    mdiPencil,
  };

  get isInsert() {
    return this.examModule.registerStatus === RegisterStatusEnum.INSERT;
  }

  get isValid() {
    return (
      this.validExam &&
      this.validInstitution &&
      this.exam.disciplinesRules.length > 0
    );
  }

  constructor() {
    super();
  }

  get years() {
    const years = [];

    for (let i = 2021; i > 2008; i--) {
      years.push(i);
    }

    return years;
  }

  get exam() {
    return this.examModule.exam;
  }

  set exam(exam: ExamModel) {
    this.examModule.setExam(exam);
  }

  get disciplinesRules() {
    return this.examModule.disciplinesRules;
  }

  get dialogDisciplineRules() {
    return this.examModule.disciplineRulesDialog;
  }

  get snack() {
    return this.validationMessageModule.snack;
  }

  set snack(newValue: boolean) {
    this.validationMessageModule.setSnack(newValue);
  }

  set dialogDisciplineRules(newValue: boolean) {
    this.examModule.setDisciplineRulesDialog(newValue);
  }

  addRule() {
    this.examModule.setDisciplineRule(new DisciplineRulesModel());
    this.examModule.setIndex(-1);
    this.dialogDisciplineRules = true;
  }

  save() {
    const v = new ValidationMessage(
      "Vestibular salvo com sucesso",
      TypeMessage.SUCCESS,
    );
    this.dialog = false;
    if (this.examModule.registerStatus == RegisterStatusEnum.INSERT) {
      this.examModule.save().then((res) => {
        if (!(res.status == 201)) {
          v.message = "Erro ao salvar vestibular";
          v.type = TypeMessage.ERROR;
          this.examModule.addToExams(res.data);
        }
      });
    } else {
      this.examModule
        .update()
        .then((res) => {
          if (!(res.status == 200)) {
            v.message = "Erro ao atualizar vestibular";
            v.type = TypeMessage.ERROR;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      v.message = "Vestibular atualizado com sucesso";
    }

    this.validationMessageModule.setValidation(v);
    this.examModule.findAll();
    this.examModule.setDialog(false);
  }

  get validateUpdateAction(): Boolean {
    return this.examModule.registerStatus == RegisterStatusEnum.UPDATE
      ? this.isValid
      : new Boolean(true);
  }

  updateRule(index: number) {
    this.examModule.setDisciplineRule(
      this.examModule.exam.disciplinesRules[index]
    );
    this.examModule.setIndex(index);
    this.examModule.setDisciplineRulesDialog(true);
  }

  deleteRule(index: number) {
    this.examModule.exam.disciplinesRules.splice(index, 1);
  }

  cancel() {
    this.exam = new ExamModel();
    this.dialog = false;
  }
}
</script>

<style scoped>
</style>
