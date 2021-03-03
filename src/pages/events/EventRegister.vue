<template>
  <v-container>
    <v-dialog v-model="dialogEventReview">
      <EventReview></EventReview>
    </v-dialog>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text"
        >Registro de Eventos</v-card-title
      >
      <v-card-text class="mt-5">
        <v-form ref="form" v-model="valid">
          <v-row class="mt-5">
            <v-col cols="6">
              <v-text-field
                outlined
                dense
                required
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e.length <= 60) ||
                    'O título do vestibular deve ter até 60 caracteres',
                ]"
                counter="60"
                label="Título do Evento"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                dense
                required
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e.length <= 10) ||
                    'O título do vestibular deve ter até 10 caracteres',
                ]"
                counter="10"
                label="Tipo do evento"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="event.duracao"
                outlined
                dense
                required
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e <= 180 && e >= 1) ||
                    'O número da questão deve ser entre 1 a 180',
                ]"
                label="Duração"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-date v-model="event.startDateEvent" label="Data inicio Evento"></run-date>
            </v-col>
             <v-col>
              <run-date v-model="event.endDateEvent" label="Data fim Evento"></run-date>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <run-disciplines v-model="event.discipline"> </run-disciplines>
            </v-col>
            <v-col cols="6">
              <run-subjects v-model="event.subject"> </run-subjects>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn  @click="save()" :disabled="!validForm" dark block color="primary"
                >Salvar</v-btn
              >
            </v-col>
            <v-col cols="4">
              <v-btn block color="yellow" @click="reviewEvent()">Revisão</v-btn>
            </v-col>
            <v-col cols="4" align-self="start">
              <v-btn
                block
                color="secondary"
                class="white--text"
                @click="cancel()"
              >
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/EventModule";
import { SubjectModule } from "@/store/modules/SubjectModule";
import { DisciplineModule } from "@/store/modules/DisciplineModule";
import Event from "../../models/Event";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunSubjects from "@/components/run/Subjects.vue";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import EventReview from "@/pages/events/EventReview.vue";
import RunDate from "@/components/run/Date.vue";
import { DateModule } from "@/store/modules/DateModule";
import { RegisterStatus } from "@/models/RegisterStatus";

@Component({
  name: "EventRegister",
  components: { RunDisciplines, RunSubjects, EventReview, RunDate },
})
export default class EventRegister extends Vue {
  eventModule = getModule(EventModule, this.$store);
  subjectModule = getModule(SubjectModule, this.$store);
  disciplineModule = getModule(DisciplineModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  dateModule = getModule(DateModule, this.$store);

  private valid: boolean = false;

  get isInsert() {
    return this.eventModule.registerStatus === RegisterStatus.INSERT;
  }

  get events() {
    return this.eventModule.events;
  }

  get event() {
    return this.eventModule.event;
  }

  set event(event: Event) {
    this.eventModule.setEvent(event);
  }

  get dialogEventReview() {
    return this.eventModule.eventReviewDialog;
  }

  set dialogEventReview(newValue: boolean) {
    this.eventModule.setEventReviewDialog(newValue);
  }

  reviewEvent() {
    this.eventModule.setEventReviewDialog(true);
  }

  get validForm(): boolean {
    return this.valid;
  }

  cancel() {
    return this.eventModule.setDialog(false);
  }

  save(){
    console.log("evento:", this.event)
  }
}
</script>

<style>
</style>