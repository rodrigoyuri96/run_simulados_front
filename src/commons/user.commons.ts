export default class UserCommons{

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
