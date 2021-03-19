<template>
  <div class="mt-10">
    <v-snackbar
      right
      top
      v-model="snack"
      v-if="validation.active"
      :type="validation.type"
      :color="validation.type"
    >
      <b>{{ validation.message }}</b>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { ValidationMessageModule } from '@/store/modules/validation/ValidationMessageModule'

@Component({
  name: 'ValidationMessage'
})
export default class ValidationMessage extends Vue {
  validationModule = getModule(ValidationMessageModule, this.$store)

  get validation() {
    return this.validationModule.validation
  }

  get snack() {
    return this.validationModule.snack
  }

  @Watch('validation')
  updateValidation() {
    setTimeout(() => {
      this.validation.active = false
    }, this.validation.duration)
  }

  mounted() {

  }

}
</script>

<style scoped>

</style>
