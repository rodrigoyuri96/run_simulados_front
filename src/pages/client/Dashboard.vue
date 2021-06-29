<template>
  <user-layout>
    <div slot="title">
       <h1>Dashboard</h1>
    </div>

    <div slot="subtitle">
      Veja seu desempenho nos simulados!
      kdosakodkosakdosakdoaksd
      alo ssssssssssss
      sssssssssssssss
      ssssssssssssssss
      sssssssssssssss
      sssssssssss
      ssssssssssssssssssss
    </div>

    <div slot="contents">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text> Share </v-btn>

          <v-btn color="orange" text> Explore </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </user-layout>
</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  components: { UserLayout },
  name: "Dashboard",
};
</script>

<style scoped>
</style>
