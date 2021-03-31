import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import QuestionRegister from "@/models/QuestionRegister"
import {RegisterStatus} from "@/models/RegisterStatus";
import Axios, { AxiosResponse } from "axios";
import Question from "@/models/question/Question";


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

    @Action
    deleteQuestion(id):Promise<AxiosResponse> {
      return new Promise<AxiosResponse>((resolve, reject) => {
          Axios.delete('/questoes/' + id).then(res=>{
            resolve(res)
          }).catch(error=>{
            reject(error)
          })
      })
    }


    @Action({commit: '_setQuestions'})
    async findAll(){
      let questions: Question[] = []
      await Axios.get("/questoes").then(res=>{
        questions = res.data
      })

      console.log("questions", questions)
        return questions
    }

    @Action({commit: '_addToQuestion'})
    save(newQuestion: QuestionRegister){
        return newQuestion
    }
}
