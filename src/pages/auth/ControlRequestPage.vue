<template>
 <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator/lib";

@Component({
    name: 'ControlRequestPage'
})

export default class ControlRequestPage extends Vue {

    private mode: any
    private oobCode: any
    private apiKey: any
    private lang: any

    created(){
        this.mode = this.$route.query.mode
        this.oobCode = this.$route.query.oobCode
        this.apiKey = this.$route.query.apiKey
        this.lang = this.$route.query.lang

        if(this.mode && this.mode == 'resetPassword'){
            this.$router.push({name: 'auth-reset', query: {mode: this.mode, oobCode: this.oobCode, apiKey: this.apiKey, lang: this.lang}})
        }
    }
}
</script>

<style>

</style>