import type { LoginForm } from '@/type/login'
import request from '..'

export function login<T>(param: LoginForm) {
  return request.post<T>('/login', param)
}
