<template>
  <div>
    <v-snackbar v-model="snackbar" right="right" top="top" color="error" :timeout="10000">
      <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>¡No se pudo eliminar el informe!
      <v-btn icon @click="snackbar = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>

    <v-container fill-height fluid grid-list-xl>
      <v-row justify="center">
        <v-col cols="12">
          <material-card color="deep-orange darken-3" title="Informes">
            <v-card-title class="mb-5">
              <v-spacer></v-spacer>
              <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details v-model="search"></v-text-field>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="reports"
              :page.sync="page"
              :search="search"
              :items-per-page="10"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
              ref="table"
            >
              <template v-slot:item.edit="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="loadReport(item)"
                >
                  <v-icon>mdi-file-edit</v-icon>
                </v-btn>
              </template>

              <template v-slot:item.delete="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="deleteReport(item._id)"
                >
                  <v-icon class="d-flex justify-end">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination color="deep-orange lighten-1" v-model="page" :length="pageCount"></v-pagination>
            </div>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data'
import { changeDateFormat } from '@/utils/date'

export default {
  data: function () {
    return {
      snackbar: false,
      page: 1,
      pageCount: 0,
      search: '',
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
        },
        {
          text: 'Editar',
          value: 'edit'
        },
        {
          text: 'Borrar',
          value: 'delete'
        }
      ],
      reports: []
    }
  },
  mounted: function () {
    this.loadReports()
  },
  methods: {
    loadReports: function () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.get(backendURL + '/api/reports', config).then(response => {
        this.reports = []
        for (let item of response.data) {
          item.creationDate = changeDateFormat(item.creationDate)
          item.lastModificationDate = changeDateFormat(item.lastModificationDate)

          this.reports.push(item)
        }
      })
    },
    loadReport: function (report) {
      this.$router.push({
        name: 'Editor de informes',
        params: { report, load: true }
      })
    },
    deleteReport: function (id) {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.delete(backendURL + '/api/reports/' + id, config).then(response => {
        if (!response.data.deleted) {
          this.snackbar = true
        }
      })

      this.loadReports()
    }
  }
}
</script>
