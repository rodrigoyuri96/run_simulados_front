import {RunService} from "@/service/run.service";
import EventModel from "@/models/event.model";

export class EventService extends RunService<EventModel>{
  
  constructor() {
    super('/eventos');
  }
}
