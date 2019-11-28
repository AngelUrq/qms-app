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
              <ReponsibleTable />
            </div>

            <div v-if="column.fieldType === 'corrections'">
              <CorrectionTable />
            </div>

            <div v-if="column.fieldType === 'activities'">
              <ActivitiesTable />
            </div>
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import ReponsibleTable from './ResponsibleTable'
import CorrectionTable from './CorrectionsTable'
import ActivitiesTable from './ActivitiesTable'

export default {
  components: {
    ReponsibleTable,
    CorrectionTable,
    ActivitiesTable
  },
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
      ]
    }
  },
  methods: {
    getWidthColumns (numberColumns) {
      return 12 / numberColumns
    }
  }
}
</script>
