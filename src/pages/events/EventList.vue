<template>
  <v-container>
    <run-event-register v-model="openEventRegister" />

    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        Cadastro de Eventos
      </v-card-title>
      <v-card-text class="mt-3">
        <v-card-actions class="mt-3 mb-3">
          <v-card-title class="ml-n1"
            >Lista de Eventos Cadastrados</v-card-title
          >
          <v-spacer></v-spacer>
          <v-btn class="white--text ml-n1" color="primary" @click="addEvent()"
            >Cadastrar Evento</v-btn
          >
        </v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Nome do evento</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(event, i) in events" :key="i">
                    <td>{{ event.title }}</td>
                    <td class="text-center">
                      <v-btn elevation="0" icon>
                        <v-icon @click="updateEvent(i)">mdi-pencil</v-icon>
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
    <run-remove-dialog :method="deleteEvent" v-model="openRemoveDialog" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/event.module";
import RunEventRegister from "@/pages/events/EventRegister.vue";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { mdiDelete, mdiPencil } from "@mdi/js";
import EventModel from "@/models/event.model";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";

@Component({
  name: "EventList",
  components: { RunEventRegister, RunRemoveDialog },
})
export default class EventList extends Vue {
  eventModule = getModule(EventModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  index = 0;
  openRemoveDialog = false;
  openEventRegister = false;

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

  removeDialog(i) {
    this.index = i;
    this.openRemoveDialog = true;
  }

  updateEvent(i: number) {
    console.log(this.eventModule.events[i]);
    this.eventModule.setEvent(this.eventModule.events[i]);
    this.eventModule.setRegisterStatus(RegisterStatusEnum.UPDATE);
    this.openEventRegister = true;
  }

  deleteEvent() {
    const event = this.eventModule.events[this.index];
    this.eventModule
      .delete(event.id)
      .then((res) => {
        if (res.status == 200) {
          this.openRemoveDialog = false;
          this.validationMessageModule.setSnack(true);
          const v = new ValidationMessage(
            "Evento excluído com sucesso",
            TypeMessage.SUCCESS,
            true,
            "",
            3000
          );
          this.validationMessageModule.setValidation(v);
          this.eventModule.events.splice(this.index, 1);
        }
      })
      .catch(() => {
        const v = new ValidationMessage(
          "Erro ao remover o evento",
          TypeMessage.SUCCESS,
          true,
          "",
          3000
        );
        this.validationMessageModule.setValidation(v);
      });
  }

  addEvent() {
    this.eventModule.setRegisterStatus(RegisterStatusEnum.INSERT);
    this.eventModule.setEvent(new EventModel());
    this.openEventRegister = true;
  }

  created() {
    this.eventModule.findAll();
  }
}
</script>

<style scoped>
</style>
