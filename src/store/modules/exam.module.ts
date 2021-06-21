import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import ExamModel from '@/models/exam.model'
import DisciplineRulesModel from '@/models/discipline.rules.model'
import { RegisterStatusEnum } from '@/models/register.status.enum'
import Axios from "@/plugins/Axios"
import { AxiosResponse } from 'axios'
import {RunService} from "@/service/run.service";
import {ExamService} from "@/service/exam.service";

@Module({ name: 'ExamModule', namespaced: true })
export class ExamModule extends VuexModule {
     private service: RunService<ExamModel> = new ExamService()
    _exams: ExamModel[] = []
    _exam: ExamModel = new ExamModel()
    _dialog = false
    _disciplineRule: DisciplineRulesModel = new DisciplineRulesModel()
    _disciplinesRules: DisciplineRulesModel[] = []
    _disciplineRulesDialog = false
    _registerStatus: RegisterStatusEnum = RegisterStatusEnum.INSERT
    _index = -1
    _validUpdate: boolean = false

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

    get validUpdate(){
      return this._validUpdate
  }

  @Mutation
  setValidUpdate(newValue: boolean){
      this._validUpdate = newValue
  }

    @Mutation
    setRegisterStatus(newValue: RegisterStatusEnum) {
      this._registerStatus = newValue
    }

    @Mutation
    addDisciplinesRules(newValue: DisciplineRulesModel) {
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
    setDisciplineRule(newValue: DisciplineRulesModel) {
      this._disciplineRule = newValue
    }

    @Mutation
    setDisciplineRulesDialog(newValue: boolean) {
      this._disciplineRulesDialog = newValue
    }

    @Mutation
    setExam(newExam: ExamModel) {
      this._exam = newExam
    }

    @Mutation
    _addToExams(newExam: ExamModel) {
      this._exams.push(newExam)
    }

    @Mutation
    setExams(exams: ExamModel[]) {
      this._exams = exams
    }

    @Mutation
    addDisciplineRule(dr: DisciplineRulesModel) {
      this._exam.disciplinesRules.push(dr)
    }

    @Mutation
    removeDisciplineRule(index: number) {
      this._exam.disciplinesRules.splice(index, 1)
    }

    @Mutation
    updateDisciplineRule(newValue: DisciplineRulesModel) {
      this.disciplinesRules[this._index] = newValue
    }

    @Mutation
      _updateExam(updatedExam: ExamModel) {
       let index = this._exams.map(t=> t.id)
                .indexOf(updatedExam.id)

       Object.assign(this._exams[index], updatedExam)
  }

  @Action
  save(): Promise<AxiosResponse<ExamModel>> {
    return this.service.save(this.exam)
  }

    @Action({commit:"setExams"})
    findAll() {
       return new Promise<ExamModel>(((resolve, reject) => {
         this.service.findAll().then(res=>{
           resolve(res.data)
           return res.data
         }).catch(error=>{
           reject(error)
           console.log(error)
         })
       }))
    }

    @Action
    delete(id):Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
          Axios.delete('/vestibulares/' + id).then(res=>{
            resolve(res)
          }).catch(error=>{
            reject(error)
          })
      })
    }

    @Action
    update(){
      return new Promise<AxiosResponse>((resolve, reject) => {
        Axios.put('/vestibulares', this.exam).then(res=>{
          if(res.status == 200){
            resolve(res)
          }
        }).catch(error=>{
          reject(null)
        })
      })
    }

}
