import Axios, { AxiosResponse } from 'axios'
/*
* objetivo: facilitar a paginacao de todos as listas
* na aplicacao
*
* */
export class PaginationService<P>{

  static findPage(path: string, page: number, numberElements: number = 10, direction: string = "ASC"){
    return new Promise<AxiosResponse>((resolve, reject) => {
      Axios.get(path, {params: {size: numberElements, direction: direction, page: page }})
        .then(res=>{
            resolve(res)
        })
        .catch(error=>{
          reject(error)
        })
    })
  }

  static next(next: string, numberElements: number = 10, direction: string = "ASC"){
    return new Promise<AxiosResponse>((resolve, reject) => {
      Axios.get(next, {params: {size: numberElements, direction: direction}})
        .then(res=>{
          resolve(res)
        })
        .catch(error=>{
          reject(error)
        })
    })
  }

  static previous(previous: string, numberElements: number = 10, direction: string = "ASC"){
    return new Promise<AxiosResponse>((resolve, reject) => {
      Axios.get(previous, {params: {size: numberElements, direction: direction}})
        .then(res=>{
          resolve(res)
        })
        .catch(error=>{
          reject(error)
        })
    })
  }
}
