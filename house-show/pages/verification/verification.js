// pages/verification/verification.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
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

  idCard(){
    if(this.data.user.idcard==null){
      wx.navigateTo({
        url: '/pages/renZheng/renZheng',
      })
    }else{
      wx.showToast({
        title: '已经实名认证',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // 房东认证
  landlord(){
    if(this.data.user.idcard!=null&&this.data.user.phone!=null&&this.data.user.landlord==0){
      wx.navigateTo({
        url: '/pages/certification/certification',
      })
    }else if(this.data.user.idcard==null || this.data.user.phone==null){
      wx.showToast({
        title: '请完善个人信息',
        icon: 'success',
        duration: 2000
      })
    }else if(this.data.user.landlord==1){
      wx.showToast({
        title: '已认证',
        icon: 'success',
        duration: 2000
      })
    }
  }
  ,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.user=app.globalData.userInfo
    
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