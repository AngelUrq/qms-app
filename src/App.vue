<template>
  <v-app>
    <div v-if="isLogged">
      <core-app-bar />
      <core-view />
      <core-footer />
      <core-drawer />
    </div>
  </v-app>
</template>

<script>

export default {
  components: {
    CoreDrawer: () => import('@/components/core/Drawer'),
    CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import('@/components/core/View')
  },
  data () {
    return {
      isLogged: false
    }
  }
}
</script>
