<template>
  <div class="d-flex flex-column flex-grow-1 ml-3 mr-3 mt-2">
    <v-card>
      <div>
        <div class="ml-2 mt-1">Funcionários</div>
      </div>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Verificar</v-list-item-title>
              </v-list-item>
              <v-list-item @click>
                <v-list-item-title>Desabilitar</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-col>
        <v-col cols="8" class="d-flex text-right align-center ml-15 " >
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="filtrar por nome, e-mail"
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
        </v-col>
        <v-col align-self="end" justify="end">
          <v-btn color="primary" class="white--text">
            Cadastrar Professor
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="users"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.id + ''" /></div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <v-avatar size="32" class="elevation-1 grey lighten-3">
              <v-img :src="item.avatar" />
            </v-avatar>
            <div class="ml-1 caption font-weight-bold">
              <copy-label :text="item.email" />
            </div>
          </div>
        </template>

<!--        <template v-slot:item.verified="{ item }">-->
<!--          <v-icon v-if="item.verified" small color="success">-->
<!--            mdi-check-circle-->
<!--          </v-icon>-->
<!--          <v-icon v-else small>-->
<!--            mdi-circle-outline-->
<!--          </v-icon>-->
<!--        </template>-->

<!--        <template v-slot:item.disabled="{ item }">-->
<!--          <div>{{ item.disabled.toString() | capitalize }}</div>-->
<!--        </template>-->

        <template v-slot:item.role="{ item }">
          <v-chip
            label
            small
            :class="item.role === 'ADMIN' ? 'white--text font-weight-bold' : 'font-weight-bold'"
            :color="item.role === 'ADMIN' ? 'primary' : undefined"
          >{{ item.role | capitalize }}</v-chip>
        </template>

        <template v-slot:item.created="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.lastSignIn="{ item }">
          <div>{{ item.lastSignIn | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.action="{ }">
          <div class="actions">
            <v-btn @click="openDialog = true" icon>
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <run-teachers-list v-model="openDialog"></run-teachers-list>
  </div>
</template>

<script>
import users from './content/users'
import CopyLabel from '../../components/common/CopyLabel'
import RunTeachersList from "@/pages/pedagogue/teachers/TeachersList.vue"

export default {
  components: {
    CopyLabel,
    RunTeachersList
  },
  data() {
    return {
      openDialog: false,
      isLoading: false,
      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Nome', align: 'left', value: 'name' },
        { text: 'Perfil', value: 'role' },
        { text: 'Data Criação', value: 'created' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],

      users
    }
  },
  watch: {
    selectedUsers(val) {

    }
  },
  methods: {
    searchUser() {},
    open() {}
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
