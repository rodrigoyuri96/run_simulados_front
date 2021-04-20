<template>
  <v-form  v-model="valid">
    <v-select
      v-if="multiple == false"
      v-model="institutions"
      :items="items"
      item-text="name"
      label="Instituições"
      :rules="rules"
      outlined
      dense
      :loading="loading"
      @change="handleInstitution()"
      return-object
    />
    <v-select
      v-if="multiple == true"
      v-model="institutions"
      :items="items"
      :loading="loading"
      item-text="name"
      label="Instituições"
      :rules="rules"
      outlined
      dense
      multiple
      return-object
      @change="handleInstitution()"
      clearable
      chips
      deletable-chips
      small-chips
      hide-no-data
    >
    <template v-slot:selection="{ index }">
          <span v-if="index == 0" class="pink--text">
            ({{ institutions.length}} institutições selecionadas)
          </span>
        </template>
    </v-select>
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, VModel, Emit, Prop} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InstitutionModule } from '@/store/modules/institution.module'

@Component({
  name: 'Institutions'
})

export default class Institutions extends Vue {
  institutionModule = getModule(InstitutionModule, this.$store)
  @VModel() institutions!: any
  @Prop({type:Boolean}) multiple!: Boolean
  @Prop({type:Array}) rules: any[]
  valid: boolean = false

  get items() {
    return this.institutionModule.institutions
  }

  get loading(){
    return this.institutionModule.loading
  }

  set loading(status: Boolean){
    this.institutionModule.setLoading(status)
  }

  
  @Emit('valid')
  handleValid(event: boolean) {
    if (event != null && event !== undefined) {
      return true;
    } else {
      return false;
    }
  }

   created() {
    this.loading = true
    this.institutionModule.findAll().then(()=>{}).catch(error=>{
      console.log(error)
    }).finally(()=>{
      this.loading = false
    })
  }

  handleInstitution(){
    this.handleValid(this.valid)
  }
}
</script>

<style scoped>

</style>
