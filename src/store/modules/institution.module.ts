import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import InstitutionModel from '@/models/institution.model'
import Axios from "axios"

@Module({ name: 'InstitutionModule' , namespaced: true })
export class InstitutionModule extends VuexModule {
    _institutions: InstitutionModel[] = []
    _institution: InstitutionModel = { id: 0, name: '' }
    _validField = false

    get institutions() {
      return this._institutions
    }

    get institution() {
      return this._institution
    }

    get validField() {
      return this._validField
    }

    @Mutation
    setValidField(newValue: boolean) {
      this._validField = newValue
    }

    @Mutation
    setInstitution(newInstitution: InstitutionModel) {
      this._institution = newInstitution
    }

    @Mutation
    _addToInstitution(newDiscipline: InstitutionModel) {
      this._institutions.push(newDiscipline)
    }

    @Mutation
    _setInstitutions(institutions: InstitutionModel[]) {
      this._institutions = institutions
    }

    @Action
    findAll() {
      return new Promise(((resolve, reject) => {
        Axios.get('/instituicoes').then(res=>{
          const is: [] = res.data
          let institutions: InstitutionModel[] = is.map(i =>{
            let institution = new InstitutionModel();
            Object.assign(institution, i);
            return institution
          })
          this._setInstitutions(institutions)
          resolve(true)
        }).catch(error=>{
          reject(false)
        })
      }))
    }

}
