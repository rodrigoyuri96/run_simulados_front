import { Profile } from './profile.enum';

export class User {
    profile: Profile

    constructor(){
        this.profile = Profile.DEVELOPER
    }
} 
