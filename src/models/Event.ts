import Discipline from "./Discipline"
import Subject from "./Subject"

export default class Event {
    public title: String
    public typeEvent: String
    public duracao: Number
    public discipline: Discipline
    public subject: Subject
    public startDateEvent: String
    public endDateEvent: String
    public startDateSubscription: String
    public endDateSubscription: String

    constructor(){
        this.title = ""
        this.typeEvent = ""
        this.duracao = 0
        this.discipline = new Discipline()
        this.subject = new Subject()
        this.startDateEvent = ""
        this.endDateEvent = ""
        this.startDateSubscription = ""
        this.endDateSubscription = ""
    }
}