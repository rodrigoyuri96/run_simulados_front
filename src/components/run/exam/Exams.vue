<template>
  <div>
    <v-form v-model="valid" >
      <v-autocomplete
          :loading="loading"
          v-model="exam"
          :items="exams"
          label="Vestibulares"
          :rules="[v=> !!v || 'campo obrigatório']"
          outlined
          dense
          @change="handleValid()"
          return-object
      >
        <template slot="selection" slot-scope="exam">
          {{ exam.item.title }} - {{ exam.item.year }}
        </template>
        <template slot="item" slot-scope="exam">
          {{ exam.item.title }} - {{ exam.item.year }}
        </template>
      </v-autocomplete>
    </v-form>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, VModel} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {ExamModule} from "@/store/modules/exam.module";
import ExamModel from "@/models/exam.model";

@Component({
  name: "Exams"

})
export default class Exams extends Vue{

  @VModel() exam!: ExamModel
  examModule = getModule(ExamModule, this.$store)
  valid: boolean = false
  loading: Boolean = false

  get exams(){
    return this.examModule.exams
  }

  @Emit('valid')
  handleValid(){
    return this.valid
  }

  created(){
    this.loading = true
    this.examModule.findAll().then(()=>{
      this.loading = false
    })
    console.log("vestibulares", this.examModule.exams)
  }

}
</script>

<style scoped>

</style>
