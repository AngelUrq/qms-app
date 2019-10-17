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
                <RegistrarUsuario @click="hey()"/>
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
          ></v-data-table>
          <div class="text-center pt-2">
            <v-pagination color="orange lighten-1" v-model="page" :length="pageCount"></v-pagination>
          </div>
        </material-card>
</template>

<script>
import RegistrarUsuario from './RegistrarUsuario'
import axios from 'axios'
export default {
  components: { RegistrarUsuario },
  data () {
    return {
      page: 1,
      pageCount: 0,
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
        }
      ]
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      axios.get('http://localhost:3000/signup')
        .then((response) => {
          console.log(response.data)
          this.Users = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
