<template>
  <v-form v-model="validSubjects">
    <v-autocomplete
      v-model="subjects"
      :items="items"
      item-text="name"
      label="Assuntos"
      :rules="[(v) => !!v || 'campo obrigatório']"
      outlined
      multiple
      dense
      @change="handleSubject"
      return-object
      auto-select-first
      clearable
      chips
      deletable-chips
      small-chips
      hide-no-data
    >
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="orange--text">
          ({{ subjectsSelected.length}} assuntos selecionados)
        </span>
      </template>
    </v-autocomplete>
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, Emit, VModel} from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { SubjectModule } from "../../store/modules/SubjectModule";
import Subject from "../../models/Subject";
import {DisciplineModule} from "@/store/modules/DisciplineModule";
import Discipline from "@/models/Discipline";

@Component({
  name: "Subjects",
})
export default class Subjects extends Vue {
  subjectModule= getModule(SubjectModule, this.$store)
  valid: boolean = false;
  validSubjects: boolean = false;
  @VModel({type: Array}) subjects!: Subject[]

  get items() {
    return this.subjectModule.subjects;
  }

  mounted() {
    this.subjectModule.findAll();
  }

  @Emit('valid-field')
  handleValid(event: boolean) {
    if (event != null && event !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  handleSubject(){
    this.handleValid(this.valid)
  }
}
</script>

<style scoped>
</style>

