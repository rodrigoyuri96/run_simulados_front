<template>
  <v-card>
    <v-card-title>
      Pré-visualização
    </v-card-title>
    <v-card-text>
      <div class="ql-editor" v-html="content" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component({
  name:'Question'
})
export default class Question extends Vue {
  @Prop({type: String}) content: string | "";

}
</script>

<style scoped>

</style>
