<template>
    <v-dialog 
        transition="dialog-bottom-transition" 
        v-model="dialog"
        max-width="600"
    >
        <v-card>
            <v-toolbar 
                color="primary" 
                class="white--text" 
            >
                <v-icon 
                    class="mr-1" 
                    color="yellow" 
                > 
                mdi-alert
                </v-icon>
                <h3>Atenção</h3>
            </v-toolbar>
            <v-card-text class="mt-3" >
                <p style="font-size: 14px" >Tem certeza que você deseja remover este item ?</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color="red lighten-2" 
                    class="white--text"
                    @click="method"
                >
                        Remover 
                    <v-icon class="ml-1" size="20" >
                        mdi-delete-empty
                    </v-icon>
                </v-btn>
                <v-btn 
                    @click="dialog = !dialog" 
                    color="secondary"
                    class="white--text"
                >
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" >

import { Vue, Component, Prop, VModel } from 'vue-property-decorator'

@Component({
    name: "RemoveDialog",
    components: {}
})

export default class RemoveDialog extends Vue {

    @Prop({ type: Function }) method: any
    @VModel({ type: Boolean }) dialog: boolean | false
}
</script>

<style>

</style>