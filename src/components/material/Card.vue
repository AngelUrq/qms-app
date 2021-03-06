<template>
  <v-card :style="styles" v-bind="$attrs" v-on="$listeners">
    <helper-offset v-if="hasOffset" :inline="inline" :full-width="fullWidth" :offset="offset">
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :elevation="elevation"
        class="v-card--material__header d-flex align-center"
        dark
        min-height="80"
      >
        <slot v-if="!title && !text" name="header" />
        <div v-else class="px-3">
          <h4 class="title font-weight-light mb-2" v-text="title" />
          <p class="category font-weight-thin mb-0" v-text="text" />
        </div>
        <v-row class="pr-5" v-if="buttonActivated" justify="end">
          <v-dialog v-model="dialog" max-width="60%">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-2" fab dark v-on="on" :color="buttonColor">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <RegisterReportFormat @update-report-format-list="closeReportFormatRegister" @ v-if="reportFormatActionsActivated" />
            <NonconformityEditor v-if="nonconformityEditorActivated" />
            <RegisterActionPlan @updateList="updateList" v-if="actionPlanMakerActived" />
            <RegisterActionPlanFormat
              @saveActionPlanFormat="saveActionPlanFormat"
              v-if="formatManagerActived"
            />
          </v-dialog>
        </v-row>
      </v-card>
      <slot v-else name="offset" />
    </helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider v-if="$slots.actions" class="mx-3" />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import RegisterReportFormat from '@/components/reports/format/RegisterReportFormat'
import NonconformityEditor from '@/views/reports/nonconformities/NonconformityEditor'
import RegisterActionPlanFormat from '@/components/action-plan/manager/RegisterActionPlanFormat'
import RegisterActionPlan from '@/components/action-plan/manager/RegisterActionPlan'

export default {
  name: 'MaterialCard',
  components: {
    RegisterReportFormat,
    NonconformityEditor,
    RegisterActionPlanFormat,
    RegisterActionPlan
  },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    buttonActivated: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: undefined
    },
    reportFormatActionsActivated: {
      type: Boolean,
      default: false
    },
    nonconformityEditorActivated: {
      type: Boolean,
      default: false
    },
    formatManagerActived: {
      type: Boolean,
      default: false
    },
    actionPlanMakerActived: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    saveActionPlanFormat (name) {
      this.$emit('saveActionPlanFormat', name)
    },
    updateList () {
      this.$emit('updateList')
    },
    closeReportFormatRegister () {
      this.dialog = false
      this.$emit('update-report-format-list')
    }
  },
  computed: {
    hasOffset () {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      )
    },
    styles () {
      if (!this.hasOffset) return null

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      }
    }
  }
}
</script>
