import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Option from "@/models/question/Option";

@Module({ name: "OptionModule", namespaced: true })
export class OptionModule extends VuexModule {
    _option: Option = {
        description: "",
        isCorrectAnswer: false,
        urlImage: "",
        row: []
    }
    _opts: Option[] = [];

  _dialog: Boolean = false
    _validUpdate: Boolean = false
    _dialogOptionTableType: String = "CONTENT"

    get options() {
        return this._opts
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
    addOption(newOption: Option) {
        this._opts.push(newOption)
    }

    @Mutation
    _removeOption(index: number) {
        this._opts.splice(index, 1)
    }

    @Mutation
    setOptions(options: Option[]) {
        this._opts = options
    }

    @Mutation
    setDialog(newValue: Boolean) {
        this._dialog = newValue
    }

    @Mutation
    updateOption(newValue: Option, index: number) {
        this.options[index] = newValue
    }

    @Mutation
    addRow(contentRow: string ){
      this.option.row.push(contentRow)
    }

    @Mutation
    removeRow(index: number){
      this.option.row.splice(index, 1)
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

    @Action
    findAll(){
      return []
    }


}
