<template>
  <v-autocomplete
    v-model="teachers"
    :loading="loading"
    :items="items"
    item-text="title"
    :multiple="multiple"
    return-object
    dense
    required
    :rules="rules"
    label="Professores"
    outlined
    auto-select-first
    clearable
    hide-no-data>
    <template v-if="multiple" v-slot:selection="{ index }">
      <span v-if="index == 0" class="pink--text">
        ({{label}})
      </span>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import {Vue, Component, Emit, Prop, VModel} from 'vue-property-decorator'
import {TeacherModule} from "@/store/modules/teacher.module";

@Component({
  name: 'RunTeams',
})
export default class Teachers extends Vue {
  teacherModule = getModule(TeacherModule, this.$store)
  @VModel() teachers!: []
  @Prop({type:Boolean}) multiple!: Boolean
  @Prop({type:Array}) rules!: []
  loading: boolean = false

  get items() {
    return this.teacherModule.teachers
  }

  get label(){
    let size = this.teachers.length
    return this.teachers.length <= 1 ? `${size} professor selecionado` : `${size} professores selecionados`
  }

  content(data){
    return JSON.stringify(data)
  }

  mounted(){
  }

  created() {
    this.loading = true
    this.teacherModule.findAll().then(()=>{
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

