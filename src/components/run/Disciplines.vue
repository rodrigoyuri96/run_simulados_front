<template>
    <v-form v-model="validDisciplines">
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
        @change="handleValid"
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
        @change="handleValid"
      />
    </v-form>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { DisciplineModule } from '@/store/modules/DisciplineModule'
import Discipline from '@/models/Discipline'

@Component({
  name: 'Disciplines'
})
export default class Disciplines extends Vue {
  disciplineModule = getModule(DisciplineModule, this.$store)
  @VModel({type: Discipline}) discipline: Discipline | null
  @VModel({type: Discipline}) disciplinesModel: Discipline[] | null
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
