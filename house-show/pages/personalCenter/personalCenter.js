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
    // var this_ = this;
    // wx.getUserInfo({
    //       success:function(res){
    //      console.log(res.userInfo);
    //     // 更改初始化数据
    //     this_.setData({
    //       "nickName":res.userInfo.nickName,
    //       "image_url":res.userInfo.avatarUrl,
    //       "sex":res.userInfo.gender
    //     })
    //     // 调用授权登录的方法
    //      wx.login({
    //            success:function(res) {
    //               var code = res.code;
    //                if (code) {
    //                    // 如果code存在,拿着code向开发者服务器发送请求
    //                    wx.request({
    //                        url: liunxUrl+'house/user/login',
    //                        method: 'POST',
    //                        header: { "content-type": "application/x-www-form-urlencoded"  },
    //                        data: { 
    //                           code: code ,
    //                           image_url: this_.data.image_url,
    //                           nickName:this_.data.nickName,
    //                           sex:this_.data.sex
    //                        },
    //                         success(responseData) {
    //                         if (responseData.data.data!=null) {
    //                          // 表示登录成功
    //                           app.globalData.userInfo=responseData.data.data;
    //                           this_.setData({
    //                             user:app.globalData.userInfo
    //                           })
    //                           wx.setStorage({
    //                             data: responseData.data.data,
    //                             key: 'user',
    //                           })
    //                             console.info(this_.data.user);
    //                             // >> 2、显示登录成功的信息
    //                           wx.showToast({
    //                             title: '登录成功',
    //                              icon: 'success',
    //                              duration: 2000
    //                           })
    //                            } else {
    //                               // 登录失败
    //                               // >> 1、移除已经保存的ticket
    //                             wx.removeStorage({
    //                             key: 'key'
    //                            })
    //               
    //                               // >> 2、显示登录失败信息
    //                               wx.showToast({
    //                                 title: '登录失败',
    //                                 icon: 'none',
    //                                 duration: 2000
    //                               })
    //                            }
    //                         }
    //                    })
    //                }
    //            }
    //      })        
    //     }
    // })  
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