<template>
  <v-row >
      <v-col align="right" style="color:red; font-size: 12px; font-weight: bold;">
        <span v-for="(error, i) in errors" :key=i><v-icon style="color: red" small>mdi-alert</v-icon> {{error}}<br><br></span>
      </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator";

@Component({
  name: "RunError",
})

export default class Error  extends Vue {

@Prop({type: Array})errors: String[]

}
</script>

<style>

</style>