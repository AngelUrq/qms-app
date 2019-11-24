<template>
  <div>
    <section>
      <v-container fill-height>
        <v-layout justify-center align-center>
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
                    label="Usuario"
                    id="login"
                    type="text"
                    color="amber accent-4"
                    v-model="User.emailOrCode"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Contraseña"
                    id="password"
                    type="password"
                    color="amber accent-4"
                    v-model="User.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn class="mb-3" dark color="indigo darken-1" @click="loginUser">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <div class="fullscreen-bg" v-if="production">
      <video id="mi-video" loop autoplay muted class="fullscreen">
        <source src="../assets/timelapse.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { backendURL, production } from '@/data.js'

export default {
  data () {
    return {
      User: {
        emailOrCode: '',
        password: ''
      },
      alert: {
        message: '',
        error: false
      },
      production: production
    }
  },
  methods: {
    loginUser () {
      let requirements = {
        email: this.User.emailOrCode,
        code: this.User.emailOrCode,
        password: this.User.password
      }

      axios.post(backendURL + '/api/users/signin', requirements)
        .then(response => {
          let authToken = response.data.token
          if (response.status === 200) {
            localStorage.setItem('token', authToken)
            this.$router.push('/dashboard')
            this.$store.commit('saveToken', authToken)
          }
        })
        .catch(error => {
          console.log(error.response.data)
          this.alert.error = true
          this.alert.message = error.response.data.message
        })
    }
  }
}
</script>

<style scoped>

.fullscreen {
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  height: 100vh;
  object-fit: fill;
  transition: initial;
  width: 100%;
}

section {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 10;
}

</style>
