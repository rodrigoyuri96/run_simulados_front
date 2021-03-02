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
                        <h3>Ex: Questão {{numberQuestion}} 
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
                        <v-chip
                            v-for="(subjects, i) in subjectsSelected " :key="i"
                            class="ma-2" 
                            :color="colorRandom()"
                            outlined 
                            >{{subjects.name}}</v-chip>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div>
                            <p v-html="question"></p>
                            <v-radio-group column>
                                <v-radio 
                                    v-for="(option, i) in options" :key="i"
                                    :label="option.description"
                                    ></v-radio>
                            </v-radio-group>
                        </div>
                    </v-col>
                </v-row>
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

import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { OptionModule } from "@/store/modules/OptionModule"
import { SubjectModule } from "@/store/modules/SubjectModule"
import { DisciplineModule } from '@/store/modules/DisciplineModule'
import Subjects from "@/components/run/Subjects.vue"
import Disciplines from "@/components/run/Disciplines.vue"
import Exam from "@/components/run/exam/Exams.vue"
 

@Component({
    name: "QuestionDetail",
    components: { 
        QuestionDetail, 
        Subjects, 
        Disciplines, 
        Exam 
    }
})

export default class QuestionDetail extends Vue {

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

    get subjectsSelected() {
      return this.subjectStore.subjectsSelected
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