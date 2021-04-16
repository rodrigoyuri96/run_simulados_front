<template>
  <v-form v-model="validDate">
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :label="label"
          hint="formato: DD/MM/YYYY"
          outlined
          dense
          required
          append-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          @change="handleValid()"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu1 = false"
      ></v-date-picker>
    </v-menu>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch, VModel, Prop, Emit } from "vue-property-decorator";
import {DateUtil} from "@/commons/date.commons"

@Component({
  name: "RunDate",
})
export default class RunDate extends Vue {
  menu1 = false;
  @VModel({type: String}) date: String | "";
  @Prop({type: String}) label: String | "";
  //.toISOString().substr(0, 10);
  dateFormatted: String = new String();
  //vm.formatDate(new Date().toISOString().substr(0, 10));
  validDate: boolean = false;

  get computedDateFormatted() {
    return this.formatDate(this.date);
  }

  @Watch("date")
  WhenDateChanged(val: String) {
    this.dateFormatted = this.formatDate(val);
  }

  formatDate(date: String): String {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }


  mounted() {
    let date: Date = new Date();
    let str = `${date.getFullYear()}-${date.getDay().toString().padStart(2, "0")}-${date.getMonth().toString().padStart(2, "0")}`;
    this.date = str;
    console.log(str);
  }
  parseDate(date: String) {
      return DateUtil.parseDate(date)
  }

  @Emit('valid')
  handleValid(event: boolean) {
    if (event != null && event !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style>
</style>
