<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://our.umbraco.com/media/wiki/140890/635578860265270330_appsjpg.jpg"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        SGC
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Panel de administración'
      },
      {
        to: '/typography',
        icon: 'mdi-chart-bar',
        text: 'Estadísticas'
      },
      {
        to: '/table-list',
        icon: 'mdi-clipboard-outline',
        text: 'Planes de acción'
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'Perfil'
      },
      {
        to: '/user-manager',
        icon: 'mdi-account-group',
        text: 'Gestor de usuarios'
      },
      {
        to: '/icons',
        icon: 'mdi-chart-bubble',
        text: 'Iconos'
      },
      {
        to: '/maps',
        icon: 'mdi-map-marker',
        text: 'Mapas'
      },
      {
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notificaciones'
      }
    ]
  }),

  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>
