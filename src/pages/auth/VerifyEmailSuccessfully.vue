<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-icon color="green" class="mr-2">mdi-check-circle</v-icon>
                Seja Bem-Vindo à Run !!
            </v-card-title>
            <v-card-text>
                <p style="font-size: 15px">
                    Seu email foi verificado com sucesso 
                </p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'VerifyEmailSuccessfully',
    components: { }
})

export default class VerifyEmailSuccessfully extends Vue {

    redirectTimeOut() {
        setTimeout(
            () => {
                this.$router.push('/')
            }, 3000
        )
    }

    created() {
        this.redirectTimeOut();
    }
}
</script>

<style>

</style>