<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      right="right"
      top="top"
      :color="notificationColor"
      :timeout="10000"
    >
      <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
      {{ notificationText }}
      <v-btn icon @click="snackbar = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>

    <v-row class="justify-center" no-gutters>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-text-field solo v-model="filename" placeholder="Nombre del archivo" class="pa-1"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          :color="isDataSaved"
          @click="saveDataLocally"
        >{{ saveButtonText }}</v-btn>
      </v-col>
    </v-row>

    <div class="document-editor">
      <div class="document-editor__toolbar"></div>
      <div class="document-editor__editable-container">
        <div class="document-editor__editable"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from 'ckeditor5-build-decoupled-document-qms-version/build/ckeditor'
import axios from 'axios'

import { backendURL } from '@/data.js'

export default {
  data: function () {
    return {
      id: 0,
      editor: null,
      loader: null,
      loading: false,
      data: '',
      temporalData: '',
      saveButtonText: 'Guardar',
      filename: '',
      isFileCreated: false,
      notificationText: '',
      notificationColor: '',
      snackbar: false
    }
  },
  mounted: function () {
    var self = this

    DecoupledEditor.create(
      document.querySelector('.document-editor__editable'),
      {
        autosave: {
          waitingTime: 500,
          save (editor) {
            self.temporalData = editor.getData()

            self.saveButtonText =
              (self.temporalData === self.data) && self.isFileCreated
                ? 'Guardado'
                : 'Guardar'
          }
        }
      }
    )
      .then(editor => {
        const toolbarContainer = document.querySelector(
          '.document-editor__toolbar'
        )

        toolbarContainer.appendChild(editor.ui.view.toolbar.element)

        window.editor = editor
        this.editor = editor
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        if (this.$route.params.create) {
          let structure = this.$route.params.structure

          let data =
            '<h2 style="text-align:center;"><strong>' +
            structure.title +
            '</strong></h2>'

          for (let subtitle of structure.subtitles) {
            data += '<h3><strong>' + subtitle + '</strong></h3><p>&nbsp;</p>'
          }

          this.editor.data.set(data)
        }

        if (this.$route.params.load) {
          let report = this.$route.params.report

          this.id = report._id
          this.filename = report.filename
          this.data = report.data
          this.temporalData = report.data
          this.isFileCreated = true

          this.editor.data.set(report.data)
        }
      })
  },
  methods: {
    startLoadingAnimation: function () {
      this.loader = 'loading'
    },
    stopLoadingAnimation: function () {
      const loader = this.loader

      this[loader] = false
      this.loader = null
    },
    showNotificationError: function (message) {
      this.notificationText = message
      this.notificationColor = 'error'
      this.snackbar = true
    },
    createFile: function () {
      let filename = this.filename
      let data = this.data
      let actualDate = new Date()

      let report = { filename, data, 'creationDate': actualDate, 'lastModificationDate': actualDate }
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.post(backendURL + '/api/reports', report, config)
        .then(response => {
          if (response.data.created) {
            this.id = response.data.id
            this.isFileCreated = true
          } else {
            this.showNotificationError('¡No se pudo crear el archivo en la base de datos!')
          }
        })
        .catch(error => {
          console.log(error)
          this.showNotificationError('¡Error al enviar el informe!')
        })
    },
    saveFile: function () {
      let filename = this.filename
      let data = this.data
      let actualDate = new Date()

      let report = { filename, data, 'lastModificationDate': actualDate }
      let config = { headers: { 'x-access-token': this.$store.state.token } }

      axios.patch(backendURL + '/api/reports/' + this.id, report, config)
        .then(response => {
          if (!response.data.updated) {
            this.showNotificationError('¡No se pudo guardar el archivo!')
          }
        })
    },
    saveDataLocally: function () {
      if (this.saveButtonText === 'Guardar') {
        if (this.filename !== '') {
          this.snackbar = false
          this.data = this.editor.getData()

          this.startLoadingAnimation()

          if (!this.isFileCreated) {
            this.createFile()
          } else {
            this.saveFile()
          }

          this.stopLoadingAnimation()

          this.saveButtonText = 'Guardado'
        } else {
          this.showNotificationError('¡Debes ingresar el nombre del archivo!')
        }
      }
    }
  },
  computed: {
    isDataSaved: function () {
      return this.saveButtonText === 'Guardar' ? 'success' : 'accent'
    }
  },
  watch: {
    loader () {
      const loader = this.loader
      this[loader] = !this[loader]
    }
  }
}
</script>

<style>
.document-editor {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);

  /* This element is a flex container for easier rendering. */
  display: flex;
  flex-flow: column nowrap;
}

.document-editor__toolbar {
  /* Make sure the toolbar container is always above the editable. */
  z-index: 1;

  /* Create the illusion of the toolbar floating over the editable. */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

  /* Use the CKEditor CSS variables to keep the UI consistent. */
  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

/* Adjust the look of the toolbar inside the container. */
.document-editor__toolbar .ck-toolbar {
  border: 0;
  border-radius: 0;
}

/* Make the editable container look like the inside of a native word processor application. */
.document-editor__editable-container {
  padding: calc(2 * var(--ck-spacing-large));
  background: var(--ck-color-base-foreground);

  /* Make it possible to scroll the "page" of the edited content. */
  overflow-y: scroll;
}

.document-editor__editable-container .ck-editor__editable {
  /* Set the dimensions of the "page". */
  width: 75%;
  min-height: 21cm;

  /* Keep the "page" off the boundaries of the container. */
  padding: 1cm 2cm 2cm;

  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;

  /* The "page" should cast a slight shadow (3D illusion). */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);

  /* Center the "page". */
  margin: 0 auto;
}

/* Set the default font for the "page" of the content. */
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* Adjust the headings dropdown to host some larger heading styles. */
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  line-height: calc(
    1.7 * var(--ck-line-height-base) * var(--ck-font-size-base)
  );
  min-width: 6em;
}

/* Scale down all heading previews because they are way too big to be presented in the UI.
Preserve the relative scale, though. */
.document-editor
  .ck-heading-dropdown
  .ck-list
  .ck-button:not(.ck-heading_paragraph)
  .ck-button__label {
  transform: scale(0.8);
  transform-origin: left;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 .ck-button__label {
  font-size: 2em;
  font-weight: normal;
}

.document-editor .ck-content h2 {
  line-height: 1.37em;
  padding-top: 0.342em;
  margin-bottom: 0.142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 .ck-button__label {
  font-size: 1.5em;
  font-weight: normal;
}

.document-editor
  .ck-heading-dropdown
  .ck-heading_heading2.ck-on
  .ck-button__label {
  color: var(--ck-color-list-button-on-text);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
  line-height: 1.7em;
  padding-top: 0.171em;
  margin-bottom: 0.357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 .ck-button__label {
  font-size: 1.31em;
  font-weight: bold;
}

.document-editor .ck-content h4 {
  line-height: 1.24em;
  padding-top: 0.286em;
  margin-bottom: 0.952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p {
  font-size: 1em;
  line-height: 1.63em;
  padding-top: 0.5em;
  margin-bottom: 1.13em;
}

/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
  font-family: Georgia, serif;
  margin-left: calc(2 * var(--ck-spacing-large));
  margin-right: calc(2 * var(--ck-spacing-large));
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
