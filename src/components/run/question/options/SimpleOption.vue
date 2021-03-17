<template>
  <v-form v-model="valid">
    <v-row class="mt-4 ml-2 mr-5">
      <v-col cols="8">
        <v-textarea v-model="description" v-if="imageFlag == false" outlined height="100" label="Descrição da opção" :rules="[v=> !!v || 'Campo obrigatório']"></v-textarea>
        <v-file-input v-model="files" v-else  prepend-icon append-icon="mdi-camera"
                      outlined label="Adicionar Imagem" multiple
                      :rules="[v=> !!v || 'Campo obrigatório', v=> v.length < 6 || 'Deve haver no máximo 5 imagens selecionadas']"/>
      </v-col>
      <v-col cols="2">
        <v-btn @click="addOption" :disabled="imageFlag? !valid ||  options.length >= 5 :
                                            !valid || options.length >= 5">Adicionar Opção</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <run-option disabled :options="options" :image-flag="imageFlag" :is-admin="true" @options="options = $event"></run-option>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import {QuestionModule} from "@/store/modules/QuestionModule";
import FirebaseStorageService from "@/commons/FirebaseStorageService";
import RunOption from "@/components/run/question/options/Option.vue";
import Option from "@/models/question/Option"
import {OptionModule} from "@/store/modules/OptionModule";

@Component({
  name:'SimpleOption',
  components:{RunOption}
})
export default class SimpleOption extends Vue {
  optionModule = getModule(OptionModule, this.$store)
  @Prop({type:Boolean, default:false}) imageFlag!:Boolean
  files: [] = []
  description: String = ""
  descriptions: String[] = []
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
              this.descriptions.slice(opt, 1)
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
        FirebaseStorageService.uploadImage("options/testes", FirebaseStorageService.generateFileName('options'), file)
          .then(url=>{
            this.descriptions.push(url)
            console.log("descr", this.descriptions)
            this.mapToOption()
            console.log("options: ", this.options)

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
      const option = new Option()
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
