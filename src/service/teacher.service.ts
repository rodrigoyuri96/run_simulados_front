import TeacherModel from "@/models/teacher/teacher.model";
import {RunService} from "@/service/run.service";
import {TeamModel} from "@/models/team.model";

export class TeacherService extends RunService<TeacherModel>{

  constructor() {
    super('/professores');
  }

}
