import Institution from '@/models/Institution'
import DisciplineRule from '@/models/DisciplineRule'

export default class Exam {
    public id: number
    public title: string
    public year: number
    public book: string
    public obs: string
    public institution: Institution
    public disciplinesRules: DisciplineRule []

    constructor() {
      this.id = 0
      this.title = ''
      this.year = 0
      this.book = ''
      this.obs = ''
      this.institution = new Institution()
      this.disciplinesRules = []
    }
}
