<template>
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
        @change="handleValid"
        return-object
      />
      <v-autocomplete
        v-if="multiple == true"
        v-model="disciplinesSelected"
        :items="disciplines"
        item-text="name"
        label="Disciplinas"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        multiple
        return-object
        @change="handleValid"
      >
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="orange--text">
          ({{ disciplinesSelected.length}} disciplinas selecionadas)
        </span>
      </template>
      </v-autocomplete>
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
  @VModel({type: Discipline}) discipline!: Discipline 
  @VModel({type: Discipline}) disciplinesModel!: Discipline[]
  @Prop({type:Boolean}) multiple!: Boolean 
  valid: boolean = false;


  get disciplines() {
    return this.disciplineModule.disciplines
  }

  get disciplinesSelected() {
    return this.disciplineModule.disciplinesSelected;
  }

  set disciplinesSelected(disciplines: Discipline[]) {
    this.disciplineModule.setDisciplinesSelected(disciplines);
  }
    
  @Emit('valid')
  handleValid(){
    return this.valid
  }

  created() {
    this.disciplineModule.findAll()
  }

}
</script>

<style scoped>

</style>
