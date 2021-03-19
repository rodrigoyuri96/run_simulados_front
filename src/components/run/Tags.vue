<template>
  <div>
    <v-chip
      v-for="(subjects, i) in subjectsSelected"
      :key="i"
      class="ma-2"
      :color="colorRandom()"
      outlined
      close
      @click:close="deleteTag(i)"
      >{{ subjects.name }}</v-chip
    >
  </div>
</template>

<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
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
   generatorColor: String = "1234567890ABCDEF";
   chip: boolean = true;
   @VModel({type: Array}) subjectsSelected!:[]


  get subjects(){
    return this.subjectModule.subjects
  }

 set subjects(subjects: Subject[]) {
   this.subjectModule.setSubjects(subjects)
 }

 deleteTag(index: number){
   this.subjectsSelected.splice(index, 1)
 }

 colorRandom() {
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += this.generatorColor[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
</script>

<style scoped>
</style>
