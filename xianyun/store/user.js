// 用户管理
export const state = () => ({
  // 采用接口返回的数据
  userInfo: {
    token: '',
    user: {}
  }
})
export const mutations = {
  // 保存用户信息到state
  setUserInfo (state, data) {
    state.userInfo = data
  },
  clearUserInfo (state, info) {
    if (process.browser) {
      localStorage.removeItem('userInfo')
    }
    state.userInfo = {}
  }
}

export const actions = {
  // 登录
  login ({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then((res) => {
      console.log(res)
      const data = res.data
      // 保存数据到state
      commit('setUserInfo', data)
      return data
    })
  }
}
