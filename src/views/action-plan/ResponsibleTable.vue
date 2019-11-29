<template>
  <v-container>
    <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
      <h4 class="text-center pb-5">RESPONSABLE DE SEGUIMIENTO</h4>
    </v-card>
    <v-row>
      <v-col v-for="(header, i) in responsibleHeaders" :key="i">
        <h4>{{ header.name }}</h4>
      </v-col>
    </v-row>
    <v-row v-for="(res, r) in responsible" :key="r">
      <v-col>
        <ResponsibleTextbox />
      </v-col>
      <v-col>
        <v-text-field
          color="blue darken-3"
          label="Puesto"
          v-model="res.position"
          outlined
          single-line
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field color="blue darken-3" v-model="res.signature" disabled single-line></v-text-field>
      </v-col>
      <v-btn
        v-if="!verifyLastRow(r, responsible.length)"
        class="mt-4 mr-2"
        fab
        small
        dark
        color="light-blue darken-2"
        @click="removeResponsible(r)"
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
        @click="addResponsible"
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
      responsibleHeaders: [
        {
          name: 'Nombre'
        },
        {
          name: 'Puesto'
        },
        {
          name: 'Firma'
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
      verifyLastRow: verifyLastRow
    }
  },
  methods: {
    addResponsible () {
      let responsible = {
        name: '',
        position: '',
        signature: ''
      }

      this.responsible.push(responsible)
    },
    removeResponsible (index) {
      this.responsible.splice(index, 1)
    }
  }
}
</script>
