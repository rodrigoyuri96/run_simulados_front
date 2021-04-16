import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import UserModel from "@/models/user/user.model";



@Module({ name: 'UserModule', namespaced: true })
export class UserModule extends VuexModule {
  _user: UserModel

  get user(){
    return this._user
  }

  @Mutation
  setUser(newUser: UserModel){
    console.log("acessou o set user")
    this._user = newUser
  }


  static setUser(data: UserModel) {
    console.log("user module", data)
  }
}
