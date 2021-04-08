import DisciplineModel from "./discipline.model"
import ExamModel from "./exam.model"
import OptionModel from "@/models/question/option.model";

export default class QuestionRegisterModel {
   public id: String
   public content: String
   public numberOfQuestion: number
   public discipline: DisciplineModel
   public exam: ExamModel
   public headerImageFlag: Boolean
   public tableFlag: Boolean
   public imageFlag: Boolean
   public options: OptionModel[]


   constructor(){
        this.id = null
        this.numberOfQuestion = 0
        this.discipline = new DisciplineModel()
        this.exam = new ExamModel()
        this.headerImageFlag = false
        this.imageFlag = false
        this.options = []
        this.tableFlag = false
        this.content = ""
   }
}
