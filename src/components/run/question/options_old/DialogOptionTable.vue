<template>
  <v-dialog v-model="dialog">
    <template v-for="(col,i) in header" :key="i">
      <v-text-field v-if="!imageFlag">

      </v-text-field>
      <v-file-input v-else></v-file-input>
    </template>

  </v-dialog>
</template>

<script lang="ts">

import {Component, VModel, Vue} from "vue-property-decorator";
import {Prop} from "vue/types/options";

@Component({
  name: "DialogOptionTable"
})
export default class DialogOptionTable extends Vue{
  @Prop({type:Array}) header
  @Prop({type: Boolean}) imageFlag;
  @VModel({type:Boolean}) dialog;


}
</script>

<style scoped>

</style>
