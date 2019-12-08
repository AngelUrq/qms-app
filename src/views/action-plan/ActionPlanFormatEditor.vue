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
                  v-on:click="saveFormat()"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </div>
      <v-row v-for="(row, rowId) in this.actionPlanFormat.structure.rows" :key="rowId">
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
import { backendURL } from '@/data.js'
import axios from 'axios'

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
      actionPlanFormat: {
        id: 1,
        name: 'test',
        creationDate: 2018 / 10 / 10,
        lastModificationDate: 2015 / 20 / 10,
        structure: {

        }
      }
    }
  },
  methods: {
    createNewRow: function () {
      this.actionPlanFormat.structure.rows.push([])
    },
    createTableId: function (tableId, rowId) {
      console.log(this.actionPlanFormat)

      switch (tableId) {
        case 1:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'vertical',
            type: 'Table1Row',
            permission: 'test'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break
        case 2:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'horizontal',
            type: 'SimpleRow',
            permission: 'test'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break
        case 3:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'responsable',
            type: 'Table3Rows',
            permission: 'test'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break
        case 4:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'title',
            type: 'Label',
            permission: 'test'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break
        case 5:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'corrections',
            type: 'Table5Rows',
            permission: 'test',
            mainTitle: 'Corrección inmediata'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break

        case 6:
          this.actionPlanFormat.structure.rows[rowId].push({
            name: 'Observación',
            fieldType: 'activities',
            type: 'Table5Rows',
            permission: 'test',
            mainTitle: 'Acciones para eliminar la causa raiz'
          })
          console.log(this.actionPlanFormat.structure.rows)
          break

        default:
          break
      }
    },
    deleteTable: function (tableId, rowId) {
      console.log(tableId + ' ' + rowId)
      this.$delete(this.actionPlanFormat.structure.rows[rowId], tableId)
    },
    deleteRow: function (rowId) {
      this.$delete(this.actionPlanFormat.structure.rows, rowId)
    },
    createInnerRow: function (rowId) {
      this.actionPlanFormat.structure.rows.splice(rowId + 1, 0, [])
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
        table5RowsCorrection: true,
        table1Row: true
      }
      this.actionPlanFormat.structure.rows.forEach(row => {
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
          } else if (col.type === 'SimpleRow' && row.length === 1) {
            availablesTable.table1Row = false
          }
        })
      })
      console.log(availablesTable)
      return availablesTable
    },
    saveFormat () {
      const headers = {
        'x-access-token': this.$store.state.token
      }
      axios.put(
        backendURL + '/api/action-plan-formats/' + this.$router.currentRoute.query.id,
        this.actionPlanFormat,
        {
          headers: headers
        }
      )
    },
    getFormatData () {
      console.log(this.$router.currentRoute.query.id)
      const headers = {
        'x-access-token': this.$store.state.token
      }
      axios.get(
        backendURL + '/api/action-plan-formats/' + this.$router.currentRoute.query.id,
        {
          headers: headers
        }

      ).then(response => {
        this.actionPlanFormat = response.data
        if (this.actionPlanFormat.structure.rows === undefined) {
          this.actionPlanFormat.structure = {
            rows: [[]]
          }
        }
      })
    }
  },

  beforeMount () {
    this.getFormatData()

    console.log(this.actionPlanFormat)
  }
}
</script>
