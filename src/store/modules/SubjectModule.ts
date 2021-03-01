import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Subject from '@/models/Subject'

@Module({ name: 'SubjectModule', namespaced: true })
export class SubjectModule extends VuexModule {
    _subjects: Subject[] = []
    _subjectSelected: Subject[] = []
    _idDiscipline = 0

    get idDiscipline() {
      return this._idDiscipline
    }

    get subjects() {
      return this._subjects
    }

    get subjectsSelected() {
      return this._subjectSelected
    }

    @Mutation
    setSubjectsSelected(subjects: Subject[]) {
      this._subjectSelected = subjects
    }

    @Mutation
    setIdDiscipline(id: number) {
      this._idDiscipline = id
    }

    @Mutation
    setSubjects(subjects: Subject[]) {
      this._subjects = subjects
    }

    @Action({ commit: 'setSubjects' })
    findAll() {
      const s1 = new Subject()

      s1.id = 1
      s1.name = 'Conjuntos Numéricos'
      s1.idDiscipline = 1

      const s2 = new Subject()

      s2.id = 2
      s2.name = 'Trigonometria'
      s2.idDiscipline = 1

      const s3 = new Subject()

      s3.id = 3
      s3.name = 'Cartografia'
      s3.idDiscipline = 2

      const s4 = new Subject()

      s4.id = 4
      s4.name = 'Geofísica'
      s4.idDiscipline = 2

      const find: Subject[] = []

      find.push(s1,s2,s3,s4)

      return find

    }

}
