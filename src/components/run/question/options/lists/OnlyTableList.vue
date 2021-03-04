<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" v-for="(header,i) in option.table.header" :key="i">
          {{header}}
          <v-btn color="red darken-1" small text @click="removeCol(i)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </th>
        <th>
          <v-btn color="blue darken-1" small text @click="dialogType='CONTENT', dialog = true">
            <v-icon small>mdi-plus</v-icon> Linha
          </v-btn>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rows,i) in option.table.rows" :key="i">
        <td v-for="row in rows" > {{row}} </td>
        <td>
          <v-btn color="red darken-1" small text @click="removeRow(i)">
            <v-icon small>mdi-delete</v-icon>Linha
          </v-btn>
        </td>
      </tr>
      </tbody>
    </template>

  </v-simple-table>
</template>

<script lang="ts">
import {OptionModule} from '@/store/modules/OptionModule'
import {Vue} from "vue-property-decorator";

import {Component, Vue} from 'vue-property-decorator'
import {getModule} from 'vuex-module-decorators'

@Component({
  name: 'OnlyTableList'
})
export default class OnlyTableList extends Vue {
  private optionStore = getModule(OptionModule, this.$store)

  get option() {
    return this.optionStore.option
  }

  set option(newValue){
    this.optionStore.setOption(newValue)
  }

  set dialog(newValue){
    this.optionStore.openDialog(newValue)

  }

  removeCol(index: number){
    this.option.table.header.splice(index, 1)
    this.option.table.rows.forEach((rows: [])=>{
      rows.splice(index, 1)
    })
  }

  removeRow(index){
    this.option.table.rows.splice(index, 1)
  }

  get dialogType(){
    return this.optionStore.dialogOptionTableType
  }

  set dialogType(newValue){
    this.optionStore.setDialogOptionTableType(newValue)
  }

}
</script>

<style scoped>

</style>
