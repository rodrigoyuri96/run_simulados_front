import Discipline from "./Discipline"
import Exam from "./Exam"
import Option from "@/models/question/Option";

export default class QuestionRegister {
   public id: String
   public numberOfQuestion: number
   public discipline: Discipline
   public exam: Exam
   public headerImageFlag: Boolean
   public imageFlag: Boolean
   public options: Option[]


   constructor(){
        this.id = ""
        this.numberOfQuestion = 0
        this.discipline = new Discipline()
        this.exam = new Exam()
        this.headerImageFlag = false
        this.imageFlag = false
        this.options = []
   }
}
