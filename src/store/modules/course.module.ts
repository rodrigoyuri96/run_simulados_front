import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import CourseModel from '@/models/course.model'
import Axios from "axios"

@Module({ name: 'CourseModule' , namespaced: true })
export class CourseModule extends VuexModule {
    _courses: CourseModel[] = []
    _course: CourseModel = { id: 0, name: '' }
    _validField = false

    get courses() {
      return this._courses
    }

    get course() {
      return this._course
    }

    get validField() {
      return this._validField
    }

    @Mutation
    setValidField(newValue: boolean) {
      this._validField = newValue
    }

    @Mutation
    setCourse(newCourse: CourseModel) {
      this._course = newCourse
    }

    @Mutation
    _addToCourse(newCourse: CourseModel) {
      this._courses.push(newCourse)
    }

    @Mutation
    _setCourses(courses: CourseModel[]) {
      this._courses = courses
    }

    /*
    @Action
    findAll() {
      return new Promise(((resolve, reject) => {
        Axios.get('/cursos').then(res=>{
          const is: [] = res.data
          let courses: CourseModel[] = is.map(i =>{
            let course = new CourseModel();
            Object.assign(course, i);
            return course
          })
          this._setCourses(courses)
          resolve(true)
        }).catch(error=>{
          reject(false)
        })
      }))
    }
    */

}
