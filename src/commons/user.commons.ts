import {Profile} from "@/models/user/profile.enum";
import UserModel from "@/models/user/user.model";

export default class UserCommons{

  static hasPermission(user: UserModel, profile: Profile): boolean{

    if(user !== undefined && user !== null && user.authorities !== undefined){
      let authority = user.authorities.find(auth=>{
        return profile == auth.authority
      })
      console.log("permissão: ", authority)
      if(authority !== null && authority !== undefined)
        return true

    }
    return false
  }

  static getPlan(plan: String){
    switch (plan){
      case "BASIC":
        return "Sossegado"
      case "STANDARD":
        return "Sábio"
      case "PREMIUM":
        return "Oráculo"
    }

  }


}
