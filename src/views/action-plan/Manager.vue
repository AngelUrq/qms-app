<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="blue"
          title="Gestor de planes de acción"
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
            :items="actionPlans"
            item-key="_id"
            :search="search"
            hide-default-footer
          >
            <template v-slot:item.toForm="{ item }">
              <v-btn
                x-small
                text
                icon
                class="mr-1"
                :to="'/action-plan-form?id=' + item._id"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.export="{ item }">
              <v-btn
                x-small
                text
                icon
                class="mr-1"
                @click="exportToWord(item)"
              >
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.update="{ item }">
              <v-btn
                @click="showEditActionPlan(item)"
                x-small
                text
                icon
                class="mr-1"
              >
                <v-icon>mdi-border-color</v-icon>
              </v-btn>
              <EditActionPlan v-model="showEditActionPlanForm"/>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                class="mr-1"
              >
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
import { EventBus } from '../../main'

import axios from 'axios'
import { backendURL } from '@/data'
import { WordParser } from '@/utils/wordParser'

import EditActionPlan from './EditActionPlanForm'

export default {
  components: {
    EditActionPlan
  },
  data: function () {
    return {
      search: '',
      showEditActionPlanForm: false,
      headers: [
        {
          sortable: true,
          text: 'Nombre del plan de acción',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Descripción',
          value: 'description'
        },
        {
          sortable: true,
          text: 'Fecha de creación',
          value: 'creationDate'
        },
        {
          text: 'Formulario',
          value: 'toForm'
        },
        {
          text: 'Exportar',
          value: 'export'
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
      actionPlans: []
    }
  },
  mounted: function () {
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios.get(backendURL + '/api/action-plans', config).then(response => {
      this.actionPlans = response.data
    })
  },
  methods: {
    exportToWord: function (actionPlan) {
      let wordParser = new WordParser(actionPlan)
      wordParser.parse()
    },
    showEditActionPlan (actionPlan) {
      this.showEditActionPlanForm = true
      EventBus.$emit('redoActionPlan', actionPlan)
    }
  }
}
</script>
