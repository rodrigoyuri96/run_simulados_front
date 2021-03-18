import Discipline from "./Discipline"
import Subject from "./Subject"

export default class Event {
    public title: String
    public typeEvent: String
    public duration: Number
    public disciplines: Discipline[]
    public subjects: Subject[]
    public startDateSubscription: String
    public endDateSubscription: String
    public startDateEvent: String


    public endDateEvent: String

    constructor(){
        this.title = ""
        this.typeEvent = ""
        this.duration = 0
        this.disciplines =[]
        this.subjects = []
        this.startDateSubscription = ""
        this.endDateSubscription = ""
        this.startDateEvent = ""
        this.endDateEvent = ""
    }
}
