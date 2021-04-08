import DisciplineModel from "./discipline.model"
import SubjectsModel from "./subjects.model"

export default class EventModel {
    public id: String
    public title: String
    public eventType: String
    public duration: Number
    public disciplines: DisciplineModel[]
    public subjects: SubjectsModel[]
    public startDateSubscription: String
    public endDateSubscription: String
    public startDateEvent: String
    public endDateEvent: String

    constructor(){
        this.id = null
        this.title = ""
        this.eventType = ""
        this.duration = 0
        this.disciplines =[]
        this.subjects = []
        this.startDateSubscription = ""
        this.endDateSubscription = ""
        this.startDateEvent = ""
        this.endDateEvent = ""
    }
}
