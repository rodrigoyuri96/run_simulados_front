import Institution from '@/models/Institution'
import DisciplineRule from '@/models/DisciplineRule'

export default class Exam {
    public id: string
    public title: string
    public year: number
    public book: string
    public obs: string
    public semester: number
    public phase: number
    public institution: Institution
    public disciplinesRules: DisciplineRule []

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
