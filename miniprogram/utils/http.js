import http from 'wechat-http'

http.baseURL = 'https://live-api.itheima.net'

// 请求拦截器
http.intercept.request = (options) => {
    // 扩展头信息
  const defaultHeader = {}
  // 身份认证
  defaultHeader.Authorization = 'Bearer ' + getApp().token
  // 与默认头信息合并
  options.header = Object.assign({}, defaultHeader, options.header)
  // 处理后的请求参数
  return options
}
// 响应拦截器
http.intercept.response = (res) => {
    if (res.statusCode === 401) {
        // 401 未授权
        // 1. 本地没有token, 直接跳转到登录页面
        if (!getApp().token) {
            wx.navigateTo({
                url: '/pages/login/index'
            })
        }
        // 2. 本地有token, 但是token过期了, 则使用refreshToken去换取新的token
        else {
            // 2.1 本地没有refreshToken, 则跳转到登录页面
            if (!getApp().refreshToken) {
                wx.navigateTo({
                    url: '/pages/login/index'
                })
            }
            // 2.2 本地有refreshToken, 则使用refreshToken去换取新的token
            else {
                // 2.2.1 使用refreshToken去换取新的token
                http({url: '/refreshToken', method: 'post', header: {Authorization: 'Bearer ' + getApp().refreshToken}}).then((res) => {
                    if (res.statusCode === 200) {
                        // 2.2.2 更新本地token
                         getApp().setToken('token', res.data.token)
                         getApp().setToken('refreshToken', res.data.refreshToken)
                        // 2.2.3 重新发起请求
                        // 1.2 获取到原来接口请求的参数
                        res.config = Object.assign(res.config, {
                            header: {
                            // 更新后的 token
                            Authorization: 'Bearer ' + res.data.token,
                            },
                        })
                        // 重新发请求
                        http(res.config)
                    }
                    else {
                        // 2.2.4 重新登录
                        wx.navigateTo({
                            url: '/pages/login/index'
                        })
                    }
                })
            }
        }
    }

    if (res.statusCode === 200) {
        return res.data
    }
}
wx.http = http
export default http