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
        </v-row>
      </header>
      <form>
        <v-row no-gutters v-for="(row, i) in structure.rows" :key="i">
          <v-col
            v-for="(column, j) in row"
            :key="j"
            cols="12"
            sm="12"
            :md="getWidthColumns(row.length)"
          >
            <v-textarea
              auto-grow
              rows="2"
              color="blue darken-3"
              class="mr-3"
              :label="column.name"
              outlined
              v-if="column.fieldType === 'horizontal' || column.fieldType === 'vertical'"
              v-model="column.value"
            ></v-textarea>

            <h4 v-if="column.fieldType === 'title'" class="text-center pb-5">{{ column.name }}</h4>

            <div v-if="column.fieldType === 'reponsable'">
              <ReponsibleTable v-bind:responsibleData="column.value"/>
            </div>

            <div v-if="column.fieldType === 'corrections'">
              <CorrectionTable v-bind:correctionsData="column.value"/>
            </div>

            <div v-if="column.fieldType === 'activities'">
              <ActivitiesTable v-bind:activitiesData="column.value"/>
            </div>
          </v-col>
        </v-row>
      </form>
    </v-card>
    <v-card-actions class="mt-5 d-flex flex-row-reverse">
      <v-btn
        x-large
        color="light-blue darken-3"
        width="20%"
        class="white--text"
        @click="activateProgressCircular"
      >
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
      activateLoading: false,
      text: 'GUARDAR',
      actionPlanFormat: {},
      structure: {},
      select: '',
      users: [],
      items: [],
      description: {
        rowIndex: -1,
        columnIndex: -1
      }
    }
  },
  mounted () {
    this.idActionPlan = this.$route.query.id
    this.getActionPlanFormat()
  },
  methods: {
    getWidthColumns (numberColumns) {
      return 12 / numberColumns
    },
    activateProgressCircular () {
      this.activateLoading = true
      this.text = ''
      this.saveActionPlan()
      setTimeout(this.disableProgressCircular, 1000)
    },
    disableProgressCircular () {
      this.text = 'GUARDAR'
      this.activateLoading = false
    },
    getActionPlanFormat () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/action-plans/' + this.idActionPlan, config)
        .then(response => {
          this.actionPlanFormat = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.structure = this.actionPlanFormat.structure
          this.setDescriptionFile()
        })
    },
    saveActionPlan () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      if (this.description.rowIndex > -1 && this.description.columnIndex > -1) {
        this.actionPlanFormat.description = this.actionPlanFormat.structure.rows[this.description.rowIndex][this.description.columnIndex].value
      }

      axios
        .put(backendURL + '/api/action-plans/' + this.idActionPlan, this.actionPlanFormat, config)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setDescriptionFile () {
      for (let i = 0; i < this.structure.rows.length; i++) {
        for (let j = 0; j < this.structure.rows[i].length; j++) {
          if (this.structure.rows[i][j].name === 'Descripción') {
            this.description.rowIndex = i
            this.description.columnIndex = j
            this.structure.rows[i][j].value = this.actionPlanFormat.description
            return
          }
        }
      }
    }
  }
}
</script>
