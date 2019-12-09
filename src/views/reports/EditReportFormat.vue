<template>
  <v-dialog v-model="showEditReportFormat" persistent scrollable max-width="40%">
    <v-card>
      <v-card-title>
        <span class="headline">Actualizar datos de formato de informe</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            color="teal darken-2"
            label="Nombre*"
            v-model="item.name"
            prepend-icon="mdi-clipboard-text"
            required
          ></v-text-field>
          <v-text-field color="teal darken-2" label="Versión*" v-model="item.version" required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row class="pb-3 pr-3" justify="end" no-gutters>
          <v-btn color="teal darken-2" @click="updateReportFormat" text>Actualizar</v-btn>
          <v-btn color="teal darken-2" @click="cancelUpdateReportFormat" text>Cancelar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'
import { EventBus } from '../../main'

export default {
  props: {
    showEditReportFormat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      item: {}
    }
  },
  created () {
    EventBus.$on('edit-report-info', item => {
      this.item = item
    })
  },
  methods: {
    updateReportFormat () {
      var show = this.showEditReportFormat

      if (this.isFormCompleted()) {
        var config = {
          headers: {
            'x-access-token': this.$store.state.token
          }
        }
        this.item.lastModificationDate = new Date(Date.now())

        axios
          .put(
            backendURL + '/api/report-format/' + this.item._id,
            this.item,
            config
          )
          .then(response => {
            console.log('Report format update successfully')
          })
          .catch(e => {
            console.log('An exception has ocurred: ' + e)
          })
      }

      this.$emit('update-show-edit-report-format', show)
    },
    isFormCompleted () {
      return this.item.name !== '' || this.item.version !== ''
    },
    cancelUpdateReportFormat () {
      this.$emit('update-show-edit-report-format')
    }
  }
}
</script>
