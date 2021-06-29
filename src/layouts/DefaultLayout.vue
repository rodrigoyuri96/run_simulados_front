<template v-slot:append>
  <div v-shortkey="['ctrl', '/']" class="d-flex flex-grow-1" @shortkey="onKeyup">
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      app
      permanent
      hide-overlay
      class="elevation-1"
      :right="$vuetify.rtl"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <!-- Navigation menu info -->
      <template v-slot:prepend>
        <v-list class="pa-1">
          <div class="title font-weight-bold text-lowercase text-center">
            <div
              v-bind:style="user.picture !== null ? 'background-color: white' : 'pink'"
              class="align-center justify-center d-flex flex-column"
            >
              <v-img
                style="border-radius: 50%"
                :aspect-ratio="1"
                width="100"
                v-if="user.picture && user.picture !== ''"
                :src="user.picture"
              ></v-img>
              <span v-else class="white--text headline">RUN</span>
            </div>
            <br />

            <v-list-item-title
              class="teal--text lighten-1--text mb-0 pa-0 title text-uppercase"
            >
              {{ user.name }}
            </v-list-item-title>

            <div v-if="hasPermission(profile.client)">
              <v-list-item-title class="pink--text darken-3--text mt-0 mb-0 pa-0">
                Plano:
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-2">{{
                userPlan(user)
              }}</v-list-item-subtitle>
            </div>
            <div v-else>
              <v-list-item-title
                class="pink--text darken-3--text mt-0 mb-0 pa-0 subtitle-2"
              >
                Acesso:
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-2">{{
                userAccess(user)
              }}</v-list-item-subtitle>
            </div>
            <v-list-item-subtitle class="caption"> {{ user.email }}</v-list-item-subtitle>
          </div>
        </v-list>
      </template>
      <main-menu :menu="navigation.menu" />

      <template>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ "mdi-cogs" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Configurações</v-list-item-title>
        </v-list-item>

        <!-- REMOVE ME - Shop Demo purposes -->

        <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>{{ "mdi-location-exit" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: red">Desconectar</v-list-item-title>
        </v-list-item>

        <div class="overline grey--text text-center mb-3">
          {{ product.version }}
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isToolbarDetached ? 'surface' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card
        class="flex-grow-1 d-flex"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
        :flat="!isToolbarDetached"
      >
        <div class="d-flex flex-grow-1 align-center">
          <!-- search input mobile -->
          <v-text-field
            v-if="showSearch"
            append-icon="mdi-close"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo
            flat
            autofocus
            @click:append="showSearch = false"
          ></v-text-field>

          <div v-else class="d-flex flex-grow-1 align-center">
            <v-spacer class="d-none d-lg-block"></v-spacer>

            <v-spacer class="d-block d-sm-none"></v-spacer>

            <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <toolbar-apps />

            <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
              <toolbar-notifications />
            </div>

            <toolbar-user />
          </div>
        </div>
      </v-card>
    </v-app-bar>

    <v-main>
      <v-layout>
        <run-validation-message></run-validation-message>

        <slot></slot>
      </v-layout>

      <v-footer app inset>
        <v-spacer></v-spacer>
        <div class="overline">
          <a class="text-decoration-none" href="https://indielayer.com" target="_blank"
            >@Run Vestibulares</a
          >
        </div>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import FirebaseService from "@/service/firebase.service";
import { mapGetters, mapState } from "vuex";

// navigation menu configurations
import config from "../configs";

import MainMenu from "../components/navigation/MainMenu";
import ToolbarUser from "../components/toolbar/ToolbarUser";
import ToolbarApps from "../components/toolbar/ToolbarApps";
import ToolbarCurrency from "../components/toolbar/ToolbarCurrency";
import ToolbarNotifications from "../components/toolbar/ToolbarNotifications";
import RunValidationMessage from "@/components/run/messages/ValidationMessage";
import { Profile } from "@/models/user/profile.enum";
import UserCommons from "@/commons/user.commons";

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarApps,
    ToolbarCurrency,
    ToolbarNotifications,
    RunValidationMessage,
  },
  data() {
    return {
      profile: {
        client: Profile.CLIENT,
        admin: Profile.ADMIN,
        developer: Profile.DEVELOPER,
        teacher: Profile.TEACHER,
      },
      drawer: null,
      showSearch: false,

      expandOnHover: true,
      navigation: config.navigation,
    };
  },
  computed: {
    ...mapState("app", [
      "product",
      "isContentBoxed",
      "menuTheme",
      "toolbarTheme",
      "isToolbarDetached",
    ]),
    ...mapGetters("UserModule", ["user"]),
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus();
    },

    userAccess(user) {
      if (UserCommons.hasPermission(user, Profile.ADMIN)) {
        return "ADMNISTRADOR(A)";
      } else if (UserCommons.hasPermission(user, Profile.TEACHER)) {
        return "PROFESSOR(A)";
      } else if (UserCommons.hasPermission(user, Profile.DEVELOPER)) {
        return "DESENVOLVEDOR(A)";
      } else if (UserCommons.hasPermission(user, Profile.PEDAGOGUE)) {
        return "PEDAGOGO(A)";
      } else if (UserCommons.hasPermission(user, Profile.MONITOR)) {
        return "MONITOR(A)";
      } else if (UserCommons.hasPermission(user, Profile.SUPPORT)) {
        return "SUPORTE";
      } else {
        return "NÃO AUTORIZADO";
      }
    },

    userPlan(user) {
      let plan;
      switch (user.accountSettings.accountPlan) {
        case "BASIC":
          plan = "Sossegado";
          break;
      }
      return plan;
    },

    hasPermission(profile) {
      return UserCommons.hasPermission(this.user, profile);
    },

    logout() {
      FirebaseService.signOut().then((status) => {
        if (status) {
          sessionStorage.setItem("user", null);
          this.$router.push("/run");
        }
      });
    },
  },

  mounted() {
    console.log(this.user);
  },
};
</script>

<style scoped></style>
