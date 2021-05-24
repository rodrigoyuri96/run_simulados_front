<template>
  <v-card class="pa-2">
    <h1>Verificação de conta</h1>
    <div class="mb-6 overline">Por favor, verifique seu email para ter acesso aos recursos da RUN Simulados</div>

    <v-btn
      class="white--text"
      :loading="isLoading"
      :disabled="disabled"
      block
      depressed
      x-large
      color="primary"
      @click="resend()"
    >Enviar e-mail novamente {{ seconds }}</v-btn>
  </v-card>
</template>

<script>
import FirebaseService from '@/service/firebase.service'
import firebase from 'firebase'

/*
|---------------------------------------------------------------------
| Verify Email Page Component
|---------------------------------------------------------------------
|
| Template to wait for the verification on the user email
|
*/

const TIMEOUT = 10

export default {
  data() {
    return {
      isLoading: false,
      disabled: true,
      times: 0,
      resendInterval: null,
      secondsToEnable: TIMEOUT,
      seconds: ''
    }
  },
  mounted() {
    this.setTimer()
  },
  beforeDestroy() {
    clearInterval(this.resendInterval)
  },
  methods: {
     resend() {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification().then(res => {
        console.log('email enviado', res)
      }).catch(error => {
        console.log(error)
      })
    },
    setTimer() {
      this.disabled = true
      this.times++
      this.secondsToEnable = TIMEOUT * this.times

      this.resendInterval = setInterval(() => {
        if (this.secondsToEnable === 0) {
          clearInterval(this.resendInterval)
          this.seconds = ''
          this.disabled = false
        } else {
          this.seconds = `( ${this.secondsToEnable} )`
          this.secondsToEnable--
        }
      }, 1000)
    }
  }
}
</script>
