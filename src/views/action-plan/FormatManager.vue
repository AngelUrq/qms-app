<template>
<div>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="lime darken-2"
          title="Gestor de formatos para planes de acción"
          buttonActivated
          buttonColor="lime darken-1"
                @click.stop="dialog = true"

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
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            show-expand
          >
            <template v-slot:item.create="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                class="mr-1"
                to="'/action-plan-format-editor?id=' + item._id"
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
                class="mr-1"
              >
                <v-icon>mdi-border-color</v-icon>
              </v-btn>
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
          <div class="text-center pt-2">
            <v-pagination color="teal darken-2" v-model="page" :length="pageCount"></v-pagination>
          </div>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title class="headline">Crear nuevo formato </v-card-title>

        <v-container>
    <v-row

      justify="space-between"
    >
      <v-col
        cols="12"
        md="4"
      >
        <v-form ref="form">
          <v-text-field
            v-model="model"
            :counter="max"
            :rules="rules"
            label="First name"
          ></v-text-field>
        </v-form>
      </v-col>

    </v-row>
  </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            v-on:click="createNewFormat()"

          >
            Guardar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data'

export default {
  data: function () {
    return {
      page: 1,
      pageCount: 0,
      search: '',
      dialog: false,
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
      actionPlanFormats: []
    }
  },
  mounted: function () {
    let config = { headers: { 'x-access-token': this.$store.state.token } }

    axios.get(backendURL + '/api/action-plan-formats', config).then(response => {
      this.actionPlanFormats = response.data
    })
  },
  methods: {
    createNewFormat () {
      this.dialog = false
    }
  }
}
</script>
