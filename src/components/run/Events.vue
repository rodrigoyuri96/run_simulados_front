<template>
   <v-form v-model="valid">
      <v-autocomplete
        multiple
        v-model="event"
        :items="events"
        item-text="name"
        label="Eventos"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        @change="handleValid()"
        return-object
      />
</template>

<script lang="ts">

import { Vue, VModel, Emit, Component } from 'vue-property-decorator'
import { EventModule } from '@/store/modules/EventModule'
import { getModule } from 'vuex-module-decorators'
import Event from '@/models/Event'

@Component({
    name: "Events"
})

export default class Events extends Vue {

    eventModule = getModule( EventModule, this.$store )

    @VModel({ type: Event }) event!: Event
    @VModel({ type: Event }) eventModel!: Event[]
    valid = false

    get events() {
        return this.eventModule.events
    }

    @Emit('valid')
        handleValid(){
            return this.valid
    }

    created() {
        // this.eventModule.findAll()
    }


}
</script>

<style>

</style>