<template>
  <v-form v-model="valid"  >
    <v-autocomplete
      v-model="institution"
      :items="institutions"
      :rules="[v=> !!v || 'campo obrigatório']"
      item-text="name"
      outlined
      label="instituições"
      dense
      @change="handleValid()"
      return-object
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
  @VModel({type: Institution}) institution!: Institution
  @VModel({type: Institution}) institutionModel!: Institution[]
  valid: boolean = false

  get institutions() {
    return this.institutionModule.institutions
  }


  @Emit('valid')
  handleValid(){
    return this.valid

  }

  created() {
    this.institutionModule.findAll()
  }

}
</script>

<style scoped>

</style>
