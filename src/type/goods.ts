export interface ListData {
  userId: number
  id: number
  title: string
  introduce: string
}
export interface SearchData {
  title: string
  introduce: string
  page: number
  count: number
  pagesize: number
}
export class InitData {
  list: ListData[] = []
  search: SearchData = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pagesize: 10
  }
}
export class SearchDataInit {
  title: string = ''
  introduce: string = ''
  page: number = 1
  count: number = 0
  pagesize: number = 10
}
