import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import ValidationMessage from '@/models/validation/ValidationMessage'
import { TypeMessage } from '@/models/validation/TypeMessage'

@Module({ name: 'ValidationMessageModule', namespaced: true })
export class ValidationMessageModule extends VuexModule {
    _validation: ValidationMessage = new ValidationMessage('', TypeMessage.SUCCESS, false)
    _snack: boolean = false

    get validation() {
      return this._validation
    }

    get snack() {
      return this._snack
    }

    @Mutation
    setValidation(newValue: ValidationMessage) {
      this._validation = newValue
    }

    @Mutation
    setSnack(newValue: boolean) {
      this._snack = newValue
    }
    @Action({ commit: 'setSnack' })
    openSnack(newValue: boolean) {
      return newValue
    }

}
