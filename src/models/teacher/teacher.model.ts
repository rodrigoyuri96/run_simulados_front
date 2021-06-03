import ClassesRulesModel from '@/models/teacher/class.rules.model'

export default class TeacherModel{
  public id: string
  public name: string
  public email: string
  public phone: string
  public classesRules: ClassesRulesModel[]

  constructor(){
    this.id = null
    this.name = ''
    this.email = ''
    this.phone = ''
    this.classesRules = []
  }
}
