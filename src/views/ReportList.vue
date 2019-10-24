<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="green "
          title="Informes"
          buttonActivated
          buttonColor="light-green"
        >
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="reports"
            hide-default-footer
            class="elevation-1"
            ref="table"
          >
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data'

export default {
  data: function () {
    return {
      headers: [
        {
          sortable: false,
          text: 'Nombre del archivo',
          value: 'filename'
        },
        {
          sortable: false,
          text: 'Fecha de creación',
          value: 'creationDate'
        },
        {
          sortable: false,
          text: 'Última modificación',
          value: 'lastModificationDate'
        }
      ],
      reports: []
    }
  },
  mounted: function () {
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios.get(backendURL + '/api/reports', config).then(response => {
      this.reports = response.data
    })
  }
}
</script>

<style>
</style>
