<template>
  <v-col>
    <v-combobox
      color="blue darken-3"
      item-color="blue"
      v-model="select"
      :items="items"
      label="Responsable"
      :autocomplete="false"
      dense
    ></v-combobox>
  </v-col>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  data () {
    return {
      select: '',
      users: [],
      items: []
    }
  },
  mounted () {
    this.getUsers()
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
    }
  }
}
</script>
