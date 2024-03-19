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
  }
] as MockMethod[]
