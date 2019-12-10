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
        <v-card-title>Registrar usuario</v-card-title>
          <v-card-text>
            <v-form ref="form">
               <v-container>
              <v-row>
                <v-col cols="12" sm="10" md="5">
                  <v-text-field color="blue" :rules="codeRules" label="Codigo*" v-model="user.code" required></v-text-field>
                </v-col>
                 <v-col cols="12" sm="6">
                <v-select
                  :items="['Admin', 'Usuario']"
                  label="Rol*"
                  :rules="[v => !!v || 'Se debe escojer un Rol']"
                  required
                  color="blue"
                  v-model="user.role"
                ></v-select>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" :rules="[v => !!v || 'El nombre es necesario']" label="Nombre*" v-model="user.firstName" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" :rules="[v => !!v || 'El apellido paterno es necesario']" label="Apellido paterno*" v-model="user.paternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field color="blue" :rules="[v => !!v || 'El apellido materno es necesario']" label="Apellido materno*" v-model="user.maternalLastName"></v-text-field>
                </v-col>
                <v-col cols="12">
                <v-text-field color="blue" :rules="emailRules" label="Correo*" v-model="user.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="user.password"
                valuePass="myPass"
                label="Contraseña"
                :rules="passwordRules"
                :append-icon="valuePass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (valuePass = !valuePass)"
                :type="valuePass ? 'password' : 'text'"
                color="blue"
              ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Cochabamba', 'La Paz', 'Santa Cruz']"
                  label="Ciudad*"
                  :rules="[v => !!v || 'Se debe escoger una ciudad']"
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
                :rules="phoneRules"
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
            </v-form>
          </v-card-text>
        <v-card-actions>
          <v-alert
            :value="warningAlert"
            type= "warning"
          >
            Algunos campos están vacios
          </v-alert>
          <v-alert
            :value="successAlert"
            type="success"
          >
            ¡Registrado!
          </v-alert>
          <div class="flex-grow-1"></div>
          <v-btn color="pink lighten-3" class="mb-3 mr-3" text @click="register">Registrar
          </v-btn>
          <v-btn color="pink lighten-3" class="mb-3 mr-3" text @click= "dialog = false,clearFields()">Salir
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
      warningAlert: false,
      successAlert: false,
      emailRules: [
        v => !!v || 'Correo es necesario',
        v => /.+@.+\..+/.test(v) || 'Correo debe ser valido'
      ],
      phoneRules: [
        v => !!v || 'Numero Celular/Telefono es necesario',
        v => /^\d+$/.test(v) || 'Numero debe ser valido'
      ],
      codeRules: [
        v => !!v || 'Codigo es necesario',
        v => /^\d+$/.test(v) || 'Codigo debe ser valido'
      ],
      passwordRules: [
        v => !!v || 'Contraseña es necesario',
        v => v.length >= 5 || 'Contraseña debe ser mas de 5 caracteres'

      ],
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
    sendMailNotification () {
      const htmlBody = `
        <p>¡Hola ${this.user.firstName}!</p>
        <p>Tu nueva cuenta ha sido creada.</p>
        <h3>¡Ingresa ahora!</h3>
        <p>Entra al siguiente enlace http://localhost:8080/login e inicia sesión. </p>
      `
      let newMail = {
        from: '<UPBgestiondecalidad@gmail.com>',
        to: this.user.email,
        subject: 'UPB Gestion de Calidad: Nuevo usuario',
        text: '',
        html: htmlBody
      }

      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.post(backendURL + '/api/mail/send', newMail, config)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendNotification () {
      let newNotification = {
        email: this.user.email,
        type: 'Success',
        message: 'Bienvenido a tu nueva cuenta, ' + this.user.firstName + '!'
      }
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      axios.post(backendURL + '/api/notifications/add', newNotification, config)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

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
    },

    register () {
      if (this.$refs.form.validate()) {
        this.registerUserAPI()
        this.sendMailNotification()
        this.sendNotification()
        this.clearFields()
        this.successAlert = true
        setTimeout(() => {
          this.successAlert = false
        }, 10000)
      } else {
        this.warningAlert = true
        setTimeout(() => {
          this.warningAlert = false
        }, 10000)
      }
    },

    clearFields () {
      this.user.code = ''
      this.user.role = ''
      this.user.firstName = ''
      this.user.paternalLastName = ''
      this.user.maternalLastName = ''
      this.user.email = ''
      this.user.password = ''
      this.user.city = ''
      this.user.phone = ''
      this.user.notes = ''
      this.$refs.form.resetValidation()
    }
  }
}
</script>
