import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import QuestionRegisterModel from "@/models/question.register.model"
import {RegisterStatusEnum} from "@/models/register.status.enum";
import Axios, {AxiosResponse} from "axios";
import {QuestionListModel} from "@/models/question/question.list.model";
import {Pagination} from "@/models/Pagination";
import {PaginationService} from "@/service/pagination.service";


@Module({ name: 'QuestionModule', namespaced: true})
export class QuestionModule extends VuexModule {
    _questions: QuestionRegisterModel[] = []
    _question: QuestionRegisterModel = new QuestionRegisterModel()
    _pagination: Pagination = new Pagination()
    _validField: boolean = false
    _dialog: boolean = false
    _registerStatus: RegisterStatusEnum = RegisterStatusEnum.INSERT
    _index: number = -1
    _validUpdate: boolean = false

    get pagination(){
      return this._pagination
    }

    get dialog(){
        return this._dialog
    }

    get questions(){
        return this._questions
    }

    get question(){
        return this._question
    }

    get registerStatus(){
        return this._registerStatus
    }

    get validUpdate(){
        return this._validUpdate
    }

    @Mutation
    setPagination(newValue: Pagination){
      this._pagination = newValue
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
    setQuestion(newQuestion: QuestionRegisterModel){
        this._question = newQuestion
    }

    @Mutation
    _addToQuestion(newQuestion: QuestionRegisterModel){
        this._questions.push(newQuestion)
    }

    @Mutation
    _setQuestions(questions: QuestionRegisterModel[]){
        this._questions = questions
    }

    @Mutation
    setDialog(newValue: boolean){
        this._dialog = newValue
    }

    @Mutation
    setRegisterStatus(newValue: RegisterStatusEnum){
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


    @Action
    async findAll(){
      await Axios.get<QuestionListModel>("/questoes/paginadas").then(res=>{
        this._setQuestions(res.data.data)
        this.setPagination(res.data.pagination)
      })

      console.log(this.pagination)
    }

    @Action
    async findByPage(page: number, pageSize: number){
      await PaginationService.findPage(this.pagination.links.host, page, pageSize).then(res=>{
        this._setQuestions(res.data.data)
        this.setPagination(res.data.pagination)
      }).catch(error=>{
        console.log(error)
      })

    }

    @Action
    async nextPage(pageSize?: number){
      await PaginationService.next(this.pagination.links.next, pageSize ).then(res=>{
        this._setQuestions(res.data.data)
        this.setPagination(res.data.pagination)
      }).catch(error=>{
        console.log(error)
      })
    }

    @Action
    async previousPage(pageSize?: number){
      await PaginationService.previous(this.pagination.links.previous, pageSize )
        .then(res=>{
          this._setQuestions(res.data.data)
          this.setPagination(res.data.pagination)
        })
    }


    @Action({commit: '_addToQuestion'})
      save(): Promise<AxiosResponse>{
      return new Promise((resolve, reject) => {
        Axios.post("/questoes", this.question).then(res=>{
          resolve(res)
        }).then(()=>{

        }).catch(error=>{
          reject(error)
        })
      })
    }
}
