<template>
  <v-card>
    <v-card-title>
      <span class="headline">Registro de formato de informe</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
          label="Nombre"
          color="teal darken-2"
          v-model="reportFormat.name"
          prepend-icon="mdi-clipboard-text"
          required
        ></v-text-field>
        <v-text-field label="Versión" color="teal darken-2" v-model="reportFormat.version" required></v-text-field>
        <v-text-field label="Título" color="teal darken-2" v-model="reportFormat.title" required></v-text-field>
        <v-row class="pa-3" no-gutters>
          <h3>Subtítulos:</h3>
          <v-text-field solo v-model="newSubtitle" class="ml-3 mr-3"></v-text-field>
          <v-btn fab small dark color="red lighten-2" @click="addSubtitle()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>

        <v-row class="ml-3" v-for="(subtitle, i) in reportFormat.subtitles" :key="i">
          <v-spacer></v-spacer>
          <v-text-field solo class="mr-3" :value="subtitle"></v-text-field>
          <v-btn
            class="mr-5"
            large
            text
            icon
            color="blue-grey lighten-1"
            @click="deleteSubtitle(i)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
           <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-row class="pa-3" justify="end" no-gutters>
        <v-btn color="teal darken-2" @click="register()" text>Registrar</v-btn>
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
      if (this.isFormCompleted()) {
        var config = {
          headers: {
            'x-access-token': this.$store.state.token
          }
        }
        var newReportFormat = {
          name: this.reportFormat.name,
          version: this.reportFormat.version,
          creationDate: new Date(Date.now()),
          lastModificationDate: new Date(Date.now()),
          title: this.reportFormat.title,
          subtitles: this.reportFormat.subtitles
        }
        axios
          .post(backendURL + '/api/report-format', newReportFormat, config)
          .then(response => {
            this.clearFields()
          })
          .catch(e => {
            console.log('An exception has occurred: ' + e)
          })

        this.$emit('update-report-format-list')
      } else {
        alert('Por favor asegurese de completar correctamente los campos.')
      }
    },
    addSubtitle () {
      if (this.newSubtitle !== '') {
        this.reportFormat.subtitles.push(this.newSubtitle)
        this.newSubtitle = ''
      } else {
        alert('Debe ingresar datos para añadir un subtítulo')
      }
    },
    deleteSubtitle (index) {
      this.reportFormat.subtitles.splice(index, 1)
    },
    isFormCompleted () {
      return (
        this.reportFormat.name !== '' &&
        this.reportFormat.version !== '' &&
        this.reportFormat.title !== ''
      )
    },
    clearFields () {
      this.reportFormat.name = ''
      this.reportFormat.version = ''
      this.reportFormat.title = ''
      this.reportFormat.subtitles = []
      this.newSubtitle = ''
    }
  }
}
</script>
