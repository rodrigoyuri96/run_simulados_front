import {RunService} from "@/service/run.service";
import {TeamModel} from "@/models/team.model";

export class TeamService extends RunService<TeamModel>{

  constructor() {
    super('/turmas');
  }

}
