import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import TeacherModel from "@/models/teacher/teacher.model";
import {TeacherService} from "@/service/teacher.service";
import ClassesRulesModel from '@/models/teacher/class.rules.model'


@Module({ name: 'TeacherModule', namespaced: true })
export class TeacherModule extends VuexModule {
  service = new TeacherService()
  _teachers: TeacherModel[] = []
  _teacher: TeacherModel = new TeacherModel()
  _classRule: ClassesRulesModel = new ClassesRulesModel()
  _classesRules: ClassesRulesModel[] = []
  _index = -1

  get teachers(){
    return this._teachers
  }

  get teacher(){
    return this._teacher
  }

  get index() {
    return this._index
  }

  get classRule() {
    return this._classRule
  }

  get classesRules() {
    return this._classesRules
  }

  @Mutation
  setTeacher(newTeacher: TeacherModel){
    this._teacher = newTeacher
  }

  @Mutation
  _addToTeachers(newTeacher: TeacherModel){
    this._teachers.push(newTeacher)
  }

  @Mutation
  _setTeachers(teachers: TeacherModel[]){
    this._teachers = teachers
  }

  
  @Mutation
  setIndex(newValue: number) {
    this._index = newValue
  }
  
    @Mutation
    setClassRule(newValue: ClassesRulesModel) {
      this._classRule = newValue
    }

  @Mutation
    addClassesRules(newValue: ClassesRulesModel) {
      this._teacher.classesRules.push(newValue)
    }

  @Mutation
    removClassesRule(index: number) {
      this._teacher.classesRules.splice(index, 1)
    }

  @Action
  findAll(): Promise<any>{
    return this.service.findAll().then(res=>{
      console.log("PROFESSORES ENCONTRADOS: ", res.data)
        this._setTeachers(res.data)
      })
  }


}
