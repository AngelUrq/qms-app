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
              <component
                v-bind:is="col.type"
                :mainTitle="col.mainTitle"
                :ref="col.id"
                :idCol="colId"
                :idRow="rowId"
                :newTitle = "col.name"
              />
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
import FormatOptions from '@/components/action-plan/format-editor/FormatOptions'
import Table1Row from '@/components/action-plan/format-editor/Table1Rows'
import SimpleRow from '@/components/action-plan/format-editor/SimpleRow'
import Label from '@/components/action-plan/format-editor/Label'
import Table5Rows from '@/components/action-plan/format-editor/Table5Rows'
import Table3Rows from '@/components/action-plan/format-editor/Table3Rows'
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
      actualColId: 0,
      actionPlanFormat: {
        id: 1,
        name: 'test',
        creationDate: 2018 / 10 / 10,
        lastModificationDate: 2015 / 20 / 10,
        structure: {}
      }
    }
  },
  methods: {
    createNewRow: function () {
      this.actionPlanFormat.structure.rows.push([])
    },
    createTableId: function (tableId, rowId) {
      switch (tableId) {
        case 1:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'vertical',
            type: 'Table1Row',
            value: ''
          })
          console.log(this.actionPlanFormat.structure.rows)
          break
        case 2:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'horizontal',
            type: 'SimpleRow',
            value: ''
          })
          break
        case 3:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'responsible',
            type: 'Table3Rows',
            value: []
          })
          break
        case 4:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'title',
            type: 'Label',
            value: ''
          })
          break
        case 5:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'corrections',
            type: 'Table5Rows',
            mainTitle: 'Corrección inmediata',
            value: []
          })
          break

        case 6:
          this.actionPlanFormat.structure.rows[rowId].push({
            id: this.getIdCol(),
            name: 'Observación',
            fieldType: 'actions',
            type: 'Table5Rows',
            mainTitle: 'Acciones para eliminar la causa raiz',
            value: []
          })
          break

        default:
          break
      }
    },
    deleteTable: function (tableId, rowId) {
      this.$delete(this.actionPlanFormat.structure.rows[rowId], tableId)
    },
    deleteRow: function (rowId) {
      this.$delete(this.actionPlanFormat.structure.rows, rowId)
    },
    createInnerRow: function (rowId) {
      this.actionPlanFormat.structure.rows.splice(rowId + 1, 0, [])
    },
    IsFreeForTable (row) {
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
      return availablesTable
    },
    saveFormat () {
      this.updateTitle()
      this.actionPlanFormat.structure.lastModificationDate = new Date()
      const headers = {
        'x-access-token': this.$store.state.token
      }
      axios.put(
        backendURL +
          '/api/action-plan-formats/' +
          this.$router.currentRoute.query.id,
        this.actionPlanFormat,
        {
          headers: headers
        }
      )
    },
    updateTitle () {
      Object.keys(this.$refs).forEach(el => {
        if (this.$refs[el][0] !== undefined) {
          const idRow = this.$refs[el][0].$attrs.idRow
          const idCol = this.$refs[el][0].$attrs.idCol
          if (this.$refs[el][0].$data.title !== undefined) {
            this.actionPlanFormat.structure.rows[idRow][idCol].name =
        this.$refs[el][0].$data.title
          }
        }
      })
    },
    getIdCol () {
      this.actionPlanFormat.structure.rows.forEach(row => {
        row.forEach(col => {
          this.actualColId += 1
        })
      })
      return this.actualColId + 1
    },
    getFormatData () {
      const headers = {
        'x-access-token': this.$store.state.token
      }
      axios
        .get(
          backendURL +
            '/api/action-plan-formats/' +
            this.$router.currentRoute.query.id,
          {
            headers: headers
          }
        )
        .then(response => {
          this.actionPlanFormat = response.data
          if (this.actionPlanFormat.structure.rows === undefined) {
            this.actionPlanFormat.structure = {
              rows: [[]]
            }
          }
          let idColId = 0
          this.actionPlanFormat.structure.rows.forEach(row => {
            row.forEach(col => {
              idColId += 1
            })
          })
          this.actualColId = idColId
        })
    }
  },
  beforeMount () {
    this.getFormatData()
  }
}
</script>
