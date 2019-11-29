<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <div>
        <v-col cols="12">
          <v-card extended color="light-blue darken-4" class="white--text">
            <v-row class="pa-5">
              <v-col>
              <h2>Editor de formatos</h2>
              </v-col>
              <v-col md="1">
                <v-btn
                  class="ma-2 blue lighten-1"
                  outlined
                  large
                  fab
                  color="white"
                  v-on:click="createNewRow()"

                >
                  <v-icon>mdi-table-row-plus-after</v-icon>
                </v-btn>
              </v-col>
               <v-col md="1">
                <v-btn
                  class="ma-2 blue lighten-1"
                  outlined
                  large
                  fab
                  color="white"
                  v-on:click="createNewRow()"

                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </div>
      <v-row v-for="(row, rowId) in rows" :key="rowId">
        <v-col v-for="(col,colId) in row" :key="colId">
          <v-row>
            <v-col>
              <component v-bind:is="col.type" :mainTitle="col.mainTitle" />
            </v-col>

            <v-btn
              class="pa-2"
              outlined
              fab
              x-small
              color="light-blue darken-4"
              v-on:click="deleteTable(colId, rowId)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-col>

        <v-spacer v-if="row.length == 0"></v-spacer>
        <v-col md="1">
          <v-row>
            <FormatOptions
              v-if="IsFreeForTable(row)"
              @createTableId="createTableId"
              @deleteTable="deleteTable"
              :idRow="rowId"
              :availableTable="getAvailableTables()"
            />
          </v-row>
          <v-row>
            <v-btn
              class="mr-2 mb-2 ml-4"
              outlined
              fab
              x-small
              color="light-blue darken-4"
              v-on:click="deleteRow(rowId)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              class="mr-2 mb-2 ml-4"
              outlined
              fab
              x-small
              color="light-blue darken-4"
              v-on:click="createInnerRow(rowId)"
            >
              <v-icon>mdi-table-row-plus-after</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import FormatOptions from './FormatOptions'
import Table1Row from './Table1Rows'
import SimpleRow from './SimpleRow'
import Label from './Label'
import Table5Rows from './Table5Rows'
import Table3Rows from './Table3Rows'
export default {
  components: {
    FormatOptions,
    Table1Row,
    SimpleRow,
    Label,
    Table5Rows,
    Table3Rows
  },
  data () {
    return {
      largeTables: ['Label', 'Table3Rows', 'Table5Rows', 'Table1Row'],
      actionPlanFormat: {},
      rows: [
        [
          {
            id: 'col 1',
            type: 'Table1Row',
            permission: 'admin'
          },
          {
            id: 'col 2',
            type: 'Table1Row',
            permission: 'admin'
          }
        ],
        []
      ]
    }
  },
  methods: {
    createNewRow: function () {
      this.rows.push([])
      console.log(this.rows)
    },
    createTableId: function (tableId, rowId) {
      console.log(tableId)
      switch (tableId) {
        case 1:
          this.rows[rowId].push({
            id: 'test',
            type: 'Table1Row',
            permission: 'test'
          })
          console.log(this.rows)
          break
        case 2:
          this.rows[rowId].push({
            id: 'test',
            type: 'SimpleRow',
            permission: 'test'
          })
          console.log(this.rows)
          break
        case 3:
          this.rows[rowId].push({
            id: 'test',
            type: 'Table3Rows',
            permission: 'test'
          })
          console.log(this.rows)
          break
        case 4:
          this.rows[rowId].push({
            id: 'test',
            type: 'Label',
            permission: 'test'
          })
          console.log(this.rows)
          break
        case 5:
          this.rows[rowId].push({
            id: 'test',
            type: 'Table5Rows',
            permission: 'test',
            mainTitle: 'Corrección inmediata'
          })
          console.log(this.rows)
          break

        case 6:
          this.rows[rowId].push({
            id: 'test',
            type: 'Table5Rows',
            permission: 'test',
            mainTitle: 'Acciones para eliminar la causa raiz'
          })
          console.log(this.rows)
          break

        default:
          break
      }
    },
    deleteTable: function (tableId, rowId) {
      console.log(tableId + ' ' + rowId)
      this.$delete(this.rows[rowId], tableId)
    },
    deleteRow: function (rowId) {
      this.$delete(this.rows, rowId)
    },
    createInnerRow: function (rowId) {
      this.rows.splice(rowId + 1, 0, [])
    },
    IsFreeForTable (row) {
      // console.log('numero es '+ rowId);

      var isFree = true
      row.forEach(col => {
        if (this.largeTables.includes(col.type)) isFree = false
      })

      return isFree
    },
    getAvailableTables () {
      let availablesTable = {
        table3Row: true,
        table5RowsRoot: true,
        table5RowsCorrection: true
      }
      this.rows.forEach(row => {
        row.forEach(col => {
          if (col.type === 'Table3Rows') {
            availablesTable.table3Row = false
          } else if (
            col.type === 'Table5Rows' &&
            col.mainTitle === 'Corrección inmediata'
          ) {
            availablesTable.table5RowsCorrection = false
          } else if (
            col.type === 'Table5Rows' &&
            col.mainTitle === 'Acciones para eliminar la causa raiz'
          ) {
            availablesTable.table5RowsRoot = false
          }
        })
      })
      return availablesTable
    }
  }
}
</script>
