import DisciplineModel from '@/models/discipline.model'

export default class DisciplineRulesModel {
    public discipline: DisciplineModel
    public numberOfQuestions: number

    constructor() {
      this.discipline = new DisciplineModel()
      this.numberOfQuestions = 0
    }
}
