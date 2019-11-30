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

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title>
          <span>Seleccione el formato de tabla que desea añadir</span>
        </v-card-title>

        <v-card-actions>
          <v-row no-gutters align="center" justify="center">
            <v-tooltip top v-for="button in newButtons" :key="button.id">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mr-4 mb-2 ml-7"
                  outlined
                  fab
                  x-small
                  color="light-blue darken-4"
                  v-on="on"
                  v-if="button.isVisible"
                  @click.stop="sendTableId(button.id)"
                >
                  <v-icon>{{ button.type }}</v-icon>
                </v-btn>
              </template>
              <span>{{ button.span }}</span>
            </v-tooltip>
          </v-row>
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
        { type: 'mdi-plus', id: 1, isVisible: true, span: 'Campo vertical' },
        {
          type: 'mdi-credit-card-outline',
          id: 2,
          isVisible: true,
          span: 'Campo horizontal'
        },
        {
          type: 'mdi-table-row',
          id: 3,
          isVisible: true,
          span: 'Tabla de responsables'
        },
        { type: 'mdi-crop-landscape', id: 4, isVisible: true, span: 'Titulo' },
        {
          type: 'mdi-table-settings',
          id: 5,
          isVisible: true,
          span: 'Tabla de correcciones'
        },
        {
          type: 'mdi-table-settings',
          id: 6,
          isVisible: true,
          span: 'Tabla de actividades'
        }
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
