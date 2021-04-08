<template>
  <v-row no-gutters class="text-right" >
    <v-col cols="8">
      <v-container class="max-width">
        <v-pagination
          class="my-4"
          v-model.number="page"
          :length="pagination.totalPages"
          @next="nextPage"
          @previous="previousPage"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right" />
      </v-container>
    </v-col>
    <v-col cols="4">
      <v-container class="max-width">
        <v-text-field class="my-4" full-width dense v-model.number="pageSize" outlined label="Nº Elementos" />

      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Emit, Prop, VModel, Vue, Watch} from "vue-property-decorator";
import {Pagination} from "@/models/Pagination";

@Component({
  name:'RunPagination'
})
export default class RunPagination extends Vue{
  pageSize: 10
  @VModel page = 1
  @Prop({type:Pagination}) pagination: Pagination
  @Prop({type:Function}) nextPage: Function
  @Prop({type:Function}) previousPage: Function
  @Prop({type:Function}) byPage: Function

  @Watch('page')
  whenPageChange(){
    this.byPage()
  }

  @Emit('page-size-changed')
  whenNumberElementsChanged(){
    return this.pageSize
  }
}
</script>

<style scoped>

</style>
