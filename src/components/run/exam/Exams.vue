<template>
  <div>
    <v-autocomplete
        v-model="exam"
        :items="exams"
        item-text="title"
        label="Vestibulares"
        outlined
        dense
        @change="imprime()"
        return-object
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {ExamModule} from "@/store/modules/ExamModule";
import Exam from "@/models/Exam";

@Component({
  name: "Exams"

})
export default class Exams extends Vue{
  examModule = getModule(ExamModule, this.$store)

  get exams(){
    return this.examModule.exams
  }

  get exam(){
    return this.examModule.exam
  }

  set exam(exam: Exam){
    this.examModule.setExam(exam)
  }

  created(){
    this.examModule.findAll()
    console.log("exames", this.exams)
  }

  imprime(){
    console.log(this.exam)
  }

}
</script>

<style scoped>

</style>
