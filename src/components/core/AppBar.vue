<template>
  <v-app-bar
    id="core-app-bar"
    absolute
    app
    color="transparent"
    flat
    height="88"
  >
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn
        dark
        icon
        @click.stop="onClick"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-btn
          icon
          to="/dashboard"
        >
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </v-btn>

        <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="toolbar-items"
              icon
              v-on="on"
              @click="getUserNotifications"
            >
              <v-badge
                color="error"
                overlap
              >
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">
                  mdi-bell
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification.message"
                @click="deleteNotification(notification)"
              >
                <v-list-item-title v-text="notification.message" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-btn
          to="/user-profile"
          icon
        >
          <v-icon color="tertiary">
            mdi-account
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  data () {
    return {
      email: '',
      user: [],
      notifications: [],
      title: null
    }
  },
  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.getUserNotifications()
  },
  methods: {
    getUserNotifications () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      axios
        .get(backendURL + '/api/users/token/' + this.$store.state.token, config)
        .then(response => {
          this.user = response.data
          this.email = this.user.email
          this.getNotifications()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getNotifications () {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      axios.get(backendURL + '/api/notifications/' + this.email, config)
        .then(response => {
          this.notifications = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteNotification (notif) {
      let config = { headers: { 'x-access-token': this.$store.state.token } }
      axios.delete(backendURL + '/api/notifications/' + notif._id, config)
        .then(response => {
          this.getUserNotifications()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
