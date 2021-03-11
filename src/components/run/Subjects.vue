<template>
  <v-form v-model="validSubjects">
    <v-autocomplete
      v-model="subjectsSelected"
      :items="subjects"
      item-text="name"
      label="Assuntos"
      :rules="[(v) => !!v || 'campo obrigatório']"
      outlined
      multiple
      dense
      @change="handleValid"
      return-object
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
import { Vue, Component, Emit } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { SubjectModule } from "../../store/modules/SubjectModule";
import Subject from "../../models/Subject";

@Component({
  name: "Subjects",
})
export default class Subjects extends Vue {
  subjectModule = getModule(SubjectModule, this.$store);
  valid: boolean = false;
  validSubjects: boolean = false;

  get subjects() {
    return this.subjectModule.subjects;
  }

  get subjectsSelected() {
    return this.subjectModule.subjectsSelected;
  }

  set subjectsSelected(subjects: Subject[]) {
    this.subjectModule.setSubjectsSelected(subjects);
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
}
</script>

<style scoped>
</style>

