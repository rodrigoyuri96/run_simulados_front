<template>
  <div class="mt-10">
    <v-snackbar
      style="font-size: 1.25rem"
      top
      centered
      v-model="snack"
      v-if="validation.active"
      :type="validation.type"
      :color="validation.type"
    >
      <h3>{{ validation.message }}</h3>
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