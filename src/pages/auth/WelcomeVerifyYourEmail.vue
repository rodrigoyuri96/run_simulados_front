<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-icon color="green" class="mr-2">mdi-check-circle</v-icon>
                Seja Bem-Vindo à Run !!
            </v-card-title>
            <v-card-text>
                <p style="font-size: 15px">
                    Verifique seu email para ter acesso no nosso site. Certifique-se de o email tenha sido enviado 
                    no seu lixo eletronico, ou promoções.
                </p>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary" 
                        class="white--text" 
                        outlined
                        @click="logout()"
                    >
                    Fazer Login
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import firebase from "firebase";

@Component({
    name: 'WelcomeVerifyYourEmail',
    components: { }
})

export default class WelcomeVerifyYourEmail extends Vue {

    logout() {
        firebase.auth().signOut().then(() => {
            this.$router.push('/auth/signin')
        }).catch((error) => {
            error
        });
    }
}
</script>

<style>

</style>