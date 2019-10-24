<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card color="green " title="Informes" buttonActivated buttonColor="light-green">
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="reports"
            :page.sync="page"
            :items-per-page="10"
            hide-default-footer
            class="elevation-1"
            @page-count="pageCount = $event"
            ref="table"
          >
            <template v-slot:item.edit="{ report }">
              <v-btn x-small text icon color="blue-grey lighten-1" class="mr-1">
                <v-icon>mdi-file-edit</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.delete="{ report }">
              <v-btn x-small text icon color="blue-grey lighten-1" class="mr-1">
                <v-icon class="d-flex justify-end">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination color="light-green" v-model="page" :length="pageCount"></v-pagination>
          </div>
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
      page: 1,
      pageCount: 0,
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
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios.get(backendURL + '/api/reports', config).then(response => {
      this.reports = response.data
    })
  }
}
</script>

<style>
</style>
