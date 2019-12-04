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
    <v-row v-for="(correction, index) in correctionsData" :key="index">
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Actividad"
          outlined
          single-line
          :readonly="!isUserAdmin()"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-col>
          <v-combobox
            color="blue darken-3"
            item-color="blue"
            v-model="correction.responsable"
            :items="items"
            label="Responsable"
            :autocomplete="false"
            dense
            :readonly="!isUserAdmin()"
          ></v-combobox>
        </v-col>
      </v-col>
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="VoBo responsable"
          outlined
          single-line
          :readonly="!verifyAuthorizedUser(correction.responsable)"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-menu
          :close-on-content-click="false"
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
            :disabled="!verifyAuthorizedUser(correction.responsable)"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu
          :close-on-content-click="false"
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
            :disabled="!verifyAuthorizedUser(correction.responsable)"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-btn
        v-if="!verifyLastRow(index, correctionsData.length)"
        class="mt-4 mr-2 white--text"
        fab
        small
        color="light-blue darken-2"
        @click="removeCorrection(index)"
        :disabled="!isUserAdmin()"
      >
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mt-4 mr-2 white--text"
        fab
        small
        color="light-blue darken-2"
        @click="addCorrection"
        :disabled="!isUserAdmin()"
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
    correctionsData: {
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
    },
    responsible: {
      type: Array,
      default: function () {
        return []
      }
    }
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
      verifyLastRow: verifyLastRow,
      users: [],
      items: []
    }
  },
  mounted () {
    this.getUsers()
    this.checkCorrectionsData()
  },
  methods: {
    addCorrection () {
      let correction = {
        name: '',
        responsable: '',
        voBo: '',
        proposedDate: '',
        realDate: ''
      }

      this.correctionsData.push(correction)
    },
    removeCorrection (index) {
      this.correctionsData.splice(index, 1)
    },
    getUsers () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .get(backendURL + '/api/users', config)
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.formatUsers()
        })
    },
    formatUsers () {
      this.users.forEach(user => {
        let fullname = this.getNameWithFormat(
          user.firstNames,
          user.paternalLastName,
          user.maternalLastName
        )
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
    checkCorrectionsData () {
      if (this.correctionsData.length < 1) {
        this.addCorrection()
      }
    },
    isUserAdmin () {
      return this.actualUser.role === 'Admin'
    },
    isGeneralResponsable () {
      let responsable = this.responsible.find(r => r.name.value === this.actualUser._id)
      return responsable !== undefined
    },
    verifyAuthorizedUser (responsable) {
      return this.isUserAdmin() || this.isGeneralResponsable() || responsable.value === this.actualUser._id
    }
  }
}
</script>
