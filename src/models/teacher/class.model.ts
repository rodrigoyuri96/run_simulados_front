import {TeamSearchModel} from "@/models/team.search.model";
import {TeacherTeam} from "@/models/teacher/teacher.team.model";
import DisciplineModel from "@/models/discipline.model";
import {TeacherModel} from "@/models/teacher/teacher.model";

export class ClassModel{
  start: string
  end: string
  title: string
  lessonProgram: string
  assessments: number
  comments: string[] //TODO- MELHORAR O MODELO DE COMENTÁRIOS PARA RASTREABILIDADE E CONFIABILIDADE
  team: TeamSearchModel
  teacher: TeacherModel
  discipline: DisciplineModel
  name: string
  color: string
  recurrent: boolean


  constructor() {
    this.start = "";
    this.end = "";
    this.title = "";
    this.lessonProgram = "";
    this.assessments = 0;
    this.comments = [];
    this.team = new TeamSearchModel();
    this.discipline = new DisciplineModel()
    this.name = "TESTE"
    this.color = "red"

  }
}
