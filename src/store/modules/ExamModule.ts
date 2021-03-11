import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Discipline from "@/models/Discipline"
import Exam from '@/models/Exam'
import DisciplineRule from '@/models/DisciplineRule'
import { RegisterStatus } from '@/models/RegisterStatus'

@Module({ name: 'ExamModule', namespaced: true })
export class ExamModule extends VuexModule {
    _exams: Exam[] = []
    _exam: Exam = new Exam()
    _dialog = false
    _disciplineRule: DisciplineRule = new DisciplineRule()
    _disciplinesRules: DisciplineRule[] = []
    _disciplineRulesDialog = false
    _registerStatus: RegisterStatus = RegisterStatus.INSERT
    _index = -1

    get dialog() {
      return this._dialog
    }

    get isUpdate() {
      return this._index > -1
    }

    get index() {
      return this._index
    }

    get disciplineRule() {
      return this._disciplineRule
    }

    get disciplineRulesDialog() {
      return this._disciplineRulesDialog
    }

    get disciplinesRules() {
      return this._disciplinesRules
    }

    get exams() {
      return this._exams
    }

    get exam() {
      return this._exam
    }

    get registerStatus() {
      return this._registerStatus
    }

    @Mutation
    setRegisterStatus(newValue: RegisterStatus) {
      this._registerStatus = newValue
    }

    @Mutation
    addDisciplinesRules(newValue: DisciplineRule) {
      this.disciplinesRules.push(newValue)
    }

    @Mutation
    setDialog(newValue: boolean) {
      this._dialog = newValue
    }

    @Mutation
    setIndex(newValue: number) {
      this._index = newValue
    }

    @Mutation
    setDisciplineRule(newValue: DisciplineRule) {
      this._disciplineRule = newValue
    }

    @Mutation
    setDisciplineRulesDialog(newValue: boolean) {
      this._disciplineRulesDialog = newValue
    }

    @Mutation
    setExam(newExam: Exam) {
      this._exam = newExam
    }

    @Mutation
    _addToExams(newExam: Exam) {
      this._exams.push(newExam)
    }

    @Mutation
    _setExams(exams: Exam[]) {
      this._exams = exams
    }

    @Mutation
    addDisciplineRule(dr: DisciplineRule) {
      this._exam.disciplinesRules.push(dr)
    }

    @Mutation
    removeDisciplineRule(index: number) {
      this._exam.disciplinesRules.splice(index, 1)
    }

    @Mutation
    updateDisciplineRule(newValue: DisciplineRule) {
      this.disciplinesRules[this._index] = newValue
    }

    @Action({ commit:'_addToExams' })
    save() {
      return this.exam
    }

    @Action({ commit: '_setExams' })
    findAll() {
      const e1 = new Exam()

      e1.title = 'FUVEST - 1 Semestre/2019'
      e1.id = 1
      e1.obs = 'Questões 3 e 4 anuladas'
      e1.book = 'Caderno 2'
      e1.year = 2019
      e1.semester = 2
      e1.phase = 1
      const dr1 = new DisciplineRule()
      const d1 = new Discipline()

      d1.id = 1
      d1.name = 'Matematica'
      dr1.discipline = d1
      dr1.numberOfQuestions = 10
      const dr2 = new DisciplineRule()
      const d2 = new Discipline()

      d2.id = 2
      d2.name = 'Geografia'
      dr2.discipline = d2
      dr2.numberOfQuestions = 10
      e1.disciplinesRules.push(dr1, dr2)
      const exams: Exam[] = []

      exams.push(e1)
      console.log('VESTIBULARES', exams)

      return exams

    }

}
