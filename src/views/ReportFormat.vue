<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="indigo darken-3"
          title="Versiones de formato para informe de auditor"
          buttonActivated="true"
          buttonColor="lime darken-4"
        >
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :expanded="expanded"
            item-key="name"
            show-expand
            @click:row="clicked"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <v-spacer></v-spacer>
              <td :colspan="headers.length - 2">
                <div>
                  <draggable>
                    <transition-group>
                      <v-card class="pl-2" v-for="(element, i) in item.reportFields" :key="i">
                        {{ element }}
                        <v-btn
                          x-small
                          color="red darken-3"
                          class="ma-2 white--text"
                          fab
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>

                      </v-card>
                    </transition-group>
                  </draggable>
                </div>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data: () => ({
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
      }
    ],
    items: [
      {
        name: 'Auditoria 2019',
        version: 'v.0.1',
        creationDate: '15/10/2019',
        lastModificationDate: '17/10/2019',
        reportFields: {
          title: 'Reporte 1',
          subtitles: ['Planes de accion', 'Responsables']
        }
      },
      {
        name: 'Auditoria 2018',
        version: 'v.0.1',
        creationDate: '15/10/2019',
        lastModificationDate: '17/10/2019',
        reportFields: {
          title: 'Reporte 2',
          subtitles: ['Planes de accion', 'Responsables']
        }
      }
    ]
  }),
  methods: {
    clicked (value) {
      this.expanded.push(value)
    }
  }
}
</script>

<style scoped>
</style>
