<template>
  <v-row no-gutters>
    <v-dialog v-model="dialog" scrollable max-width="60%">
      <template v-slot:activator="{ on }">
        <v-btn x-small text icon color="blue-grey lighten-1" v-on="on" fab>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar datos de formato de reporte</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Nombre"
                  v-model="name"
                  prepend-icon="mdi-clipboard-text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Versión" v-model="version" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Fecha de creación del documento"
                  v-model="lastModificationDate"
                  value="14/06/2016"
                  readonly="true"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row class="pb-3 pr-3" justify="end" no-gutters>
            <v-btn color="blue darken-1" text>Actualizar</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  data () {
    return {
      dialog: false,
      name: '',
      version: '',
      lastModificationDate: ''
    }
  },
  methods: {
    updateReportFormat (reportFormat) {
      if (this.isFormCompleted()) {
        var config = {
          headers: {
            'x-access-token': this.$store.state.token
          }
        }
        var reportFormatUpdated = {
          name: this.name,
          version: this.version,
          createDate: reportFormat.creationDate,
          lastModificationDate: new Date(Date.now()).toLocaleString(),
          title: reportFormat.title,
          subtitles: reportFormat.subtitles
        }
        axios
          .put(
            backendURL + '/api/report-format/' + reportFormat._id,
            reportFormatUpdated,
            config
          )
          .then(response => {
            console.log('Report format update successfully')
          })
          .catch(e => {
            console.log('An exception has ocurred: ' + e)
          })
      }
    },
    isFormCompleted () {
      return this.name !== '' && this.version !== ''
    }
  }
}
</script>
