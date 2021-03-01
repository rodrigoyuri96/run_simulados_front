import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Institution from '@/models/Institution'

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

    @Action({ commit: '_setInstitutions' })
    findAll() {
      const i1 = new Institution()

      i1.name = 'USP'
      i1.id = 1
      const i2 = new Institution()

      i2.name = 'UNICAMP'
      i2.id = 2
      const institutions: Institution[] = []

      institutions.push(i1,i2)

      return institutions
    }

}
