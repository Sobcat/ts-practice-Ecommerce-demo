import { MockMethod } from 'vite-plugin-mock'
import mock from 'mockjs'
import type { ListData } from '../src/type/goods'

const baseURL = '/mock'
export default [
  {
    method: 'post',
    url: baseURL + '/login',
    response: () => {
      return { isAuth: true, mes: 'success' }
    }
  },
  {
    method: 'post',
    url: baseURL + '/getGoods',
    response: (config) => {
      const { page, pagesize } = config.body
      const arr: ListData[] = []
      for (let i = 10 * (page - 1); i < 10 * (page - 1) + pagesize; i++) {
        arr.push({
          userId: i,
          id: i,
          title: '商品' + i,
          introduce: '真好用'
        })
      }
      return arr
    }
  }
] as MockMethod[]
