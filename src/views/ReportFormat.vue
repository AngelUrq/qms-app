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
            item-key="name"
            show-expand
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td class="pa-5 " :colspan="headers.length">
                <div>
                  <h4>Titulo:</h4>
                  <v-text-field solo v-model="item.title"></v-text-field>
                  <v-row no-gutters>
                    <h4 class="mb- mr-3">Subtítulos:</h4>
                    <v-speed-dial
                      v-model="fab"
                      direction="right"
                      :open-on-hover=true
                    >
                      <template v-slot:activator>
                        <v-btn
                          x-small
                          v-model="fab"
                          color="blue darken-2"
                          class="mb-3"
                          dark
                          fab
                        >
                          <v-icon v-if="fab">mdi-close</v-icon>
                          <v-icon v-else>mdi-pencil-circle</v-icon>
                        </v-btn>
                      </template>
                      <v-btn
                        fab
                        dark
                        x-small
                        color="green"
                        class="mb-3"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        x-small
                        color="deep-orange lighten-1"
                        class="mb-3"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-speed-dial>
                  </v-row>
                  <draggable>
                    <transition-group>
                      <v-card class="pa-3" v-for="(element, i) in item.subtitles" :key="i">
                        <v-row no-gutters>
                          <v-col :cols="8">
                            <v-icon>mdi-drag</v-icon>
                            {{ element }}
                          </v-col>
                          <v-col :cols="4" class="d-flex flex-row-reverse">
                            <v-btn
                              x-small
                              text
                              icon
                              color="blue-grey lighten-1"
                            >
                              <v-icon :class="'d-flex justify-end'">mdi-delete</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </transition-group>
                  </draggable>
                  <v-row no-gutters justify="end">
                    <v-btn class="mt-4" color="green lighten-1">Guardar</v-btn>
                  </v-row>
                </div>
              </td>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
                >
                  <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                x-small
                text
                icon
                color="blue-grey lighten-1"
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
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data: () => ({
    fab: false,
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
        text: 'Actions',
        value: 'action'
      }
    ],
    items: [
      {
        name: 'Auditoria 2019',
        version: 'v.0.1',
        creationDate: '15/10/2019',
        lastModificationDate: '17/10/2019',
        title: 'Reporte 1',
        subtitles: ['Planes de accion', 'Responsables']
      },
      {
        name: 'Auditoria 2018',
        version: 'v.0.1',
        creationDate: '15/10/2019',
        lastModificationDate: '17/10/2019',
        title: 'Reporte 2',
        subtitles: ['Planes de accion', 'Responsables']
      }
    ]
  })
}
</script>
