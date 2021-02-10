import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import { Message } from 'element-ui'
// 刷新token
function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token,
    }),
  })
}

// 重定向到login
function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  })
}
const request = axios.create({
  /**
 * 配置选项
 */
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 记录刷新状态中
let refreshing = false
// 记录挂起的请求
let waitingF: any[] = []
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  console.dir(error)
  // 响应码超出2**
  if (error.response) { // 请求发出去并有响应，超出2**
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 没有token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 获取新的token
      if (!refreshing) {
        refreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新Token失败')
          }
          refreshing = false
          store.commit('setUser', res.data.content)
          // 刷新token成功，执行所有的挂起请求
          waitingF.forEach(cb => cb())
          // 挂起请求执行完成，重置waitingF数组
          waitingF = []
          console.dir(error, 'errorerrorerror')
          // error.config包含了请求参数，这里直接通过request再次发出请求
          return request(error.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        })
      }
      // 刷新状态下把请求挂起到waitingF数组中
      return new Promise(resolve => {
        waitingF.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有相应

  } else { // 在设置请求时发生了一些事情，出发了一个错误

  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
