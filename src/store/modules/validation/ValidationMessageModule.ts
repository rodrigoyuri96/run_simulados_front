import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import ValidationMessage from '@/models/validation/ValidationMessage'
import { TypeMessage } from '@/models/validation/TypeMessage'

@Module({ name: 'ValidationMessageModule', namespaced: true })
export class ValidationMessageModule extends VuexModule {
    _validation: ValidationMessage = new ValidationMessage('', TypeMessage.SUCCESS, false)

    get validation() {
      return this._validation
    }

    @Mutation
    setValidation(newValue: ValidationMessage) {
      this._validation = newValue
    }

}
