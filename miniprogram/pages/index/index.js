Page({
    data: {
        notices: []
    },
    onLoad() {
        this.getNoticeData()
    },
    // 获取公告数据
    async getNoticeData() {
    const { code, data: notices} = await wx.http.get('/announcement')
    console.log(code, 'res');
    console.log(notices, 'notices');
    if (code != 10000) return wx.utils.toast()
    this.setData({
        notices
    })
    }
})
