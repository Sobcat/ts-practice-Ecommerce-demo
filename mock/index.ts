import { MockMethod } from 'vite-plugin-mock'
import mock from 'mockjs'

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
    response: () => {
      return [{ name: '商品1' }, { name: '商品2' }, { name: '商品3' }, { name: '商品4' }]
    }
  }
] as MockMethod[]
