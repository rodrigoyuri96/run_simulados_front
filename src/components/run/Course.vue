<template>
  <v-form v-model="valid">
    <v-autocomplete
      v-model="courses"
      :items="items"
      :rules="rules"
      item-text="name"
      outlined
      label="cursos"
      dense
      @change="handleValid()"
      return-object
      auto-select-first
    />
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, VModel, Emit, Prop} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { CourseModule } from '@/store/modules/course.module'

@Component({
  name: 'Course'
})

export default class Course extends Vue {
  courseModule = getModule(CourseModule, this.$store)
  @VModel() courses: any
  @VModel() course!: any
  @Prop({type:Array}) rules: any[]
  valid: boolean = false
  items = [{id: 1, name: "Medicina"}, {id: 2, name: "Química"}, {id: 3, name: "Física"}, {id: 4, name: "Matemática"}];

/*
  get items() {
    return this.courseModule.courses
  }
*/
  @Emit('valid')
  handleValid(){
    return this.valid
  }

/*
  created() {
    this.courseModule.findAll()
  }
*/
  updated(){
    this.handleValid()
  }
}
</script>

<style scoped>

</style>
