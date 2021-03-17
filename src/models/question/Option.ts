
export default class Option{
    public description?: String
    public isCorrectAnswer?: Boolean
    public urlImage?: string
    public row?: any[]

  constructor() {
    this.description = "";
    this.isCorrectAnswer = false;
    this.urlImage = "";
    this.row = [];
  }
}
