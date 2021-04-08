<template>
    <v-container>
        <v-card>
            <v-card-title>Detalhe da Questãos</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <exam></exam>
                    </v-col>
                    <v-col cols="6">
                        <disciplines></disciplines>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            v-model="numberQuestion"
                            outlined
                            label="Número da Questão"
                            dense />
                    </v-col>
                    <v-col cols="6">
                       <subjects></subjects>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col>
                        <v-checkbox v-model="isChecked" label="Está verificado ?" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3>Questão {{numberQuestion}}
                            <v-icon
                                class="ml-3"
                                :color="isChecked ? 'green' : 'red'"
                            >{{ isChecked ? 'mdi-check-circle' : 'mdi-cancel' }}</v-icon>
                        </h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <h3 class="ma-3">Matemática:</h3>
                    </v-col>
                    <v-col cols="10">
                        <run-tags v-model="subjectsSelected"></run-tags>
                    </v-col>
                </v-row>
                <run-question :card="true" />
                <v-row>
                    <v-col cols="6">
                        <v-btn block color="primary" style="color: white">Corrigir Questão</v-btn>
                    </v-col>
                    <v-col cols="6">
                         <v-btn dark block style="color: white">Relatar um Problema</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">

import
{Component, VModel, Vue} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { OptionModule } from "@/store/modules/option.module"
import { SubjectModule } from "@/store/modules/subject.module"
import { DisciplineModule } from '@/store/modules/discipline.module'
import Subjects from "@/components/run/Subjects.vue"
import Disciplines from "@/components/run/Disciplines.vue"
import ExamModel from "@/components/run/exam/Exams.vue"
import RunQuestion from "@/components/run/question/Question.vue"
import RunTags from "@/components/run/Tags.vue";
import SubjectsModel from "@/models/subjects.model";

@Component({
    name: "QuestionDetail",
    components: {
        QuestionDetail,
        Subjects,
        Disciplines,
        Exam,
        RunQuestion,
        RunTags
    }
})

export default class QuestionDetail extends Vue {
    @VModel({type:Array}) subjectsSelected!: SubjectsModel[]
    private subjectStore = getModule(SubjectModule, this.$store)
    private optionModule = getModule(OptionModule, this.$store)
    private disciplineModule = getModule(DisciplineModule, this.$store)

    private generatorColor: String = '0123456789ABCDEF'
    private numberQuestion: Number = 0
    private isChecked: Boolean = false
    private question: String = `
      <p style="font-size: 17px">Dentre os vários Reinos Bárbaros que se formaram na Europa, após a queda do Império Romano Ocidental,
      um teve grande destaque, em virtude de personagens como Clóvis e Carlos Magno. O grupo Germano organizador
      de tal reino foi o dos:</p><img src='teste.jpg'>`

    get option() {
        return this.optionModule.option
    }

    get options() {
        return this.optionModule.options
    }

    get subjects() {
      return this.subjectStore.subjects
    }

    get disciplines() {
        return this.disciplineModule.disciplines
    }

    get discipline() {
        return this.disciplineModule.discipline
    }

    colorRandom() {
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += this.generatorColor[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    created() {
        this.optionModule.findAll()
        console.log(this.colorRandom())
    }



}
</script>

<style>

[label] {
    font-size: 25px;
}

</style>
