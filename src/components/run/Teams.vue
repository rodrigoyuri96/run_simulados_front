<template>
    <v-autocomplete
      v-model="teams"
      :items="items"
      item-text="name"
      label="Turmas"
      hide-no-data
      outlined
      dense
      :multiple="multiple"
      :rules="rules"
      :loading="loading"
      return-object
    />
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import {TeamModule} from "@/store/modules/team.module";

@Component({
  name: 'RunTeams',
})
export default class RunTeams extends Vue {
  teamModule = getModule(TeamModule, this.$store)
  @VModel() teams!: []
  @Prop({type:Boolean}) multiple!: Boolean
  @Prop({type:Array}) rules: any[]
  loading: boolean = false

  get items() {
    return this.teamModule.teams
  }

  created() {
    this.loading = true
    this.teamModule.findAll().then(()=>{
      this.loading = false
    }).catch(error=>{
      console.log(error)
    }).finally(()=>{
      this.loading = false
    })
  }

}
</script>

<style scoped>

</style>

