import Vue from 'vue'
import Vuex from 'vuex'
import {ExamModule} from "@/store/modules/ExamModule";
import {InstitutionModule} from "@/store/modules/InstitutionModule";
import {DisciplineModule} from "@/store/modules/DisciplineModule";
import {SubjectModule} from "@/store/modules/SubjectModule";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import {EventModule} from "@/store/modules/EventModule";
import {OptionModule} from "@/store/modules/OptionModule"

// Global vuex
import AppModule from './app'
import {QuestionRegisterModule} from "@/store/modules/QuestionRegisterModule";

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
    QuestionRegisterModule
  }
})

export default store
