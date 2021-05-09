// vuex不能刷新，所以我们在操作的时候还需要放到缓存
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// $store.state.user.token
// $store.state.user.userInfo
const state = {
  token: getToken(),
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// actions是异步
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    // 写入时间戳
    setTimeStamp() // 将当前的最新时间写入缓存
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context) {
    // 删除token,删除用户信息
    context.commit('removeToken')
    context.commit('reomveUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
