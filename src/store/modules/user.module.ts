import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import UserModel from "@/models/user/user.model";
import {Authority} from "@/models/user/authority.model";
import {AccountSettingsModel} from "@/models/user/account.settings.model";



@Module({ name: 'UserModule', namespaced: true })
export class UserModule extends VuexModule {
  _user: UserModel
    //new UserModel('12324', 'rodrigo', ' rodrigo yuri', 'rodrigoyuri2@hotmail.com',null, [new Authority('PEDAGOGUE')], false, false, false, false, true, new AccountSettingsModel('BASIC', 'SIM', 'NAO', '2021-03-04', '2021-08-28', '2021-04-23'))


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
