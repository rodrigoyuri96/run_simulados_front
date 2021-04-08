
export default class OptionModel{
    public description?: String
    public isCorrectAnswer: Boolean
    public urlImage?: string
    public row?: any[]

  constructor() {
    this.description = "";
    this.isCorrectAnswer = false;
    this.urlImage = "";
    this.row = [];
  }
}
