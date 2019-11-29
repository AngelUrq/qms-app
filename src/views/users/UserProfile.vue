<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="indigo darken-2" title="Perfil de usuario" text="Consulta tu información">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field label="UPB" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="Código" :value="user.code" readonly/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Correo electrónico" class="purple-input" :value="user.email" readonly/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Nombres" class="purple-input" :value="user.firstNames" readonly/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Apellidos" class="purple-input" :value="user.paternalLastName + ' ' + user.maternalLastName" readonly/>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Teléfono" class="purple-input" :value="user.phone" readonly/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Ciudad" class="purple-input" :value="user.city" readonly/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="País" class="purple-input" value="Bolivia" readonly/>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="indigo darken-2">Continua navegando</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <v-col cols="12" md="4">
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block elevation-6" size="130">
            <img src="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png" />
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">{{ user.role }}</h6>

            <h4 class="font-weight-light">{{ user.firstNames }}</h4>

            <p
              class="font-weight-light"
            >Si deseas cambiar la información de tu perfil contacta al administrador de esta aplicación</p>

          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data.js'

export default {
  data: function () {
    return {
      user: {}
    }
  },
  mounted: function () {
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios
      .get(backendURL + '/api/users/' + this.$store.state.token, config)
      .then(response => {
        this.user = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.v-btn{
  color:white;
}
</style>
