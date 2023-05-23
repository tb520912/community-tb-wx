const app = getApp()

Page({
  data: {
    avatar: '',
    nickName: ''
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onLoad () {
    app.token && this.getUserProfile()
  },
  // 获取用户信息
  async getUserProfile() {
    const {code, data: {avatar, nickName}} = await wx.http.get('/userInfo')
    if (code != 10000) return wx.utils.toast()
    this.setData({
      avatar,
      nickName
    })
  },
})
