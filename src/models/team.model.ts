import {TeacherTeam} from "@/models/teacher.team.model";

export class TeamModel{
  uid: string
  title: string
  teachers: TeacherTeam[]
  students: string[]
  events: any[]


  constructor(uid: string, name: string, teachers: TeacherTeam[], students: string[], events: any[]) {
    this.uid = uid;
    this.title = name;
    this.teachers = teachers;
    this.students = students;
    this.events = events;
  }
}
