<template>
  <div>
    <v-form v-model="valid">
      <v-autocomplete
        v-if="multiple == false"
        v-model="discipline"
        :items="disciplines"
        item-text="name"
        label="Disciplinas"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        return-object
      />
      <v-autocomplete
        v-if="multiple == true"
        v-model="disciplineModule"
        :items="disciplines"
        item-text="name"
        label="Disciplinas"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        multiple
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
  @VModel({type: Discipline}) discipline: Discipline = new Discipline()
  @VModel({type: Discipline}) disciplinesModel: Discipline[] = []
  @Prop({type:Boolean}) multiple: boolean = false


  get disciplines() {
    return this.disciplineModule.disciplines
  }

  @Emit('valid')
  handleValid(event: Discipline){
    if(event !== null){
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
