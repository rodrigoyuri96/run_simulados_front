import {OptionType} from "./OptionType"

export default class Option{
    public description: String
    public isCorrectAnswer: Boolean
    public optionType: OptionType
    public urlImage: string


  constructor(description: String, isCorrectAnswer: Boolean, optionType:OptionType, urlImage: string) {
    this.description = description;
    this.isCorrectAnswer = isCorrectAnswer;
    this.optionType = optionType;
    this.urlImage = urlImage;
  }
}
