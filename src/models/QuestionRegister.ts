import Discipline from "./Discipline"
import Exam from "./Exam"

export default class QuestionRegister {
   public numberQuestion: number
   public discipline: Discipline
   public exam: Exam


   constructor(){
        this.numberQuestion = 0
        this.discipline = new Discipline()
        this.exam = new Exam()
   }
}