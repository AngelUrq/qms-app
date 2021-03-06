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
    <v-row v-for="(res, r) in responsibleData" :key="r">
      <v-col>
        <v-col>
          <v-combobox
            color="blue darken-3"
            item-color="blue"
            v-model="res.name"
            :items="items"
            label="Responsable"
            :autocomplete="false"
            @click="$emit('update-responsible-list')"
            dense
            :readonly="actualUser.role !== 'Admin'"
          ></v-combobox>
        </v-col>
      </v-col>
      <v-col>
        <v-text-field
          color="blue darken-3"
          label="Puesto"
          v-model="res.position"
          single-line
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field color="blue darken-3" v-model="res.sign" placeholder="Firma" readonly single-line outlined></v-text-field>
      </v-col>
      <v-btn
        v-if="!verifyLastRow(r, responsibleData.length)"
        class="mt-4 mr-2 white--text"
        fab
        small
        color="light-blue darken-2"
        @click="removeResponsible(r)"
        :disabled="actualUser.role !== 'Admin'"
      >
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mt-4 mr-2 white--text"
        fab
        small
        color="light-blue darken-2"
        @click="addResponsible"
        :disabled="actualUser.role !== 'Admin'"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import verifyLastRow from '@/utils/rows.js'
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  props: {
    responsibleData: {
      type: Array,
      default: function () {
        return []
      }
    },
    actualUser: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted () {
    this.getUsers()
    this.checkResponsibleData()
  },
  data () {
    return {
      responsibleHeaders: [
        { name: 'Nombre' },
        { name: 'Puesto' },
        { name: 'Firma' }
      ],
      verifyLastRow: verifyLastRow,
      users: [],
      items: []
    }
  },
  methods: {
    getUsers () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/users', config)
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        }).then(() => {
          this.formatUsers()
        })
    },
    formatUsers () {
      this.users.forEach(user => {
        let fullname = this.getNameWithFormat(user.firstNames, user.paternalLastName, user.maternalLastName)
        if (fullname !== '  ') {
          this.items.push({
            text: fullname,
            value: user._id
          })
        }
      })
    },
    getNameWithFormat (name, paternalLastName, maternalLastName) {
      return name + ' ' + paternalLastName + ' ' + maternalLastName
    },
    checkResponsibleData () {
      if (this.responsibleData.length < 1) {
        this.addResponsible()
      }
    },
    addResponsible () {
      let responsible = {
        name: '',
        position: '',
        sign: ''
      }

      this.responsibleData.push(responsible)
    },
    removeResponsible (index) {
      this.responsibleData.splice(index, 1)
    }
  }
}
</script>
