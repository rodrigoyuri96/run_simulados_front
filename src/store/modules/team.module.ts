import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {TeamModel} from "@/models/team.model";
import Axios from "@/plugins/Axios"
import {TeacherTeam} from "@/models/teacher.team.model";

@Module({ name: 'TeamModule', namespaced: true })
export class TeamModule extends VuexModule {
  _teams: TeamModel[] = []
  _team: TeamModel
  _loading: Boolean = false

  get teams(){
    return this._teams
  }

  get team(){
    return this._team
  }

  get loading(){
    return this._loading
  }

  @Mutation
  setLoading(newStatus: Boolean){
    this._loading = newStatus
  }

  @Mutation
  setTeam(newTeam: TeamModel){
    this._team = newTeam
  }

  @Mutation
  _addToTeams(newTeam: TeamModel){
    this._teams.push(newTeam)
  }

  @Mutation
  _setTeams(teams: TeamModel[]){
    this._teams = teams
  }

  @Action
  findAll(){
    let events: any[] = []
    let teacher = new TeacherTeam()
    events.push({
      teacher: "Teta",
      name: "Aula - Álgebra",
      start: "2021-04-20T09:05:00",
      end: "2021-04-20T11:05:00",
      color: "blue-grey lighten-1",
      timed: true,
      details: "Programa da Aula: Logaritmos e Funções Logaritmicas"
    }, {
      teacher: "Adolf Hitler",
      name: "Aula - Geometria",
      start: "2021-04-20T09:05:00",
      end: "2021-04-20T11:05:00",
      color: "blue-grey darken-1",
      timed: true,
      details: "Programa da Aula: Semelhança no triangulo retangulo"
    }, {
      teacher: "Benito Mussoline",
      name: "Aula - Literatura",
      start: "2021-04-01T13:30:00",
      end: "2021-04-01T15:40:00",
      color: "purple lighten-2",
      timed: true,
      details: "Programa da Aula: Romantismo no Brasil "
    },


    )
    let team1 = new TeamModel('123WE3R4WEI31U2', 'Medicina - Intensivo', [teacher], ['asf123, 124234'], events  )
    this._setTeams([team1])

    console.log("this.teams", this.teams)

  }

}
