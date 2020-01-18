<template>
  <v-container class="pa-12">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ textMessage }}
      <v-btn color="green" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

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
              :readonly="!isUserAuthorized"
            ></v-textarea>

            <h4
              v-if="column.fieldType === 'title'"
              class="text-center pb-5"
              :readonly="!isUserAuthorized"
            >{{ column.name }}</h4>

            <div v-if="column.fieldType === 'responsible'">
              <ReponsibleTable
                v-bind:responsibleData="column.value"
                v-bind:actualUser="user"
                @update-responsible-list="updateResponsibleList"
              />
            </div>

            <div v-if="column.fieldType === 'corrections'">
              <CorrectionTable
                v-bind:correctionsData="column.value"
                v-bind:actualUser="user"
                v-bind:responsible="responsible"
                @save-action-plan="saveActionPlan"
              />
            </div>

            <div v-if="column.fieldType === 'actions'">
              <ActionsTable
                v-bind:actionsData="column.value"
                v-bind:actualUser="user"
                v-bind:responsible="responsible"
                @save-action-plan="saveActionPlan"
              />
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

      <v-btn x-large color="light-green darken-3" width="20%" class="white--text mr-5">FINALIZAR</v-btn>
      <v-btn
        x-large
        color="pink darken-3"
        width="20%"
        class="white--text mr-5"
        @click="createEvent()"
      >Google calendar</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import ReponsibleTable from '@/components/action-plan/forms/ResponsibleTable'
import CorrectionTable from '@/components/action-plan/forms/CorrectionsTable'
import ActionsTable from '@/components/action-plan/forms/ActionsTable'
import axios from 'axios'
import { backendURL } from '@/data.js'
import { isAdmin } from '@/utils/permissions.js'

export default {
  components: {
    ReponsibleTable,
    CorrectionTable,
    ActionsTable
  },
  data () {
    return {
      idActionPlan: '',
      activateLoading: false,
      text: 'GUARDAR',
      actionPlanFormat: {},
      structure: {},
      responsible: [],
      textMessage: '',
      snackbar: false,
      timeout: 1200,
      descriptionIndex: {
        row: -1,
        column: -1
      },
      responsibleIndex: {
        row: -1,
        column: -1
      },
      user: {},
      isUserAuthorized: false
    }
  },
  beforeMount () {
    this.getActualUser()
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
          this.structure = this.actionPlanFormat.structure
          this.getFieldIndexes()
          this.setDescription()
          this.checkResponsible()
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveActionPlan () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      if (this.existDescription()) {
        this.actionPlanFormat.description = this.actionPlanFormat.structure.rows[this.descriptionIndex.row][this.descriptionIndex.column].value
      }

      axios
        .put(
          backendURL + '/api/action-plans/' + this.idActionPlan,
          this.actionPlanFormat,
          config
        )
        .then(response => {
          console.log(response)
          this.snackbar = true
          this.textMessage = 'Se ha guardado correctamente el plan de acción'
        })
        .catch(error => {
          console.log(error)
        })
    },
    getFieldIndexes () {
      for (let i = 0; i < this.structure.rows.length; i++) {
        for (let j = 0; j < this.structure.rows[i].length; j++) {
          if (this.structure.rows[i][j].name === 'Descripción') {
            this.descriptionIndex.row = i
            this.descriptionIndex.column = j
          }
          if (this.structure.rows[i][j].fieldType === 'responsible') {
            this.responsibleIndex.row = i
            this.responsibleIndex.column = j
          }
        }
      }
    },
    checkResponsible () {
      if (this.responsibleIndex.row > -1 && this.responsibleIndex.column > -1) {
        this.responsible = this.structure.rows[this.responsibleIndex.row][this.responsibleIndex.column].value
      } else {
        this.responsible = []
      }
    },
    existDescription () {
      return (
        this.descriptionIndex.row > -1 && this.descriptionIndex.column > -1
      )
    },
    setDescription () {
      if (this.existDescription()) {
        this.structure.rows[this.descriptionIndex.row][this.descriptionIndex.column].value = this.actionPlanFormat.description
      }
    },
    getActualUser () {
      let token = this.$store.state.token
      let config = { headers: { 'x-access-token': token } }
      axios
        .get(backendURL + '/api/users/token/' + token, config)
        .then(response => {
          this.user = response.data
          this.isUserAuthorized = isAdmin(this.user)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateResponsibleList () {
      this.responsible = this.structure.rows[this.responsibleIndex.row][this.responsibleIndex.column].value
    },
    createEvent () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      this.structure.rows.forEach(row => {
        row.forEach(column => {
          if (
            column.fieldType === 'corrections' ||
            column.fieldType === 'actions'
          ) {
            column.value.forEach(activity => {
              if (
                this.isActivityInformationCompleted(activity) &&
                !activity.eventCreated
              ) {
                axios
                  .get(
                    backendURL + '/api/users/' + activity.responsable.value,
                    config
                  )
                  .then(response => {
                    const event = {
                      summary: activity.name,
                      description: '',
                      startDate: new Date(Date.now()),
                      endDate: activity.proposedDate,
                      location: 'Bolivia',
                      attendees: [{ email: response.data.email }]
                    }

                    axios
                      .post(
                        backendURL + '/api/calendar-events/add-event',
                        event,
                        config
                      )
                      .then(response => {
                        activity.eventCreated = true
                        this.snackbar = true
                        this.textMessage = 'Se han notificado correctamente a los usuarios'
                        console.log(response)
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
            })
          }
        })
      })
    },
    isActivityInformationCompleted (activity) {
      return (
        activity.name !== '' &&
        activity.responsable !== '' &&
        activity.proposedDate !== ''
      )
    }
  }
}
</script>
