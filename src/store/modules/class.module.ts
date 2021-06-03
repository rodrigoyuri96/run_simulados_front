import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"
import ClassModel from "@/models/class.model"
import Axios from "@/plugins/Axios"

@Module({ name: 'ClassModule', namespaced: true})
export class ClassModule extends VuexModule {
    _classList: ClassModel[] = []
    _class: ClassModel = {id: 0, name: ""}
    _loading: Boolean = false

    get classes(){
        return this._classList
    }

    get class(){
        return this._class
    }

    get loading(){
        return this.loading
    }

    @Mutation
    setLoading(newStatus: Boolean){
        this._loading = newStatus
    }

    @Mutation
    _addToClass(newClass: ClassModel){
        this._classList.push(newClass)
    }

    @Mutation
    _setClasses(classes: ClassModel[]){
        this._classList = classes
    }
    /*
    @Action
    findAll(){
      return new Promise(((resolve, reject) => {
        Axios.get('/turmas').then(res=>{
          const cs: [] = res.data
          let classes: ClassModel[] = cs.map(c =>{
            let class1 = new ClassModel();
            Object.assign(class1, c);
            return class1
          })
          this._setClasses(classes)
          resolve(true)
        }).catch(error=>{
          reject(false)
        })
      }))
    } */
}