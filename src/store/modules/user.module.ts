import { User } from './../../models/user/user.model';
import { Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({ name: 'UserModule', namespaced: true })
export class UserModule extends VuexModule {
    _user: User

    get user() {
        return this._user
    }

    @Mutation
    setUser(newUser: User) {
        this._user = newUser
    }
}