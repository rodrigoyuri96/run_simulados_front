<template>
  <v-container
    class="px-4"
    fluid
  >
    <v-radio-group >
      <v-radio
        v-for="(option,i) in options"
        :key="i"
      >
        <template v-slot:label>
          <v-row no-gutters>
            <v-col cols="9" class="mt-2">
              <div style="line-height:0px;" >
                <span v-html="option.description"></span>
              </div>
            </v-col>
            <v-col cols="1" class="mt-1">
              <v-btn icon v-if="option.isCorrectAnswer" @click="checkOption(i)">
                <v-icon color="green">{{'mdi-check'}}</v-icon>
              </v-btn>
              <v-btn icon v-if="!option.isCorrectAnswer" @click="checkOption(i)">
                <v-icon color="red">{{'mdi-close'}}</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" class="mt-1">
              <v-btn icon block @click="updateOption(i)" >
                <v-icon color="teal darken-2" >{{'mdi-pencil'}}</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" class="mt-1">
              <v-btn icon block @click="dialogConfirmationDelete(i)" >
                <v-icon color="red darken-2">
                  {{'mdi-delete'}}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-radio>
    </v-radio-group>
    <run-remove-dialog v-model="dialogRemove" :method="deleteOption"> </run-remove-dialog>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";

import {
  mdiDelete,
} from '@mdi/js'
import {OptionModule} from "@/store/modules/OptionModule";
import FirebaseStorageService from "@/commons/FirebaseStorageService";
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";


@Component({
  name: "Option",
  components:{
    RunRemoveDialog
  }
})
export default class Option extends Vue{
  optionModule = getModule(OptionModule, this.$store)
  dialogRemove = false
  index = 0
  @Prop({type:Boolean, default: false}) disabled!: Boolean
  @Prop({type:Boolean, default: false}) imageFlag!: Boolean
  @Prop({type:Boolean, default: false}) isAdmin!: Boolean
  icons = {mdiDelete}

  deleteOption(){
    if(this.imageFlag){
      FirebaseStorageService.deleteImage(this.options[this.index].description)
        .then(res=>{
          console.log(res)
          this.options.splice(this.index, 1)
        })
    }else {
      this.options.splice(this.index, 1)
    }

    this.dialogRemove = false
  }

 get options(){
    return this.optionModule.options
 }

 set options(newValue){
    this.optionModule.setOptions(newValue)
 }

 checkOption(index: number){
   if(!this.options[index].isCorrectAnswer)
      this.options[index].isCorrectAnswer = !this.options[index].isCorrectAnswer
    if(this.options[index].isCorrectAnswer){
      this.options.forEach((option,i) =>{
          if(i !== index && option.isCorrectAnswer){
              option.isCorrectAnswer = false
          }
      })
    }
 }

 dialogConfirmationDelete(i){
    this.index = i
    this.dialogRemove = true
 }
  updateOption(){

  }
}
</script>

<style scoped>
  .line-height{

  }
</style>
