<template>
  <v-card class="pa-2">
    <v-card-title class="justify-center display-1 mb-2"
      >Redefinição de Senha</v-card-title
    >

    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="newPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[
          v => !(/[ ]/.test(v)) || 'Não é permitido espaços em branco', 
          (v) => (v && v.length >= 6) || 'A senha deve ser acima de 6 caracteres', 
          v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(v) || 'Insira pelo menos uma letra maiúscula, minúscula, número e um caractere especial. Ex: Fulano@10'
        ]"
        name="password"
        label="Nova Senha"
        :type="showPassword ? 'text' : 'password'"
        outlined
        class="mt-4"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-text-field
        v-model="confirmNewPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[
          !!confirmNewPassword || 'Campo obrigatório',
          newPassword === confirmNewPassword ||
            'As senhas devem ser iguais',
        ]"
        name="password"
        label="Confirme a nova senha"
        :type="showPassword ? 'text' : 'password'"
        outlined
        class="mt-4"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        class="white--text"
        block
        depressed
        x-large
        color="primary"
        :disabled="!valid"
        @click="confirmPasswordReset"
        >Alterar Senha</v-btn
      >
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Firebase from "@/service/firebase.service"
import FirebaseService from "@/service/firebase.service";

@Component({
  name: "ResetPage",
})

export default class ResetPage extends Vue {
  valid: boolean = false;

  newPassword = "";
  confirmNewPassword = "";

  showPassword: boolean = false;
  isLoading: boolean = false;

  error: null;

  confirmPasswordReset() {
    this.isLoading = true;

    FirebaseService.updatePassword(this.confirmNewPassword, this.$route.query.oobCode)

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
</script>
