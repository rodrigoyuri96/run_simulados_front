import Vue from 'vue'
import Vuex from 'vuex'
import {ExamModule} from "@/store/modules/ExamModule";
import {InstitutionModule} from "@/store/modules/InstitutionModule";
import {DisciplineModule} from "@/store/modules/DisciplineModule";
import {SubjectModule} from "@/store/modules/SubjectModule";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";

// Global vuex
import AppModule from './app'

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
    ValidationMessageModule
  }
})

export default store
