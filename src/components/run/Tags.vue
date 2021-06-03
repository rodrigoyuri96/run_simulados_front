<template>
  <div>
    <v-chip
      v-for="(tag, i) in tags"
      :key="i"
      class="ma-2"
      :color="colorRandom()"
      outlined
      >{{ tag }}</v-chip
    >
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component({
  name: "Tags"
})
export default class Tags extends Vue {
   generatorColor: String = "1234567890ABCDEF";
   chip: boolean = true;
   @Prop() tags: []

 colorRandom() {
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += this.generatorColor[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
</script>

<style scoped>
</style>
