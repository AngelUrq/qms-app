<template>
  <v-container>
    <v-card class="pt-5 mb-5 white--text" color="light-blue darken-4">
      <h4 class="text-center pb-5">CORRECCIÓN INMEDIATA</h4>
    </v-card>
    <v-row>
      <v-col v-for="(header, i) in correctionHeaders" :key="i">
        <h4>{{ header }}</h4>
      </v-col>
      <div class="mr-5 mt-3">
        <b>Opciones</b>
      </div>
    </v-row>
    <v-row v-for="(activity, index) in correctionsData" :key="index">
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Actividad"
          outlined
          single-line
          v-model="activity.name"
          :readonly="!isAdminOrGeneralResponsable()"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-col>
          <v-combobox
            color="blue darken-3"
            item-color="blue"
            v-model="activity.responsable"
            :items="items"
            label="Responsable"
            :autocomplete="false"
            dense
            :readonly="!isAdminOrGeneralResponsable()"
          ></v-combobox>
        </v-col>
      </v-col>
      <v-col>
        <v-textarea
          auto-grow
          rows="1"
          color="blue darken-3"
          class="mt-3"
          label="Descripcion"
          outlined
          single-line
          v-model="activity.description"
          :readonly="!verifyAuthorizedUser(activity.responsable)"
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
              v-model="activity.proposedDate"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              :autocomplete="false"
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
            :autocomplete="false"
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
              v-model="activity.realDate"
              placeholder="YY/mm/dd"
              prepend-icon="mdi-calendar"
              :autocomplete="false"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="activity.realDate"
            color="light-blue darken-4"
            locale="es-419"
            :autocomplete="false"
            min="2017/01"
            no-title
            :disabled="!verifyAuthorizedUser(activity.responsable)"
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
        :disabled="!isAdminOrGeneralResponsable()"
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
        :disabled="!isAdminOrGeneralResponsable()"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      <v-btn
        class="mt-4 mr-2 white--text"
        @click="getAttachmentRoute(activity)"
        :disabled="!verifyAuthorizedUser(activity.responsable)"
        color="light-blue darken-2"
        fab
        small
      >
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
import { isAdmin, isGeneralResponsable } from '@/utils/permissions.js'

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
        'Actividad',
        'Responsable',
        'Descripción',
        'Fecha propuesta',
        'Fecha real'
      ],
      verifyLastRow: verifyLastRow,
      users: [],
      items: [],
      attachmentRoute: '',
      actionPlanID: ''
    }
  },
  mounted () {
    this.getUsers()
    this.checkCorrectionsData()
    this.actionPlanID = this.$route.query.id
  },
  methods: {
    addCorrection () {
      let activity = {
        id: generateId(),
        name: '',
        responsable: '',
        description: '',
        proposedDate: '',
        realDate: '',
        eventCreated: false
      }

      this.correctionsData.push(activity)
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
          this.formatUsers()
        })
        .catch(error => {
          console.log(error)
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
    checkCorrectionsData () {
      if (this.correctionsData.length < 1) {
        this.addCorrection()
      }
    },
    isAdminOrGeneralResponsable () {
      return isAdmin(this.actualUser) || isGeneralResponsable(this.responsible, this.actualUser)
    },
    verifyAuthorizedUser (responsableActivity) {
      return this.isAdminOrGeneralResponsable() || responsableActivity.value === this.actualUser._id
    },
    getAttachmentRoute (activity) {
      if (isActivityFieldsCompleted(activity)) {
        this.attachmentRoute = '/attachments?userID=' + this.actualUser.value +
                              '&actionPlanID=' + this.actionPlanID +
                              '&activityID=' + activity.id

        this.$emit('save-action-plan')
        this.$router.push(this.attachmentRoute)
      } else {
        this.attachmentRoute = ''
      }
    },
    createEvent () {
      console.log('llegue')
    }
  }
}
</script>
