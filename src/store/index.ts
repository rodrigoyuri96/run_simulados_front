import Vue from 'vue'
import Vuex from 'vuex'
import {ExamModule} from "@/store/modules/exam.module";
import {InstitutionModule} from "@/store/modules/institution.module";
import {DisciplineModule} from "@/store/modules/discipline.module";
import {SubjectModule} from "@/store/modules/subject.module";
import {ValidationMessageModule} from "@/store/modules/validation/ValidationMessageModule";
import {EventModule} from "@/store/modules/event.module";
import {OptionModule} from "@/store/modules/option.module"
import { CourseModule } from "@/store/modules/course.module"
import { CommunityModule } from "@/store/modules/community.module"
import { SimulatedModule } from './modules/simulated.module';

// Global vuex
import AppModule from './app'
import {QuestionModule} from "@/store/modules/question.module";
import {UserModule} from "@/store/modules/user.module";
import {TeamModule} from '@/store/modules/team.module.ts'
import {TeacherModule} from "@/store/modules/teacher.module";

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    UserModule,
    ExamModule,
    InstitutionModule,
    DisciplineModule,
    SubjectModule,
    ValidationMessageModule,
    EventModule,
    OptionModule,
    QuestionModule,
    TeamModule,
    CourseModule,
    CommunityModule,
    TeacherModule,
    SimulatedModule
  }
})

export default store
