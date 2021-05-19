import {Authority} from "@/models/user/authority.model";
import {AccountSettingsModel} from "@/models/user/account.settings.model";

export default class UserModel{
  uid: string
  name: string
  username: string
  email: string
  picture: string
  authorities: Authority[]
  credentialsNonExpired: boolean
  enabled: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  authenticated: boolean
  accountSettings: AccountSettingsModel

  constructor(uid: string, name: string, username: string, email: string,
              picture: string, authorities: Authority[], credentialsNonExpired: boolean,
              enabled: boolean, accountNonExpired: boolean, accountNonLocked: boolean,
              authenticated: boolean, accountSettings: AccountSettingsModel) {
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.email = email;
    this.picture = picture;
    this.authorities = authorities;
    this.credentialsNonExpired = credentialsNonExpired;
    this.enabled = enabled;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.authenticated = authenticated;
    this.accountSettings = accountSettings;
  }
}
