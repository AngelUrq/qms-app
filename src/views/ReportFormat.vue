<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="indigo darken-3"
          title="Versiones de formato para informe de auditoría"
          buttonActivated
          buttonColor="blue darken-3"
          reportFormatActionsActivated
        >
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" item-key="_id" show-expand>
            <template v-slot:expanded-item="{ headers, item }">
              <td class="pa-4" :colspan="headers.length">
                <div>
                  <h4>Titulo:</h4>
                  <v-text-field solo v-model="item.title"></v-text-field>
                  <v-row no-gutters>
                    <h4 class="mb- mr-3">Subtítulos:</h4>
                    <AddSubtitleToReportFormat />
                  </v-row>
                  <draggable>
                    <transition-group>
                      <v-card class="pb-4" v-for="element in item.subtitles" :key="element">
                        <v-row no-gutters>
                          <v-col :cols="2">
                            <v-icon class="pt-3 pl-3">mdi-drag</v-icon>
                          </v-col>
                          <v-col :cols="8">
                            <v-text-field class="text-field" :value="element"></v-text-field>
                          </v-col>
                          <v-col :cols="2" class="d-flex flex-row-reverse">
                            <v-btn class="mt-3 mr-3" x-small text icon color="blue-grey lighten">
                              <v-icon :class="'d-flex justify-end'">mdi-delete</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </transition-group>
                  </draggable>
                  <v-row no-gutters justify="end">
                    <v-btn class="mt-4 white--text" color="light-blue darken-4" text>Guardar</v-btn>
                  </v-row>
                </div>
              </td>
            </template>
            <template v-slot:item.create="{ item }">
              <v-btn x-small text icon color="blue-grey lighten-1" class="mr-1" @click="createReport(item)">
                <v-icon>mdi-clipboard-text-outline</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.update="{ item }">
              <EditReportFormat />
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn x-small text icon color="blue-grey lighten-1" class="mr-1">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import { backendURL } from '@/data.js'
import EditReportFormat from './EditReportFormat'
import AddSubtitleToReportFormat from './AddSubtitleToReportFormat'

export default {
  components: {
    draggable,
    EditReportFormat,
    AddSubtitleToReportFormat
  },
  data: () => ({
    fab: false,
    dialago: false,
    headers: [
      {
        sortable: false,
        text: 'Nombre',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Version',
        value: 'version'
      },
      {
        sortable: false,
        text: 'Fecha de creacion',
        value: 'creationDate'
      },
      {
        sortable: false,
        text: 'Fecha de ultima modificacion',
        value: 'lastModificationDate'
      },
      {
        sortable: false,
        text: 'Crear',
        value: 'create'
      },
      {
        sortable: false,
        text: 'Actualizar',
        value: 'update'
      },
      {
        sortable: false,
        text: 'Eliminar',
        value: 'delete'
      }
    ],
    items: []
  }),
  mounted: function () {
    this.listReportFormats()
  },
  methods: {
    listReportFormats () {
      var config = {
        headers: {
          'x-access-token': this.$store.state.token
        }
      }

      axios.get(backendURL + '/api/report-format', config)
        .then(response => {
          this.items = response.data
          console.log(this.items)
        })
        .catch(e => {
          console.log(e)
        })
    },
    createReport: function (item) {
      var structure = {}
      structure.title = item.title
      structure.subtitles = item.subtitles
      this.$router.push({ name: 'Editor de informes', params: { structure: structure, create: true } })
    }
  }
}
</script>

<style scoped>
.text-field {
  height: 3em;
  font-size: 90%;
}
</style>
