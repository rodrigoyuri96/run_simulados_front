import { AxiosResponse } from 'axios';
import Axios from "@/plugins/Axios.ts"
import {ClassModel} from "@/models/teacher/class.model";

export class ClassroomEventsService{
  private path = "/turma/eventos"

  saveEvents(event: ClassModel):Promise<AxiosResponse>{
    return Axios.put(`${this.path}/add`, event, {params:{classId: event.team.id}})
  }

}
