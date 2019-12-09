<template>
  <v-col>
    <v-text-field label="Outlined" single-line outlined v-model="title"></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    newTitle: String
  },

  data () {
    return {
      title: 'Titulo'
    }
  },
  mounted () {
    if (this.newTitle !== undefined) {
      this.title = this.newTitle
    }
  }
}
</script>

<style>
</style>
