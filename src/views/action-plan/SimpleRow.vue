<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-text-field label="Titulo" :placeholder="title" v-model="title"></v-text-field>
      </v-col>
      <v-col class="ml-1">
        <v-text-field :placeholder="body" v-model="body" readonly></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    newTitle: String
  },
  data () {
    return {
      title: 'Título',
      body: 'Valor'
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
