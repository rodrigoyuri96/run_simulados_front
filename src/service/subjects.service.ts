import {RunService} from "@/service/run.service";
import SubjectsModel from "@/models/subjects.model";

export class SubjectsService extends RunService<SubjectsModel>{

  constructor() {
    super('/assuntos');
  }
}
