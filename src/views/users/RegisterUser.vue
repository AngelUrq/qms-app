<template>
    <v-dialog v-model="dialog" scrollable width="70%">
      <template v-slot:activator="{ on }">
        <v-btn
        class="pink lighten-3 lighten-1 white--text text--lighten-1"
        dark
        v-on="on"
        fab
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Registrar Usuario</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="blue" label="Codigo*" v-model="user.code" required></v-text-field>
                </v-col>
                 <v-col cols="12" sm="6">
                <v-select
                  :items="['Admin', 'Usuario']"
                  label="Rol*"
                  required
                  color="blue"
                  v-model="user.role"
                ></v-select>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Nombre*" v-model="user.firstName" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Paterno*" v-model="user.paternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Materno*" v-model="user.maternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12">
                <v-text-field color="blue" label="Correo*" v-model="user.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="user.password"
                valuePass="myPass"
                label="Contraseña"
                :append-icon="valuePass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (valuePass = !valuePass)"
                :type="valuePass ? 'password' : 'text'"
                color="blue"
              ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Cochabamba', 'La Paz']"
                  label="Ciudad*"
                  required
                  color="blue"
                  prepend-icon="mdi-map-marker"
                  v-model="user.city"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                prepend-icon="mdi-cellphone"
                color="blue"
                label="Celular/Telefono*"
                v-model="user.phone"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  outlined
                  v-model="user.notes"
                  label="Notas"
                  color="blue"
                ></v-textarea>
              </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="pink lighten-3" class="mb-3 mr-3" text @click="registerUserAPI()">Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { EventBus } from '../../main'
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  data () {
    return {
      dialog: '',
      valuePass: String,
      user: {
        code: '',
        role: '',
        firstName: '',
        paternalLastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        city: '',
        phone: '',
        notes: '',
        lastLogIn: 'now'
      }
    }
  },
  methods: {
    registerUserAPI () {
      let newUser = {
        code: this.user.code,
        password: this.user.password,
        firstNames: this.user.firstName,
        paternalLastName: this.user.paternalLastName,
        maternalLastName: this.user.maternalLastName,
        email: this.user.email,
        city: this.user.city,
        phone: this.user.phone,
        notes: this.user.notes,
        role: this.user.role,
        lastLogIn: this.user.lastLogIn
      }
      axios.post(backendURL + '/api/users/signup', newUser)
        .then((response) => {
          console.log(response)
          EventBus.$emit('refreshTable', 'getUsers')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
