import Discipline from "../Discipline"
import Exam from "../Exam"
import Option from "./Option"

export default class Question {
  public numberQuestion: number
  public discipline: Discipline
  public exam: Exam
  public option: Option[]


  constructor(){
    this.numberQuestion = 0
    this.discipline = new Discipline()
    this.exam = new Exam()
    this.option = []
  }
}
