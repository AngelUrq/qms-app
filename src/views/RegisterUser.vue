<template>
    <v-dialog v-model="dialog" scrollable>
      <template v-slot:activator="{ on }">
        <v-btn
        class="orange lighten-1 blue--text text--lighten-1"
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
                  <v-text-field  color="blue" label="Codigo*" v-model="User.code" required></v-text-field>
                </v-col>
                 <v-col cols="12" sm="6">
                <v-select
                  :items="['Admin', 'Usuario']"
                  label="Role*"
                  required
                  color="blue"
                  v-model="User.role"
                ></v-select>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Nombre*" v-model="User.firstName" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Paterno*" v-model="User.paternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" label="Apellido Materno*" v-model="User.maternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12">
                <v-text-field color="blue" label="Correo*" v-model="User.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="User.password"
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
                  v-model="User.city"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                prepend-icon="mdi-cellphone"
                color="blue"
                label="Celular/Telefono*"
                v-model="User.phone"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  outlined
                  v-model="User.notes"
                  label="Notas"
                  color="blue"
                ></v-textarea>
              </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" small class="blue lighten-1 orange--text text--lighten-2" @click="RegisterUserAPI()">Registrar
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
  data () {
    return {
      dialog: '',
      valuePass: String,
      User: {
        code: '',
        role: '',
        firstName: '',
        paternalLastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        city: '',
        phone: '',
        notes: ''
      }
    }
  },
  methods: {
    RegisterUserAPI () {
      let newUser = {
        code: this.User.code,
        password: this.User.password,
        firstNames: this.User.firstName,
        parentalLastName: this.User.paternalLastName,
        maternalLastName: this.User.maternalLastName,
        email: this.User.email,
        city: this.User.city,
        phone: this.User.phone,
        notes: this.User.notes,
        role: this.User.role
      }
      axios.post('http://localhost:3000/signup', newUser)
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
