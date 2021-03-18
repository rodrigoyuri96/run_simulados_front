import Discipline from "./Discipline"
import Subject from "./Subject"

export default class Event {
    public id: number
    public title: String
    public eventType: String
    public duration: Number
    public discipline: Discipline
    public subject: Subject
    public startDateSubscription: String
    public endDateSubscription: String
    public startDateEvent: String
    public endDateEvent: String

    constructor(){
        this.id = 0
        this.title = ""
        this.eventType = ""
        this.duration = 0
        this.discipline = new Discipline()
        this.subject = new Subject()
        this.startDateSubscription = ""
        this.endDateSubscription = ""
        this.startDateEvent = ""
        this.endDateEvent = ""
    }
}