import {RunService} from "@/service/run.service";
import ExamModel from "@/models/exam.model";

export class ExamService extends RunService<ExamModel>{
  constructor() {
    super('/vestibulares');
  }
}
