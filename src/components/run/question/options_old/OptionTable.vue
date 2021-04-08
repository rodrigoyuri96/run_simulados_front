<template>
  <div>
    <v-row>
      <v-col>
        <h3>Adicionar Cabeçalho</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col align-self="center">
        <v-text-field v-if="!imageHeaderFlag" v-model="contentHeader" outlined :label="`Digite o conteúdo da coluna ${header.length + 1}`"/>
        <v-file-input v-else v-model="files" multiple outlined :label="`Selecione a imagem da coluna ${header.length + 1}`" append-icon="mdi-camera" prepend-icon></v-file-input>
      </v-col>
      <v-col class="mt-1">
        <v-btn @click="addColumn">Adicionar Coluna</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-10">
      <v-col v-for="(col,i) in header" cols="3"  v-if="!imageHeaderFlag">
        <v-chip v-if="header.length > 0" @click:close="removeColumn(i)" label outlined close close-icon="mdi-close">
          {{col}}
        </v-chip>
      </v-col>
      <v-col v-else v-for="(col,i) in header" cols="3" >
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-img
              :aspect-ratio="16/9"
              :src="col"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out teal darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-btn @click="removeColumn(i)">
                    <v-icon>{{'mdi-delete'}}</v-icon>
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
      <v-col v-if="!imageHeaderFlag && header.length > 0">
        <v-btn color="primary" class="white--text">Adicionar Opção</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";
import FirebaseStorageService from "@/commons/FirebaseStorageService";
import teste from "@/components/run/question/options_old/teste.vue";
import Teste from "@/components/run/question/options_old/teste.vue";


@Component({
  name: "OptionTable",
  components: {Teste}
})
export default class OptionTable extends Vue{
  @Prop({type:Boolean}) imageHeaderFlag!: Boolean
  header: any[] = []
  contentHeader: String = ""
  files: [] = []

  addColumn(){
    if(this.imageHeaderFlag){
      this.files.forEach(file=>{
        FirebaseStorageService.uploadImage('header/option/212/', FirebaseStorageService.generateFileName('header'), file)
        .then((url: any)=>{
          this.header.push(url)
        })
      })

    }else{
      this.header.push(this.contentHeader)
      this.contentHeader = ""
    }

  }

  removeColumn(index){
    if(this.imageHeaderFlag){
      const col = this.header[index]
      FirebaseStorageService.deleteImage(col).then(()=>{
        this.header.splice(index, 1)
      })
    }else{
      this.header.splice(index, 1)
    }
  }

}
</script>

<style scoped>
  .v-card--reveal {
      align-items: center;
      bottom: 0;
      justify-content: center;
      opacity: .3;
      position: absolute;
      width: 100%;
  }
</style>
