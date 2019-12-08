<template>
  <div>
    <v-container fill-height fluid grid-list-xl>
      <v-row justify="center">
        <v-col cols="12">
          <material-card
            color="orange darken-1"
            title="Gestor de formatos para planes de acción"
            buttonActivated
            buttonColor="orange lighten-2"
            formatManagerActived
            @saveActionPlanFormat="saveActionPlanFormat"

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
              :items="actionPlanFormats"
              item-key="_id"
              :search="search"
              hide-default-footer
            >
              <template v-slot:item.create="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  :to="'/action-plan-format-editor?id=' + item._id"
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
                  @click="showEditActionPlanFormat(item)"
                  class="mr-1"
                >
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
                <EditActionPlanFormat v-model="showEditActionPlanFormatForm"/>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="showDeleteDialog(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showDelete" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Eliminar este plan de acción?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink lighten-3" text @click="deleteActionPlanFormat()">Eliminar</v-btn>
          <v-btn color="pink lighten-3" text @click="showDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from '../../main'

import axios from 'axios'

import { backendURL } from '@/data'

import EditActionPlanFormat from './EditActionPlanFormatForm'

export default {
  components: {
    EditActionPlanFormat
  },
  data: function () {
    return {
      search: '',
      showEditActionPlanFormatForm: false,
      showDelete: false,
      selectedItem: {},
      headers: [
        {
          sortable: false,
          text: 'Nombre del plan de acción',
          value: 'name'
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
          text: 'Crear',
          value: 'create'
        },
        {
          text: 'Editar',
          value: 'update'
        },
        {
          text: 'Borrar',
          value: 'delete'
        }
      ],
      actionPlanFormats: [],
      actionPlan: {
        name: 'default',
        creationDate: null,
        lastModificationDate: null,
        structure: []
      }
    }
  },
  mounted: function () {
    this.getActionPlanFormats()
  },
  methods: {
    getActionPlanFormats () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/action-plan-formats', config)
        .then(response => {
          this.actionPlanFormats = response.data
          for (let i = 0; i < this.actionPlanFormats.length; i++) {
            this.actionPlanFormats[i].creationDate = this.changeDateFormat(this.actionPlanFormats[i].creationDate)
            this.actionPlanFormats[i].lastModificationDate = this.changeDateFormat(this.actionPlanFormats[i].lastModificationDate)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveActionPlanFormat (nameformat) {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      this.actionPlan.name = nameformat
      this.actionPlan.creationDate = new Date()
      this.actionPlan.lastModificationDate = new Date()

      axios.post(backendURL + '/api/action-plan-formats', this.actionPlan, config)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    showEditActionPlanFormat (actionPlanFormat) {
      this.showEditActionPlanFormatForm = true
      EventBus.$emit('editActionPlanFormat', actionPlanFormat)
    },
    deleteActionPlanFormat () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.delete(backendURL + '/api/action-plan-formats/' + this.selectedItem._id, config)
        .then(response => {
          console.log(response)
          this.showDelete = false
          this.getActionPlanFormats()
        })
        .catch(error => {
          console.log(error)
        })
    },
    showDeleteDialog (product) {
      this.showDelete = true
      this.selectedItem = product
    },
    changeDateFormat (date) {
      let dateFormat = require('dateformat')

      return dateFormat(date, 'yyyy/mm/dd, HH:MM:ss')
    }
  }
}
</script>
