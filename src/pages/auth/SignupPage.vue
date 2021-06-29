<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{
        $t("register.title")
      }}</v-card-title>
      <v-card-subtitle
        >Crie sua conta para ter acesso aos nossos conteúdos</v-card-subtitle
      >

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            :rules="[(v) => !!v || 'Campo obrigatório']"
            :label="$t('register.name')"
            name="name"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="requiredField"
            :label="$t('register.email')"
            name="email"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              (v) => !/[ ]/.test(v) || 'Não é permitido espaços em branco',
              (v) =>
                (v && v.length >= 6) ||
                'A senha deve ser acima de 6 caracteres',
              (v) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(
                  v
                ) ||
                'Insira pelo menos uma letra maiúscula, minúscula, número e um caractere especial. Ex: Fulano@10',
            ]"
            :type="showPassword ? 'text' : 'password'"
            label="Nova Senha"
            name="password"
            outlined
            @click:append="showPassword = !showPassword"
          >
          </v-text-field
          ><v-text-field
            v-model="confirmPassword"
            :rules="[
              !!password || 'Campo obrigatório',
              confirmPassword === password || 'As senhas devem ser iguais',
            ]"
            :type="showPassword ? 'text' : 'password'"
            label="Confirme a nova senha"
            name="password"
            outlined
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            class="white--text"
            :loading="isLoading"
            :disabled="!valid"
            block
            x-large
            color="primary"
            @click="createUser(name, email, password)"
            >Criar Conta</v-btn
          >

          <div class="caption font-weight-bold text-uppercase my-3">
            Ou inscreva-se com
          </div>

          <!-- external providers list -->
          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignUpDisabled"
            class="mb-2 primary lighten-2 text--darken-3"
            block
            x-large
            @click="signInProvider(provider)"
          >
            <v-icon small left>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">
            {{ errorProviderMessages }}
          </div>

          <div class="mt-5 overline">
            {{ $t("register.agree") }}
            <br />
            <router-link to="">{{ $t("common.tos") }}</router-link>
            &
            <router-link to="">{{ $t("common.policy") }}</router-link>
          </div>

          <div class="text-center mt-6">
            {{ $t("register.account") }}
            <router-link to="/auth/signin" class="font-weight-bold">
              {{ $t("register.signin") }}
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialogErro" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">
            Erro ao criar usuário!!!
          </v-card-title>
          <v-card-text
            >Este e-mail já existe em nossa base de dados, por favor tente
            recuperar a senha ou insira outro e-mail.
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
import firebase from "firebase";

@Component({
  name: "SignupPage",
})
export default class SignupPage extends Vue {
  valid: boolean = false;
  dialog: boolean = false;
  dialogErro: boolean = false;

  email = "";
  password = "";
  confirmPassword = "";
  name = "";

  isSignUpDisabled: boolean = false;
  errorProvider: boolean = false;

  showPassword: boolean = false;
  isLoading: boolean = false;

  private requiredField = [
    (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Digite um e-mail válido",
  ];

  providers = [
    {
      id: "google",
      label: "Google",
      isLoading: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      isLoading: false,
    },
  ];

  signInProvider(provider) {
      if (provider.label == "Google") {
        FirebaseService.signInWithGoogle()
          .then(() => {
            this.redirectHomePage();
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (provider.label == "Facebook") {
        FirebaseService.signInWithFacebook()
          .then(() => {
            this.redirectHomePage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
  }

   redirectHomePage() {
      FirebaseService.getUser(true).then((isAuthenticated) => {
        let user = firebase.auth().currentUser;
        if (isAuthenticated) {
          console.log("usuario autenticado", user);
          if (user.emailVerified) {
            this.$router.push("/");
          } else {
            this.$router.push("/auth/verify-email");
          }
        }
      });
    }

  createUser(name, email, password) {
    this.isLoading = true;
    FirebaseService.createUser(email, password)
      .then((user) => {
        console.log("usuario criado !!");
        FirebaseService.updatedUser(user, { displayName: name });
        this.$router.push('/');
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
