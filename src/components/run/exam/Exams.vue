<template>
  <div>
    <v-form v-model="valid" >
    <v-autocomplete
        v-model="exam"
        :items="exams"
        item-text="title"
        label="Vestibulares"
        :rules="[v=> !!v || 'campo obrigatório']"
        outlined
        dense
        @change="handleValid()"
        return-object
    />
    </v-form>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, VModel} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {ExamModule} from "@/store/modules/ExamModule";
import Exam from "@/models/Exam";

@Component({
  name: "Exams"

})
export default class Exams extends Vue{

  @VModel({type: Exam}) exam!: Exam
  @VModel({type: Exam}) examModel!: Exam[]
  examModule = getModule(ExamModule, this.$store)
  valid: boolean = false

  get exams(){
    return this.examModule.exams
  }

  @Emit('valid')
  handleValid(){
    return this.valid
  }

  created(){
    this.examModule.findAll()
  }

}
</script>

<style scoped>

</style>
