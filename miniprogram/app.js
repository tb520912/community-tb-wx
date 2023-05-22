// app.js
import './utils/utils.js'
import './utils/http.js'
App({
  globalData: {},
  onLaunch() {
    // 读取本地存储的token
    this.getToken()
  },
  getToken () {
    this.token = wx.getStorageSync('token')
    console.log(this.token, 'this.token');
  },
  setToken (key, token) {
    this[key] = token
    wx.setStorageSync(key, token)
  }
})
