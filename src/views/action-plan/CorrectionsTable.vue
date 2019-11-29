<template>
  <v-container>
    <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
      <h4 class="text-center pb-5">CORRECCIÓN INMEDIATA</h4>
    </v-card>
    <v-row>
      <v-col v-for="(header, i) in correctionHeaders" :key="i">
        <h4>{{ header.name }}</h4>
      </v-col>
    </v-row>
    <v-row v-for="(correction, index) in corrections" :key="index">
      <v-col>
        <v-textarea auto-grow rows="1" color="blue darken-3" class="mt-3" label="Actividad" outlined single-line></v-textarea>
      </v-col>
      <v-col>
        <ResponsibleTextbox multiple/>
      </v-col>
      <v-col>
        <v-textarea auto-grow rows="1" color="blue darken-3" class="mt-3" label="VoBo responsable" outlined single-line></v-textarea>
      </v-col>

      <v-col>
        <v-menu
          close-on-content-click
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="correction.proposedDate"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="correction.proposedDate"
            color="light-blue darken-4"
            locale="es-419"
            min="2017/01"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu
          close-on-content-click
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="correction.realDate"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="correction.realDate"
            color="light-blue darken-4"
            locale="es-419"
            min="2017/01"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-btn
        v-if="!verifyLastRow(index, corrections.length)"
        class="mt-4 mr-2"
        fab
        small
        dark
        color="light-blue darken-2"
        @click="removeCorrection(index)"
      >
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mt-4 mr-2"
        fab
        small
        dark
        color="light-blue darken-2"
        @click="addCorrection"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ResponsibleTextbox from './ResponsibleTextbox'
import verifyLastRow from '@/utils/rows.js'

export default {
  components: {
    ResponsibleTextbox
  },
  data () {
    return {
      correctionHeaders: [
        {
          name: 'Actividad'
        },
        {
          name: 'Responsable'
        },
        {
          name: 'VoBo responsable'
        },
        {
          name: 'Fecha propuesta'
        },
        {
          name: 'Fecha real'
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
      verifyLastRow: verifyLastRow
    }
  },
  methods: {
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
    removeCorrection (index) {
      this.corrections.splice(index, 1)
    }
  }
}
</script>
