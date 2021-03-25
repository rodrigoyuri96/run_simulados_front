import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Discipline from "@/models/Discipline";
import Axios from "@/plugins/Axios"
import Subject from "@/models/Subject";

@Module({ name: 'DisciplineModule', namespaced: true })
export class DisciplineModule extends VuexModule {
    _disciplineList: Discipline[] = []
    _discipline: Discipline = {id: 0, name: ""}
    _loading: Boolean = false

    get disciplines(){
        return this._disciplineList
    }

    get discipline(){
        return this._discipline
    }

    get loading(){
      return this._loading
    }

    @Mutation
    setLoading(newStatus: Boolean){
      this._loading = newStatus
    }

    @Mutation
    setDiscipline(newDiscipline: Discipline){
        this._discipline = newDiscipline
    }

    @Mutation
    _addToDiscipline(newDiscipline: Discipline){
        this._disciplineList.push(newDiscipline)
    }

    @Mutation
    _setDisciplines(disciplines: Discipline[]){
        this._disciplineList = disciplines
    }

    @Action
    findAll(){
      return new Promise(((resolve, reject) => {
        Axios.get('/disciplinas').then(res=>{
          const ds: [] = res.data
          let disciplines: Discipline[] = ds.map(d =>{
            let discipline = new Discipline();
            Object.assign(discipline, d);
            return discipline
          })
          this._setDisciplines(disciplines)
          resolve(true)
        }).catch(error=>{
          reject(false)
        })
      }))
    }

    

    @Action
    filterBySubject(subjects: Subject[]){
      return new Promise<Subject[]>( (reject, resolve) =>{
        Axios.post('/disciplinas/filtro/assuntos', subjects).then(res=>{
          resolve(res.data)
        }).catch(error=>{
          reject([])
          console.log("Erro ao filtrar assuntos", error)
        })
      })
    }
    

}
