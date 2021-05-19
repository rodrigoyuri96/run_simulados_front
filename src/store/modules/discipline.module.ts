import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import DisciplineModel from "@/models/discipline.model";
import Axios from "@/plugins/Axios"
import SubjectsModel from "@/models/subjects.model";

@Module({ name: 'DisciplineModule', namespaced: true })
export class DisciplineModule extends VuexModule {
    _disciplineList: DisciplineModel[] = []
    _discipline: DisciplineModel = {id: 0, name: ""}
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
    setDiscipline(newDiscipline: DisciplineModel){
        this._discipline = newDiscipline
    }

    @Mutation
    _addToDiscipline(newDiscipline: DisciplineModel){
        this._disciplineList.push(newDiscipline)
    }

    @Mutation
    _setDisciplines(disciplines: DisciplineModel[]){
        this._disciplineList = disciplines
    }

    @Action
    findAll(){
      return new Promise(((resolve, reject) => {
        Axios.get('/disciplinas').then(res=>{
          const ds: [] = res.data
          let disciplines: DisciplineModel[] = ds.map(d =>{
            let discipline = new DisciplineModel();
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
    filterBySubject(subjects: SubjectsModel[]){
      return new Promise<SubjectsModel[]>( (reject, resolve) =>{
        Axios.post('/disciplinas/filtro/assuntos', subjects).then(res=>{
          resolve(res.data)
        }).catch(error=>{
          reject([])
          console.log("Erro ao filtrar assuntos", error)
        })
      })
    }


}
