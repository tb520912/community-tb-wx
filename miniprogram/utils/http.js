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
    if (res.statusCode === 200) {
        return res.data
    }
}
wx.http = http
export default http