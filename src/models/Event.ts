import Discipline from "./Discipline"
import Subject from "./Subject"

export default class Event {
    public eventTitle: String
    public duracao: Number
    public discipline: Discipline
    public subject: Subject

    constructor(){
        this.eventTitle = " "
        this.duracao = 0
        this.discipline = new Discipline()
        this.subject = new Subject()
    }
}