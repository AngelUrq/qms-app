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
          <div v-for="button in newButtons" :key="button.id">
            <v-btn
              class="mr-4 mb-2 ml-7"
              outlined
              fab
              x-small
              color="light-blue darken-4"
              v-if="button.isVisible"
              @click.stop="sendTableId(button.id)"
            >
              <v-icon>{{button.type}}</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  mounted () {
    this.updateButtons()
  },
  data () {
    return {
      dialog: false,
      buttonsIncons: [
        { type: 'mdi-plus', id: 1, isVisible: true },
        { type: 'mdi-credit-card-outline', id: 2, isVisible: true },
        { type: 'mdi-table-row', id: 3, isVisible: true },
        { type: 'mdi-crop-landscape', id: 4, isVisible: true },
        { type: 'mdi-table-settings', id: 5, isVisible: true },
        { type: 'mdi-table-settings', id: 6, isVisible: true }
      ]
    }
  },

  props: {
    idRow: {
      type: Number
    },
    availableTable: {}
  },
  methods: {
    sendTableId (id) {
      this.$emit('createTableId', id, this.idRow)
      this.dialog = false
    },
    updateButtons () {
      console.log(this.availableTable)

      for (var i = 0; i < this.buttonsIncons.length; i++) {
        if (this.buttonsIncons[i].id === 3 && !this.availableTable.table3Row) {
          this.buttonsIncons[i].isVisible = false
        }
        if (
          this.buttonsIncons[i].id === 6 &&
          !this.availableTable.table5RowsRoot
        ) {
          this.buttonsIncons[i].isVisible = false
        }
        if (
          this.buttonsIncons[i].id === 5 &&
          !this.availableTable.table5RowsCorrection
        ) {
          this.buttonsIncons[i].isVisible = false
        }
      }
      console.log(this.buttonsIncons)
    }
  },
  computed: {
    newButtons () {
      this.updateButtons()
      return this.buttonsIncons
    }
  }
}
</script>

<style>
</style>
