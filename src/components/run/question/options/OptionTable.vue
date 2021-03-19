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
        <v-file-input v-model="files" v-else multiple outlined :label="`Selecione a imagem da coluna ${header.length + 1}`" append-icon="mdi-camera" prepend-icon></v-file-input>
      </v-col>
      <v-col class="mt-1">
        <v-btn @click="addColumn">Adicionar Coluna</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-for="(col,i) in header" cols="3" v-if="!imageHeaderFlag">
        <v-chip @click:close="removeColumn(i)" label outlined close close-icon="mdi-delete">
          {{col}}
        </v-chip>

      </v-col>
      <v-col v-else cols="2">
        <v-card max-width="220" >
          <v-card-text>
            <v-img contain :src="col" max-width="200"/>
          </v-card-text>
          <v-card-actions >
            <v-row align="center" justify="center">
              <v-btn color="red darken-1" text @click="removeColumn(i)" class="mb-2">
                Deletar
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <teste></teste>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";
import FirebaseStorageService from "@/commons/FirebaseStorageService";
import teste from "@/components/run/question/options/teste.vue";
import Teste from "@/components/run/question/options/teste.vue";


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

</style>
