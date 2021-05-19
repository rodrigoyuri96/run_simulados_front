import {RunService} from "@/service/run.service";
import CommunityModel from "@/models/community.model";

export class CommunityService extends RunService<CommunityModel>{
  constructor() {
    super('/comunidades');
  }
}
