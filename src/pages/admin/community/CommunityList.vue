<template>
 <v-container>
    <run-community-register v-model="openCommunityRegister" />

    <v-card class="form-group">
      <v-card-title
        class="headline teal lighten-2 white--text font-weight-regular"
      >
        Cadastro de comunidades
      </v-card-title>
      <v-card-text class="mt-3">
        <v-card-actions class="mt-3 mb-3">
          <v-card-title class="ml-n1"
            >Lista de Comunidades Cadastradas</v-card-title
          >
          <v-spacer></v-spacer>
          <v-btn class="white--text ml-n1" color="primary" @click="addCommunity()"
            >Cadastrar Comunidades</v-btn
          >
        </v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Nome da comunidade</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(community, i) in communities" :key="i">
                    <td>{{ community.name }}</td>
                    <td class="text-center">
                      <v-btn elevation="0" icon>
                        <v-icon @click="updateCommunity(i)">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn @click="removeDialog(i)" elevation="0" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <run-remove-dialog :method="deleteCommunity" v-model="openRemoveDialog" />
  </v-container>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import RunCommunityRegister from '@/pages/community/CommunityRegister.vue'
import { getModule } from "vuex-module-decorators";
import { CommunityModule } from '@/store/modules/community.module'
import { mdiDelete, mdiPencil } from "@mdi/js";
import { RegisterStatusEnum } from '@/models/register.status.enum';
import ValidationMessage from "@/models/validation/ValidationMessage";
import { TypeMessage } from "@/models/validation/TypeMessage";
import { ValidationMessageModule } from "@/store/modules/validation/ValidationMessageModule";
import CommunityModel from '@/models/community.model';
import RunRemoveDialog from "@/components/run/messages/removeDialog.vue";

@Component({
    name: 'CommunityList',
    components:{RunCommunityRegister, RunRemoveDialog}
})

export default class CommunityList extends Vue {
  communityModule = getModule(CommunityModule, this.$store);
  validationMessageModule = getModule(ValidationMessageModule, this.$store);
  index = 0;
  openRemoveDialog = false;
  openCommunityRegister = false;
  icons = {
    mdiDelete,
    mdiPencil
  };

  get communities(){
    return this.communityModule.communities;
  }

  get snack(){
    return this.validationMessageModule.snack;
  }

  set snack(newValue: boolean){
    this.validationMessageModule.setSnack(newValue);
  }

  get dialog(){
    return this.communityModule.dialog;
  }

  set dialog(newValue: boolean){
    this.communityModule.setDialog(newValue);
  }

  removeDialog(i){
    this.index = i;
    this.openRemoveDialog = true;
  }

  updateCommunity(i: number){
    this.communityModule.setCommunity(this.communityModule.communities[i]);
    this.communityModule.setRegisterStatus(RegisterStatusEnum.UPDATE);
    this.openCommunityRegister = true;
  }

  deleteCommunity(){
    const community = this.communityModule.communities[this.index];
    this.communityModule.delete(community.id).then((res) => {
      if(res.status == 200){
        this.openRemoveDialog = false;
        this.validationMessageModule.setSnack(true);
        const v = new ValidationMessage("Comunidade salva com sucesso", TypeMessage.SUCCESS);
        this.validationMessageModule.setValidation(v);
        this.communityModule.communities.splice(this.index, 1);
      }
    }).catch(() => {
      const v = new ValidationMessage("Erro ao remover a comunidade", TypeMessage.WARNING);
      this.validationMessageModule.setValidation(v);
    });
  }

  addCommunity(){
    this.communityModule.setRegisterStatus(RegisterStatusEnum.INSERT);
    this.communityModule.setCommunity(new CommunityModel());
    this.openCommunityRegister = true;
  }

  create(){
    this.communityModule.findAll();
  }
}
</script>

<style>

</style>
