<template>
  <v-form>
    <v-autocomplete
      v-model="teams"
      :items="items"
      item-text="name"
      label="Turmas"
      :rules="rules"
      hide-no-data
      outlined
      dense
      :loading="loading"
      @change="handleTeam"
      return-object
    />
  <!--  <v-autocomplete
      v-if="multiple == true"
      v-model="teams"
      :items="items"
      :loading="loading"
      item-text="name"
      label="Turmas"
      :rules="rules"
      outlined
      dense
      multiple
      return-object
      @change="handleTeam"
      auto-select-first
      clearable
      chips
      deletable-chips
      small-chips
      hide-no-data
    >
      <template v-slot:selection="{ index }">
          <span v-if="index == 0" class="pink--text">
            ({{ teams.length}} Turmas Selecionadas)
          </span>
      </template>
    </v-autocomplete>-->
  </v-form>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import {TeamModule} from "@/store/modules/team.module";

@Component({
  name: 'RunTeams',
})
export class RunTeams extends Vue {
  teamModule = getModule(TeamModule, this.$store)
  @VModel() teams!: any[]
  @Prop({type:Boolean}) multiple!: Boolean
  @Prop({type:Array}) rules: any[]
  loading: boolean = false

  get items() {
    return this.teamModule.teams
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
    this.teamModule.findAll().then(()=>{
      this.loading = false
    }).catch(error=>{
      console.log(error)
    }).finally(()=>{
      this.loading = false
    })
  }

  handleTeam(){
   // this.handleValid(this.valid)
  }

}
</script>

<style scoped>

</style>


<script>
export default {
name: "Teams"
}
</script>

<style scoped>

</style>
