<template>
  <v-col >
          <v-text-field
            label="Outlined"
            single-line
            outlined
            v-model="title"
          ></v-text-field>
        </v-col>
</template>

<script>
export default {
  data () {
    return {
      title: 'Label'
    }
  }
}
</script>

<style>

</style>
