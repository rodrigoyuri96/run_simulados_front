import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Discipline from "@/models/Discipline"
import Exam from '@/models/Exam'
import DisciplineRule from '@/models/DisciplineRule'
import { RegisterStatus } from '@/models/RegisterStatus'
import Axios from "@/plugins/Axios"

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

    @Action
    save() {
      return new Promise(((resolve, reject) => {
        Axios.post("/vestibulares", this.exam).then(res=>{
          resolve(res)
        }).catch(error=>{
          console.log("erro: ", error)
          reject(null)
        })
      }))
    }

    @Action
    findAll() {
      Axios.get('/vestibulares').then(res=>{
        this._setExams(res.data)
      })
    }

    @Action
    delete(){
      return new Promise((resolve, reject) => {
        Axios.delete('/vestibulares/' + this.exam.id).then(res=>{
          if(res.status == 200){
              resolve(true)
          }
        }).catch(error=>{
          reject(false)
        })
      })
    }

}
