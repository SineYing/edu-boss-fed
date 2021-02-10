import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}
// 用户登录
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data),
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
  })
}
// 退出
export const logout = () => {
  return request({
    method: 'POST',
    url: '/front/user/logout',
  })
}
