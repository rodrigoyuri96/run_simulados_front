<template>
  <v-dialog v-model="dialog" width="1000" scrollable>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text">Revisão de evento <v-spacer></v-spacer><v-icon x-large style="color: white" @click="dialog = !dialog">mdi-close</v-icon></v-card-title>
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
             <h3 class="text-center"> Duração: {{event.duration}} Horas</h3>
              </v-col>
           </v-row>
           <v-row>
              <v-col>
                <run-tag :tags="tags"></run-tag>
              </v-col>
           </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import {Component, Vue, VModel, Prop} from "vue-property-decorator";
import RunInstitution from "@/components/run/Institutions.vue";
import {getModule} from "vuex-module-decorators";
import RunTag from "@/components/run/Tags.vue"
import {EventModule} from "@/store/modules/event.module";
import { DateUtil } from "@/commons/date.commons"

@Component({
  name: "EventReview",
  components: {RunInstitution, RunTag}
})

export default class EventReview extends Vue{

  eventModule = getModule(EventModule, this.$store)

  @VModel({ type: Boolean }) dialog: boolean | false
  valid: boolean = false

  get tags(){
    let tags = this.event.subjects.map(s=>{
      return s.name
    })
    return tags
  }

   get events() {
    return this.eventModule.events;
  }

  get event() {
    return this.eventModule.event;
  }

  transformDate(date: String){
    return DateUtil.parseDateBR(date)
  }
}
</script>

<style>


</style>
