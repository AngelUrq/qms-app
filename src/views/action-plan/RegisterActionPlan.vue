<template>
  <v-card>
    <v-card-title class="headline pt-5">Crear Plan de acción</v-card-title>
    <v-form>
      <v-text-field class="px-10" required v-model="name" label="Nombre del plan de acción"></v-text-field>
      <v-text-field class="px-10" required v-model="description" label="Descripción"></v-text-field>
      <v-container width="40%" class="d-flex">
        <v-combobox
        required
          color="red darken-1"
          item-color="blue"
          v-model="actionPlanFormatID"
          :items="reportFormats"
          label="Formato de informe"
          :autocomplete="false"
          outlined
          dense
        ></v-combobox>
        <v-combobox
        required
          color="red darken-1"
          item-color="blue"
          v-model="actualFindingType"
          :items="findingTypes"
          label="Tipo de hallazgo"
          :autocomplete="false"
          outlined
          dense
        ></v-combobox>
      </v-container>
    </v-form>
    <v-card-actions class="pb-5">
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text v-on:click="saveActionPlan()">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data'

export default {
  data () {
    return {
      name: '',
      description: '',
      reportFormats: [],
      actionPlanFormatID: '',
      findingTypes: ['No conformidad', 'Observación', 'Recomendación'],
      actualFindingType: ''
    }
  },
  methods: {
    createNewFormat () {
      this.$emit('saveActionPlanFormat', this.name)
    },
    getFormats () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/action-plan-formats', config)
        .then(response => {
          let formats = response.data

          for (let format of formats) {
            let reportFormat = {}
            reportFormat.text = format.name
            reportFormat.name = format.name
            reportFormat.subtitles = format.subtitles
            reportFormat.value = format._id

            this.reportFormats.push(reportFormat)
          }
        })
    },
    saveActionPlan () {
      if (this.name !== '' & this.actionPlanFormatID.value !== undefined && this.actualFindingType !== undefined) {
        const newActionPlan = {
          name: this.name,
          description: this.description,
          creationDate: new Date(),
          formatID: this.actionPlanFormatID.value,
          findingType: this.actualFindingType,
          structure: []
        }
        const headers = {
          'x-access-token': this.$store.state.token
        }
        axios
          .get(
            backendURL +
            '/api/action-plan-formats/' +
            this.actionPlanFormatID.value,
            {
              headers: headers
            }
          )
          .then(response => {
            const formatStructure = response.data
            if (formatStructure.structure.rows === undefined) {
              formatStructure.structure = {
                rows: [[]]
              }
            }
            newActionPlan.structure = formatStructure.structure
            axios.post(backendURL + '/api/action-plans', newActionPlan, {
              headers: headers
            })
            this.updateList()
          })
      } else {
        alert('falta rellenar campos requeridos')
      }
    },
    updateList () {
      this.$emit('updateList')
    }
  },
  mounted () {
    this.getFormats()
  }
}
</script>
