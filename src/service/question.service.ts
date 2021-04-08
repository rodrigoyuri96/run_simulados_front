import {RunService} from "@/service/run.service";
import QuestionModel from "@/models/question/question.model";

export class QuestionService extends RunService<QuestionModel>{
  constructor() {
    super('/questoes');
  }
}
