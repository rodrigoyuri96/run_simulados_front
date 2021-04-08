<template>
   <v-form v-model="valid">
      <v-autocomplete
        multiple
        v-model="events"
        :items="items"
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
import { EventModule } from '@/store/modules/event.module'
import { getModule } from 'vuex-module-decorators'
import EventModel from '@/models/event.model'

@Component({
    name: "Events"
})

export default class Events extends Vue {
    eventModule = getModule( EventModule, this.$store )
    @VModel() events!: any
    valid = false

    get items() {
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
