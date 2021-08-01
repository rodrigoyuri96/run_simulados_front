import DisciplineModel from "./discipline.model"
import SubjectsModel from "./subjects.model"

export default class SimulatedModel {
    public id: String
    public disciplines: DisciplineModel[]
    public subjects: SubjectsModel[]

    constructor(){
        this.id = null
        this.disciplines = []
        this.subjects = []
    }
}