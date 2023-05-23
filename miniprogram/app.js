/*
 * @Author: 田斌 tianbin0912@163.com
 * @Date: 2023-05-22 16:06:18
 * @LastEditors: 田斌 tianbin0912@163.com
 * @LastEditTime: 2023-05-23 10:48:07
 * @FilePath: \wx_app\enjoy-plus\miniprogram\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    this.refreshToken = wx.getStorageSync('refreshToken')
    console.log(this.token, 'this.token');
  },
  setToken (key, token) {
    this[key] = token
    wx.setStorageSync(key, token)
  }
})
