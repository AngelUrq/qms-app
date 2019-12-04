<template>
   <v-dialog v-model="show" width="60%">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Formato de Plan de Acción</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nombre*" v-model="actionPlanFormatData.name" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saveActionPlanFormat()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '../../main'
import { backendURL } from '@/data.js'
import axios from 'axios'

export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      actionPlanFormatID: '',
      actionPlanFormatData: {
        name: ''
      }
    }
  },
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
    EventBus.$on('editActionPlanFormat', actionPlanFormat => {
      this.actionPlanFormatData.name = actionPlanFormat.name
      this.actionPlanFormatID = actionPlanFormat._id
    })
  },
  methods: {
    saveActionPlanFormat () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      axios
        .put(backendURL + '/api/action-plan-formats/' + this.actionPlanFormatID, {
          name: this.actionPlanFormatData.name,
          lastModificationDate: new Date().toISOString()
        }, config)
        .then(response => {
          console.log('Action plan format has been modified!')
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
