import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import SubjectsModel from '@/models/subjects.model'
import Axios from "@/plugins/Axios"
import DisciplineModel from "@/models/discipline.model";

@Module({ name: 'SubjectModule', namespaced: true })
export class SubjectModule extends VuexModule {
    _subjects: SubjectsModel[] = []
    _idDiscipline: String = ""
    _loading: Boolean = false

    get idDiscipline() {
      return this._idDiscipline
    }

    get subjects() {
      return this._subjects
    }

    get loading(){
      return this._loading
    }

    @Mutation
    setLoading(newStatus: Boolean){
      this._loading = newStatus
    }

    @Mutation
    setIdDiscipline(id: String) {
      this._idDiscipline = id
    }

    @Mutation
    setSubjects(subjects: SubjectsModel[]) {
      this._subjects = subjects
    }

    @Action({ commit: 'setSubjects' })
    findAll() {
      Axios.get('/assuntos').then(res=>{
        const sjs: [] = res.data
        let subjects: SubjectsModel[] = sjs.map(s =>{
          let subject = new SubjectsModel();
          Object.assign(subject, s);
          return subject
        })
        this.setSubjects(subjects)
      })
    }

  @Action
  filterByDiscipline(disciplines: DisciplineModel[]){
    return new Promise<DisciplineModel[]>( (reject, resolve) =>{
      Axios.post('/assuntos/filtro/disciplinas', disciplines).then(res=>{
        this.context.commit('SubjectModule/setSubjects', res.data, {root: true})
        resolve(res.data)
      }).catch(error=>{
        reject([])
        console.log("Erro ao filtrar disciplinas", error)
      })
    })
  }


}
