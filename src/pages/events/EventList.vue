<template>
  <v-container>
    <v-card class="form-group">
        <v-card-title class="headline teal lighten-2 white--text">
          Cadastro de Eventos
        </v-card-title>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination
          @next="nextPage()"
          @previous="previousPage()"
          v-model="page"
          :length="4"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right" />
      </v-card-actions>
      </v-card>
    <v-dialog v-model="dialog">
      <event-register></event-register>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/event.module";
import EventRegister from "@/pages/events/EventRegister.vue";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { mdiDelete, mdiPencil } from "@mdi/js";
import EventModel from "@/models/event.model";

@Component({
  name: "EventList",
  components: { EventRegister },
})
export default class EventList extends Vue {

  eventModule = getModule(EventModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);


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
    this.eventModule.setRegisterStatus(RegisterStatusEnum.UPDATE);
    this.eventModule.setDialog(true);
  }

  deleteEvent(i: number) {
    this.eventModule.setEvent(this.eventModule.events[i])
    const message = new ValidationMessage('Evento deletado com sucesso', TypeMessage.SUCCESS, true, '', 3000)
    this.eventModule.delete().then(res=>{
      if(res){
        this.eventModule.events.splice(i, 1)
      }else{
        message.message = "Erro ao deletar o evento"
        message.type = TypeMessage.ERROR
      }
      this.validationMessageModule.setValidation(message)
    })
  }

  addEvent() {
    this.eventModule.setRegisterStatus(RegisterStatusEnum.INSERT);
    this.eventModule.setEvent(new EventModel())
    this.eventModule.setDialog(true);
  }

  created(){
    this.eventModule.findAll()
  }
}
</script>

<style scoped>
</style>
