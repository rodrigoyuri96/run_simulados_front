<template>
  <v-container margin-left="80px">
    <v-row class="mt-5">
      <v-col cols="5">
        <h3
          style="
            color: #a9a9a9;
            letter-spacing: 12px;
            font-size: 14px;
            font-family: Raleway;
          "
        >
          D E S A F I E - S E !
        </h3>

        <h2 class="text">
          Um simulado feito <span class="text2">por você</span>, para você!
        </h2>

        <v-img
          class="imagem"
          position="top"
          src="@/assets/images/emoge-nerd.png"
          max-width="50px"
        />

        <br />
        <h4 style="font-family: Raleway; font-size: 16px">
          Personalize o simulado da maneira que quiser selecionando as
          disciplinas e os assuntos que mais te interessam. Além disso você pode
          controlar o tempo de prova para se auto desafiar!
        </h4>
      </v-col>
      <v-col cols="6">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3"> </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4"> </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="5"> </v-stepper-step>

            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text class="mt-3">
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12">
                      <h3 style="font-family: Raleway; font-size: 24px">
                        Selecione a(s) disciplinas(s)
                      </h3>
                    </v-col>
                    <v-col cols="12">
                      <run-tag
                        v-model="simulated.disciplines"
                        :layoutUser="true"
                      ></run-tag>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <run-disciplines
                        :multiple="true"
                        :layoutUser="true"
                        v-model="simulated.disciplines"
                      ></run-disciplines>
                    </v-col>
                  </v-row>
                </v-form>

                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      x-large
                      text
                      class="voltar"
                      height="80px"
                      width="110%"
                      disabled
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: #00ddbb;
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="end">
                    <v-btn
                      text
                      x-large
                      class="avancar"
                      height="80px"
                      width="100%"
                      @click="e1 = 2"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: white;
                      "
                    >
                      Avançar
                      <v-spacer></v-spacer>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card-text>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12">
                      <h3
                        style="
                          font-family: Raleway-Bold;
                          font-size: 18px;
                          line-height: 29px;
                        "
                      >
                        Selecione os
                        <span style="color: #00ddbb">assustos</span> que serão
                        tratados de cada disciplina selecionada anteriomente
                      </h3>
                    </v-col>
                    <v-col cols="12">
                      <run-subjects
                        :layoutUser="true"
                        v-model="simulated.disciplines"
                      ></run-subjects>
                    </v-col>
                    <v-col cols="12"> </v-col>
                  </v-row>
                </v-form>

                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      x-large
                      text
                      class="voltar"
                      height="80px"
                      width="110%"
                      @click="e1 = 1"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: #00ddbb;
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="end">
                    <v-btn
                      text
                      x-large
                      class="avancar"
                      height="80px"
                      width="100%"
                      @click="e1 = 3"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: white;
                      "
                    >
                      Avançar
                      <v-spacer></v-spacer>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card-text>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12">
                      <h3
                        style="
                          font-family: Raleway-Bold;
                          font-size: 18px;
                          line-height: 29px;
                        "
                      >
                        Escolha a
                        <span style="color: #00ddbb">quantidade</span> de
                        questões desejadas para as disciplinas
                      </h3>
                    </v-col>
                    <v-col cols="12">
                      <div
                        v-for="(disciplines, i) in disciplinesSelected"
                        :key="i"
                      >
                        <p>{{ simulated.disciplines }}</p>
                      </div>
                    </v-col>
                    <v-col cols="12"> </v-col>
                  </v-row>
                </v-form>

                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      x-large
                      text
                      class="voltar"
                      height="80px"
                      width="110%"
                      @click="e1 = 2"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: #00ddbb;
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="end">
                    <v-btn
                      text
                      x-large
                      class="avancar"
                      height="80px"
                      width="100%"
                      @click="e1 = 4"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: white;
                      "
                    >
                      Avançar
                      <v-spacer></v-spacer>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card-text>
                <v-form ref="form">
                  <v-row align="center" justify="center">
                    <v-col cols="5"> </v-col>
                    <v-col cols="5"> </v-col>
                    <v-col cols="2" align-self="start"> </v-col>
                  </v-row>
                  <v-row>
                    <v-col align-self="start"> </v-col>
                  </v-row>
                </v-form>

                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      x-large
                      text
                      class="voltar"
                      height="80px"
                      width="110%"
                      @click="e1 = 3"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: #00ddbb;
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="end">
                    <v-btn
                      text
                      x-large
                      class="avancar"
                      height="80px"
                      width="100%"
                      @click="e1 = 5"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: white;
                      "
                    >
                      Avançar
                      <v-spacer></v-spacer>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-stepper-content>

            <v-divider></v-divider>
            <v-stepper-content step="5">
              <v-card>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      x-large
                      text
                      class="voltar"
                      height="80px"
                      width="110%"
                      @click="e1 = 4"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: #00ddbb;
                      "
                    >
                      Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" align-self="end">
                    <v-btn
                      text
                      x-large
                      class="avancar"
                      height="80px"
                      width="100%"
                      @click="e1 = 1"
                      style="
                        font-size: 16px;
                        font-family: Raleway;
                        color: white;
                      "
                    >
                      Avançar
                      <v-spacer></v-spacer>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { mdiDelete, mdiPencil } from "@mdi/js";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunTag from "@/components/run/Tags.vue";
import { SimulatedModule } from "@/store/modules/simulated.module";
import SimulatedModel from "@/models/simulated.model";
import RunSubjects from "@/components/run/Subjects.vue";

@Component({
  name: "SimulatedRegister",
  components: { RunTag, RunDisciplines, RunSubjects },
})
export default class SimulatedRegister extends Vue {
  simulatedModule = getModule(SimulatedModule, this.$store);
  @VModel({ type: Array }) disciplinesSelected!: [];

  e1 = 1;

  get simulations() {
    return this.simulatedModule.simulations;
  }

  get simulated() {
    return this.simulatedModule.simulated;
  }

  set simulated(simulated: SimulatedModel) {
    this.simulatedModule.setSimulated(simulated);
  }
}
</script>

<style scoped>
.text {
  font-size: 56px;
  font-family: Raleway-Black;
}

.text2 {
  color: #00ddbb;
  font-size: 56px;
  font-family: Raleway-Black;
}

.voltar {
  color: #00ddbb;
  border-radius: 0px 0px 0px 6px;
  height: 100px;
  flex: 1 1 auto;
}

.avancar {
  background: #00ddbb;
  border-radius: 0px 0px 6px 0px;
  height: 100px;
  flex: 1 1 auto;
}
</style>
