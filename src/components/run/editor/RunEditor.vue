<template>
  <div id="app">
    <v-card class="ml-10"  >
      <v-row>
        <v-col class="ml-5">
          <vue-editor id="editor"
                      useCustomImageHandler
                      @image-removed="handleImageRemoved"
                      @image-added="handleImageAdded"
                      v-model="htmlForEditor" />
          <br>
          <v-progress-linear
            v-if="progressFlag"
            color="light-blue"
            height="10"
            :value="progress"
            striped
          ></v-progress-linear>
        </v-col>
        <v-col>
          <div class="ql-editor" v-html="htmlForEditor"></div>

        </v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>

import {Quill, VueEditor} from "vue2-editor";
import Firebase from "@/firebase"

const quill = new Quill('#preview', {theme: 'snow'});

export default {
  components: {
    VueEditor
  },

  computed:{
    folderName(){
      return 'ENEM/2021/1SEMESTRE/1FASE/FISICA/QUESTAO_50/'
    }
  },

  data() {
    return {
      progressFlag: false,
      htmlForEditor: "",
      progress: 0
    };
  },

  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      console.log("file", file)
      this.progressFlag = true
      const storageRef = Firebase.storage().ref();
      const uploadTask = storageRef.child( this.folderName +  this.generateFileName()).put(file);


      uploadTask.on('state_changed',
        (snapshot) => {
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.progress + '% done');
        }, function(error) {

          switch (error.code) {
            case 'storage/unauthorized':
              break;

            case 'storage/canceled':
              break;

            case 'storage/unknown':
              break;
          }
        }, ()=> {
          uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
            console.log('File available at', url);
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          });

          setTimeout(()=> {
            this.progressFlag = false
          }, 3000);
        });


    },

    generateFileName(){
      return Math.random().toString(36).substr(1, 60);
    },



    handleImageRemoved(image){
      const filename = image.substring(image.lastIndexOf('/')+1);
      alert(unescape(filename));
      const decodedName = unescape(filename)
      let indexParameter = decodedName.indexOf("?")

      const storageRef = Firebase.storage().ref();
      const desertRef = storageRef.child(decodedName.substring(0, indexParameter));

      desertRef.delete().then(function() {
        console.log("Imagem deletada com sucesso")
      }).catch(function(error) {
        console.log("Erro ao deletar mensagem: ", error)
      });

    }


  }
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

</style>
