import axios from 'axios'
import { AxiosResponse } from 'axios';

export abstract class RunService<T> {
  private path: string

  protected constructor(path: string) {
    this.path = path;
  }

  delete(id: String): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.delete(`${this.path}/${id}`).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  findAll(): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.get(this.path).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  findById(id: String): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.get(`${this.path}/${id}`).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  save(dto: T): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.post(this.path, dto).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  update(dto: T): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.put(this.path, dto).then(res=>{
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }




}
