<template>
  <v-dialog v-model="dialog" width="1000" scrollable>
    <v-card class="form-group">
      <v-card-title class="headline teal lighten-2 white--text">Cadastro Turma <v-spacer></v-spacer><v-icon x-large style="color: white" @click="dialog = !dialog">mdi-close</v-icon></v-card-title>
      <v-card-text>
        <v-form class="mt-5">
          <v-row>
            <v-col>
              <v-text-field label="Nome da Turma" outlined />
              <v-text-field label="Professores"  outlined/>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import {Component, VModel, Vue} from "vue-property-decorator";

@Component({
  name: 'TeamDetail'
})
export default class TeamDetail extends Vue{
  @VModel({type:Boolean}) dialog;

}
</script>

<style scoped>

</style>
