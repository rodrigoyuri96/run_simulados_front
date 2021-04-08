<template>
  <v-form v-model="valid">
    <v-row class="mt-1 mr-3 mb-0" no-gutters>
      <v-col cols="12">
        <run-editor v-model="description" v-if="imageFlag == false" :rules="[v=> !!v || 'Campo obrigatório']"></run-editor>
        <v-file-input v-model="files" v-else  prepend-icon append-icon="mdi-camera"
                      outlined label="Adicionar Imagem" multiple
                      :rules="[v=> !!v || 'Campo obrigatório', v=> v.length > 0 && v.length < 6 || 'Deve haver no máximo 5 imagens selecionadas']"/>
      </v-col>
    </v-row>
    <v-row class="mt-0" no-gutters align="end" justify="end">
      <v-spacer></v-spacer>
      <v-col cols="4" align-self="end" class="mr-3">
        <v-btn block color="primary" class="mr-3 white--text" @click="addOption" :disabled="imageFlag? !valid ||  options.length >= 5 :!valid || options.length >= 5">Adicionar Opção</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-divider></v-divider>
    </v-row>
    <v-row class="mt-2">
      <run-option disabled :options="options" :image-flag="imageFlag" :is-admin="true" @options="options = $event"></run-option>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import FirebaseStorageService from "@/commons/FirebaseStorageService";
import RunOption from "@/components/run/question/options_old/Option.vue";
import OptionModel from "@/models/question/option.model"
import {OptionModule} from "@/store/modules/option.module";
import RunEditor from "@/components/run/editor/RunEditor.vue";

@Component({
  name:'SimpleOption',
  components:{RunOption, RunEditor}
})
export default class SimpleOption extends Vue {
  optionModule = getModule(OptionModule, this.$store)
  @Prop({type:Boolean, default:false}) imageFlag!:Boolean
  files: [] = []
  description: String = ""
  descriptions: any[] = []
  valid: Boolean = false

  get options(){
    return this.optionModule.options
  }

  set options(newValue){
    this.optionModule.setOptions(newValue)
  }

  @Watch('imageFlag')
  whenImageFlagChanged(val: Boolean, oldVal: Boolean){
      if(oldVal && !val && this.options.length > 0){
        this.options.forEach(opt=>{
          FirebaseStorageService.deleteImage(opt.description)
            .then(res=>{
              this.descriptions.slice(this.options.indexOf(opt), 1)
              this.options = []
              console.log("sucesso ao deletar imagem: ", res , this.options)
            })
          .catch(error=>{
            console.log("Erro ao deletar imagem: ", error)
          }).finally(()=>{
            this.descriptions = []
          })
        })
      }else if(!oldVal && val ){
        this.options = []
      }else{
        this.description = ""
      }


  }

  addOption(){
    if(this.imageFlag){
      this.files.forEach(file=>{
        FirebaseStorageService.uploadImage("options_old/testes", FirebaseStorageService.generateFileName('options'), file)
          .then(url=>{
            this.descriptions.push(url)
            console.log("descr", this.descriptions)
            this.mapToOption()
            console.log("options_old: ", this.options)

          })
      })
      this.files = []
    }else{
      this.descriptions.push(this.description)
      this.description = ""
      this.mapToOption()
    }

  }


  mapToOption(){
   this.descriptions.forEach(des=>{
      const option = new OptionModel()
      option.description = des
      option.isCorrectAnswer = false
      this.options.push(option)
    })

    this.descriptions = []
  }
}
</script>

<style scoped>

</style>
