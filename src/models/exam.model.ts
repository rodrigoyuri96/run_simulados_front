import InstitutionModel from '@/models/institution.model'
import DisciplineRulesModel from '@/models/discipline.rules.model'

export default class ExamModel {
    public id: string
    public title: string
    public year: number
    public book: string
    public obs: string
    public semester: number
    public phase: number
    public institution: InstitutionModel
    public disciplinesRules: DisciplineRulesModel []

    constructor() {
      this.id = null
      this.title = ''
      this.year = 0
      this.book = ''
      this.obs = ''
      this.institution = null
      this.disciplinesRules = []
    }
}
