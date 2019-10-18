<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="indigo darken-3"
          title="Versiones de formato para informe de auditor"
          buttonActivated="true"
          buttonColor="lime darken-4"
        >
          <v-card-title class="mb-5">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Nombre',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Version',
        value: 'version'
      },
      {
        sortable: false,
        text: 'Fecha de creacion',
        value: 'creationDate'
      },
      {
        sortable: false,
        text: 'Fecha de ultima modificacion',
        value: 'lastModificationDate'
      }
    ],
    items: [
      {
        name: 'Auditoria 2019',
        version: 'v.0.1',
        creationDate: '15/10/2019',
        lastModificationDate: '17/10/2019'
      }
    ]
  })
}
</script>

<style scoped>
</style>
