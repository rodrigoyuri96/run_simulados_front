import DisciplineModel from '@/models/discipline.model'
import ClassModel from '@/models/class.model'

export default class ClassesRulesModel{
    public discipline: DisciplineModel 
    public class: ClassModel

    constructor(){
        this.discipline = new DisciplineModel()
        this.class = new ClassModel()
    }
}