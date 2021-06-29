<template>
  <div class="flex-grow-1">
    <v-row style="background-color: #00ddbb; height: 60%">
      <v-col
        cols="6"
        class="align-center justify-center d-flex flex-column"
        style="color: white"
      >
        <slot name="title"></slot>
      </v-col>
      <v-col
        cols="6"
        class="align-center justify-center d-flex flex-column"
        style="color: white"
      >
        <slot name="subtitle"></slot>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" style="background-color: #00ddbb; height: 55%">
      <slot name="contents"></slot>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
