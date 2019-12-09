<template>
  <v-container>
    <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
      <h4 class="text-center pb-5">ACCIONES PARA ELIMINAR LA CAUSA RAÍZ</h4>
    </v-card>
    <v-row>
      <v-col v-for="(header, i) in actionsHeaders" :key="i">
        <h4>{{ header }}</h4>
      </v-col>
      <div class="mr-5 mt-3">
        <b>Opciones</b>
      </div>
    </v-row>
    <v-row v-for="(activity, index) in actionsData" :key="index">
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Actividad"
          outlined
          v-model="activity.name"
          :readonly="!verifyAuthorizedUser(activity.responsable)"
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
          :readonly="!isUserAdmin()"
        ></v-combobox>
      </v-col>
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Descripcion"
          outlined
          v-model="activity.description"
          :readonly="!verifyAuthorizedUser(activity.responsable)"
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
            :disabled="!verifyAuthorizedUser(activity.responsable)"
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
            :disabled="!verifyAuthorizedUser(activity.responsable)"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-btn
        v-if="!verifyLastRow(index, actionsData.length)"
        class="mt-4 mr-2 white--text"
        color="light-blue darken-2"
        @click="removeActivity(index)"
        :disabled="!isUserAdmin()"
        fab
        small
      >
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mt-4 mr-2 white--text"
        color="light-blue darken-2"
        @click="addActivity"
        :disabled="!isUserAdmin()"
        fab
        small
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      <v-btn class="mt-4 mr-2 white--text" color="light-blue darken-2" fab small @click="getAttachmentRoute(activity)">
        <v-icon dark>mdi-paperclip</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import verifyLastRow from '@/utils/rows.js'
import axios from 'axios'
import { backendURL } from '@/data.js'
import { generateId, isActivityFieldsCompleted } from '@/utils/activity.js'

export default {
  props: {
    actionsData: {
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
      actionsHeaders: [
        'Actividad',
        'Responsable',
        'Descripción',
        'Fecha propuesta',
        'Fecha real'
      ],
      verifyLastRow: verifyLastRow,
      users: [],
      items: [],
      actionPlanID: '',
      attachmentRoute: ''
    }
  },
  mounted () {
    this.getUsers()
    this.checkActionsData()
    this.actionPlanID = this.$route.query.id
  },
  methods: {
    addActivity () {
      let activity = {
        id: generateId(),
        name: '',
        responsable: '',
        description: '',
        proposedDate: '',
        realDate: ''
      }

      this.actionsData.push(activity)
    },
    removeActivity (index) {
      this.actionsData.splice(index, 1)
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
        this.items.push({
          text: fullname,
          value: user._id
        })
      })
    },
    getNameWithFormat (name, paternalLastName, maternalLastName) {
      return name + ' ' + paternalLastName + ' ' + maternalLastName
    },
    checkActionsData () {
      if (this.actionsData.length < 1) {
        this.addActivity()
      }
    },
    isUserAdmin () {
      return this.actualUser.role === 'Admin'
    },
    verifyAuthorizedUser (responsable) {
      return this.isUserAdmin() || responsable.value === this.actualUser._id
    },
    getAttachmentRoute (activity) {
      if (isActivityFieldsCompleted(activity)) {
        this.attachmentRoute = '/attachments?userID=' + activity.responsable.value +
                              '&actionPlanID=' + this.actionPlanID +
                              '&activityID=' + activity.id

        this.$emit('save-action-plan')
        this.$router.push(this.attachmentRoute)
      } else {
        this.attachmentRoute = ''
      }
    }
  }
}
</script>
