<template>
  <material-card
          class="card-tabs"
          color="orange"
        >
          <template v-slot:header>
          <span
                class="subheading font-weight-light mx-5"
                style="align-self: center; font-size:150%"
          >
          Usuarios</span>
            <v-container>
              <v-row
              class="mx-5"
              justify="end"
              >
                <RegisterUser/>
              </v-row>
            </v-container>
          </template>
          <v-data-table
            :headers="headers"
            :items="Users"
            :page.sync="page"
            :items-per-page="10"
            hide-default-footer
            class="elevation-1"
            @page-count="pageCount = $event"
            ref="table"
          >
            <template slot="item.action" slot-scope="user">
              <v-btn
              class="blue lighten-1 orange--text text--lighten-1; mx-2"
              depressed
              fab
              x-small
              @click="openEditUser(user.item)"
              >
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <EditUser v-model="showEditUser"/>
              <v-btn
              class="blue lighten-1 orange--text text--lighten-1"
              depressed
              fab
              x-small
              @click="deleteUser(user.item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination color="orange lighten-1" v-model="page" :length="pageCount"></v-pagination>
          </div>
        </material-card>
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
      Users: [],
      headers: [
        {
          sortable: false,
          text: 'Codigo',
          value: 'code'
        },
        {
          sortable: false,
          text: 'Role',
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
      axios.get(backendURL + '/api/users/signup')
        .then((response) => {
          console.log(response.data)
          this.Users = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteUser (user) {
      axios.delete(backendURL + '/api/users/signup/' + user._id)
        .then((response) => {
          const index = this.Users.indexOf(user)
          this.Users.splice(index, 1)
        })
        .catch((error) => {
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
