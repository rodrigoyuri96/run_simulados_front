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

        <div class="text-center mt-6">
          <router-link to="/auth/signin"> Voltar </router-link>
        </div>
      </v-card-text>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">
            E-mail enviado com sucesso!
          </v-card-title>
          <v-card-text
            >você receberá um e-mail com um link, para redefinir a senha (se
            você não recebê-lo, verifique a sua caixa de mensagens spam)
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link class="router-link" to="/auth/signin">
              <v-btn
                class="white--text"
                color="primary"
                @click="dialog = false"
              >
                OK
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

     <v-row justify="center">
      <v-dialog v-model="dialogErro" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">
            Erro ao redefinir senha!
          </v-card-title>
          <v-card-text
            >Este e-mail não existe em nossa base de dados, por favor tente outro.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                color="primary"
                @click="dialogErro = false"
              >
                OK
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FirebaseService from "@/service/firebase.service";

@Component({
  name: "ForgotPage",
})
export default class ForgotPage extends Vue {
  private requiredField = [
    (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Digite um e-mail válido",
  ];
  valid: boolean = false;
  email = "";
  error: boolean = false;
  isLoading: boolean = false;
  dialog: boolean = false;
  dialogErro: boolean = false;

  sendEmailUpdatePassword() {
    this.isLoading = true;
    FirebaseService.passwordResetEmail(this.email)
      .then(() => {
        this.dialog = true;
      })
      .catch((error) => {
        this.dialogErro = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
.router-link {
  color: white;
  text-decoration: none;
}
</style>
