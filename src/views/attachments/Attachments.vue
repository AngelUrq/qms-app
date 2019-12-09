<template>
  <v-container>
    <form enctype="multipart/form-data">
      <input type="file" ref="file" id="inputfile" @change="selectFile" />
      <v-btn class="success ml-5" @click="saveFile">Subir</v-btn>
    </form>
    <v-container fill-height fluid grid-list-xl>
      <v-row justify="center">
        <v-col cols="12">
          <material-card color="deep-purple" title="Archivos adjuntos">
            <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
              ref="table"
            >
              <template v-slot:item.download="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="downloadFile(item)"
                >
                  <v-icon class="d-flex justify-end">mdi-download</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  x-small
                  text
                  icon
                  color="blue-grey lighten-1"
                  class="mr-1"
                  @click="deleteAttachment(item)"
                >
                  <v-icon class="d-flex justify-end">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'

import { backendURL } from '@/data.js'

export default {
  data: function () {
    return {
      file: '',
      headers: [
        {
          sortable: false,
          text: 'Nombre',
          value: 'originalName'
        },
        {
          sortable: true,
          text: 'Usuario',
          value: 'user'
        },
        {
          sortable: false,
          text: 'Descargar',
          value: 'download'
        },
        {
          sortable: false,
          text: 'Eliminar',
          value: 'delete'
        }
      ],
      items: []
    }
  },
  mounted: function () {
    this.getAttachments()
  },
  methods: {
    selectFile: function () {
      this.file = this.$refs.file.files[0]
    },
    getAttachments: function () {
      if (this.$route.query.actionPlanID && this.$route.query.activityID && this.$route.query.userID) {
        let config = { headers: { 'x-access-token': this.$store.state.token } }

        axios
          .get(backendURL + '/api/attachments/search/' + this.$route.query.actionPlanID + '/' + this.$route.query.activityID, config)
          .then(response => {
            this.items = []
            for (let attachment of response.data) {
              let item = attachment

              axios
                .get(backendURL + '/api/users/' + item.userID, config)
                .then(response => {
                  item.user =
                    response.data.firstNames +
                    ' ' +
                    response.data.paternalLastName +
                    ' ' +
                    response.data.maternalLastName
                  this.items.push(item)
                })
                .catch(error => {
                  console.log(error)
                })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    saveFile: function () {
      if (this.isCorrectURL()) {
        const formData = new FormData()
        formData.append('file', this.file)

        let config = {
          headers: {
            'x-access-token': this.$store.state.token
          }
        }

        axios
          .post(backendURL + '/api/attachments/upload', formData, config)
          .then(response => {
            let filePath = response.data.file.filename
            let originalName = response.data.file.originalname

            let attachment = {
              filePath: filePath,
              originalName: originalName,
              userID: this.$route.query.userID,
              actionPlanID: this.$route.query.actionPlanID,
              activityID: this.$route.query.activityID
            }

            axios
              .post(backendURL + '/api/attachments', attachment, config)
              .then(response => {
                this.file = ''
                this.getAttachments()
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    downloadFile: function (attachment) {
      var link = document.createElement('a')
      link.href =
        backendURL + '/api/attachments/download/' + attachment.filePath
      link.click()
    },
    isCorrectURL: function () {
      return (
        this.file &&
        this.$route.query.actionPlanID &&
        this.$route.query.activityID &&
        this.$route.query.userID
      )
    },
    deleteAttachment: function (attachment) {
      if (confirm('¿Quieres eliminar este archivo adjunto?')) {
        let config = { headers: { 'x-access-token': this.$store.state.token } }

        axios
          .delete(backendURL + '/api/attachments/' + attachment._id, config)
          .then(response => {
            console.log(response.data)
            this.getAttachments()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
