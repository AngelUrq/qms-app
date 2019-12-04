<template>
  <v-container>
    <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
      <h4 class="text-center pb-5">ACCIONES PARA ELIMINAR LA CAUSA RAÍZ</h4>
    </v-card>
    <v-row>
      <v-col v-for="(header, i) in activityHeaders" :key="i">
        <h4>{{ header.name }}</h4>
      </v-col>
    </v-row>
    <v-row v-for="(activity, index) in activitiesData" :key="index">
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Actividad"
          outlined
        ></v-textarea>
      </v-col>
      <v-col>
        <v-combobox
          color="blue darken-3"
          item-color="blue"
          v-model="activity.responsable"
          :items="items"
          label="Responsable"
          :autocomplete="false"
          dense
        ></v-combobox>
      </v-col>
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="VoBo responsable"
          outlined
        ></v-textarea>
      </v-col>

      <v-col>
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          color="light-blue darken-4"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="activity.proposedDate"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              color="light-blue darken-4"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="activity.proposedDate"
            color="light-blue darken-4"
            locale="es-419"
            min="2017/01"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          color="light-blue darken-4"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="activity.realDate"
              color="light-blue darken-4"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="activity.realDate"
            color="light-blue darken-4"
            locale="es-419"
            min="2017/01"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-btn
        v-if="!verifyLastRow(index, activitiesData.length)"
        class="mt-4 mr-2"
        fab
        small
        dark
        color="light-blue darken-2"
        @click="removeActivity(index)"
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
        @click="addActivity"
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
    activitiesData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      activityHeaders: [
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
    this.checkActivitiesData()
  },
  methods: {
    addActivity () {
      let activity = {
        name: '',
        responsable: '',
        voBo: '',
        proposedDate: '',
        realDate: ''
      }

      this.activitiesData.push(activity)
    },
    removeActivity (index) {
      this.activitiesData.splice(index, 1)
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
    checkActivitiesData () {
      if (this.activitiesData.length < 1) {
        this.addActivity()
      }
    }
  }
}
</script>
