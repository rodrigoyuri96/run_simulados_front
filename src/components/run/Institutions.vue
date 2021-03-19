<template>
  <v-form v-model="valid" ref="formInstitution" lazy-validation>
    <v-autocomplete
      v-model="institutions"
      :items="items"
      :rules="[v=> !!v || 'campo obrigatório']"
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
import { Vue, Component, VModel, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InstitutionModule } from '@/store/modules/InstitutionModule'
import type {RunForm} from "@/commons/RunForm"

@Component({
  name: 'Institutions'

})
export default class Institutions extends Vue {
  institutionModule = getModule(InstitutionModule, this.$store)
  @VModel() institutions!: any
  valid: boolean = true

  get items() {
    return this.institutionModule.institutions
  }

  get form():RunForm{
    return this.$refs.formInstitution as RunForm
  }

  @Emit('valid')
  handleValid(){
    this.validate()
    return this.valid
  }
  created() {
    this.institutionModule.findAll()
  }

  validate(){
    this.valid = this.form.validate()
  }

  mounted(){
    this.handleValid()
  }
}
</script>

<style scoped>

</style>
