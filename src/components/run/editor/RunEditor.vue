<template>
  <div>
    <vue-editor
      v-model="description" useCustomImageHandler></vue-editor>
  </div>
</template>

<script>
import {VueEditor}  from "vue2-editor";
import Firebase from "@/firebase"

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      description: ""
    };
  },

  methods: {
    addCustomImage(){
      VueEditor.methods.customImageHandler(file, this.handleImageAdded)
    },

    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {

      console.log(file)
      var storageRef = Firebase.storage().ref();

      var uploadTask = storageRef.child('vue-editor/' + file.name).put(file);
      uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("usuario nao ter permissao")
              break;

            case 'storage/canceled':
              console.log("upload cancelado")
              break;
            case 'storage/unknown':
              console.log("storage desconhecido")
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          });
        });
    },



  }
};
</script>

<style scoped>

</style>
