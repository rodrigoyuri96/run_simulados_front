<template>
  <div>
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
          hint="formato: MM/DD/YYYY"
          outlined
          dense
          required
          append-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu1 = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, VModel, Prop } from "vue-property-decorator";

@Component({
  name: "RunDate",
})
export default class RunDate extends Vue {
  menu1 = false;
  @VModel({ type: String }) date: String | "";
  @Prop({ type: String }) label: String | "";
  //.toISOString().substr(0, 10);
  dateFormatted: String = new String();
  //vm.formatDate(new Date().toISOString().substr(0, 10));

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

  parseDate(date: String) {
    if (!date) return null;
    const [month, day, year] = date.split("/");
    return `${year}-${day.padStart(2, "0")}-${month.padStart(2, "0")}`;
  }

  mounted() {
    let date: Date = new Date();
    let str = `${date.getFullYear()}-${date
      .getDay()
      .toString()
      .padStart(2, "0")}-${date.getMonth().toString().padStart(2, "0")}`;
    this.date = str;
    console.log(str);
  }
}
</script>

<style>
</style>