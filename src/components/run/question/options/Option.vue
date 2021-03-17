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
          <v-row>
            <v-col v-if="imageFlag">
              <v-img
                contain
                :src="option.description"
                max-height="240"
                max-width="240"
              ></v-img>
            </v-col>
            <v-col v-else>
              <span>{{option.description}}</span>
            </v-col>
            <v-col v-if="isAdmin">
              <v-btn @click="deleteOption(i)" text>
                <v-icon color="red darken-1">{{icons.mdiDelete}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>

      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";

import {
  mdiDelete,
} from '@mdi/js'
import {OptionModule} from "@/store/modules/OptionModule";
import FirebaseStorageService from "@/commons/FirebaseStorageService";


@Component({
  name: "Option"
})
export default class Option extends Vue{
  optionModule = getModule(OptionModule, this.$store)
  @Prop({type:Boolean, default: false}) disabled!: Boolean
  @Prop({type:Boolean, default: false}) imageFlag!: Boolean
  @Prop({type:Boolean, default: false}) isAdmin!: Boolean
  icons = {mdiDelete}

  deleteOption(index){

    if(this.imageFlag){
      FirebaseStorageService.deleteImage(this.options[index].description)
        .then(res=>{
          console.log(res)
          this.options.splice(index, 1)
        })
    }else {
      this.options.splice(index, 1)
    }
  }

 get options(){
    return this.optionModule.options
 }

 set options(newValue){
    this.optionModule.setOptions(newValue)
 }
}
</script>

<style scoped>

</style>
