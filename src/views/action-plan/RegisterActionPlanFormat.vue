<template>
  <v-card>
    <v-card-title class="headline pt-5">Crear nuevo formato</v-card-title>
    <v-form>
      <v-text-field class="px-10" v-model="name" label="Nombre del formato"></v-text-field>
    </v-form>
    <v-card-actions class="pb-5">
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text v-on:click="createNewFormat()">Guardar</v-btn>
      <v-btn color="green darken-1" text>Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      name: 'default'
    }
  },
  methods: {
    createNewFormat () {
      this.$emit('saveActionPlanFormat', this.name)
    }
  }
}
</script>
