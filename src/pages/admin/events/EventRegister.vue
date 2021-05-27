<template>
  <v-dialog v-model="dialog" width="1500px" scrollable>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text font-weight-regular">
        {{ !isUpdate ? "Registro de evento" : "Atualização do evento" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="cancel">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="form">
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
                :options="TypeList"
                outlined
                dense
                required
                :rules="[(e) => !!e || 'Campo obrigatório']"
                label="Tipo do evento"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="event.numberSubscribers"
                outlined
                dense
                required
                :rules="[
                  (e) => !!e || 'Campo obrigatório',
                  (e) =>
                    (e && e <= 100 && e >= 10) ||
                    'O número de inscritos deve ser entre 10 a 100',
                ]"
                label="Inscritos"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="event.eventType == 'Aula'" cols="6">
              <v-select
                v-model="event.category"
                :items="classCategory"
                outlined
                dense
                required
                :rules="[(e) => !!e || 'Campo obrigatório']"
                label="Categoria aula"
              ></v-select>
            </v-col>
            <v-col v-else-if="event.eventType == 'Simulado'" cols="6">
              <v-select
                v-model="event.category"
                :items="simulatedCategory"
                outlined
                dense
                required
                :rules="[(e) => !!e || 'Campo obrigatório']"
                label="Categoria Simulado"
              ></v-select>
            </v-col>
            <v-col v-if="event.eventType == 'Aula'" cols="6">
              <run-institution
                v-model="event.institution"
                :multiple="false"
                :rules="requiredField"
              />
            </v-col>
            <v-col v-else-if="event.eventType == 'Simulado'" cols="6">
              <run-institution
                v-model="event.institution"
                :multiple="true"
                :rules="requiredArrayField"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-date
                v-model="event.startDateSubscription"
                :rules="requiredField"
                label="Data inicio Inscrição"
              ></run-date>
            </v-col>
            <v-col>
              <run-date
                v-model="event.endDateSubscription"
                :rules="requiredField"
                label="Data fim Inscrição"
              ></run-date>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <run-date
                v-model="event.startDateEvent"
                :rules="requiredField"
                label="Data inicio Evento"
              ></run-date>
            </v-col>
            <v-col>
              <run-date
                v-model="event.endDateEvent"
                :rules="requiredField"
                label="Data fim Evento"
              ></run-date>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <run-disciplines
                :rules="requiredArrayField"
                v-model="event.disciplines"
                :multiple="true"
              >
              </run-disciplines>
            </v-col>
            <v-col cols="6">
              <run-subjects :rules="requiredArrayField" v-model="event.subjects">
              </run-subjects>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <run-watch
                v-model="event.startTimeEvent"
                label="Horário inicio Evento"
                :rules="requiredField"
              ></run-watch>
            </v-col>
            <v-col cols="6">
              <run-watch
                v-model="event.endTimeEvent"
                label="Horário fim Evento"
                :rules="requiredField"
              ></run-watch>
            </v-col>
          </v-row>
        </v-form>
        <run-error v-if="errors.length > 0" :errors="errors"></run-error>
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="4" align-self="end">
              <v-btn
                block
                color="primary"
                class="white--text"
                :loading="loading"
                :disabled="!isValid"
                @click="!isUpdate ? save() : update()"
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
                @click="openReviewQuestion = true"
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
      </v-card-text>
    </v-card>
    <run-event-review v-model="openReviewQuestion" />
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Ref, Prop } from "vue-property-decorator";
import { VForm } from "@/filters/types";
import { getModule } from "vuex-module-decorators";
import { EventModule } from "@/store/modules/event.module";
import EventModel from "@/models/event.model";
import RunDisciplines from "@/components/run/Disciplines.vue";
import RunSubjects from "@/components/run/Subjects.vue";
import RunDate from "@/components/run/Date.vue";
import { RegisterStatusEnum } from "@/models/register.status.enum";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import RunError from "@/components/run/validator/Error.vue";
import RunInstitution from "@/components/run/Institutions.vue";
import RunWatch from "@/components/run/Watch.vue";
import { DateUtil } from "@/commons/date.commons";
import RunEventReview from "@/pages/admin/events/EventReview.vue";

@Component({
  name: "EventRegister",
  components: {
    RunDisciplines,
    RunSubjects,
    RunEventReview,
    RunDate,
    RunError,
    RunInstitution,
    RunWatch,
  },
})
export default class EventRegister extends Vue {
  @VModel({ type: Boolean }) dialog: boolean | false;
  @Ref("form") readonly form!: VForm;
  @Prop({ type: Boolean }) isUpdate = false;

  private requiredField = [(v) => !!v || "Campo obrigatório"];
  private requiredArrayField = [(v) => (!!v && v.length > 0) || "Campo obrigatório"];
  eventModule = getModule(EventModule, this.$store);
  valid: boolean = false;
  validationModule = getModule(ValidationMessageModule, this.$store);
  errors: String[] = [];
  TypeList: String[] = ["Aula", "Simulado"];
  classCategory: String[] = ["Normal", "Revisão", "Palestra", "Correção de Prova"];
  simulatedCategory: String[] = ["Simulado 1º fase", "Simulado 2º fase"];
  openReviewQuestion: boolean = false;
  loading = false;

  /*
  @Watch("event.disciplines")
  onDisciplineEventChanged(newVal: EventModel, oldVal: EventModel) {
    this.subjectModule.setSubjects([]);
    this.subjectModule
      .filterByDiscipline(this.event.disciplines)
      .then((subjects) => {
        console.log(subjects);
      });
  }

  @Watch("event.subjects")
  onSubjectEventChanged(newVal: EventModel, oldVal: EventModel) {
    this.disciplineModule
      .filterBySubject(this.event.subjects)
      .then((disciplines) => {
        if (disciplines != null && disciplines.length > 0)
          this.disciplineModule._setDisciplines(disciplines);
      });
  }
  */

  get isInsert() {
    return this.eventModule.registerStatus === RegisterStatusEnum.INSERT;
  }

  constructor() {
    super();
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

  get isValid() {
    return this.valid && !this.validDate;
  }

  get validDate(): boolean {
    this.errors = [];
    if (
      !DateUtil.isBiggersThanDate(
        this.event.endDateSubscription,
        this.event.startDateSubscription
      )
    ) {
      this.errors.push(
        "A data final da inscrição não pode ser menor que a data inicial da inscrição."
      );
    }
    if (
      !DateUtil.isBiggersThanDate(
        this.event.startDateEvent,
        this.event.endDateSubscription
      )
    ) {
      this.errors.push(
        "A data fim de inscrição não pode ser depois da data inicio do evento."
      );
    }
    if (
      !DateUtil.isBiggersThanDate(
        this.event.startDateEvent,
        this.event.startDateSubscription
      )
    ) {
      this.errors.push(
        "A data inicial inscrição não pode ser depois do inicio do evento."
      );
    }
    if (!DateUtil.isBiggersThanDate(this.event.endDateEvent, this.event.startDateEvent)) {
      this.errors.push(
        "A data final do evento não pode ser menor que a data inicial do evento."
      );
    }

    return this.errors.length > 0;
  }

  update() {
    this.loading = true;
    this.eventModule
      .update()
      .then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.validationModule.setValidation(
            new ValidationMessage("Evento atualizado com sucesso.", TypeMessage.SUCCESS)
          );
          this.eventModule._updateEvent(res.data);
        }
      })
      .catch((error) => {
        this.loading = false;
        this.validationModule.setValidation(
          new ValidationMessage("Erro ao atualizar o evento.", TypeMessage.ERROR)
        );
        this.form.reset();
      })
      .finally(() => {
        this.loading = false;
        this.dialog = false;
      });

    this.event = new EventModel();
    this.form.reset();
  }

  save() {
    this.loading = true;
    this.eventModule
      .save()
      .then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.validationModule.setValidation(
            new ValidationMessage("Evento salvo com sucesso!", TypeMessage.SUCCESS)
          );
          this.eventModule._addToEvents(res.data);
        }
      })
      .catch((error) => {
        this.loading = false;
        this.validationModule.setValidation(
          new ValidationMessage("Erro ao salvar o evento", TypeMessage.ERROR)
        );
        console.log(error);
        this.form.reset();
      })
      .finally(() => {
        this.loading = false;
        this.dialog = false;
      });

    this.event = new EventModel();
    this.form.reset();
  }

  get validateUpdateAction(): Boolean {
    return this.eventModule.registerStatus == RegisterStatusEnum.UPDATE
      ? this.valid
      : new Boolean(true);
  }

  formatDate(time) {
    return "T" + time + ":00";
  }

  cancel() {
    this.form.reset();
    this.dialog = false;
  }
}
</script>

<style></style>
