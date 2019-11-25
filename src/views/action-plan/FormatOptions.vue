<template>
  <v-row>
    <v-btn
      class="mr-4 mb-2 ml-7"
      outlined
      fab
      x-small
      color="light-blue darken-4"
      @click.stop="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Seleccione el formto de tabla que desea añadir</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions justify="center">
          <v-btn
            id="1"
            class="mr-4 mb-2 ml-7"
            outlined
            fab
            x-small
            color="light-blue darken-4"
            @click.stop="sendTableId($event)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            id="2"
            class="mr-4 mb-2 ml-7"
            outlined
            fab
            x-small
            color="light-blue darken-4"
            @click.stop="sendTableId($event)"
          >
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-btn>
          <v-btn
            id="3"
            class="mr-4 mb-2 ml-7"
            outlined
            fab
            x-small
            color="light-blue darken-4"
            @click.stop="sendTableId($event)"
          >
            <v-icon>mdi-table-row</v-icon>
          </v-btn>
          <v-btn
            id="4"
            class="mr-4 mb-2 ml-7"
            outlined
            fab
            x-small
            color="light-blue darken-4"
            @click.stop="sendTableId($event)"
          >
            <v-icon>mdi-crop-landscape</v-icon>
          </v-btn>
          <v-btn
            id="5"
            class="mr-4 mb-2 ml-7"
            outlined
            fab
            x-small
            color="light-blue darken-4"
            @click.stop="sendTableId($event)"
          >
            <v-icon>mdi-table-settings</v-icon>
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
      dialog: false
    }
  },
  props: ['idRow'],
  methods: {
    sendTableId (event) {
      this.$emit('createTableId', event.currentTarget.id, this.idRow)
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
