<template>
  <div class="my-2">
    <div>
      <v-card v-if="user.accountSettings.blocked == 'NAO'" class="warning mb-4" light>
        <v-card-title>Usuário Bloqueado</v-card-title>
        <v-card-subtitle>Seu usuário foi banido da RUN</v-card-subtitle>
        <v-card-text>
          <span>Isso acontece quando você viola nossas políticas de acesso, privacidade, linguagem entrou outros motivos. Para saber mais....</span>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Informações da Conta</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div>
              <v-img
                :src="user.picture"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3"
                max-width="90"
                max-height="90"
              ></v-img>
              <v-btn class="mt-1" small>Editar imagem</v-btn>
            </div>
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-text-field v-model="user.name" label="Nome" placeholder="name"></v-text-field>
              <v-text-field disabled v-model="user.email" label="Email" hide-details></v-text-field>

              <div class="d-flex flex-column">
                <v-checkbox v-model="user.verified" dense label="Email Verificado"></v-checkbox>
                <div>
                  <v-btn
                    v-if="!user.verified"
                    @click="sendEmailVerify()"
                  >
                    <v-icon left small>mdi-email</v-icon>Enviar e-mail de verificação
                  </v-btn>
                </div>
              </div>

              <div class="mt-2">
                <v-btn color="primary" @click class="white--text">Atualizar informações</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Ações da conta</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-2">
              <div class="title">Alterar Senha</div>
              <div class="subtitle mb-2">Modifique sua senha de acesso em poucos passos.</div>
              <v-btn
                class="mb-2"
                @click="sendEmailUpdatePassword()"
              >
                <v-icon left small>mdi-email</v-icon>Enviar e-mail para alteração de senha
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="title">Export Account Data</div>
              <div class="subtitle mb-2">Export all the platform metadata for this user.</div>
              <v-btn class="mb-2">
                <v-icon left small>mdi-clipboard-account</v-icon>Export User Data
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="error--text title">Danger Zone</div>
              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

              <div class="my-2">
                <v-btn
                  v-if="user.role === 'ADMIN'"
                  color="primary"
                  @click="user.role = 'USER'"
                >
                  <v-icon left small>mdi-security</v-icon>Remove admin access
                </v-btn>
                <v-btn v-else color="primary" @click="user.role = 'ADMIN'">
                  <v-icon left small>mdi-security</v-icon>Set User as Admin
                </v-btn>
              </div>

              <v-divider></v-divider>

              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
              <div class="my-2">
                <v-btn
                  v-if="user.disabled"
                  color="warning"
                  @click="user.disabled = false"
                >
                  <v-icon left small>mdi-account-check</v-icon>Enable User
                </v-btn>
                <v-btn
                  v-else
                  color="warning"
                  @click="disableDialog = true"
                >
                  <v-icon left small>mdi-cancel</v-icon>Disable User
                </v-btn>
              </div>

              <v-divider></v-divider>
              <div
                class="subtitle mt-3 mb-2"
              >To delete the user please transfer ownership or delete user's subscriptions.</div>
              <v-btn color="error" @click="deleteDialog = true">
                <v-icon left small>mdi-delete</v-icon>Delete User
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Created</span>
            {{ user.created | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Last Sign In</span>
            {{ user.lastSignIn | formatDate('lll') }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Raw Data</v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre class="body-2">{{ user }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn color="warning" @click="user.disabled = true; disableDialog = false">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name:'AccountTab'
})
export default class AccountTab extends Vue{
  @Prop({type: Object, default: {}}) user
  panel: [1]
  deleteDialog: false
  disableDialog: false

  sendEmailVerify(){

  }

  sendEmailUpdatePassword(){

  }
}
</script>
