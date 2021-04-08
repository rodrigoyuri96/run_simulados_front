import {PaginationLinks} from "@/models/PaginationLinks";

export class Pagination{
  page: number
  totalPages: number
  totalElements: number
  pageSize: number
  links: PaginationLinks

  constructor() {
    this.page = 0;
    this.totalPages = 0;
    this.totalElements = 0;
    this.pageSize = 0;
    this.links = new PaginationLinks();
  }
}
