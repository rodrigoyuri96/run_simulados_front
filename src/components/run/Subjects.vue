<template>
  <div>
    <div v-if="!layoutUser">
      <v-autocomplete
        v-model="subjects"
        :items="items"
        item-text="name"
        label="Assuntos"
        :rules="rules"
        outlined
        multiple
        dense
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
            ({{ subjects.length }} assuntos selecionados)
          </span>
        </template>
      </v-autocomplete>
    </div>
    <div v-if="layoutUser">
      <v-autocomplete
        v-for="(disciplines, i) in disciplinesSelected"
        v-model="subjects"
        :key="i"
        :items="items"
        item-text="name"
        :label="'Selecione os assuntos de ' + disciplines.name"
        :rules="rules"
        multiple
        return-object
      >
        <template v-slot:selection="{ index }">
          <span v-if="index === 0" class="orange--text">
            ({{ subjects.length }} assuntos selecionados)
          </span>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { SubjectModule } from "../../store/modules/subject.module";
import SubjectsModel from "../../models/subjects.model";
import { DisciplineModule } from "@/store/modules/discipline.module";
import DisciplineModel from "@/models/discipline.model";

@Component({
  name: "Subjects",
})
export default class Subjects extends Vue {
  subjectModule = getModule(SubjectModule, this.$store);
  disciplineModule = getModule(DisciplineModule, this.$store);
  valid: boolean = false;
  validSubjects: boolean = false;
  @VModel({ type: Array }) subjects!: SubjectsModel[];
  @Prop({ type: Array }) rules: any[];
  @Prop({ type: Boolean }) layoutUser!: Boolean;
  @VModel({ type: Array }) disciplinesSelected!: [];
  @VModel({ type: Array }) subjectsSelected!: [];

  get items() {
    return this.subjectModule.subjects;
  }

  get loading() {
    return this.subjectModule.loading;
  }

  set loading(status: Boolean) {
    this.subjectModule.setLoading(status);
  }

 

  /*
  mounted() {
    this.subjectModule.findAll();
  }*/

  created() {
    this.subjectModule.findAll();
  }
}
</script>

<style scoped>
</style>

