//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    fakeData: ''
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
    
    let uri = 'https://jsonplaceholder.typicode.com/posts/1'

    wx.request({
      url: uri,
      header: {
        'content-type': 'application/json'
      },
      data: '',

      success: res => {
        console.log('haha' + res.statusCode)
        this.setData({
          fakeData: JSON.stringify(res.data)
        })
      }
    })

    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
