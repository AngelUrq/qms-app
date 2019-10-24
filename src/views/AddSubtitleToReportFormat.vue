<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        width="50%"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            x-small
            fab
            color="red lighten-2"
            dark
            v-on="on"
            class="ml-4 mb-4"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Añadir subtítulo</v-card-title>
          <v-card-text>
            <v-text-field label="Subtítulo" v-model="newSubtitle"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Añadir
            </v-btn>
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
      newSubtitle: ''
    }
  },
  methods: {
    addSubtitle () {
      // send new subtitle to ReportFormat
    }
  }
}
</script>
