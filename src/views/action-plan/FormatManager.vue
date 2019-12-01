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
              show-expand
            >
              <template v-slot:item.create="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  to="/action-plan-format-editor"
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
                <v-btn x-small text icon color="blue-grey lighten-1" class="mr-1">
                  <v-icon>mdi-delete</v-icon>
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
        })
    },
    saveActionPlanFormat (nameformat) {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      this.actionPlan.name = nameformat
      this.actionPlan.creationDate = new Date()
      this.actionPlan.lastModificationDate = new Date()

      axios.post(backendURL + '/api/action-plan-formats', this.actionPlan, config).then(response => {
        console.log(response.data)
      })
      console.log('se guardo co nombre ' + nameformat)
    },
    showEditActionPlanFormat (actionPlanFormat) {
      this.showEditActionPlanFormatForm = true
      EventBus.$emit('editActionPlanFormat', actionPlanFormat)
  }
}
</script>
