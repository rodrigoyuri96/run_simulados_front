<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <h1 style="font-family: Raleway; font-size: 48px">Simulados</h1>
      </v-col>
      <v-col cols="4">
        <v-text-field
          append-icon="mdi-magnify"
          label="Buscar Simulado"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <h6 style="font-family: Raleway; color: #989898; font-size: 12px">De</h6>
        <run-date label="Selecione o periodo"></run-date>
      </v-col>
      <v-col cols="2">
        <h6 style="font-family: Raleway; color: #989898; font-size: 12px">Até</h6>
        <run-date label="Selecione o periodo"></run-date>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card class="mx-auto" max-width="380">
          <v-list-item three-line>
            <v-list-item-content>
              <h6 class="mb-9" style="font-size: 18px; font-family: Raleway">
                Pessoal
              </h6>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-subtitle
                style="
                  font-size: 12px;
                  font-family: Raleway;
                  color: #a9a9a9;
                  margin-top: 4px;
                "
                >Progresso</v-list-item-subtitle
              >
              <h3
                style="
                  font-size: 48px;
                  font-family: Raleway-Black;
                  margin-top: 20px;
                "
              >
                15/95
              </h3>
            </v-list-item-content>
            <v-list-item-icon style="margin-top: 2px">
              <v-btn elevation="0" icon style="color: #a9a9a9">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                style="font-size: 12px; font-family: Raleway; color: #a9a9a9"
              >
                Tempo restante
              </v-list-item-subtitle>
              <v-list-item-subtitle
                style="
                  font-size: 24px;
                  font-family: Raleway-Black;
                  color: #323232;
                "
              >
                02:04:05
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
              text
              x-large
              class="button"
              style="font-size: 16px; font-family: Raleway; color: white"
            >
              Continuar
              <v-spacer></v-spacer>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="5">
        <v-card elevation="2" shaped> </v-card>
      </v-col>

      <v-col cols="5">
        <v-card elevation="2" shaped> </v-card>
      </v-col>
    </v-row>

    <v-footer padless absolute>
      <v-btn
        text
        class="buttonFooter"
        height="100px"
        style="font-size: 24px; font-family: Raleway; color: white"
        @click="enter()"
      >          
        Criar novo simulado personalizado     
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RunDate from "@/components/run/Date.vue";
import { mdiDelete } from "@mdi/js";

@Component({
  name: "SimulatedDetail",
  components: { RunDate },
})
export default class SimulatedDetail extends Vue {
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  menu = false;
  modal = false;

  icons = {
    mdiDelete,
  };

  enter(){
    this.$router.push('')
  }
}
</script>

<style>
.button {
  position: relative;
  width: 218px;
  top: 8px;
  left: 16px;
  background: #00ddbb;
  border-radius: 0px 0px 6px 0px;
}

.buttonFooter {
  background: #00ddbb;
  border-radius: 0px 0px 0px 0px;
  flex: 1 1 auto;
}
</style>
