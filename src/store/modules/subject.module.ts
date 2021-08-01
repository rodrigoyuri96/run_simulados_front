import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import SubjectsModel from '@/models/subjects.model'
import Axios from "@/plugins/Axios"
import DisciplineModel from "@/models/discipline.model";

@Module({ name: 'SubjectModule', namespaced: true })
export class SubjectModule extends VuexModule {
    _subjects: SubjectsModel[] = []
    _idDiscipline: number = 0
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
    setIdDiscipline(id: number) {
      this._idDiscipline = id
    }

    @Mutation
    setSubjects(subjects: SubjectsModel[]) {
      this._subjects = subjects
    }

    @Action({ commit: 'setSubjects' })
    findAll() {
      /*
      Axios.get('/assuntos').then(res=>{
        const sjs: [] = res.data
        let subjects: SubjectsModel[] = sjs.map(s =>{
          let subject = new SubjectsModel();
          Object.assign(subject, s);
          return subject
        })
        this.setSubjects(subjects)
      })
      */
      
      const s1 = new SubjectsModel()
      s1.name = 'Estátistica'
      s1.id = 1
      s1.idDiscipline = 1
      const s2 = new SubjectsModel()
      s2.name = "Funções"
      s2.id = 2
      s2.idDiscipline = 1

      const s3 = new SubjectsModel()
      s3.name = "Globalização"
      s3.id = 3
      s3.idDiscipline = 2
      const s4 = new SubjectsModel()
      s4.name = "Problemas Ambientais"
      s4.id = 4
      s4.idDiscipline = 2

      const s5 = new SubjectsModel()
      s5.name = "Eletricidade"
      s5.id = 5
      s5.idDiscipline = 3
      const s6 = new SubjectsModel()
      s6.name = "Leis de Newton"
      s6.id = 5
      s6.idDiscipline = 3

      const s12: SubjectsModel[] = []

      s12.push(s1,s2,s3,s4,s5,s6)

      return s12
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
