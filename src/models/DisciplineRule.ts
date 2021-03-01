import Discipline from '@/models/Discipline'

export default class DisciplineRule {
    public discipline: Discipline
    public numberOfQuestions: number

    constructor() {
      this.discipline = new Discipline()
      this.numberOfQuestions = 0
    }
}
