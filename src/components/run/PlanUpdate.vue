<template>
  <v-dialog v-model="dialog" max-width="1200" scrollable persistent>
    <v-card height="670px">
      <v-card-title class="headline lighten-2 font-weight-regular">
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = !dialog">
          <v-icon large class="teal--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-card max-width="300">
              <div class="boder"></div>

              <v-card-title style="justify-content: center; color: #a9a9a9; font-family: Raleway"
                >Plano Básico</v-card-title
              >

              <v-row style="justify-content: center; margin-top: 2px">
                <v-img src="@/assets/images/emoge-nerd.png" max-width="50px" />
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h4 class="typePlan">Nerd</h4>
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h2 class="price">R$12</h2>
                <h3 style="margin-top: 50px;  font-family: Raleway">/mês</h3>
              </v-row>

              <v-card-text>
                <v-row style="justify-content: center; margin-top: 20px">
                  <v-list style="font-size: 56px">
                    <v-list-item v-for="item in items" :key="item.title">
                      <v-list-item-icon>
                        <v-icon v-if="item.icon" color="#00DDBB">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="#DDDDDD"> mdi-check </v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                          style="font-size: 18px"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="white--text"
                  color="#00DDBB"
                  style="font-size: 20px; font-family: Raleway"
                  block
                  x-large
                >
                  Quero esse
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col>
            <v-card max-width="300">
              <div class="boder"></div>
              <v-card-title style="justify-content: center; color: #a9a9a9;  font-family: Raleway"
                >Plano Intermediário</v-card-title
              >

              <v-row style="justify-content: center; margin-top: 2px">
                <v-img
                  src="@/assets/images/emoge-oraculo.png"
                  max-width="50px"
                />
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h4 class="typePlan">Oráculo</h4>
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h2 class="price">R$19</h2>
                <h3 style="margin-top: 50px; font-family: Raleway">/mês</h3>
              </v-row>

              <v-card-text>
                <v-row style="justify-content: center; margin-top: 20px">
                  <v-list style="font-size: 56px">
                    <v-list-item v-for="item in items2" :key="item.title">
                      <v-list-item-icon>
                        <v-icon v-if="item.icon" color="#00DDBB">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="#DDDDDD"> mdi-check </v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                          style="font-size: 18px"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="white--text"
                  color="#00DDBB"
                  style="font-size: 20px; font-family: Raleway"
                  block
                  x-large
                >
                  Quero esse
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col>
            <v-card max-width="300">
              <div class="boder"></div>
              <v-card-title style="justify-content: center; color: #a9a9a9;  font-family: Raleway"
                >Plano Avançado</v-card-title
              >

              <v-row style="justify-content: center; margin-top: 2px">
                <v-img
                  src="@/assets/images/emoge-transcendente.png"
                  max-width="50px"
                />
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h4 class="typePlan">Transcendente</h4>
              </v-row>

              <v-row style="justify-content: center; margin-top: 30px">
                <h2 class="price">R$24</h2>
                <h3 style="margin-top: 50px; font-family: Raleway">/mês</h3>
              </v-row>

              <v-card-text>
                <v-row style="justify-content: center; margin-top: 20px">
                  <v-list style="font-size: 56px">
                    <v-list-item v-for="item in items3" :key="item.title">
                      <v-list-item-icon>
                        <v-icon v-if="item.icon" color="#00DDBB">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="#DDDDDD"> mdi-check </v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                          style="font-size: 18px"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="white--text"
                  color="#00DDBB"
                  style="font-size: 20px; font-family: Raleway"
                  block
                  x-large
                >
                  Quero esse
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, VModel } from "vue-property-decorator";
import { mdiDelete, mdiPencil } from "@mdi/js";

@Component({
  name: "PlanUpdate",
})
export default class ExamRegister extends Vue {
  @VModel({ type: Boolean }) dialog: boolean | false;

  icons = {
    mdiDelete,
    mdiPencil,
  };
  items = [
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor" },
  ];

  items2 = [
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { title: "Lorem ipsum dolor" },
  ];

  items3 = [
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
    { icon: true, title: "Lorem ipsum dolor" },
  ];
}
</script>

<style>
.typePlan {
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 120%;
  color: #323232;
}

.price {
  font-family: Raleway-Black;
  font-style: normal;
  font-weight: 900;
  font-size: 56px;
  line-height: 120%;
  color: #323232;
}

.boder {
  width: 300px;
  height: 6px;
  left: 326px;
  top: 83px;
  background: #00ddbb;
  border-radius: 8px 8px 0px 0px;
}
</style>
