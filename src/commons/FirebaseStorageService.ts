import Firebase from "@/firebase"

export default class FirebaseStorageService{
  private static imageUrl: String = ""
  private static progressFlag: Boolean = false
  private static MAX = 850000000000
  private static MIN = 2500000


  static uploadImage(folder: String, filename: String, file: any){

    const storageRef = Firebase.storage().ref();

    const uploadTask = storageRef.child(`${folder}/${filename}` ).put(file);
    let imageUrl = ""

    console.log("file", file)
    this.progressFlag = true


    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function(error) {
            reject(error.code)
        }, ()=> {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log('File available at', url);
            resolve(url)
          });
        });
    })


  }

  static deleteImage(url: String){
    const filename = url.substring(url.lastIndexOf('/')+1);
    alert(unescape(filename));
    const decodedName = unescape(filename)
    let indexParameter = decodedName.indexOf("?")

    const storageRef = Firebase.storage().ref();

    let file = decodedName.substring(0, indexParameter)

    console.log("")

    const desertRef = storageRef.child(file);


    return new Promise(((resolve, reject) => {
      desertRef.delete().then(function() {
        console.log("Imagem deletada com sucesso")
         resolve(true)
      }).catch(function(error) {
        console.log("Erro ao deletar mensagem: ", error)
        reject(false)
      });

    }))
  }


  static generateFileName(prefix: String): String{
    const number =  Math.random() * ((FirebaseStorageService.MAX * 2) - FirebaseStorageService.MIN) + FirebaseStorageService.MIN;
    const date = new Date()
    return `${prefix}-${date.getMonth()}-${date.getFullYear()}-${number}`
  }

}

