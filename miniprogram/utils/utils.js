const utils = {
    /**
     * 用户消息反馈
     * @param {String} title 文字提示内容
     */
    toast(title = "数据加载失败...") {
        wx.showToast({
            title: title,
            icon: 'none',
            mask: true,
            duration: 2000
        })
    }

}
// 挂载到全局对象
wx.utils = utils
// 模块导出
module.exports = utils