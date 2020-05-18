// pages/personalCenter/personalCenter.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:"",
    nickName:"",
     sex:"",
    user:{}
  },

  // 跳转信息页面
  examine(){
    wx.navigateTo({
      url: '/pages/information/information',
    })
  },
  // 跳转房屋添加页面
  tiaozhuan(){
    wx.navigateTo({
      url: '/pages/insertHouse/insertHouse'
    })
  },
  // 用户登录方法
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
    
  }
,
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
// 获取用户是否登录
    this.setData({
      user:app.globalData.userInfo
    })
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