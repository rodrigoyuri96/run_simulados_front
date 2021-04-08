import DisciplineModel from "../discipline.model"
import ExamModel from "../exam.model"
import OptionModel from "./option.model"
import {OptionTypeEnum} from "@/models/question/option.type.enum";

export default class QuestionModel {
  public numberQuestion: number
  public exam: ExamModel
  public discipline: DisciplineModel
  public content: String
  public optionType: OptionTypeEnum
  public header: String[]
  public imageFlag: boolean
  public tableFlag: boolean
  public headerImageFlag: boolean
  public options: OptionModel[]


  constructor(optionType: OptionTypeEnum) {
    this.numberQuestion = 0;
    this.exam = new ExamModel();
    this.discipline = new DisciplineModel();
    this.content = "";
    this.optionType = optionType;
    this.header = [];
    this.options = [];
    this.imageFlag = false
    this.headerImageFlag = false
  }
}
