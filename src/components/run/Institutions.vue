<template>
  <v-form v-model="valid">
    <v-autocomplete
      v-model="institutions"
      :items="items"
      :rules="rules"
      item-text="name"
      outlined
      label="instituições"
      dense
      @change="handleValid()"
      return-object
      auto-select-first
    />
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, VModel, Emit, Prop} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InstitutionModule } from '@/store/modules/InstitutionModule'
import Institution from "@/models/Institution";

@Component({
  name: 'Institutions'
})

export default class Institutions extends Vue {
  institutionModule = getModule(InstitutionModule, this.$store)
  @VModel({type: Institution, default: null}) institutions: any
  @VModel() institution!: any
  @Prop({type:Array}) rules: any[]
  valid: boolean = false

  get items() {
    return this.institutionModule.institutions
  }

  @Emit('valid')
  handleValid(){
    return this.valid
  }

  created() {
    this.institutionModule.findAll()
  }

  updated(){
    this.handleValid()
  }
}
</script>

<style scoped>

</style>
