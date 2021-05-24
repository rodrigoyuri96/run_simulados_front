import UserModel  from '@/models/user/user.model';
import Firebase from "@/firebase"
import firebase from "firebase";
import Axios from "@/plugins/Axios"
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;

export default class FirebaseService {

  private static _currentUser: User;

  public static auth(email: string, password: string):Promise<User>{
    return new Promise ((resolve, reject) => {
      Firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        });
    })
  }


  public static signOut():Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      Firebase.auth().signOut().then(() => {
        resolve(true)
      }).catch((error) => {
        reject(error)
      });
    })
  }

  public static signInWithGoogle(): Promise<UserCredential>{
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {

          resolve(result)
        }).catch((error) => {
          reject(error)
      });
    })

  }

  public static signInWithFacebook(): Promise<UserCredential>{
    const provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      Firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        });
    })
  }


  public static async getUser(forceUserUpdate?: boolean):Promise<boolean>{
    return new Promise((resolve, reject) => {
        Firebase.auth().onAuthStateChanged(user => {
         if (user) {
           FirebaseService._currentUser = user
           user.getIdToken().then(idToken => {
             localStorage.setItem('idToken', idToken)
             const userSession = sessionStorage.getItem('user')
             if(!userSession || forceUserUpdate){
               Axios.get('/authorities').then(res=>{
                 if(res.status == 200 || res.status == 201){
                   sessionStorage.setItem('user', JSON.stringify(res.data))
                   resolve(true)
                 }else{
                   reject(false)
                 }
               })
             }else{
               resolve(true)
             }
           });
         }else{
           reject(false)
         }
       })
     })
  }

  public static createUser(email: string, password: string):Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      Firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  static async sendEmailVerification(userCredential: UserCredential) {
    const user = userCredential.user
    await user.sendEmailVerification()
  }

  static async updatedUser(userCredential: UserCredential, data: any) {
    const user = userCredential.user;
    const photoURL = data.photoURL ? data.photoURL : null;
    await user.updateProfile({
      displayName: data.name,
      photoURL: photoURL
    })
  }

  static removeUser(userModel: UserModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = FirebaseService._currentUser
      user.delete().then(() => {
        resolve(true)
      }).catch(e => {
        reject(e)
      }).catch(e => {
        reject(e)
      })
    }) 
  }
}
