import http from 'wechat-http'

http.baseURL = 'https://live-api.itheima.net'

// 响应拦截器
http.intercept.response = (res) => {
    if (res.statusCode === 200) {
        return res.data
    }
}
wx.http = http
export default http