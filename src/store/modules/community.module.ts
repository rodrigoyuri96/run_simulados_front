import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import CommunityModel from "@/models/community.model"
import Axios from "@/plugins/Axios"
import { AxiosResponse } from "axios"
import { RunService } from '@/service/run.service'
import {CommunityService} from '@/service/community.service'
import { RegisterStatusEnum } from '@/models/register.status.enum'

@Module({ name: 'CommunityModule', namespaced: true })
export class CommunityModule extends VuexModule {
    private service: RunService<CommunityModel> = new CommunityService()
    _communities: CommunityModel[] = []
    _community: CommunityModel = new CommunityModel()
    _dialog = false
    _registerStatus: RegisterStatusEnum = RegisterStatusEnum.INSERT
    _index = -1
    _validUpdate: boolean = false

    get dialog(){
        return this._dialog
    }

    get isUpdate() {
        return this._index > -1
    }

    get index(){
        return this._index
    }

    get communities(){
        return this._communities
    }

    get community(){
        return this._community
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
    setRegisterStatus(newValue: RegisterStatusEnum){
        this._registerStatus = newValue
    }

    @Mutation
    setDialog(newValue: boolean) {
      this._dialog = newValue
    }

    @Mutation
    setIndex(newValue: number) {
      this._index = newValue
    }

    @Mutation
    setCommunity(newCommunity: CommunityModel){
        this._community = newCommunity
    }

    
    @Mutation
    setCommunities(newCommunity: CommunityModel[]){
        this._communities = this.communities
    }
    
    @Mutation
    addToCommunities(newCommunity: CommunityModel) {
      this._communities.push(newCommunity)
    }

    @Action({commit: "addToCommunities"})
    save():Promise<AxiosResponse> {
        return new Promise<AxiosResponse> ((resolve, reject) => {
            this.service.save(this.community).then(res =>{
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    }

    @Action({commit:"setCommunities"})
    findAll() {
        return new Promise<CommunityModel>(((resolve, reject) => {
          this.service.findAll().then(res=>{
            resolve(res.data)
            return res.data
          }).catch(error=>{
            reject(error)
            console.log(error)
          })
        }))
     }

     @Action
     delete(id):Promise<AxiosResponse> {
       return new Promise<AxiosResponse>((resolve, reject) => {
           Axios.delete('/comunidades/' + id).then(res=>{
             resolve(res)
           }).catch(error=>{
             reject(error)
           })
       })
     }

     @Action
    update(){
      return new Promise<AxiosResponse>((resolve, reject) => {
        Axios.put('/comunidades', this.community).then(res=>{
          if(res.status == 200){
            resolve(res)
          }
        }).catch(error=>{
          reject(null)
        })
      })
    }
}