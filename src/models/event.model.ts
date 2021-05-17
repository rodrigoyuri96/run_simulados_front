import DisciplineModel from "./discipline.model"
import SubjectsModel from "./subjects.model"
import InstitutionModel from './institution.model'

export default class EventModel {
    public id: String
    public title: String
    public eventType: String
    public category: String
    public disciplines: DisciplineModel[] 
    public subjects: SubjectsModel[]
    public startDateSubscription: String
    public endDateSubscription: String
    public startDateEvent: String
    public endDateEvent: String
    public numberSubscribers: Number
    public institutions: InstitutionModel[]
    public startTimeEvent: String
    public endTimeEvent: String

    constructor(){
        this.id = null
        this.title = ""
        this.eventType = ""
        this.category = ""
        this.numberSubscribers = 0
        this.disciplines = []
        this.subjects = []
        this.startDateSubscription = ""
        this.endDateSubscription = ""
        this.startDateEvent = ""
        this.endDateEvent = ""
        this.institutions = []
        this.startTimeEvent = ""
        this.endTimeEvent = ""
    }
}
