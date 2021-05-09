import store from '@/store'
import axios from 'axios'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'
const TimeOut = 3600000 // 定义超时时间 1个小时
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 如果用户登录了
  console.log(store.getters.token)
  if (store.getters.token) {
    var currentTime = Date.now() // 当前时间戳
    if (currentTime - getTimeStamp() > TimeOut) {
      store.dispatch('user/logout') // 登出操作
      router.push('/login')
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
  }
  // 在发送请求之前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    return Promise.reject(new Error(message))
  }
}, function(error) {
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
})

export default service
