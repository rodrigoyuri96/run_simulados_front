<template>
    <v-form v-model="valid">
      <v-autocomplete
        v-if="multiple == false"
        v-model="disciplines"
        :items="items"
        item-text="name"
        label="Disciplinas"
        :rules="rules"
        hide-no-data
        outlined
        dense
        :loading="loading"
        @change="handleDiscipline"
        return-object
      />
      <v-autocomplete
        v-if="multiple == true"
        v-model="disciplines"
        :items="items"
        :loading="loading"
        item-text="name"
        label="Disciplinas"
        :rules="rules"
        outlined
        dense
        multiple
        return-object
        @change="handleDiscipline"
        auto-select-first
        clearable
        chips
        deletable-chips
        small-chips
        hide-no-data
      >
        <template v-slot:selection="{ index }">
          <span v-if="index == 0" class="pink--text">
            ({{ disciplines.length}} disciplinas selecionadas)
          </span>
        </template>
      </v-autocomplete>
    </v-form>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { DisciplineModule } from '@/store/modules/discipline.module'

@Component({
  name: 'Disciplines'
})
export default class Disciplines extends Vue {
  disciplineModule = getModule(DisciplineModule, this.$store)
  @VModel() disciplines!: any[]
  @Prop({type:Boolean}) multiple!: Boolean
  @Prop({type:Array}) rules: any[]
  valid: boolean = false;

  get items() {
    return this.disciplineModule.disciplines
  }

  get loading(){
    return this.disciplineModule.loading
  }

  set loading(status: Boolean){
    this.disciplineModule.setLoading(status)
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
    this.disciplineModule.findAll().then(()=>{}).catch(error=>{
      console.log(error)
    }).finally(()=>{
      this.loading = false
    })
  }

  handleDiscipline(){
    this.handleValid(this.valid)
  }

}
</script>

<style scoped>

</style>
