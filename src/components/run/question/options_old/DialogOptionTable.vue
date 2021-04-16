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

import {Component, VModel, Vue, Prop} from "vue-property-decorator";

@Component({
  name: "DialogOptionTable"
})
export default class DialogOptionTable extends Vue{
  @Prop({type: Array}) header: any[]
  @Prop({type: Boolean}) imageFlag!: Boolean;
  @VModel({type: Boolean}) dialog! : any;


}
</script>

<style scoped>

</style>
