<template>
  <v-container class="pa-12">
    <v-card class="pa-7">
      <header>
        <v-row class="mb-5">
          <v-col cols="4">
            <img src="@/assets/logoUPB.jpg" alt="Logo UPB" width="90" />
          </v-col>
          <v-col cols="4">
            <h3 class="text-center">FORMULARIO DE PLAN DE ACCIÓN</h3>
          </v-col>
          <v-col cols="4">
            <p class="text-right">{{ version }}</p>
          </v-col>
        </v-row>
      </header>
      <form>
        <v-row no-gutters v-for="(row, i) in rows" :key="i">
          <v-col
            v-for="(column, j) in row"
            :key="j"
            cols="12"
            sm="12"
            :md="getWidthColumns(row.length)"
          >
            <v-text-field
              v-if="column.fieldType === 'horizontal' || column.fieldType === 'vertical'"
              :label="column.name"
              class="mr-2"
              color="blue darken-3"
              outlined
            ></v-text-field>

            <v-textarea
              v-if="column.fieldType === 'horizontalTextArea' || column.fieldType === 'verticalTextArea'"
              :label="column.name"
              color="blue darken-3"
              class="mr-2"
              outlined
            ></v-textarea>

            <h4 v-if="column.fieldType === 'title'" class="text-center pb-5">{{ column.name }}</h4>

            <div v-if="column.fieldType === 'reponsable'">
                <v-row justify="center">
                  <v-col cols="12">
                    <material-card
                      color="light-blue darken-4"
                      title="Responsables del seguimiento"
                      buttonColor="light-blue darken-2"
                      buttonActivated
                    >
                      <v-data-table :headers="responsibleHeaders" :items="responsible" hide-default-footer></v-data-table>
                    </material-card>
                  </v-col>
                </v-row>
            </div>

            <div v-if="column.fieldType === 'corrections'">
                <v-row justify="center">
                  <v-col cols="12">
                    <material-card
                      color="light-blue darken-4"
                      title="Corrección inmediata"
                      buttonColor="light-blue darken-2"
                      buttonActivated
                    >
                      <v-data-table :headers="correctionHeaders" :items="corrections" hide-default-footer></v-data-table>
                    </material-card>
                  </v-col>
                </v-row>
            </div>
            <div v-if="column.fieldType === 'activities'">
              <v-container class="pa-0">
                <v-row justify="center">
                  <v-col cols="12">
                    <material-card
                      color="light-blue darken-4"
                      title="Acciones para eliminarla causa raíz"
                      buttonColor="light-blue darken-2"
                      buttonActivated
                    >
                      <v-data-table :headers="activityHeaders" :items="activities" hide-default-footer></v-data-table>
                    </material-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      version: 'V.1.2',
      rows: [
        [
          {
            name: 'Fecha de observación',
            fieldType: 'horizontal'
          },
          {
            name: 'N° de formulario',
            fieldType: 'horizontal'
          }
        ],
        [
          {
            name: 'Tipo de hallazgo',
            fieldType: 'title'
          }
        ],
        [
          {
            name: 'No conformidad',
            fieldType: 'horizontal'
          },
          {
            name: 'Observación',
            fieldType: 'horizontal'
          },
          {
            name: 'Recomendación',
            fieldType: 'horizontal'
          }
        ],
        [
          {
            name: 'Descripción de la observación',
            fieldType: 'horizontalTextArea'
          }
        ],
        [
          {
            name: 'Responsables',
            fieldType: 'reponsable'
          }
        ],
        [
          {
            name: 'Correcciones',
            fieldType: 'corrections'
          }
        ],
        [
          {
            name: 'Actividades',
            fieldType: 'activities'
          }
        ],
        [
          {
            name: 'Verificación de la eficacia',
            fieldType: 'horizontalTextArea'
          }
        ],
        [
          {
            name: 'Nombre',
            fieldType: 'horizontal'
          },
          {
            name: 'Puesto',
            fieldType: 'horizontal'
          },
          {
            name: 'Firma',
            fieldType: 'horizontal'
          },
          {
            name: 'Fecha',
            fieldType: 'horizontal'
          }
        ]
      ],
      responsibleHeaders: [
        {
          sortable: false,
          text: 'Nombre',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Puesto',
          value: 'position'
        },
        {
          sortable: false,
          text: 'Firma',
          value: 'signature'
        }
      ],
      correctionHeaders: [
        {
          sortable: false,
          text: 'Actividad',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Responsable',
          value: 'position'
        },
        {
          sortable: false,
          text: 'VoBo responsable',
          value: 'signature'
        },
        {
          sortable: false,
          text: 'Fecha propuesta',
          value: 'Fecha real'
        },
        {
          sortable: false,
          text: 'Fecha propuesta',
          value: 'Fecha real'
        }
      ],
      activityHeaders: [
        {
          sortable: false,
          text: 'Actividad',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Responsable',
          value: 'position'
        },
        {
          sortable: false,
          text: 'VoBo responsable',
          value: 'signature'
        },
        {
          sortable: false,
          text: 'Fecha propuesta',
          value: 'Fecha real'
        },
        {
          sortable: false,
          text: 'Fecha propuesta',
          value: 'Fecha real'
        }
      ],
      responsible: [],
      corrections: [],
      activities: []
    }
  },
  methods: {
    getWidthColumns (numberColumns) {
      return 12 / numberColumns
    }
  }
}
</script>
