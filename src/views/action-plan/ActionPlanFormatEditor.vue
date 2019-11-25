<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <div>
        <v-col cols="12">
          <v-toolbar extended color="light-blue darken-4" class="white--text">
            <v-toolbar-title>Editor de formatos</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
              <v-btn
                class="ma-2 yellow"
                outlined
                large
                fab
                color="indigo"
                v-on:click="createNewRow()"
              >
                <v-icon>mdi-table-row-plus-after</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>
      </div>
      <v-row v-for="(row, rowId) in rows" :key="rowId">
        <v-col v-for="(col,colId) in row" :key="colId">
         <component v-bind:is="col.type" />
        </v-col>
        <v-spacer v-if="row.length == 0"></v-spacer>
        <v-col md="1">
          <v-row>
            <FormatOptions
              @createTableId="createTableId"
              @deleteTable="deleteTable"
              :idRow="rowId"
            />
          </v-row>
          <v-row>
            <v-btn class="mr-4 mb-2 ml-4" outlined fab x-small color="light-blue darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mr-4 mb-2 ml-4" outlined fab x-small color="light-blue darken-4">
              <v-icon>mdi-table-row-plus-after</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <SimpleRow/>
  </v-container>
</template>

<script>
import FormatOptions from './FormatOptions'
import Table1Row from './Table1Rows'
import SimpleRow from './SimpleRow'
export default {
  components: {
    FormatOptions,
    Table1Row,
    SimpleRow
  },
  data () {
    return {
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
      this.rows[rowId].push({
        id: 'test',
        type: 'Table1Row',
        permission: 'test'
      })
      console.log(this.rows)
    },
    deleteTable: function (tableId, rowId) {
      console.log(tableId + ' ' + rowId)
      this.$delete(this.rows[rowId], tableId)
    }
  }
}
</script>
