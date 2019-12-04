<template>
    <v-dialog v-model="dialogChangePass" max-width="600">
      <template v-slot:activator="{ on }">
        <v-btn
        color="indigo darken-4"
        x-small
        outlined
        v-on="on"
        >
        Recordar
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="indigo darken-4 lighten-1 white--text text--lighten-1"
          primary-title
        >
          Recuperar Contraseña
        </v-card-title>
          <v-card-text>
            <v-form ref="form">
                <v-card-text class="text--primary">Se enviara un correo con su codigo de verificacion</v-card-text>
               <v-container>
                    <v-text-field color="amber accent-4" :rules="emailRules" label="Correo*" v-model="user.email" required></v-text-field>
                </v-container>
            </v-form>
          </v-card-text>
        <v-card-actions>
          <v-alert
            :value="warningAlert"
            type= "warning"
            dense
          >
            El correo es invalido
          </v-alert>
          <v-alert
            :value="successAlert"
            type="success"
            height = 50
          >
            Se envio el correo!
          </v-alert>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo darken-4 lighten-1" class="mb-3 mr-3" text @click.stop="send">Enviar
          </v-btn>
          <v-btn color="indigo darken-4 lighten-1" class="mb-3 mr-3" text @click= "dialogChangePass = false,clearFields()" >Cancelar
          </v-btn>
        </v-card-actions>
       </v-card>
       <v-dialog
       v-model="dialogConfirmCode"
       max-width="600"
       >
        <v-card>
            <v-card-title
            class="indigo darken-4 lighten-1 white--text text--lighten-1"
            primary-title
            >
            Codigo de Verificacion
            </v-card-title>
            <v-card-text>
            <v-form ref="form2">
                <v-card-text class="text--primary">Ingrese su codigo de verificacion</v-card-text>
               <v-container>
                    <v-text-field color="amber accent-4"  label="Codigo" v-model="verificationCode" required></v-text-field>
                </v-container>
            </v-form>
          </v-card-text>
            <v-card-actions>
          <v-alert
            :value="warningAlert2"
            type= "warning"
            dense
          >
            El codigo no es correcto
          </v-alert>
          <v-alert
            :value="successAlert2"
            type="success"
            height = 50
          >
            Codigo correcto!
          </v-alert>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo darken-4 lighten-1" class="mb-3 mr-3" text @click="verifyCode">Verificar
          </v-btn>
          <v-btn color="indigo darken-4 lighten-1" class="mb-3 mr-3" text @click= "dialogConfirmCode = false,clearFields()" >Cancelar
          </v-btn>
        </v-card-actions>
        </v-card>
       </v-dialog>
        <v-dialog
       v-model="dialogUpdatePass"
       max-width="600"
       >
        <v-card>
            <v-card-title
            class="indigo darken-4 lighten-1 white--text text--lighten-1"
            primary-title
            >
            Cambiar Contraseña
            </v-card-title>
            <v-card-text>
            <v-form ref="form2">
                <v-card-text class="text--primary">Ingrese su nueva contraseña</v-card-text>
               <v-container>
                    <v-text-field color="amber accent-4" :rules="passwordRules" v-model="newPass" label="Nueva Contraseña" required></v-text-field>
                    <v-text-field color="amber accent-4" v-model="confirmPass" label="Confrimar Contraseña" required></v-text-field>
                </v-container>
            </v-form>
          </v-card-text>
            <v-card-actions>
          <v-alert
            :value="warningAlert3_samePass"
            type= "warning"
            dense
          >
            La contraseña no coincide
          </v-alert>
          <v-alert
            :value="warningAlert3_passRules"
            type= "warning"
            dense
          >
            La contraseña no es valida
          </v-alert>
          <v-alert
            :value="successAlert3"
            type="success"
            height = 50
          >
            Se actualizo la contraseña
          </v-alert>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo darken-4 lighten-1" :disabled='isDisabled' class="mb-3 mr-3" @click="updatePassword" text>Actualizar
          </v-btn>
          <v-btn color="indigo darken-4 lighten-1" class="mb-3 mr-3" text @click= "dialogUpdatePass = false" >Regresar
          </v-btn>
        </v-card-actions>
        </v-card>
       </v-dialog>
     </v-dialog>
     </template>

<script>
import axios from 'axios'
import { backendURL } from '@/data.js'

export default {
  data () {
    return {
      dialogChangePass: '',
      dialogConfirmCode: '',
      dialogUpdatePass: '',
      xsdaCodeGenerated: '',
      newPass: '',
      confirmPass: '',
      warningAlert: false,
      warningAlert2: false,
      warningAlert3_samePass: false,
      warningAlert3_passRules: false,
      successAlert: false,
      successAlert2: false,
      successAlert3: false,
      isDisabled: false,
      emailRules: [
        v => !!v || 'Correo es necesario',
        v => /.+@.+\..+/.test(v) || 'Correo debe ser valido'
      ],
      passwordRules: [
        v => !!v || 'Contraseña es necesario',
        v => v.length >= 5 || 'Contraseña debe ser mas de 5 caracteres'
      ],
      user: {
        email: ''
      },
      verificationCode: ''
    }
  },
  methods: {
    sendMailVerification () {
      this.xsdaCodeGenerated = this.generateCode(10)
      const htmlBody = `
        <p>Hola!</p>
        <p>Estas en proceso de cambiar tu contraseña</p>
        <h3>Codigo de Verificacion</h3>
        <ul>
          <li> Tu codigo es: ${this.xsdaCodeGenerated}
        </ul>
        <p>Ingresa tu codigo para seguir con tu cambio de contraseña</p>
      `
      let newMail = {
        from: '"Gestion de Calidad UPB" <UPBgestiondecalidad@gmail.com>',
        to: this.user.email,
        subject: 'UPB Gestion de Calidad: Recuperar Contraseña',
        text: '',
        html: htmlBody
      }

      axios.post(backendURL + '/api/mail/send', newMail)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    generateCode (len) {
      let text = ''
      let chars = 'abcdefghijklmnopqrstuvwxyz123456789ABCDEFGH'
      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return text
    },
    clearFields () {
      this.$refs.form.resetValidation()
    },
    send () {
      if (this.$refs.form.validate()) {
        this.sendMailVerification()
        this.clearFields()
        this.successAlert = true
        this.dialogConfirmCode = true
        this.dialogChangePass = false
        setTimeout(() => {
          this.successAlert = false
        }, 10000)
      } else {
        this.warningAlert = true
        setTimeout(() => {
          this.warningAlert = false
        }, 10000)
      }
    },
    verifyCode () {
      if (this.verificationCode === this.xsdaCodeGenerated) {
        this.warningAlert2 = false
        this.successAlert2 = true
        this.xsdaCodeGenerated = ''
        this.dialogUpdatePass = true
        this.dialogConfirmCode = false
        setTimeout(() => {
          this.successAlert2 = false
        }, 10000)
      } else {
        this.successAlert2 = false
        this.warningAlert2 = true
        setTimeout(() => {
          this.warningAlert2 = false
        }, 10000)
      }
    },
    updatePassword () {
      if (this.$refs.form2.validate()) {
        if (this.newPass === this.confirmPass) {
          this.warningAlert3_samePass = false
          this.warningAlert3_passRules = false
          axios.patch(backendURL + '/api/password-reset/' + this.user.email, {
            password: this.confirmPass
          })
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })
          this.$refs.form2.resetValidation()
          this.warningAlert3_passRules = false
          this.warningAlert3_samePass = false
          this.successAlert3 = true
          this.isDisabled = true
          setTimeout(() => {
            this.successAlert3 = false
          }, 10000)
          this.user.email = ''
          this.newPass = ''
          this.confirmPass = ''
        } else {
          this.successAlert3 = false
          this.warningAlert3_samePass = true
          setTimeout(() => {
            this.warningAlert3_samePass = false
          }, 10000)
        }
      } else {
        this.successAlert3 = false
        this.warningAlert3_samePass = false
        this.warningAlert3_passRules = true
        setTimeout(() => {
          this.warningAlert3_passRules = false
        }, 10000)
      }
    }
  }
}
</script>
