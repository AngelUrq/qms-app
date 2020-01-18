<template>
  <v-card outlined>
    <v-col>
      <v-text-field label="Titulo" :placeholder="title" v-model="title"></v-text-field>
    </v-col>

    <div class="text-left ml-2">{{ body }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    newTitle: String
  },
  data () {
    return {
      title: 'Verificacion de la eficacia',
      body: 'Description'
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
