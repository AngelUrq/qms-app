<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
       <v-text-field label="Titulo" :placeholder="title" v-model="title"></v-text-field>
       <div class="text-left ml-2">{{ body }}</div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      title: 'Verificacion de la eficacia',
      body: 'Description'
    }
  }
}
</script>

<style>

</style>
