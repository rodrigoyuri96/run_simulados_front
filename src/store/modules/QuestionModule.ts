import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import QuestionRegister from "@/models/QuestionRegister"
import Discipline from "@/models/Discipline";
import Exam from "@/models/Exam";
import DisciplineRule from "@/models/DisciplineRule"
import Institution from "@/models/Institution"
import {RegisterStatus} from "@/models/RegisterStatus";

@Module({ name: 'QuestionModule', namespaced: true})
export class QuestionModule extends VuexModule {
    _questions: QuestionRegister[] = []
    _question: QuestionRegister = new QuestionRegister()
    _validField: boolean = false
    _dialog: boolean = false
    _registerStatus: RegisterStatus = RegisterStatus.INSERT
    _index: number = -1
    _validUpdate: boolean = false

    get dialog(){
        return this._dialog
    }

    get questions(){
        return this._questions
    }

    get question(){
        return this._question
    }

    get validField(){
        return this._validField
    }

    get registerStatus(){
        return this._registerStatus
    }

    get validUpdate(){
        return this._validUpdate
    }

    @Mutation
    setValidUpdate(newValue: boolean){
        this._validUpdate = newValue
    }

    @Mutation
    setValidField(newValue: boolean){
        this._validField = newValue
    }

    @Mutation
    setQuestion(newQuestion: QuestionRegister){
        this._question = newQuestion
    }

    @Mutation
    _addToQuestion(newQuestion: QuestionRegister){
        this._questions.push(newQuestion)
    }

    @Mutation
    _setQuestions(questions: QuestionRegister[]){
        this._questions = questions
    }

    @Mutation
    setDialog(newValue: boolean){
        this._dialog = newValue
    }

    @Mutation
    setRegisterStatus(newValue: RegisterStatus){
        this._registerStatus = newValue
    }


    @Action({commit: '_setQuestions'})
    findAll(){
        return []
    }

    @Action({commit: '_addToQuestion'})
    save(newQuestion: QuestionRegister){
        return newQuestion
    }
}
