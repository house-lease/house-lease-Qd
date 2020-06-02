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
  // 跳转我的钱包页面
  wallet(){
    if(this.data.user!=null){
      wx.navigateTo({
        url: '/pages/wallet/wallet',
      })
    }else{
      wx.showToast({
          title: '未登录',
          image:"/pages/image/jg.png",
         duration:2000
     })
    }
  },
  // 跳转我的订单
  order(){
    if(this.data.user!=null){
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }else{
      wx.showToast({
          title: '未登录',
          image:"/pages/image/jg.png",
         duration:2000
     })
    }

  },
  // 跳转浏览记录页面
  browse(){
    wx.navigateTo({
      url: '/pages/browse/browse',
    })
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
    wx.getStorage({
      key: 'login',
      success:res=>{
        if(res.data.id!=null){
          wx.request({
            url: liunxUrl+'/house/user/queryByUserId',
            data:{
              userId:res.data.id
            },
            success:res=>{
              app.globalData.userInfo=res.data.data
              // 获取用户是否登录
              this.setData({
                user:app.globalData.userInfo
              })
              wx.setStorage({
                data: res.data.data,
                key: 'login',
              })
            }
          })
        }
       },
       fail:res=>{
        app.globalData.userInfo={}
        this.data.user=null,
        this.setData({
          user: null
        })
       }
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