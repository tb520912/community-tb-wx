import wxValidate from 'wechat-validate'
const app = getApp()
Page({
  data: {
    countDownVisible: false,
    mobile: '',
    code: '',
  },
  behaviors: [wxValidate],
  rules: {
    mobile: [
      {
        required: true,
        message: '手机号不能为空',
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '手机号格式不正确',
      }
    ],
    code: [
      {
        required: true,
        message: '验证码不能为空',
      },
      {
        pattern: /^\d{6}$/,
        message: '验证码格式不正确',
      }
    ],
  },
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  async getSMSCode () {
    console.log(222);
    const {valid, message} = this.validate('mobile')
    if (!valid) return wx.utils.toast(message)
    this.setData({
      countDownVisible: true,
    })
    // 调用接口 发送验证码
    const { code } = await wx.http.get('/code', {mobile: this.data.mobile})
    if (code != 10000) return wx.utils.toast('验证码发送失败，请稍后再试')
  },
  async login () {
    console.log(333);
    if (!this.validate) return
    console.log(444);
    const { code, data } = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.code,
    })
    if (code != 10000) return wx.utils.toast('登录失败，请稍后再试')
    wx.utils.toast('登录成功')
    app.setToken('token', data.token)
    app.setToken('refreshToken', data.refreshToken)
    // 跳回原页面
  
    if (this.redirectURL) {
      wx.redirectTo({
        url: this.redirectURL
      })
    } else {
      wx.switchTab({
        url: '/pages/home/index'
      })
    }

  },
  onLoad ({ redirectURL }) {
    console.log(redirectURL, 'redirectURL');
    this.redirectURL = redirectURL
  }
})
