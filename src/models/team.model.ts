import {TeacherTeam} from "@/models/teacher/teacher.team.model";

export class TeamModel{
  id: string
  name: string
  teachers: TeacherTeam[]
  students: string[]
  events: any[]
  period: string
  category: string
  startDate: string

  constructor() {
    this.id = null;
    this.name = "";
    this.teachers = [];
    this.students = [];
    this.events = [];
  }
}
