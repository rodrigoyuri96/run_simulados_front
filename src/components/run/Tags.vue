<template>
<div>
  <div v-if="!layoutUser">
    <v-chip
      v-for="(subjects, i) in subjectsSelected"
      :key="i"
      class="ma-2"
      :color="colorRandom()"
      outlined
      close
      @click:close="deleteTag(i)"
      >{{ subjects.name }}</v-chip
    ></div>
    <div v-if="layoutUser">
      <v-chip
      v-for="(disciplines, i) in disciplinesSelected"
      :key="i"
      class="ma-2"
      :color="colorRandom()"
      label
      text-color="white"
      close
      large
      @click:close="deleteTag(i)"
      >{{ disciplines.name }}</v-chip
    >
  </div>
</div>
</template>

<script lang="ts">
import {Vue, Component, VModel, Prop} from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { SubjectModule } from "@/store/modules/subject.module";
import RunSubjects from "@/components/run/Subjects.vue";
import SubjectsModel from "@/models/subjects.model";
import { DisciplineModule } from "@/store/modules/discipline.module";
import RunDiscipline from "@/components/run/Disciplines.vue";
import DisciplineModel from "@/models/discipline.model";

@Component({
  name: "Tags",
    components: {RunSubjects, RunDiscipline},
})
export default class Tags extends Vue {
   subjectModule = getModule(SubjectModule, this.$store);
   disciplineModule = getModule(DisciplineModule, this.$store);
   @Prop({type:Boolean}) layoutUser!: Boolean
   @Prop() defaultColor: boolean;
   generatorColor: String = "1234567890ABCDEF";
   chip: boolean = true;
   @VModel({type: Array}) subjectsSelected!:[]
   @VModel({ type: Array }) disciplinesSelected!: [];


  get subjects(){
    return this.subjectModule.subjects
  }

 set subjects(subjects: SubjectsModel[]) {
   this.subjectModule.setSubjects(subjects)
 }

 deleteTag(index: number){
   this.subjectsSelected.splice(index, 1)
 }

   get disciplines() {
    return this.disciplineModule.disciplines;
  }

  set disciplines(disciplines: DisciplineModel[]) {
    this.disciplineModule._setDisciplines(this.disciplines);
  }

  deleteTagDiscipline(index: number) {
    this.disciplinesSelected.splice(index, 1);
  }

  colorRandom() {
    if (!this.layoutUser) {
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += this.generatorColor[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    return "#00ddbb";
  }
}
</script>

<style scoped>
</style>
