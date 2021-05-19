import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {TeacherModel} from "@/models/teacher/teacher.model";
import {TeacherService} from "@/service/teacher.service";


@Module({ name: 'TeacherModule', namespaced: true })
export class TeacherModule extends VuexModule {
  service = new TeacherService()
  _teachers: TeacherModel[] = []
  _teacher: TeacherModel

  get teachers(){
    return this._teachers
  }

  get teacher(){
    return this._teacher
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

  @Action
  findAll(): Promise<any>{
    return this.service.findAll().then(res=>{
      console.log("PROFESSORES ENCONTRADOS: ", res.data)
        this._setTeachers(res.data)
      })
  }


}
