Component({
  data: {
    isLogin: false
  },
  lifetimes: {
    attached() {
      // 获取登录状态
      const isLogin = !!getApp().token
      console.log(isLogin, 'isLogin');
      // 变更登录状态
      this.setData({
        isLogin
      })
      // 未登录需跳转登录
      // 获取页面栈
      const pageStack = getCurrentPages()
      // 获取当前页面
      const currentPage = pageStack.pop()
      if (!isLogin) {
        wx.navigateTo({
          url: '/pages/login/index?redirectURL=/' + currentPage.route
        })
      }
    }
  },
})
