<template>
  <v-app>
    <core-view />
  </v-app>
</template>

<script>

export default {
  components: {
    CoreView: () => import('@/components/core/View')
  },
  created  () {
    this.$store.commit('saveToken', localStorage.getItem('token'))
  }
}
window.addEventListener('beforeunload', function (e) {
  localStorage.setItem('token', this.$store.getters.token)
})
</script>
