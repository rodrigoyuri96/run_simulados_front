import {RunService} from "@/service/run.service";
import DisciplineModel from "@/models/discipline.model";

export class DisciplineService extends RunService<DisciplineModel>{
  constructor() {
    super('/disciplinas');
  }
}
