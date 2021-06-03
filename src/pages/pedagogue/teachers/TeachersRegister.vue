<template>
  <v-dialog v-model="dialog" width="1500px">
    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        Cadastro de professor
        <v-spacer></v-spacer>
        <v-btn icon @click="cancel">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Dados Pessoais
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Turmas
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Revisão </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text class="mt-3">
                <v-form ref="form" v-model="valid">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="teacher.name"
                        outlined
                        label="Nome do professor"
                        :rules="[
                          (e) => !!e || 'Campo obrigatório',
                          (e) =>
                            (e && e.length >= 6) || 'Digite um nome válido',
                        ]"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="teacher.email"
                        outlined
                        label="E-mail"
                        :rules="requiredEmail"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="teacher.phone"
                        outlined
                        label="Número do celular"
                        type="number"
                        placeholder="Ex: 11900000000"
                        :rules="[
                          (e) => !!e || 'Campo obrigatório',
                          (e) =>
                            (e && e.length == 11) ||
                            'Digite um telefone válido',
                        ]"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>

                <v-row align="center" justify="center">
                  <v-col cols="4" align-self="end">
                    <v-btn
                      block
                      color="primary"
                      class="white--text"
                      @click="e1 = 2"
                      :disabled="!valid"
                    >
                      Continuar
                    </v-btn>
                  </v-col>

                  <v-col cols="4" align-self="start">
                    <v-btn
                      block
                      color="secondary"
                      class="white--text"
                      @click="cancel"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card-text>
                <v-form ref="form" v-model="validClasses">
                  <v-row align="center" justify="center">
                    <v-col cols="5">
                      <run-discipline
                        v-model="classesRules.discipline"
                        :rules="[(i) => !!i || 'Campo obrigatório']"
                      ></run-discipline>
                    </v-col>
                    <v-col cols="5">
                      <run-class
                        v-model="classesRules.class"
                        :rules="[(i) => !!i || 'Campo obrigatório']"
                      >
                      </run-class>
                    </v-col>
                    <v-col cols="2" align-self="start">
                      <v-btn
                        color="primary"
                        class="white--text"
                        x-large
                        @click="addClass"
                        :disabled="!validClasses"
                      >
                        Inserir
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col align-self="start">
                      <v-card-title
                        >Turmas e Disciplinas selecionadas</v-card-title
                      >
                    </v-col>
                  </v-row>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-center">Turma</th>
                          <th class="text-center">Disciplina</th>
                          <th class="text-center">Excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(rule, i) in teacher.classesRules"
                          :key="i"
                          class="text-center"
                        >
                          <td>{{ rule.discipline.name }}</td>
                          <td>{{ rule.class.name }}</td>
                          <td class="ml-5">
                            <v-btn
                              text
                              color="deep-orange accent-4"
                              @click="deleteClass(i)"
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
                </v-form>

                <v-row align="center" justify="center">
                  <v-col cols="3" align-self="start">
                    <v-btn
                      block
                      color="secondary"
                      class="white--text"
                      @click="e1 = 1"
                    >
                      Voltar
                    </v-btn>
                  </v-col>

                  <v-col cols="3" align-self="end">
                    <v-btn
                      block
                      color="primary"
                      class="white--text"
                      @click="e1 = 3"
                      :disabled="!isValid"
                    >
                      Continuar
                    </v-btn>
                  </v-col>

                  <v-col cols="3" align-self="end">
                    <v-btn
                      block
                      color="secondary"
                      class="white--text"
                      @click="cancel"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card>
                <v-card-title> Revisão dos dados </v-card-title>
                <v-card-text>
                  <v-card-subtitle style="font-size: 18px"
                    >Dados básicos</v-card-subtitle
                  >
                  <v-row>
                    <v-col>
                      <div
                        style="
                          margin-left: 5%;
                          font-size: 16px;
                          color: black;
                          font-weight: bold;
                        "
                      >
                        Nome do professor: {{ teacher.name }}
                        <v-spacer></v-spacer>
                        E-mail: {{ teacher.email }}
                        <v-spacer></v-spacer>
                        Telefone: {{ teacher.phone }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-card-subtitle style="font-size: 18px"
                    >Turmas e Disciplinas selecionadas</v-card-subtitle
                  >
        
                      <v-row style="margin-left: 3%; font-size: 16px; color: black; font-weight: bold;">
                        <v-col cols="12">
                        Turma(s) selecionada(s): 
                        </v-col>
                        <v-spacer></v-spacer>
                     
                          <v-col cols="12">
                            Disciplina(s) selecionada(s):
                            <run-tag :tags="tags"></run-tag>
                          </v-col>    
                      </v-row>
    
                </v-card-text>
                <v-row align="center" justify="center">
                  <v-col cols="3" align-self="start">
                    <v-btn
                      block
                      color="secondary"
                      class="white--text"
                      @click="e1 = 2"
                    >
                      Voltar
                    </v-btn>
                  </v-col>

                  <v-col cols="3" align-self="end">
                    <v-btn
                      block
                      color="primary"
                      class="white--text"
                      @click="e1 = 1"
                    >
                      Salvar
                    </v-btn>
                  </v-col>

                  <v-col cols="3" align-self="start">
                    <v-btn
                      block
                      color="secondary"
                      class="white--text"
                      @click="cancel"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { TeacherModule } from "@/store/modules/teacher.module";
import { getModule } from "vuex-module-decorators";
import { mdiDelete, mdiPencil } from "@mdi/js";
import TeacherModel from "@/models/teacher/teacher.model";
import ClassesRulesModel from "@/models/teacher/class.rules.model";
import RunDiscipline from "@/components/run/Disciplines.vue";
import RunClass from "@/components/run/Class.vue"
import DisciplineModel from "@/models/discipline.model";
import RunTag from "@/components/run/Tags.vue";

@Component({
  name: "TeacherRegister",
  components: { RunDiscipline, RunTag, RunClass },
})
export default class TeachersRegister extends Vue {
  @VModel() dialog: boolean;

  teacherModule = getModule(TeacherModule, this.$store);
  private selectedDiscipline: DisciplineModel = null;
  e1 = 1;
  turmas = ["Ex 1", "Ex 2", "Ex 3"];
  valid: boolean = false;
  validClasses: boolean = false;
  private requiredEmail = [
    (e) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e) ||
      "Digite um e-mail válido",
  ];
  private requiredRules = [(e) => !!e || "Campo obrigatório"];

  icons = {
    mdiDelete,
    mdiPencil,
  };

  get tags() {
    let tags = this.teacher.classesRules.map((s) => {
      return s.discipline.name;
    });
    return tags;
  }

  get isValid() {
    return this.teacher.classesRules.length > 0;
  }

  get teacher() {
    return this.teacherModule.teacher;
  }

  set teacher(teacher: TeacherModel) {
    this.teacherModule.setTeacher(teacher);
  }

  get classesRules() {
    return this.teacherModule.classRule;
  }

  set classesRules(newValue) {
    this.teacherModule.setClassRule(newValue);
  }

  addClass() {
    this.teacherModule.setIndex(-1);
    this.teacherModule.teacher.classesRules.push(this.classesRules);
    this.teacherModule.setClassRule(new ClassesRulesModel());
  }

  deleteClass(index: number) {
    this.teacherModule.teacher.classesRules.splice(index, 1);
  }

  save() {}

  cancel() {
    this.dialog = false;
    this.e1 = 1;
  }
}
</script>

<style scoped>
</style>