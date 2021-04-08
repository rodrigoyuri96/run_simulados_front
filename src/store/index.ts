import Vue from 'vue'
import Vuex from 'vuex'
import {ExamModule} from "@/store/modules/exam.module";
import {InstitutionModule} from "@/store/modules/institution.module";
import {DisciplineModule} from "@/store/modules/discipline.module";
import {SubjectModule} from "@/store/modules/subject.module";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import {EventModule} from "@/store/modules/event.module";
import {OptionModule} from "@/store/modules/option.module"

// Global vuex
import AppModule from './app'
import {QuestionModule} from "@/store/modules/question.module";

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    ExamModule,
    InstitutionModule,
    DisciplineModule,
    SubjectModule,
    ValidationMessageModule,
    EventModule,
    OptionModule,
    QuestionModule,
  }
})

export default store
