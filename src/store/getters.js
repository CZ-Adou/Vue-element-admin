const getters = { // 快捷访问
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // user就是命名空间
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto
}
export default getters
