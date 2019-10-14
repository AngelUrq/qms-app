<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo darken-4">
            <v-toolbar-title>Inicio de sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                name="login"
                label="E-mail"
                id="login"
                type="text"
                v-model="User.email"
                color="amber accent-4"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Contraseña"
                id="password"
                type="password"
                v-model="User.password"
                color="amber accent-4"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn  @click.prevent="loginUser" class="mb-3" dark color="indigo darken-1" rounded>Ingresar</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
        v-model="alert.error"
          type="error"
          >
          {{ alert.message }}
        </v-alert>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from 'axios'
import { serverIP } from '@/data.js'

export default {

  data () {
    return {
      User: {
        email: '',
        password: ''
      },
      alert: {
        message: '',
        error: false
      }
    }
  },
  methods: {
    loginUser () {
      let requirements = {
        email: this.User.email,
        password: this.User.password
      }
      console.log(requirements)
      axios.post('http://' + serverIP + ':3000/signin', requirements)
        .then(response => {
          let authToken = response.data.token
          if (response.status === 200) {
            localStorage.setItem('token', authToken)
            this.$router.push('/dashboard')
          }
        })
        .catch(error => {
          console.log(error.response.data)
          this.alert.error = true
          this.alert.message = error.response.data
        })
    }
  }
}
</script>
