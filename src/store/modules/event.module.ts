import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import EventModel from "@/models/event.model"
import { RegisterStatusEnum } from '@/models/register.status.enum'
import Axios from "@/plugins/Axios"
import { AxiosResponse } from 'axios'

@Module({ name: 'EventModule', namespaced: true })
export class EventModule extends VuexModule {
    _events: EventModel[] = []
    _event: EventModel = new EventModel()
    _validField: boolean = false
    _dialog: boolean = false
    _eventReviewDialog = false
    _registerStatus: RegisterStatusEnum = RegisterStatusEnum.INSERT
    _index = -1

    get dialog(){
        return this._dialog
    }

    get eventReviewDialog() {
        return this._eventReviewDialog
    }

    get isUpdate() {
        return this._index > -1
    }

    get index() {
        return this._index
    }

    get events(){
        return this._events
    }

    get event(){
        return this._event
    }

    get validField(){
        return this._validField
    }

    get registerStatus() {
        return this._registerStatus
      }

    @Mutation
    setRegisterStatus(newValue: RegisterStatusEnum) {
        this._registerStatus = newValue
    }

    @Mutation
    setValidField(newValue: boolean){
        this._validField = newValue
    }

    @Mutation
    setDialog(newValue: boolean){
        this._dialog = newValue
    }

    @Mutation
    setEventReviewDialog(newValue: boolean) {
        this._eventReviewDialog = newValue
    }

    @Mutation
    setEvent(newEvent: EventModel) {
      this._event = newEvent
    }

    @Mutation
    _setEvents(events: EventModel[]){
        this._events = events
    }

    @Mutation
    setIndex(newValue: number) {
        this._index = newValue
    }

    @Mutation
    _addToEvents(newEvent: EventModel) {
        this._events.push(newEvent)
    }

    @Action
    save() {
      return new Promise<AxiosResponse>(((resolve, reject) => {
          Axios.post("/eventos", this.event).then(res=>{
              resolve(res)
          }).catch(error=>{
              console.log("erro: ", error)
              reject(null)
          })
      }))
    }


    @Action
    findAll(){
        Axios.get('/eventos').then(res=>{
            this._setEvents(res.data)
        })
    }

    @Action
    delete(){
        return new Promise<Boolean>((resolve, reject) => {
            Axios.delete('/eventos/' + this.event.id).then(res=>{
                if(res.status == 200){
                    resolve(true)
                }
            }).catch(error=>{
                reject(false)
            })
        })
    }

    @Action
    update() {
        return new Promise<AxiosResponse>((resolve, reject) => {
            Axios.put('/eventos', this.event).then(res=>{
                if(res.status == 200){
                    resolve(res)
                }
            }).catch(error=>{
                reject(null)
            })
        })
    }
}
