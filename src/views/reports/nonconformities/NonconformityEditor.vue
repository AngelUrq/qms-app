<template>
  <v-card>
    <v-card-title>
      <span class="headline">Registro de no conformidades</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-textarea
            label="Texto"
            v-model="nonconformity.text"
            prepend-icon="mdi-clipboard-text"
            color="red darken-1"
            required
        ></v-textarea>
        <v-combobox
            color="red darken-1"
            item-color="blue"
            v-model="nonconformity.type"
            :items="types"
            label="Tipo"
            :autocomplete="false"
            outlined
            dense
        ></v-combobox>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-row justify="end" no-gutters>
        <v-btn color="red darken-1" @click="save()" text>Guardar</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  props: {
    nonconformity: {
      type: Object,
      default: function () {
        return {
          text: '',
          type: ''
        }
      }
    }
  },
  data () {
    return {
      types: ['No conformidad', 'Observación', 'Recomendación']
    }
  },
  methods: {
    save () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios
        .post(backendURL + '/api/nonconformities', this.nonconformity, config)
        .then(response => {
          this.nonconformity.text = ''
          this.nonconformity.type = ''
          window.location.reload(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
