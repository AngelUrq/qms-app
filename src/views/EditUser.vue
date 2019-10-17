<template>
    <v-dialog v-model="show" scrollable>
      <v-card>
        <v-card-title>Editar Usuario</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field  color="blue" label="Codigo*" v-model="EditUser.code" required></v-text-field>
                </v-col>
                 <v-col cols="12" sm="6">
                <v-select
                  :items="['Admin', 'Usuario']"
                  label="Role*"
                  required
                  color="blue"
                  v-model="EditUser.role"
                ></v-select>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Nombre*" v-model="EditUser.firstNames" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Paterno*" v-model="EditUser.parentalLastName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Materno*" v-model="EditUser.maternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12">
                <v-text-field color="blue" label="Correo*" v-model="EditUser.email" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Cochabamba', 'La Paz']"
                  label="Ciudad*"
                  required
                  color="blue"
                  prepend-icon="mdi-map-marker"
                  v-model="EditUser.city"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                prepend-icon="mdi-cellphone"
                color="blue"
                label="Celular/Telefono*"
                v-model="EditUser.phone"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  outlined
                  v-model="EditUser.notes"
                  label="Notas"
                  color="blue"
                ></v-textarea>
              </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
          color="blue darken-1"
          small class="blue lighten-1 orange--text text--lighten-2"
          @click="saveUser()"
          >Guardar
            <v-icon small right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
           <v-btn
          color="blue darken-1"
          small class="blue lighten-1 orange--text text--lighten-2"
          @click="closeDialog()"
          >Cancelar
            <v-icon small right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { EventBus } from '../main'
import axios from 'axios'
export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      valuePass: String,
      userid: '',
      EditUser: {
        code: '',
        role: '',
        firstNames: '',
        parentalLastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        city: '',
        phone: '',
        notes: ''
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  created () {
    EventBus.$on('editUserInfo', (user) => {
      this.EditUser = Object.assign({}, user)
      this.EditUser.password = ''
      this.userid = user._id
    })
  },
  methods: {
    saveUser () {
      axios.patch('http://localhost:3000/signup/' + this.userid, {
        code: this.EditUser.code,
        firstNames: this.EditUser.firstNames,
        parentalLastName: this.EditUser.parentalLastName,
        maternalLastName: this.EditUser.maternalLastName,
        email: this.EditUser.email,
        city: this.EditUser.city,
        phone: this.EditUser.phone,
        notes: this.EditUser.notes,
        role: this.EditUser.role
      })
        .then((response) => {
          console.log(response)
          EventBus.$emit('refreshTable', 'getUsers')
          this.$emit('input', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeDialog () {
      this.$emit('input', false)
    }
  }
}
</script>
