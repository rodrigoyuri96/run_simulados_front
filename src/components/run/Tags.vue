<template>
  <div>
    <v-chip
      v-for="(subjects, i) in subjectsSelected"
      :key="i"
      class="ma-2"
      color="primary"
      outlined
      >{{ subjects.name }}</v-chip
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import {TagModule}  from  "@/store/modules/TagModule";
import { SubjectModule } from "@/store/modules/SubjectModule";
import RunSubjects from "@/components/run/Subjects.vue";
import Subject from "@/models/Subject";

@Component({
  name: "Tags",
    components: {RunSubjects},
})
export default class Tags extends Vue {
tagModule = getModule(TagModule, this.$store);
subjectModule = getModule(SubjectModule, this.$store);


  get subjects(){
    return this.subjectModule.subjects
  }

  get subjectsSelected(){
    return this.subjectModule.subjectsSelected
  }

 set subjects(subjects: Subject[]) {
   this.subjectModule.setSubjects(subjects)
 }

 set subjectsSelected(subjects: Subject[]){
   this.subjectModule.setSubjectsSelected(subjects)
 }
}
</script>

<style scoped>
</style>
