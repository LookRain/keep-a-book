//app.js
let secretFile = require('secrets')
let myAppId = secretFile.secrets.myAppId
let myAppSecret = secretFile.secrets.myAppSecret
console.log(secretFile.secrets.myAppId)
App({

  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
  },
  

  getUserInfo: function(cb) {
    
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {

      wx.login({
        success: function(res) {
          console.log('code is: ' + res.code)
          if (res.code) {
            //发起网络请求
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=${myAppId}&secret=${myAppSecret}&js_code=${res.code}&grant_type=authorization_code`,
              data: {
              },
              success: ress => {
                console.log('open id: ' + ress.data.openid)
                that.globalData.userInfo = ress
                typeof cb == "function" && cb(that.globalData.userInfo)
              }

            })
            // console.log(JSON.stringify(res.code))
            // that.globalData.userInfo = res.code
            // typeof cb == "function" && cb(that.globalData.userInfo)
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })

      //调用登录接口
      // wx.getUserInfo({
      //   withCredentials: false,
      //   success: function(res) {
      //     that.globalData.userInfo = res.userInfo
      //     typeof cb == "function" && cb(that.globalData.userInfo)
      //   }
      // })
    }
  },

  globalData: {
    userInfo: null
  }
})
