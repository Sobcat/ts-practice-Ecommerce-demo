import request from '..'

export function getGoods<T>(param?: object) {
  return request.post<T>('/getGoods', param)
}
