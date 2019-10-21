<template>
  <v-app>
    <core-app-bar v-if='isVisible'/>
    <core-drawer v-if='isVisible'/>
    <core-view/>
    <core-footer v-if='isVisible'/>
  </v-app>
</template>

<script>

export default {
  components: {
    CoreView: () => import('@/components/core/View'),
    CoreDrawer: () => import('@/components/core/Drawer'),
    CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar')
  },
  created () {
    this.$store.commit('saveToken', localStorage.getItem('token'))
  },
  computed: {
    isVisible () {
      return this.$route.path !== '/'
    }
  }
}

window.addEventListener('beforeunload', function (e) {
  localStorage.setItem('token', this.$store.getters.token)
})
</script>
