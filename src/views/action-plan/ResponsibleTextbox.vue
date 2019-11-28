<template>
  <v-col>
    <v-combobox
      color="blue darken-3"
      item-color="blue"
      v-model="select"
      :items="items"
      label="Responsable"
      :multiple="false"
    ></v-combobox>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      items: ['Programming', 'Design', 'Vue', 'Vuetify']
    }
  }
}
</script>
