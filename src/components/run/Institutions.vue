<template>
  <v-form v-model="valid"  >
    <v-autocomplete
      v-model="institution1"
      :items="institutions"
      :rules="[v=> !!v || 'campo obrigatório']"
      item-text="name"
      outlined
      label="instituições"
      dense
      return-object
      @change="handleValid"
    />
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, VModel, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InstitutionModule } from '@/store/modules/InstitutionModule'
import Institution from '../../models/Institution'

@Component({
  name: 'Institutions'

})
export default class Institutions extends Vue {
  institutionModule = getModule(InstitutionModule, this.$store)
  @VModel({ type: Institution }) institution1 = null
  valid: boolean = false

  get institutions() {
    return this.institutionModule.institutions
  }

  created() {
    this.institutionModule.findAll()
  }

  @Emit('valid-field')
  handleValid(event: boolean){
    if(event != null && event !== undefined){
      return true
    }else{
      return false
    }
  }

}
</script>

<style scoped>

</style>
