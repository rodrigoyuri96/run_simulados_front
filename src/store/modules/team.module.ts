import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {TeamModel} from "@/models/team.model";
import {TeamService} from "@/service/team.service";
import { AxiosResponse } from 'axios';
import {ClassModel} from "@/models/teacher/class.model";
import {ClassroomEventsService} from "@/service/classroom.events.service";


@Module({ name: 'TeamModule', namespaced: true })
export class TeamModule extends VuexModule {
  private service = new TeamService()
  private eventService = new ClassroomEventsService()

  _teams: TeamModel[] = []
  _team: TeamModel = new TeamModel()

  get teams() {
    return this._teams
  }

  get team() {
    return this._team
  }


  @Mutation
  setTeam(newTeam: TeamModel) {
    this._team = newTeam
  }

  @Mutation
  _addToTeams(newTeam: TeamModel) {
    this._teams.push(newTeam)
  }

  @Mutation
  removeFromTeam(id: string){
    let index = this._teams.map(t=> t.id)
      .indexOf(id)

    this._teams.splice(index, 1)

  }

  @Mutation
  _setTeams(teams: TeamModel[]) {
    this._teams = teams
  }

  @Action
  save(): Promise<AxiosResponse<TeamModel>> {
    return this.service.save(this.team)
  }

  @Action
  delete(id): Promise<AxiosResponse> {
    return this.service.delete(id)
  }

  @Mutation
  _updateTeam(updatedTeam: TeamModel) {
    let index = this._teams.map(t=> t.id)
                .indexOf(updatedTeam.id)

    Object.assign(this._teams[index], updatedTeam)
  }



  @Action
  update():Promise<AxiosResponse<TeamModel>>{
    return this.service.update(this.team)
  }

  @Action
  findAll(): Promise<AxiosResponse<TeamModel[]>>{
    return this.service.findAll()
  }

  @Action
  saveEvent(classModel: ClassModel):Promise<AxiosResponse<ClassModel>>{
    return this.eventService.saveEvents(classModel)
  }

}
