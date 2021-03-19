<template>
  <v-container>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text">Revisão de evento</v-card-title>
      <v-card-text>
        <v-form class="mt-5">
           <v-row>
            <v-col>
              <h3 class="text-center"> Data inicio de inscrição: {{ transformDate(event.startDateSubscription)}}</h3>
            </v-col>
            <v-col>
               <h3 class="text-center"> Data fim de inscrição: {{ transformDate(event.endDateSubscription) }}</h3>
            </v-col>
           </v-row>
           <v-row>
            <v-col>
              <h3 class="text-center"> Inicio de evento: {{transformDate(event.startDateEvent)}}</h3>
            </v-col>
            <v-col>
               <h3 class="text-center"> Fim do evento:  {{transformDate(event.endDateEvent)}}</h3>
            </v-col>
           </v-row>
           <v-row>
              <v-col>
             <h3 class="text-center"> Duração: {{event.duracao}}</h3>
              </v-col>
           </v-row>
           <v-row>
              <v-col>
                <run-tag v-model="event.subjects"></run-tag>
              </v-col>
           </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col cols="4" align-self="end">
            <v-btn  block color="primary">Salvar</v-btn>
          </v-col>
            <v-col cols="4" align-self="start">
            <v-btn block color="secondary" class="white--text" @click="cancel()">
              Fechar
            </v-btn>
           </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import RunInstitution from "@/components/run/Institutions.vue";
import {TagModule} from "@/store/modules/TagModule"
import {getModule} from "vuex-module-decorators";
import RunTag from "@/components/run/Tags.vue"
import {EventModule} from "@/store/modules/EventModule";
import { DateUtil } from "@/util/date"

@Component({
  name: "EventReview",
  components: {RunInstitution, RunTag}
})

export default class EventReview extends Vue{

  tagModule = getModule(TagModule, this.$store)
  eventModule = getModule(EventModule, this.$store)


  valid: boolean = false

   get events() {
    return this.eventModule.events;
  }

  get event() {
    return this.eventModule.event;
  }

   cancel() {
    this.eventModule.setEventReviewDialog(false)
  }

  transformDate(date: String){
    return DateUtil.parseDateBR(date)
  }
}
</script>

<style>


</style>
