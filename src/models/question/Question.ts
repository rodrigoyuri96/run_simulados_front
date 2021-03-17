import Discipline from "../Discipline"
import Exam from "../Exam"
import Option from "./Option"
import {OptionType} from "@/models/question/OptionType";

export default class Question {
  public numberQuestion: number
  public exam: Exam
  public discipline: Discipline
  public content: String
  public optionType: OptionType
  public header: String[]
  public imageFlag: boolean
  public tableFlag: boolean
  public headerImageFlag: boolean
  public options: Option[]


  constructor(optionType: OptionType) {
    this.numberQuestion = 0;
    this.exam = new Exam();
    this.discipline = new Discipline();
    this.content = "";
    this.optionType = optionType;
    this.header = [];
    this.options = [];
    this.imageFlag = false
    this.headerImageFlag = false
  }
}
