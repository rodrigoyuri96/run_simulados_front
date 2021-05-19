import {TeamSearchModel} from "@/models/team.search.model";
import {TeacherModel} from "@/models/teacher/teacher.model";

export class ClassModel{
  name: string
  type: string
  category: string
  start: string
  end: string
  recurrent: boolean
  teacher: TeacherModel
  team: TeamSearchModel

  lessonProgram: string
  assessments: number
  comments: string[] //TODO- MELHORAR O MODELO DE COMENTÁRIOS PARA RASTREABILIDADE E CONFIABILIDADE



  constructor() {
    this.start = "";
    this.end = "";
    this.name = "";
    this.lessonProgram = "";
    this.assessments = 0;
    this.comments = [];
    this.team = new TeamSearchModel();
    this.recurrent = false

  }
}
