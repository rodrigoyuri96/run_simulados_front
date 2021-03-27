import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Institution from '@/models/Institution'
import Axios from "axios"

@Module({ name: 'InstitutionModule' , namespaced: true })
export class InstitutionModule extends VuexModule {
    _institutions: Institution[] = []
    _institution: Institution = { id: 0, name: '' }
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
    setInstitution(newInstitution: Institution) {
      this._institution = newInstitution
    }

    @Mutation
    _addToInstitution(newDiscipline: Institution) {
      this._institutions.push(newDiscipline)
    }

    @Mutation
    _setInstitutions(institutions: Institution[]) {
      this._institutions = institutions
    }

    @Action
    findAll() {
      return new Promise(((resolve, reject) => {
        Axios.get('/instituicoes').then(res=>{
          const is: [] = res.data
          let institutions: Institution[] = is.map(i =>{
            let institution = new Institution();
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
