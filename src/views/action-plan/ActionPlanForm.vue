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
              <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
                <h4 class="text-center pb-5">RESPONSABLE DE SEGUIMIENTO</h4>
              </v-card>
              <v-row>
                <v-col>
                  <h4>Nombre</h4></v-col>
                <v-col><h4>Cargo</h4></v-col>
                <v-col><h4>Firma</h4></v-col>
              </v-row>
              <v-row v-for="(res, r) in responsible" :key="r">
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Puesto" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Firma" outlined single-line></v-text-field></v-col>
                <v-btn v-if="!verifyLastRow(r, responsible.length)" class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="removeResponsible(r)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <v-btn v-else class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="addResponsible">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </div>

            <div v-if="column.fieldType === 'corrections'">
              <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
              <h4 class="text-center pb-5">CORRECCIÓN INMEDIATA</h4>
              </v-card>
             <v-row>
                <v-col>
                  <h4>Nombre</h4></v-col>
                <v-col><h4>Cargo</h4></v-col>
                <v-col><h4>Firma</h4></v-col>
              </v-row>
              <v-row v-for="(correction, index) in corrections" :key="index">
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-btn v-if="!verifyLastRow(index, corrections.length)" class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="removeCorrection(index)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <v-btn v-else class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="addCorrection">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </div>
            <div v-if="column.fieldType === 'activities'">
              <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
              <h4 class="text-center pb-5">ACCIONES PARA ELIMINAR LA CAUSA RAÍZ</h4>
              </v-card>
             <v-row>
                <v-col>
                  <h4>Nombre</h4></v-col>
                <v-col><h4>Cargo</h4></v-col>
                <v-col><h4>Firma</h4></v-col>
              </v-row>
              <v-row v-for="(activity, index) in activities" :key="index">
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-col><v-text-field color="blue darken-3" label="Nombre" outlined single-line></v-text-field></v-col>
                <v-btn v-if="!verifyLastRow(index, activities.length)" class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="removeActivity(index)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <v-btn v-else class="mt-4 mr-2" fab small dark color="light-blue darken-2" @click="addActivity">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-row>
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
          value: 'proposedDate'
        },
        {
          sortable: false,
          text: 'Fecha propuesta',
          value: 'realDate'
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
          value: 'proposedDate'
        },
        {
          sortable: false,
          text: 'Fecha real',
          value: 'realDate'
        }
      ],
      responsible: [
        {
          id: 1,
          name: 'Adriana Orellana',
          position: 'Gerente',
          signature: 'Adri O'
        },
        {
          id: 2,
          name: 'Jhon',
          position: 'Angel',
          signature: 'Carnal'
        }
      ],
      corrections: [
        {
          name: '',
          position: '',
          signature: '',
          proposedDate: '',
          realDate: ''
        }
      ],
      activities: [
        {
          name: '',
          position: '',
          signature: '',
          proposedDate: '',
          realDate: ''
        }
      ]
    }
  },
  methods: {
    getWidthColumns (numberColumns) {
      return 12 / numberColumns
    },
    addActivity () {
      let activity = {
        name: '',
        position: '',
        signature: '',
        proposedDate: '',
        realDate: ''
      }

      this.activities.push(activity)
    },
    addResponsible () {
      let responsible = {
        name: '',
        position: '',
        signature: ''
      }

      this.responsible.push(responsible)
    },
    addCorrection () {
      let correction = {
        name: '',
        position: '',
        signature: '',
        proposedDate: '',
        realDate: ''
      }

      this.corrections.push(correction)
    },
    removeResponsible (index) {
      this.responsible.splice(index, 1)
    },
    removeCorrection (index) {
      this.corrections.splice(index, 1)
    },
    removeActivity (index) {
      this.activities.splice(index, 1)
    },
    verifyLastRow (rowIndex, rowsLength) {
      let isTheLast = rowIndex + 1 === rowsLength
      return isTheLast
    }
  }
}
</script>
