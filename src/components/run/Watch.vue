<template>
    <v-menu
      ref="menu"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="timed"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          autocomplete="off"
          v-model="timed"
          :label="label"
          :rules="rules"
          append-icon="mdi-clock-time-four-outline"
          outlined
          dense
          required
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="timed"
        format="24hr"
        full-width
        @click:minute="$refs.menu.save(timed)"
      ></v-time-picker>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";

@Component({
  name: "RunWatch",
})
export default class RunWatch extends Vue {
    @VModel() timed!: string
    @Prop({type: String}) label: String | "";
    @Prop({type: Array}) rules!: [];
    valid: boolean = false;
    menu2 = false;


}
</script>
