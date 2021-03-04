import {OptionType} from "./OptionType"
import OptionTable from "@/models/question/OptionTable";

export default class Option{
    public description: String
    public isCorrectAnswer: Boolean
    public optionType: OptionType
    public urlImage: string
    public table: OptionTable

  constructor(optionType:OptionType) {
    this.description = "";
    this.isCorrectAnswer = false;
    this.optionType = optionType;
    this.urlImage = "";
    this.table = new OptionTable()
  }
}
