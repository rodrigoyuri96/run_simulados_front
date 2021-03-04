import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Option from "@/models/question/Option";
import {OptionType} from "@/models/question/OptionType";
import OptionTable from "@/models/question/OptionTable";

@Module({ name: "OptionModule", namespaced: true })

export class OptionModule extends VuexModule {
    _options: Option[] = []
    _option: Option = {
        description: "",
        isCorrectAnswer: false,
        urlImage: "",
        optionType: OptionType.DESCRIPTION,
        table: new OptionTable()
    }
    _dialog: Boolean = false
    _validUpdate: Boolean = false
    _dialogOptionTableType: String = "CONTENT"

    get options() {
        return this._options
    }

    get option() {
        return this._option
    }

    get dialog() {
        return this._dialog
    }
    get validUpdate() {
        return this._validUpdate
    }

    get dialogOptionTableType(){
      return this._dialogOptionTableType
    }

    @Mutation
    setDialogOptionTableType(newValue: String) {
      this._dialogOptionTableType = newValue
    }

    @Mutation
    setValidUpdate(newValue: Boolean) {
        this._validUpdate = newValue
    }

    @Mutation
    setOption(newOption: Option) {
        this._option = newOption
    }

    @Mutation
    _addOption(newOption: Option) {
        this._options.push(newOption)
    }

    @Mutation
    _removeOption(index: number) {
        this._options.splice(index, 1)
    }

    @Mutation
    setOptions(options: Option[]) {
        this._options = options
    }

    @Mutation
    setDialog(newValue: Boolean) {
        this._dialog = newValue
    }

    @Mutation
    updateOption(newValue: Option, index: number) {
        this.options[index] = newValue
    }

    @Action({commit: "_addOption"})
    saveOption() {
        return this._option
    }

    @Action({commit: "setDialog"})
    openDialog(newValue: Boolean) {
        return newValue
    }

    @Action({commit: "_removeOption"})
    removeOption(index: number) {
        return index
    }

    @Action({commit: "setValidUpdate"})
    validUpdateOption(newValue: Boolean) {
        return newValue
    }

    @Action({commit: 'setOptions'})
    findAll() {
        const option = new Option(OptionType.DESCRIPTION)
        option.description = "O Budismo";

        const option2 = new Option(OptionType.DESCRIPTION)
        option2.description = "O Cristianismo"
        option2.isCorrectAnswer = true

        const option3 = new Option(OptionType.DESCRIPTION)
        option3.description = "O Islamismo"

        const options: Option[] = []
        options.push(option, option2, option3);
        return options
    }


}
