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
          :rules="rules"
          autocomplete="off"
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
  @VModel({type: String}) date!: "";
  @Prop({type: String}) label: String | "";
  @Prop({type: Array}) rules!: [];
  dateFormatted: String = "";
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
    this.dateFormatted = this.formatDate(this.date);
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
