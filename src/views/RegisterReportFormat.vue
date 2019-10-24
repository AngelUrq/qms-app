<template>
  <v-card>
    <v-card-title>
      <span class="headline">Registro de formato de reporte</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nombre" v-model="reportFormat.name" prepend-icon="mdi-clipboard-text" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Versión" v-model="reportFormat.version" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Título" v-model="reportFormat.title" required></v-text-field>
          </v-col>
          <v-row class="pa-3" no-gutters>
            <h3>Subtítulos: </h3>
            <v-text-field solo v-model="newSubtitle" class="ml-3 mr-3"></v-text-field>
              <v-btn
                fab
                dark
                color="green"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </v-row>
        </v-row>
        <v-row class="ml-3" v-for="(subtitle, i) in reportFormat.subtitles" :key="i" >
          <v-text-field solo class="mr-3" :value="subtitle"></v-text-field>
          <v-btn
          class="mr-5"
            small
            text
            icon
            color="blue-grey lighten-1"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-row class="pa-3" justify="end" no-gutters>
        <v-btn color="blue darken-1" @click="register()" text>Registrar</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'
export default {
  data () {
    return {
      newSubtitle: '',
      reportFormat: {
        name: '',
        version: '',
        title: '',
        subtitles: []
      }
    }
  },
  methods: {
    register () {
      var config = {
        headers: {
          'x-access-token': this.$store.state.token
        }
      }
      var newReportFormat = {
        name: this.reportFormat.name,
        version: this.reportFormat.version,
        creationDate: new Date(),
        lastModificationDate: new Date(),
        title: this.reportFormat.title,
        subtitles: this.reportFormat.subtitles
      }

      axios.post(backendURL + '/api/report-format', config, newReportFormat)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log('An exception has occurred: ' + e)
        })
    }
  }
}
</script>
