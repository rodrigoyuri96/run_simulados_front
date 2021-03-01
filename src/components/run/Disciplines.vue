<template>
  <div>
    <v-form v-model="valid">
      <v-autocomplete
        v-model="discipline"
        :items="disciplines"
        item-text="name"
        label="Disciplinas"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        return-object
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { DisciplineModule } from '@/store/modules/DisciplineModule'
import Discipline from '@/models/Discipline'

@Component({
  name: 'Discipline'
})
export default class Disciplines extends Vue {
  valid: boolean = false
  disciplineModule = getModule(DisciplineModule, this.$store)
  @VModel({type: Discipline}) discipline: Discipline
  @Prop({type:Boolean}) multiple: boolean


  get disciplines() {
    return this.disciplineModule.disciplines
  }

  get discipline() {
    return this.disciplineModule.discipline
  }

  set discipline(discipline: Discipline) {
    this.disciplineModule.setDiscipline(discipline)
  }

  @Emit('valid')
  handleValid(event){
    if(event != null && event !== undefined){
      return true
    }else{
      return false
    }
  }

  created() {
    this.disciplineModule.findAll()
  }

}
</script>

<style scoped>

</style>
