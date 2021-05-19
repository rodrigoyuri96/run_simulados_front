import DisciplineModel from "@/models/discipline.model";
import {TeamSearchModel} from "@/models/team.search.model";

export class TeacherTeam{
  uidTeacher: string
  name: string
  discipline: DisciplineModel
  teams: TeamSearchModel[]
  comments: string []
  feedback: 0
  color: string


  constructor() {
    this.uidTeacher = null;
    this.name = "";
    this.discipline = new DisciplineModel();
    this.teams = [];
    this.comments = [];
    this.feedback = 0;
    this.color = ""
  }
}
