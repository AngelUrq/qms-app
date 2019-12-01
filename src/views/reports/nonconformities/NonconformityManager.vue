<template>
  <div>
    <v-dialog class="pa-5" v-model="dialog" max-width="50vw">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>

        <v-card-text>¿Estás seguro de que quieres eliminar esta no conformidad?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>

          <v-btn color="red darken-1" text @click="deleteNonconformity()">Sí</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reportDialog" max-width="50vw">
      <v-card>
        <v-card-title class="headline">Crear informe</v-card-title>
        <v-container>
          <v-text-field
            label="Nombre"
            v-model="reportName"
            prepend-icon="mdi-clipboard-text"
            color="red darken-1"
            required
          ></v-text-field>
          <v-combobox
            color="red darken-1"
            item-color="blue"
            v-model="reportFormatSelected"
            :items="reportFormats"
            label="Formato de informe"
            :autocomplete="false"
            outlined
            dense
          ></v-combobox>
          <v-combobox
            v-if="reportFormatSelected.subtitles.length > 0"
            v-model="subtitle"
            color="red darken-1"
            item-color="blue"
            :items="reportFormatSelected.subtitles"
            label="Formato de informe"
            :autocomplete="false"
            outlined
            dense
          ></v-combobox>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="createReport">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container fill-height fluid grid-list-xl>
      <v-row justify="center">
        <v-col cols="12">
          <material-card
            color="red darken-2"
            title="No conformidades"
            buttonColor="red lighten-1"
            buttonActivated
            nonconformityEditorActivated
          >
            <v-card-title class="mb-5">
              <v-text-field
                class="pa-4"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
              <v-btn color="red lighten-2" v-if="counter > 1" @click="showReportDialog">Crear informe</v-btn>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="items"
              :page.sync="page"
              :search="search"
              :items-per-page="10"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
              ref="table"
            >
              <template v-slot:item.select="{ item }">
                <v-checkbox :label="String(item.count)" v-model="item.selected" @change="setCounter(item)"></v-checkbox>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="showDelete(item)"
                >
                  <v-icon class="d-flex justify-end">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data'

export default {
  data: function () {
    return {
      dialog: false,
      reportDialog: false,
      reportFormatSelected: { text: '', subtitles: [] },
      reportFormats: [],
      reportName: '',
      subtitle: '',
      counter: 1,
      page: 1,
      pageCount: 0,
      editorIsVisible: false,
      nonconformity: {},
      search: '',
      headers: [
        {
          sortable: false,
          text: 'Selección',
          value: 'select'
        },
        {
          sortable: true,
          text: 'Texto',
          value: 'text'
        },
        {
          sortable: true,
          text: 'Tipo',
          value: 'type'
        },
        {
          sortable: false,
          text: 'Eliminar',
          value: 'delete'
        }
      ],
      items: []
    }
  },
  mounted: function () {
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios.get(backendURL + '/api/nonconformities', config).then(response => {
      for (let item of response.data) {
        item.count = 0
        this.items.push(item)
      }
    })
  },
  methods: {
    showDelete: function (item) {
      this.dialog = true
      this.nonconformity = item
    },
    deleteNonconformity: function () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .delete(
          backendURL + '/api/nonconformities/' + this.nonconformity._id,
          config
        )
        .then(() => {
          axios
            .get(backendURL + '/api/nonconformities', config)
            .then(response => {
              this.counter = 1
              this.items = []
              for (let item of response.data) {
                item.count = 0
                this.items.push(item)
              }
            })
        })

      this.dialog = false
    },
    setCounter: function (item) {
      if (item.selected) {
        item.count = this.counter++
      } else {
        for (let anItem of this.items) {
          if (anItem.count > item.count) {
            anItem.count = anItem.count - 1
          }
        }

        item.count = 0
        this.counter--
      }
    },
    showReportDialog: function () {
      this.reportDialog = true

      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.get(backendURL + '/api/report-format', config).then(response => {
        let formats = response.data

        for (let format of formats) {
          let reportFormat = {}
          reportFormat.text = format.name
          reportFormat.name = format.name
          reportFormat.subtitles = format.subtitles
          reportFormat.value = format._id

          this.reportFormats.push(reportFormat)
        }
      })
    },
    createReport: function () {
      this.dialog = false

      let orderedItems = this.items.filter(item => item.count !== 0)
      orderedItems.sort(function (a, b) { return a.count - b.count })

      let data =
            '<h2 style="text-align:center;"><strong>' +
            this.reportFormatSelected.name +
            '</strong></h2>'

      for (let subtitle of this.reportFormatSelected.subtitles) {
        data += '<h3><strong>' + subtitle + '</strong></h3><p>&nbsp;</p>'
        if (this.subtitle === subtitle) {
          for (let item of orderedItems) {
            data += '<p><strong>' + item.count + '. ' + item.type + ': ' + '</strong>' + item.text + '</p><p>&nbsp;</p>'
          }
        }
      }

      let report = {
        'filename': this.reportName,
        'data': data,
        'creationDate': new Date(),
        'lastModificationDate': new Date()
      }

      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .post(backendURL + '/api/reports', report, config)
        .then(response => {
          this.reportDialog = false
        })
        .catch(error => {
          console.log(error)
        })

      this.reportFormatSelected = { text: '', subtitles: [] }
      this.reportFormats = []
      this.reportName = ''
      this.subtitle = ''
    }
  }
}
</script>

<style scoped>
.v-btn {
  color: white;
}
</style>
