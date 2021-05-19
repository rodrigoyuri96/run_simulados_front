import axios from "@/plugins/Axios.ts"
import { AxiosResponse } from 'axios'
import FirebaseService from "@/service/firebase.service";
export default class AuthService {
   token = null

    static async processAuthenticator(token){
       //  await FirebaseService.currentUser(token)
     }

}
