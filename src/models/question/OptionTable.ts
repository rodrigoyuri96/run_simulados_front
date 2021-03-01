import {OptionType} from "@/models/question/OptionType";

export default class OptionTable{
  public header: []
  public rows: []
  public optionType: OptionType

  constructor() {
    this.header = [];
    this.rows = [];
    this.optionType = OptionType.TABLE
  }
}
