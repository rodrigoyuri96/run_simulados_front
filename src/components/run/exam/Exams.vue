<template>
      <v-autocomplete
          v-model="exam"
          :loading="loading"
          :items="items"
          label="Vestibulares"
          :rules="rules"
          outlined
          dense
          required
          return-object
      >
        <template slot="selection" slot-scope="exam">
          {{ exam.item.title }} - {{ exam.item.year }}
        </template>
        <template slot="item" slot-scope="exam">
          {{ exam.item.title }} - {{ exam.item.year }}
        </template>
      </v-autocomplete>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {ExamModule} from "@/store/modules/exam.module";
import ExamModel from "@/models/exam.model";

@Component({
  name: "Exams"

})
export default class Exams extends Vue{
  examModule = getModule(ExamModule, this.$store)
  @VModel() exam!: ExamModel
  @Prop({type: Array}) rules!: [];
  loading: Boolean = false

  get exams(){
    return this.examModule.exams
  }

  get items(){
    return this.examModule.exams
  }

  created(){
    this.loading = true
    this.examModule.findAll().then(() => {
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
