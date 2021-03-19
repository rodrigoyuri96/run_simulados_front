import Discipline from "./Discipline"
import Exam from "./Exam"

export default class QuestionRegister {
   public numberQuestion: number
   public discipline: Discipline
   public exam: Exam
   public headerImageFlag: Boolean
   public imageFlag: Boolean


   constructor(){
        this.numberQuestion = 0
        this.discipline = new Discipline()
        this.exam = new Exam()
        this.headerImageFlag = false
        this.imageFlag = false
   }
}
