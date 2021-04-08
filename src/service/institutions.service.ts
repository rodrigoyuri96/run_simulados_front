import {RunService} from "@/service/run.service";
import InstitutionModel from "@/models/institution.model";

export class InstitutionsService extends RunService<InstitutionModel>{
  constructor() {
    super('/instituicoes');
  }
}
