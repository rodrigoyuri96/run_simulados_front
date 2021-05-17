<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">RUN SIMULADOS</v-card-title>
      <img :src="require('@/assets/images/logo1.png')" width="200px" />
      <v-card-subtitle>Entre com sua conta</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            :label="$t('login.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('login.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            class="white--text"
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('login.button') }}</v-btn>

          <div class="caption font-weight-bold text-uppercase my-3">{{ $t('login.orsign') }}</div>

          <!-- external providers list -->
          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignInDisabled"
            class="mb-2 primary lighten-1 white--text text--darken-1"
            block
            x-large
            @click="signInProvider(provider)"
          >
            <v-icon small left color="white darken-4">mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>

          <div class="mt-5">
            <router-link to="/auth/forgot-password">
              {{ $t('login.forgot') }}
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('login.noaccount') }}
      <router-link to="/auth/signup" class="font-weight-bold">
        {{ $t('login.create') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import FirebaseService from "@/service/firebase.service";
import AuthService from "@/service/auth.service";
import firebase from "firebase";

export default {
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,
      errorMessages: '',

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false,

      providers: [{
        id: 'google',
        label: 'Google',
        isLoading: false
      }, {
        id: 'facebook',
        label: 'Facebook',
        isLoading: false
      }],

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Campo obrigatório'
      }
    }
  },
  
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        this.signIn(this.email, this.password)
      }
    },
    async signIn(email, password) {
      FirebaseService.auth(email, password).then(()=>{
          this.redirectHomePage()
      })
        .catch(error=>{
        if(error.code == 'auth/wrong-password'){
          console.log("senha inválida")
        }
      })
    },
    
    signInProvider(provider) {

      if(provider.label == 'Google'){
        FirebaseService.signInWithGoogle()
          .then(()=>{
            this.redirectHomePage()
          }).catch(error=>{
            console.log(error)
        })

      }else if(provider.label == 'Facebook'){
        FirebaseService.signInWithFacebook()
        .then(()=>{
          this.redirectHomePage()
        }).catch(error=>{
          console.log(error)
        })
      }

    },

    redirectHomePage(){
      FirebaseService.getUser(true).then(isAuthenticated=>{
        let user = firebase.auth().currentUser;
        if(isAuthenticated && user.emailVerified == true){
          this.$router.push("/")
        } else {
          this.$router.push("/verify/email")
        }
      })
    },

    resetErrors() {
      this.error = false
      this.errorMessages = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    },
  }
}
</script>
