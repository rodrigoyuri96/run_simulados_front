<template>
  <div class="mt-10">
    <v-alert
      v-if="validation.active"
      :type="validation.type"
      class="transition-swing"
      transition="scroll-x-reverse-transition"
      dismissible
      elevation="24"
      border="left"
    >
      {{ validation.message }}
    </v-alert>
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
