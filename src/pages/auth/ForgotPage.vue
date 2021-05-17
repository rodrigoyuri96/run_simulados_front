<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{
        $t("forgot.title")
      }}</v-card-title>

      <v-card-subtitle>
        {{ $t("forgot.subtitle") }}
      </v-card-subtitle>

      <!-- reset form -->
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="requiredField"
            :label="$t('forgot.email')"
            name="email"
            outlined
          ></v-text-field>

          <v-btn
            class="white--text"
            :loading="isLoading"
            block
            x-large
            :disabled="!valid"
            color="primary"
            @click="sendEmailUpdatePassword"
            >{{ $t("forgot.button") }}</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      <router-link to="/auth/signin">
        {{ $t("forgot.backtosign") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FirebaseService from "@/service/firebase.service";

@Component({
  name: "ForgotPage",
})
export default class ForgotPage extends Vue {
  
  private requiredField = [ v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Digite um e-mail válido' ] 
  valid: boolean = false;
  email=""
  error: boolean = false;
  isLoading: boolean = false;

  sendEmailUpdatePassword() {
    this.isLoading = true
    FirebaseService.passwordResetEmail(this.email)
      .then(() => {
        alert('E-mail enviado com sucesso!')
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        this.isLoading = false;
      });
  }
}
</script>
