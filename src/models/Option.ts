import {OptionType} from "@/models/question/OptionType";
import OptionTable from "@/models/question/OptionTable";

export default class Option {

  public description: String
  public isCorrectAnswer: Boolean
  public optionType: string =""
  public urlImage: string
  public table: OptionTable

  constructor(optionType?:OptionType) {
    this.description = "";
    this.isCorrectAnswer = false;
    this.optionType = optionType?.toString();
    this.urlImage = "";
    this.table = new OptionTable()
  }

}
