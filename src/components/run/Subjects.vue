<template>
  <div>
    <v-autocomplete
        v-model="subjectsSelected"
        :items="subjects"
        item-text="name"
        label="Assuntos`"
        outlined
        multiple
        dense
        @change="imprime()"
        return-object
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {SubjectModule} from "../../store/modules/SubjectModule";
import Subject from "../../models/Subject";

@Component({
  name: "Subjects"

})
export default class Subjects extends Vue{
  subjectModule = getModule(SubjectModule, this.$store)

  get subjects(){
    return this.subjectModule.subjects
  }

  get subjectsSelected(){
    return this.subjectModule.subjectsSelected
  }

  set subjectsSelected(subjects: Subject[]){
    this.subjectModule.setSubjectsSelected(subjects)
  }

  mounted(){
    this.subjectModule.findAll()
  }

  imprime(){
    console.log(this.subjectsSelected)
  }

}
</script>

<style scoped>

</style>

