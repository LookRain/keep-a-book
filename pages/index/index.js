//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Helsslo World',
    userInfo: {},
    userRaw: {},
    allTransactions: '',

    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: true,
    loading: false
  },
  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  goToHistory: () => {
    console.log('go to')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    
    let uri = 'http://localhost:5000/all-transaction'


    wx.request({
      url: uri,
      header: {
        'content-type': 'application/json'
      },
      data: '',

      success: res => {
        console.log('haha' + res.statusCode)
        this.setData({
          allTransactions: JSON.stringify(res.data)
        })
      }
    })

    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        userRaw: userInfo.data.openid
      })
    })
  }
})

