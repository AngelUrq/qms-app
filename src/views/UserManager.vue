<template>
  <v-container>
    <material-card class="card-tabs" color="pink darken-3">
      <template v-slot:header>
        <span
          class="subheading font-weight-light mx-5"
          style="align-self: center; font-size:150%"
        >Usuarios</span>
        <v-container>
          <v-row class="mx-5" justify="end">
            <RegisterUser />
          </v-row>
        </v-container>
      </template>
      <v-data-table
        :headers="headers"
        :items="users"
        :page.sync="page"
        :items-per-page="10"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        ref="table"
      >
        <template slot="item.action" slot-scope="user">
          <v-btn
            color="blue-grey lighten-1"
            @click="openEditUser(user.item)"
            icon
            text
            x-small
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
          <EditUser v-model="showEditUser" />
          <v-btn
            color="blue-grey lighten-1"
            @click="deleteUser(user.item)"
            class="mr-1"
            icon
            x-small
            text
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination color="pink lighten-2" v-model="page" :length="pageCount"></v-pagination>
      </div>
    </material-card>
  </v-container>
</template>

<script>
import { EventBus } from '../main'
import RegisterUser from './RegisterUser'
import EditUser from './EditUser'
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  components: { RegisterUser, EditUser },
  data () {
    return {
      showEditUser: false,
      page: 1,
      pageCount: 0,
      dialog: '',
      users: [],
      headers: [
        {
          sortable: true,
          text: 'Código',
          value: 'code'
        },
        {
          sortable: false,
          text: 'Rol',
          value: 'role'
        },
        {
          sortable: false,
          text: 'Nombre',
          value: 'firstNames'
        },
        {
          sortable: false,
          text: 'Apellido Paterno',
          value: 'parentalLastName',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Apellido Materno',
          value: 'maternalLastName',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Correo',
          value: 'email',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Ciudad',
          value: 'city',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Celular',
          value: 'phone',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Notas',
          value: 'notes',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'action',
          align: 'right'
        }
      ]
    }
  },
  mounted () {
    this.getUsers()
  },
  created () {
    EventBus.$on('refreshTable', data => {
      this.getUsers()
    })
  },
  methods: {
    getUsers () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/users', config)
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteUser (user) {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .delete(backendURL + '/api/users/' + user._id, config)
        .then(response => {
          this.getUsers()
        })
        .catch(error => {
          console.log(error)
        })
    },
    openEditUser (user) {
      this.showEditUser = true
      EventBus.$emit('editUserInfo', user)
    }
  }
}
</script>
