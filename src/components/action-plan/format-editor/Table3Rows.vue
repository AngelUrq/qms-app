<template>
<div>
<v-card class="text-center white--text py-2" color="light-blue darken-4" >Responsable de seguimiento</v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr  >
            <th class="text-left" v-for="(title, titleId) in titles" :key="titleId">
              <v-col>
              {{title}}
              </v-col>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
        </tbody>
      </template>
    </v-simple-table>
</div>
  </template>

<script>
export default {
  data () {
    return {
      titles: ['Nombre', 'Puesto', 'Firma']
    }
  }
}
</script>

<style>
</style>
