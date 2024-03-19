import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: '/mock',
  timeout: 5000
})
//请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || ''
    config.headers.token = token
    return config
  },
  (err) => {
    console.log(err)
  }
)
//响应拦截
service.interceptors.response.use(
  (res) => {
    const status = res.status
    if (status !== 200) {
      return Promise.reject(res)
    }
    return res.data
  },
  (err) => {
    console.log(err)
  }
)
// 改变返回的类型，由调动接口时的传入类型决定返回什么类型
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request(config)
}
request.post = <T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
  return service.post(url, data, config)
}

export default request
