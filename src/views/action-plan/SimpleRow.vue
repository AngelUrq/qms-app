<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col>
       <v-text-field label="Titulo" :placeholder="title" v-model="title"></v-text-field>
      </v-col>
      <v-col>

       <div class="text-left ml-2">{{ body }}</div>
    </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      title: 'Title',
      body: 'Description'
    }
  }
}
</script>

<style>

</style>
