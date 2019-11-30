<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
        <v-btn x-small text icon color="blue-grey lighten-1" v-on="on" fab>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title>
        <span class="headline">Editar Plan de Acción</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nombre*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Descripción*" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { backendURL } from '@/data.js'

export default {
  data: () => ({
    dialog: false
  })
}
</script>

<style>
</style>
