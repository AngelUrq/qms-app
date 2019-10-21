<template>
  <v-row no-gutters>
    <v-dialog v-model="dialog" scrollable max-width="80%">
      <template v-slot:activator="{ on }">
        <v-btn x-small text icon color="blue-grey lighten-1" v-on="on" fab>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
    <v-card-title>
      <span class="headline">Actualizar datos de formato de reporte</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nombre" prepend-icon="mdi-clipboard-text" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Versión" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Título" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Fecha de creación del documento" value="14/06/2016" readonly="true"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-row class="pa-3" justify="end" no-gutters>
        <v-btn color="blue darken-1" text>Actualizar</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      newSubtitle: '',
      subtitles: []
    }
  }
}
</script>
