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
                v-model="event.title"
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
                v-model="event.typeEvent"
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
                v-model="event.duration"
                outlined
                dense
                required
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e <= 5 && e >= 1) ||
                    'A duração deve ser entre uma a cinco horas',
                ]"
                label="Duração"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-date
                v-model="event.startDateSubscription"
                @valid="validDate = $event"
                label="Data inicio Inscrição"
              ></run-date>
            </v-col>
            <v-col>
              <run-date
                v-model="event.endDateSubscription"
                @valid="validDate = $event"
                label="Data fim Inscrição"
              ></run-date>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-date
                v-model="event.startDateEvent"
                @valid="validDate = $event"
                label="Data inicio Evento"
              ></run-date>
            </v-col>
            <v-col>
              <run-date
                v-model="event.endDateEvent"
                 @valid="validDate = $event"
                label="Data fim Evento"
              ></run-date>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <run-disciplines
                v-model="event.disciplines"
                @valid="validDisciplines = $event"
                :multiple="true"
              >
              </run-disciplines>
            </v-col>
            <v-col cols="6">
              <run-subjects
                v-model="event.subjects"
                @valid-field="validSubjects = $event"
              >
              </run-subjects>
            </v-col>
          </v-row>
        </v-form>
        <run-error v-if="errors.length > 0" :errors="errors"></run-error>
      </v-card-text>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col cols="4" align-self="end">
            <v-btn
              block
              color="primary"
              class="white--text"
              :disabled="!validForm"
              @click="save"
            >
              {{ isInsert ? "Salvar" : "Atualizar" }}
            </v-btn>
          </v-col>
          <v-col cols="4" align-self="start">
            <v-btn
              :disabled="!validateUpdateAction"
              block
              color="yellow"
              class="black--text"
              @click="reviewEvent()"
            >
              Revisão
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
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Emit, Watch} from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/EventModule";
import { SubjectModule } from "@/store/modules/SubjectModule";
import { DisciplineModule } from "@/store/modules/DisciplineModule";
import Event from "../../models/Event";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunSubjects from "@/components/run/Subjects.vue";
import EventReview from "@/pages/events/EventReview.vue";
import RunDate from "@/components/run/Date.vue";
import { DateModule } from "@/store/modules/DateModule";
import { RegisterStatus } from "@/models/RegisterStatus";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import RunError  from "@/components/run/validator/Error.vue"
import {DateUtil} from "@/util/date"

@Component({
  name: "EventRegister",
  components: { RunDisciplines, RunSubjects, EventReview, RunDate, RunError },
})
export default class EventRegister extends Vue {
  eventModule = getModule(EventModule, this.$store);
  subjectModule = getModule(SubjectModule, this.$store);
  disciplineModule = getModule(DisciplineModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  dateModule = getModule(DateModule, this.$store);
  validDisciplines: boolean = false;
  validSubjects: boolean = false;
  validDate: boolean = false;
  validDate1: boolean = false;
  valid: boolean = false;
  errors: String[] = [];

  @Watch('event.disciplines')
  onEventChanged(newVal: Event, oldVal: Event){
    console.log("Mudança no evento monitorada com sucesso", newVal)
    console.log("Estado anterior", oldVal)
    this.subjectModule.subjects = []
    this.subjectModule.filterByDiscipline(this.event.discipline).then(subjects=>{
      if(subjects != null && disciplines.length > 0)
        this.subjectModule.setSubjects(subjects)
    })

  }

  @Watch('event.subjects')
  onEventChanged(newVal: Event, oldVal: Event){
    console.log("Mudança no evento monitorada com sucesso", newVal)
    console.log("Estado anterior", oldVal)
    this.disciplineModule.filterBySubject(this.event.subjects).then(disciplines=>{
      if(disciplines != null && disciplines.length > 0)
        this.disciplineModule._setDisciplines(disciplines)
    })

  }

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
    return this.valid && this.validDisciplines && this.validSubjects;
  }

  get validateUpdateAction(): boolean {
    return this.eventModule.registerStatus == RegisterStatus.UPDATE
      ? this.validForm
      : true;
  }

  get validationDateSubscription(): boolean {
    this.errors = []
    if(!DateUtil.isBiggersThanDate(this.event.endDateSubscription, this.event.startDateSubscription)){
      this.errors.push('A data final da inscrição não pode ser menor que a data inicial da inscrição.')
    }
    if(!DateUtil.isBiggersThanDate(this.event.startDateEvent, this.event.endDateSubscription)){
      this.errors.push('A data fim de inscrição não pode ser depois da data inicio do evento.')
    }
    if(!DateUtil.isBiggersThanDate(this.event.startDateEvent, this.event.startDateSubscription)){
      this.errors.push('A data inicial inscrição não pode ser depois do inicio do evento.')
    }
    if(!DateUtil.isBiggersThanDate(this.event.endDateEvent, this.event.startDateEvent)){
      this.errors.push('A data final do evento não pode ser menor que a data inicial do evento.')
    }

    return this.errors.length > 0
  }

  cancel() {
    return this.eventModule.setDialog(false);
  }

  save() {
    if(!this.validationDateSubscription){
      if (this.eventModule.registerStatus == RegisterStatus.INSERT) {

        this.eventModule.save();
        const v = new ValidationMessage("Evento salvo com sucesso", TypeMessage.SUCCESS, true, "", 3000);

        this.validationMessageModule.setValidation(v);
        this.eventModule.setDialog(false);
      }
      const v = new ValidationMessage("Evento atualizado com sucesso", TypeMessage.SUCCESS, true, "", 3000);

      this.validationMessageModule.setValidation(v);
      this.eventModule.setDialog(false);
    }
  }
}
</script>

<style>
</style>
