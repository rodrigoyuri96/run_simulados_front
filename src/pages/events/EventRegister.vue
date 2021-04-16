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
        <v-form v-model="validEvent">
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
            <v-col cols="4">
               <v-select
                v-model="event.eventType"
                :items="TypeList"
                outlined
                dense
                required
                :rules="[(e) => !!e || 'Campo obrigatório']"
                label="Tipo do evento"
              ></v-select>
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
                :rules="[i=> !!i || 'Campo obrigatório']"
              >
              </run-disciplines>
            </v-col>
            <v-col cols="6">
              <run-subjects
                v-model="event.subjects"
                @valid="validSubjects = $event"
                :rules="[i=> !!i || 'Campo obrigatório']"
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
import { EventModule } from "@/store/modules/event.module";
import { SubjectModule } from "@/store/modules/subject.module";
import { DisciplineModule } from "@/store/modules/discipline.module";
import EventModel from "../../models/event.model";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunSubjects from "@/components/run/Subjects.vue";
import EventReview from "@/pages/events/EventReview.vue";
import RunDate from "@/components/run/Date.vue";
import { DateModule } from "@/store/modules/date.module";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import RunError  from "@/components/run/validator/Error.vue"
import {DateUtil} from "@/commons/date.commons"

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
  validEvent: boolean = false;
  errors: String[] = [];
  TypeList: String[] = ["Geral","Comunidade", "Instituição"];

  @Watch('event.disciplines')
  onDisciplineEventChanged(newVal: EventModel, oldVal: EventModel){
    this.subjectModule.setSubjects([])
    this.subjectModule.filterByDiscipline(this.event.disciplines).then(subjects=>{
      console.log(subjects)
    })
  }

  @Watch('event.subjects')
  onSubjectEventChanged(newVal: EventModel, oldVal: EventModel){
    this.disciplineModule.filterBySubject(this.event.subjects).then(disciplines=>{
      if(disciplines != null && disciplines.length > 0)
        this.disciplineModule._setDisciplines(disciplines)
    })

  }

  get isInsert() {
    return this.eventModule.registerStatus === RegisterStatusEnum.INSERT;
  }

  get isValid(){
    return this.validEvent && !this.validDate && this.validDisciplines
  }

  constructor() {
    super()
  }

  get events() {
    return this.eventModule.events;
  }

  get event() {
    return this.eventModule.event;
  }

  set event(event: EventModel) {
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


  get validDate(): boolean {
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

  save() {
    const v = new ValidationMessage('Evento salvo com sucesso', TypeMessage.SUCCESS, true, '', 3000)

    console.log('Salvando Evento:', this.event)
    if(this.eventModule.registerStatus == RegisterStatusEnum.INSERT){
      this.eventModule.save().then(res=>{
        if(!(res.status == 201)){
          v.message = "Erro ao salvar o evento"
          v.type = TypeMessage.ERROR
        }else{
          this.eventModule._addToEvents(res.data)
        }
      })

     }else{
        this.eventModule.update().then(res=>{
          if(!(res.status == 200)){
            v.message = "Erro ao atualizar evento"
            v.type = TypeMessage.ERROR
          }
        }).catch(error => {
          console.log('error', error)
        })
      v.message = "Vestibular atualizado com sucesso"
    }

    this.validationMessageModule.setValidation(v)
    this.eventModule.setDialog(false)
    this.eventModule.findAll()
  }

  get validateUpdateAction(): Boolean {
    return this.eventModule.registerStatus == RegisterStatusEnum.UPDATE? this.isValid : new Boolean(true)
  }

  cancel() {
     return this.eventModule.setDialog(false);
 }
}
</script>

<style>
</style>
