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
    width="300"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://our.umbraco.com/media/wiki/140890/635578860265270330_appsjpg.jpg"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">QMS</v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />
      <div v-for="(item, i) in items" :key="i">
        <v-list-group v-if="item.containsSubitems" :prepend-icon="item.icon" color="transparent" active-class="white--text">
          <template v-slot:activator>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>

          <v-list-item v-for="(subitem, j) in item.subitems" :key="j" :to="subitem.to" active-class="light-blue darken-4 white--text">
            <v-list-item-content>
              <v-list-item-title v-text="subitem.text"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :to="item.to" active-class="light-blue darken-4 white--text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="item.text" />
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Panel de administración',
        containsSubitems: false
      },
      {
        icon: 'mdi-clipboard-text-outline',
        text: 'Informes',
        containsSubitems: true,
        subitems: [
          {
            to: '/report-format',
            text: 'Formatos'
          },
          {
            to: '/report-editor',
            text: 'Editor'
          },
          {
            to: '/report-list',
            text: 'Cargar'
          }
        ]
      },
      {
        icon: 'mdi-clipboard-outline',
        text: 'Planes de acción',
        containsSubitems: true,
        subitems: [
          {
            to: '/action-plan-manager',
            text: 'Gestor'
          },
          {
            to: '/action-plan-format-manager',
            text: 'Formatos'
          }
        ]
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'Perfil',
        containsSubitems: false
      },
      {
        to: '/user-manager',
        icon: 'mdi-account-group',
        containsSubitems: false,
        text: 'Gestor de usuarios'
      },
      {
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notificaciones',
        containsSubitems: false
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
    },
    showItemsWithSubitems: function () {
      return this.items.filter(i => i.containsSubitems)
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>
