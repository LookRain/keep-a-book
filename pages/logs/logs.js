//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    allTransactions: ''
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

  }
})
