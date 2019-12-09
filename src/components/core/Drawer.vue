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
          src="@/assets/app-logo.jpg"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">QMS APP</v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <div />
      <div v-for="(item, i) in items" :key="i">
        <v-list-group v-if="item.containsSubitems" :prepend-icon="item.icon" color="transparent" active-class="white--text">
          <template v-slot:activator>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>

          <v-list-item v-for="(subitem, j) in item.subitems" :key="j" :to="subitem.to" active-class="green darken-2 white--text">
            <v-list-item-content>
              <v-list-item-title v-text="subitem.text"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :to="item.to" active-class="green darken-2 white--text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="item.text" />
        </v-list-item>
      </div>
      <v-list-item @click="logout" active-class="green darken-2 white--text">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="'Cerrar sesión'"/>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'
import { adminView, userView } from '../../viewRoutes'
import { adminRole, userRole } from '../../data'
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: []
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
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    logout: function () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted () {
    const role = this.$store.getters.role
    if (role === adminRole) {
      this.items = adminView.items
    } else if (role === userRole) {
      this.items = userView.items
    }
  }
}
</script>
