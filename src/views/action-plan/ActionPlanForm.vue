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
    <v-card-actions class="mt-5 d-flex flex-row-reverse">
      <v-btn x-large color="light-blue darken-3" width="20%" class="white--text" @click="activateProgressCircular">
        {{ text }}
        <v-progress-circular v-if="activateLoading" indeterminate color="white"></v-progress-circular>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import ReponsibleTable from './ResponsibleTable'
import CorrectionTable from './CorrectionsTable'
import ActivitiesTable from './ActivitiesTable'
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  components: {
    ReponsibleTable,
    CorrectionTable,
    ActivitiesTable
  },
  data () {
    return {
      idActionPlan: '',
      version: 'V.1.2',
      activateLoading: false,
      text: 'GUARDAR',
      actionPlanFormat: {},
      rows: [
        [
          {
            name: 'Fecha de observación',
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'N° de formulario',
            fieldType: 'horizontal',
            value: ''
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
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'Observación',
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'Recomendación',
            fieldType: 'horizontal',
            value: ''
          }
        ],
        [
          {
            name: 'Descripción de la observación',
            fieldType: 'horizontalTextArea',
            value: ''
          }
        ],
        [
          {
            name: 'Responsables',
            fieldType: 'reponsable',
            value: ''
          }
        ],
        [
          {
            name: 'Correcciones',
            fieldType: 'corrections',
            value: ''
          }
        ],
        [
          {
            name: 'Actividades',
            fieldType: 'activities',
            value: ''
          }
        ],
        [
          {
            name: 'Verificación de la eficacia',
            fieldType: 'horizontalTextArea',
            value: ''
          }
        ],
        [
          {
            name: 'Nombre',
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'Puesto',
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'Firma',
            fieldType: 'horizontal',
            value: ''
          },
          {
            name: 'Fecha',
            fieldType: 'horizontal',
            value: ''
          }
        ]
      ]
    }
  },
  mounted () {
    this.id = this.$route.params.idActionPlan
  },
  methods: {
    getWidthColumns (numberColumns) {
      return 12 / numberColumns
    },
    activateProgressCircular () {
      this.activateLoading = true
      this.text = ''
      setTimeout(this.disableProgressCircular, 1500)
    },
    disableProgressCircular () {
      this.text = 'GUARDAR'
      this.activateLoading = false
    },
    getActionPlanFormat () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/action-plan-formats', config)
        .then(response => {
          this.actionPlanFormat = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
