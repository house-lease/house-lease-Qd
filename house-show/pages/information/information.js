// pages/information/information.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:[{
      user:{},
      phone:13844444555

    }]
  },
  // 跳转房东申请记录页面
  apply(){
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  }
  ,
  // 推出登录
exit(){
  wx.showModal({
    title: '提示',
    content: '是否退出当前账户',
    success: function(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'login'
          })
          app.globalData.userInfo=null
          wx.navigateBack({
            complete: (res) => {
                console.info(res)
            },
          })
        } 
    }
})
  
}
  ,
  bindPhone(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
,
  // 跳转身份认证页面
  renZheng(){
    wx.navigateTo({
      url: '/pages/verification/verification',
    })
  },
// 跳转我的房屋页面
myHouse(){
  wx.navigateTo({
    url: '/pages/myHouse/myHouse',
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
    this.setData({
      user:app.globalData.userInfo
    }
    )
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