var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    total_amount:"1"
  },
  inputSetData:function(e){
    this.setData({
      total_amount:e.detail.value
    })
  }
  ,
buttonClick:function(){

  var this_ = this

  this_.setData({
    user:app.globalData.userInfo
  })

  wx.request({
    url: liunxUrl+'house/payApiController/Pay', 
    data: {
      subject:"充值",
      body:"充值到余额",
      total_amount:this_.data.total_amount,
      userId:this_.data.user.id,
    },
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})