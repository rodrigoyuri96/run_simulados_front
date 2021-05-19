import {Pagination} from "@/models/Pagination";
import QuestionRegisterModel from "@/models/question.register.model";

export class QuestionListModel{
  data: QuestionRegisterModel[]
  pagination: Pagination

  constructor(data: QuestionRegisterModel[], pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }

}
