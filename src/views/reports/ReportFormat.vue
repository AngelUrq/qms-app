<template>
  <v-container fill-height fluid grid-list-xl>
    <EditReportFormat
      :showEditReportFormat="showEditReportFormat"
      @update-show-edit-report-format="setShowEditReportFormat"
    />

    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="teal darken-2"
          title="Versiones de formato para informe de auditoría"
          buttonActivated
          buttonColor="teal lighten-1"
          reportFormatActionsActivated
          @update-report-format-list="listReportFormats"
        >
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="mdi-magnify"
              label="Buscar"
              v-model="search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            item-key="_id"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            show-expand
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td class="pa-5" :colspan="headers.length">
                <div>
                  <h4>Titulo:</h4>
                  <v-text-field solo v-model="item.title"></v-text-field>

                  <v-row no-gutters>
                    <h4 class="mb- mr-3">Subtítulos:</h4>
                    <v-btn
                      color="red lighten-2"
                      class="mb-5"
                      fab
                      x-small
                      dark
                      @click.stop="dialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-dialog v-model="dialog" max-width="40%">
                      <v-card>
                        <v-card-title>Añadir subtítulo</v-card-title>
                        <v-card-text>
                          <v-text-field
                            color="teal darken-2"
                            label="Subtítulo"
                            v-model="newSubtitle"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="teal darken-2"
                            text
                            @click="addSubtitle(item.subtitles)"
                          >AGREGAR</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>

                  <draggable
                    v-model="item.subtitles"
                    v-bind="dragOptions"
                    @start="drag = true"
                    @end="drag = false"
                  >
                    <transition-group>
                      <v-card class="pb-3" v-for="(subtitle, j) in item.subtitles" :key="j">
                        <v-row no-gutters>
                          <v-col :cols="2">
                            <v-icon class="pt-4 pl-3">mdi-drag</v-icon>
                          </v-col>
                          <v-col :cols="8">
                            <v-text-field
                              class="text-field"
                              v-model="item.subtitles[j]"
                              color="teal lighten-3"
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" class="d-flex flex-row-reverse">
                            <v-btn
                              class="mt-4 mr-3"
                              x-small
                              text
                              icon
                              color="blue-grey lighten"
                              @click="deleteSubtitle(item._id, j)"
                            >
                              <v-icon :class="'d-flex justify-end'">mdi-delete</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </transition-group>
                  </draggable>

                  <v-row no-gutters justify="end">
                    <v-btn
                      class="mt-4 white--text"
                      color="teal lighten-3"
                      text
                      @click="updateReportFormat(item)"
                    >Guardar</v-btn>
                  </v-row>
                </div>
              </td>
            </template>
            <template v-slot:item.create="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                class="mr-1"
                @click="createReport(item)"
              >
                <v-icon>mdi-clipboard-text-outline</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.update="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                @click="openEditReportFormat(item)"
                class="mr-1"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                @click="deleteReportFormat(item)"
                class="mr-1"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination color="teal darken-2" v-model="page" :length="pageCount"></v-pagination>
          </div>
          <draggable tag="ul"></draggable>
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
import { EventBus } from '../../main'

export default {
  components: {
    draggable,
    EditReportFormat
  },
  data: () => ({
    drag: false,
    fab: false,
    search: '',
    dialog: false,
    newSubtitle: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    saveButtonActivated: false,
    showEditReportFormat: false,
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
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
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
      axios
        .get(backendURL + '/api/report-format', config)
        .then(response => {
          this.items = response.data
        })
        .catch(e => {
          console.log('An exception has occurred: ' + e)
        })
    },
    updateReportFormat (reportFormat) {
      var config = {
        headers: {
          'x-access-token': this.$store.state.token
        }
      }
      axios
        .put(
          backendURL + '/api/report-format/' + reportFormat._id,
          reportFormat,
          config
        )
        .then(response => {
          console.log('Report updated successfully')
        })
        .catch(e => {
          console.log('An exception has ocurred: ' + e.message)
        })
    },
    deleteReportFormat (item) {
      var ans = confirm(
        '¿Esta seguro que desea eliminar el formato de informe?'
      )

      if (ans) {
        var config = {
          headers: {
            'x-access-token': this.$store.state.token
          }
        }
        axios
          .delete(backendURL + '/api/report-format/' + item._id, config)
          .then(response => {
            console.log('Item deleted successfully')
            this.listReportFormats()
          })
          .catch(e => {
            console.log('An exception has occurred: ' + e)
          })
      }
    },
    createReport: function (item) {
      var structure = {}
      structure.title = item.title
      structure.subtitles = item.subtitles
      this.$router.push({
        name: 'Editor de informes',
        params: { structure: structure, create: true }
      })
    },
    deleteSubtitle (idReportFormat, indexSubtitle) {
      var index = this.items
        .map(function (item) {
          return item._id
        })
        .indexOf(idReportFormat)
      this.items[index].subtitles.splice(indexSubtitle, 1)
    },
    disableSaveButton () {
      this.saveButtonActivated = false
    },
    addSubtitle (subtitles) {
      subtitles.push(this.newSubtitle)
      this.dialog = false
      this.newSubtitle = ''
    },
    openEditReportFormat (item) {
      this.showEditReportFormat = true
      EventBus.$emit('edit-report-info', item)
    },
    setShowEditReportFormat () {
      this.showEditReportFormat = false
    },
    sort () {
      this.list = this.list.sort((a, b) => a.order - b.order)
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
