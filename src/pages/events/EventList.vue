<template>
  <v-row align="center" justify="center">
    <v-dialog v-model="dialog">
      <event-register></event-register>
    </v-dialog>
    <v-card class="form-group mt-0" width="80%" height="95%">
      <v-card-title class="headline teal lighten-2 white--text"
        >Cadastro de Eventos</v-card-title
      >
      <v-card-text class="mt-3">
        <v-row alignament="end" justify="end" no-gutters>
          <v-col align-self="end" class="ml-16" md="4">
            <v-btn class="white--text" color="primary" @click="addEvent()">
              Cadastrar Evento
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table fixed-header height="250px">
          <template v-slot:default>
            <thead class="mb-6">
              <tr>
                <th class="text-left">Cadastrar Evento</th>
              </tr>
            </thead>
            <tbody class="mt-6">
              <tr
                v-for="(event, i) in events"
                :key="i"
                class="text-center mt-1"
              >
                <td>{{ event.title }}</td>
                <td class="ml-5">
                  <v-btn text color="teal" @click="updateEvent(i)">
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    color="deep-orange accent-4"
                    @click="deleteEvent(i)"
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
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/EventModule";
import EventRegister from "@/pages/events/EventRegister.vue";
import { RegisterStatus } from "@/models/RegisterStatus";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Event from "@/models/Event";

@Component({
  name: "EventList",
  components: { EventRegister },
})
export default class EventList extends Vue {
  eventModule = getModule(EventModule, this.$store);

  icons = {
    mdiDelete,
    mdiPencil,
  };

  get events() {
    return this.eventModule.events;
  }

  get dialog() {
    return this.eventModule.dialog;
  }

  set dialog(newValue) {
    this.eventModule.setDialog(newValue);
  }

  updateEvent(i: number) {
    console.log(this.eventModule.events[i]);
    this.eventModule.setEvent(this.eventModule.events[i]);
    this.eventModule.setRegisterStatus(RegisterStatus.UPDATE);
    this.eventModule.setDialog(true);
  }

  deleteEvent(i: number) {
    this.eventModule.events.splice(i, 1);
  }

  addEvent() {
    this.eventModule.setEvent(new Event)
    this.eventModule.setRegisterStatus(RegisterStatus.INSERT);
    this.eventModule.setDialog(true);
  }
}
</script>

<style scoped>
</style>
