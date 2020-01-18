<template>
  <v-dialog v-model="show" width="60%">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Plan de Acción</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nombre*" v-model="actionPlanData.name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Descripción*" v-model="actionPlanData.description" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog()">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveActionPlan()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '../../../main'
import { backendURL } from '@/data.js'
import axios from 'axios'

export default {
  props: {
    value: Boolean
  },
  data: () => ({
    valuePass: String,
    actionPlanID: '',
    actionPlanData: {
      description: '',
      name: ''
    }
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  created () {
    EventBus.$on('editActionPlanData', actionPlan => {
      this.actionPlanData.description = actionPlan.description
      this.actionPlanData.name = actionPlan.name
      this.actionPlanID = actionPlan._id
    })
  },
  methods: {
    saveActionPlan () {
      axios
        .put(backendURL + '/api/action-plans/' + this.actionPlanID, {
          name: this.actionPlanData.name,
          description: this.actionPlanData.description
        })
        .then(response => {
          EventBus.$emit('refreshTable', 'Action Plan edited')
          console.log('Action plan has been modified!')
          this.$emit('input', false)
        })
        .catch(error => {
          console.log('An error has occurred: ' + error)
        })
    },
    closeDialog () {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
