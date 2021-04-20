<template>
    <v-form v-model="valid">
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            :label="label"
            append-icon="mdi-clock-time-four-outline"
            outlined
            dense
            required
            @change="handleValid"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          format="24hr"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>   
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch, VModel, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "RunWatch",
})
export default class RunWatch extends Vue {
    @Prop({type: String}) label: String | "";
    valid: boolean = false;
    time = null;
    menu2 = false;

  @Emit('valid')
  handleValid(event: boolean) {
    if (event != null && event !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  
  handleDiscipline(){
    this.handleValid(this.valid)
  }

}
</script>
