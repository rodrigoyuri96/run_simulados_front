import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Event from "@/models/Event"
import { RegisterStatus } from '@/models/RegisterStatus'

@Module({ name: 'EventModule', namespaced: true })
export class EventModule extends VuexModule {
    _events: Event[] = []
    _event: Event = new Event()
    _validField: boolean = false
    _dialog: boolean = false
    _eventReviewDialog = false
    _registerStatus: RegisterStatus = RegisterStatus.INSERT
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
    setRegisterStatus(newValue: RegisterStatus) {
        this._registerStatus = newValue
    }
  
    @Mutation
    setValidField(newValue: boolean){
        this._validField = newValue
    }

    @Mutation
    setEvent(newEvent: Event){
        this._event = newEvent
    }

    @Mutation
    _setEvents(events: Event[]){
        this._events = events
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
    setIndex(newValue: number) {
      this._index = newValue
    }

    @Mutation
    _addToEvents(newEvent: Event) {
      this._events.push(newEvent)
    }

    @Action({ commit:'_addToEvents' })
    save() {
      return this.event
    }
}
